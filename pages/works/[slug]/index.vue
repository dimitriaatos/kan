<template>
  <div>
    <Work :columns="columns" :work="work" :open="true" />
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
import { getPageTitle, prependAssetURI } from "~/assets/common";

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
  return getColumns({ work: work.value });
});

useHead({
  title: getPageTitle(work.value.title),
  meta: [
    { property: "og:title", content: work.value.title },
    {
      property: "og:image",
      content: `${prependAssetURI(work.value.images[0].directus_files_id.id)}`,
    },
  ],
});
</script>

<style scoped></style>
