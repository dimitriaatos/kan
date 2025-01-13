<template>
  <img :src="src" />
</template>

<script lang="ts" setup>
defineProps<{ src: string }>();
</script>

<style scoped>
img {
  object-fit: contain;
  width: 100%;
  height: 100%;
}
</style>
