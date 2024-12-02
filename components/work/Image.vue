<template>
  <div>
    <img :src="props.data" />
  </div>
</template>

<script lang="ts" setup>
const props = defineProps(["data"]);
</script>

<style scoped>
img {
  width: 100%;
}
</style>
