<template>
  <div class="work">
    <Work :work="work" :preview="false" />
  </div>
</template>

<script setup lang="ts">
import {
  archiveBySlugQuery,
  archiveElementSchema,
  type Archive,
} from "~/assets/schema";
import { z } from "zod";
import { parseWorks } from "~/assets/archive";

const { $directus } = useNuxtApp();
const route = useRoute("slug");

const { data } = await useAsyncData(route.params.slug as string, () => {
  return $directus.query<{ archive_by_id: Archive[number] }>(
    archiveBySlugQuery,
    { slug: route.params.slug }
  );
});

const work = computed(() => {
  const work = z
    .object({ archive_by_id: archiveElementSchema })
    .parse(data.value).archive_by_id;
  return parseWorks([work])[0];
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
}
</style>
