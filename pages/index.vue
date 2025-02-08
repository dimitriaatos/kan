<template>
  <ArrangeBy v-if="isOpen" :typology="typology" />
  <component
    v-for="(work, index) in parsedWorks"
    :is="work.open ? 'div' : 'button'"
    class="work"
    :class="{
      underlinePreview: !work.open,
      closed: !work.open,
      open: work.open,
    }"
    @click="!work.open && toggleAccordion(index, true)"
  >
    <ConditionalLink
      :condition="isMobile"
      :to="`works/${work.work.slug}`"
      class="work underlinePreview"
    >
      <Work
        :columns="work.columns"
        :open="work.open"
        :work="work.work"
        @close="toggleAccordion(index, false)"
      />
    </ConditionalLink>
  </component>
</template>

<script lang="ts" setup>
import { typologyQuery, typologySchema } from "~/schema";
import { z } from "zod";
import { getPageTitle } from "~/assets/common";
import { storeToRefs } from "pinia";

const isMobile = false;

const archiveStore = useArchiveStore();
const { initArchive, toggleAccordion } = archiveStore;
const { isOpen, filterBy, sortBy, parsedWorks } = storeToRefs(archiveStore);

const { $directus } = useNuxtApp();

await useAsyncData("archive", () => initArchive($directus), {
  watch: [filterBy, sortBy],
});

const { data: typology } = await useAsyncData("typology", async () => {
  const res = await $directus.query(typologyQuery);
  const parsed = z
    .object({ typology: z.array(typologySchema) })
    .parse(res).typology;
  return parsed;
});

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
