<template>
  <h2>{{ data.title }}</h2>
  <section v-html="data.description" />
</template>

<script lang="ts" setup>
const props = defineProps(["data"]);
</script>

<style scoped lang="scss">
h2 {
  text-align: center;
  margin-bottom: 1em;
}
section {
  text-align: left;
  display: -webkit-box;
  line-clamp: 4;
  -webkit-line-clamp: 4; /* Number of lines to display */
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
