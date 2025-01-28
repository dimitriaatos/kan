<template>
  <ArrangeBy v-if="isOpen" />
  <button
    v-for="(columns, index) in parsedWorks"
    class="work"
    :class="{
      underlinePreview: !openWorks[index],
      closed: !openWorks[index],
      open: openWorks[index],
    }"
    @click="handleAccordion(index)"
  >
    <ConditionalLink
      :condition="isMobile"
      :to="`works/${archive[index].slug}`"
      class="work underlinePreview"
    >
      <Work
        :columns="columns"
        :open="openWorks[index]"
        :work="archive[index]"
      />
    </ConditionalLink>
  </button>
</template>

<script lang="ts" setup>
import { getColumns } from "~/assets/archive";
import { archiveQuery, archiveSchema } from "~/schema";
import { z } from "zod";
import { getPageTitle } from "~/assets/common";
import { storeToRefs } from "pinia";

const isMobile = false;

const arrangeBy = useArrangeByStore();
const { isOpen } = storeToRefs(arrangeBy);

const { $directus } = useNuxtApp();

const { data } = await useAsyncData("archive", () => {
  return $directus.query(archiveQuery);
});

const archive = computed(() => {
  return z.object({ archive: archiveSchema }).parse(data.value).archive;
});

const parsedWorks = computed(() => archive.value.map(getColumns));

const openWorks = ref<boolean[]>(parsedWorks.value.map(() => false));

const handleAccordion = (index: number) => {
  if (!openWorks.value[index]) {
    openWorks.value[index] = !openWorks.value[index];
  }
};

useHead({
  title: getPageTitle("Archive"),
});
</script>

<style scoped>
.work {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid black;
  flex: 1 1 0px;
  gap: 1em;
}

.closed {
  height: 30em;
}

.open {
  cursor: default;
}

@media (hover: hover) {
  .underlinePreview:hover:deep(p) {
    text-decoration-line: underline;
    text-decoration-style: dashed;
    text-decoration-color: var(--accent);
  }
}
</style>
