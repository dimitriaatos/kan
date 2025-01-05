<template>
  <div class="work">
    <Work :work="work" :preview="false" />
  </div>
</template>

<script setup lang="ts">
import { mockedWorks, works } from "@/assets/mockedData/works";
const route = useRoute();

const index = mockedWorks.findIndex((work) => {
  return work.slug === route.params.slug;
});

const work = works[index];
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
