<template>
  <div>
    <img :src="src" />
  </div>
</template>

<script lang="ts" setup>
defineProps<{ src: string }>();
</script>

<style scoped>
img {
  width: 100%;
}
</style>
