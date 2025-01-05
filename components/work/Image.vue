<template>
  <div>
    <img :src="data" />
  </div>
</template>

<script lang="ts" setup>
defineProps(["data"]);
</script>

<style scoped>
img {
  width: 100%;
}
</style>
