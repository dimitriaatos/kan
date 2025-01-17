<template>
  <div class="work">
    <Work :columns="columns" :work="work" :preview="false" />
  </div>
</template>

<script setup lang="ts">
import {
  archiveBySlugQuery,
  archiveElementSchema,
  type Archive,
} from "~/schema";
import { z } from "zod";
import { getColumns } from "~/assets/archive";

const { $directus } = useNuxtApp();
const route = useRoute() as ReturnType<typeof useRoute> & {
  params: { slug: string };
};

const { data } = await useAsyncData(route.params.slug, () => {
  return $directus.query<{ archive_by_id: Archive[number] }>(
    archiveBySlugQuery,
    { slug: route.params.slug }
  );
});

const work = computed(() => {
  return z.object({ archive_by_id: archiveElementSchema }).parse(data.value)
    .archive_by_id;
});

const columns = computed(() => {
  return getColumns(work.value);
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
  position: relative;
}
</style>
