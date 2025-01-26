<template>
  <ArrangeBy v-if="isOpen" />
  <NuxtLink
    :to="`works/${archive[index].slug}`"
    v-for="(columns, index) in parsedWorks"
    class="work underlinePreview"
  >
    <Work :columns="columns" :preview="true" , :work="archive[index]" />
  </NuxtLink>
</template>

<script lang="ts" setup>
import { getColumns } from "~/assets/archive";
import { archiveQuery, archiveSchema } from "~/schema";
import { z } from "zod";
import { getPageTitle } from "~/assets/common";
import { storeToRefs } from "pinia";

const arrangeBy = useArrangeByStore();
const { isOpen } = storeToRefs(arrangeBy);

const { $directus } = useNuxtApp();

const { data } = await useAsyncData("archive", () => {
  return $directus.query(archiveQuery);
});

const archive = computed(() => {
  return z.object({ archive: archiveSchema }).parse(data.value).archive;
});

const parsedWorks = computed(() =>
  archive.value.map((work, index) => getColumns(work, index))
);

useHead({
  title: getPageTitle("Archive"),
});
</script>

<style scoped>
.work {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: stretch;
  border-bottom: 1px solid black;
  flex: 1 1 0px;
  gap: 1em;
  height: 30rem;
  overflow: hidden;
}

@media (hover: hover) {
  .underlinePreview:hover:deep(h2) {
    text-decoration: underline;
  }
  .underlinePreview:hover:deep(p) {
    text-decoration-line: underline;
    text-decoration-style: dashed;
    text-decoration-color: var(--accent);
  }
}
</style>
