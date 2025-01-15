<template>
  <NuxtLink
    :to="`works/${archive[index].slug}`"
    v-for="(work, index) in parsedWorks"
    class="work"
  >
    <Work :work="work" :preview="true" />
  </NuxtLink>
</template>

<script lang="ts" setup>
import { parseWorks } from "~/assets/archive";
import { archiveQuery, archiveSchema } from "~/schema";
import { z } from "zod";

const { $directus } = useNuxtApp();

const { data } = await useAsyncData("archive", () => {
  return $directus.query(archiveQuery);
});

const archive = computed(() => {
  return z.object({ archive: archiveSchema }).parse(data.value).archive;
});

const parsedWorks = computed(() => parseWorks(archive.value));
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
</style>
