<template>
  <div id="nav">
    <Nav />
    <ArrangeBy v-if="isOpen" :typology="typology" />
  </div>
  <div style="height: 8em" />
  <slot />
</template>

<script lang="ts" setup>
import { typologyQuery, typologySchema } from "~/schema";
import { z } from "zod";

const { $directus } = useNuxtApp();

const archiveStore = useArchiveStore();
const { isOpen } = storeToRefs(archiveStore);

const { data: typology } = await useAsyncData("typology", async () => {
  const res = await $directus.query(typologyQuery);
  const parsed = z
    .object({ typology: z.array(typologySchema) })
    .parse(res).typology;
  return parsed;
});
</script>

<style scoped>
#nav {
  position: fixed;
  top: 0;
  left: var(--padding);
  right: var(--padding);
  background-color: white;
  z-index: 10;
}
</style>
