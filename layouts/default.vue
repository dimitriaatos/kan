<template>
  <div id="nav" @mouseleave="handleMouseLeave">
    <Nav />
    <ArrangeBy v-if="isOpen.state" :typology="typology" />
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
const { toggleArrangeBy } = archiveStore;

const { data: typology } = await useAsyncData("typology", async () => {
  const res = await $directus.query(typologyQuery);
  const parsed = z
    .object({ typology: z.array(typologySchema) })
    .parse(res).typology;
  return parsed;
});

const handleMouseLeave = () => {
  // using mouse leave also on touch screens for catching tap outside the menu area
  toggleArrangeBy(OpenFrom.Hover, false);
};
</script>

<style scoped>
#nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  padding: 0 var(--padding);
  background-color: white;
  z-index: 10;
}
</style>
