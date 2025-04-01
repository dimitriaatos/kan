<template>
  <component
    v-for="(work, index) in parsedWorks"
    :is="work.open || isMobile ? 'div' : 'button'"
    :class="{
      underlinePreview: !work.open,
      closed: !work.open,
      open: work.open,
    }"
    style="position: relative"
    @click="!work.open && !isMobile && toggleAccordion(index, true)"
  >
    <Close
      v-if="work.open"
      class="close"
      @click="(e: MouseEvent) => { handleCloseButton(e, index) }"
    />
    <ConditionalLink
      :condition="isMobile"
      :to="`works/${work.work.slug}`"
      class="underlinePreview"
      style="width: 100%"
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
import { getPageTitle } from "~/assets/common";
import { storeToRefs } from "pinia";
import { useWindowSize } from "vue-window-size";

const handleCloseButton = (e: MouseEvent, index: number) => {
  e.stopPropagation();
  toggleAccordion(index, false);
};

const { width } = useWindowSize();
const isMobile = computed(() =>
  width.value !== 0 ? width.value < 850 : false
);

const archiveStore = useArchiveStore();
const { initArchive, toggleAccordion } = archiveStore;
const { filterBy, sortBy, parsedWorks } = storeToRefs(archiveStore);

const { $directus } = useNuxtApp();

await useAsyncData("archive", () => initArchive($directus), {
  watch: [filterBy, sortBy],
});

useHead({
  title: getPageTitle("Archive"),
});
</script>

<style scoped>
.close {
  position: absolute;
  right: 2vw;
  top: calc(1em + var(--work-vertical-padding) / 2);
}

.closed {
  height: 30em;
}

@media (max-width: 850px) {
  .closed {
    height: initial;
  }
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
