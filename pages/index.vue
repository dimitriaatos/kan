<template>
  <div>
    <article v-for="work in works" class="work">
      <Work :work="work" :preview="true" />
    </article>
  </div>
</template>

<script lang="ts" setup>
import { works } from "@/assets/mockedData/works";
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
