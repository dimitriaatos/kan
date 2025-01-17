<template>
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
  height: 30vw;
}

.underlinePreview:hover:deep(h2) {
  text-decoration: underline;
}
</style>
