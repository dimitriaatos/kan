<template>
  <div>
    <img :src="src" :class="{ image: open }" />
  </div>
</template>

<script lang="ts" setup>
defineProps<{ src: string; open: boolean }>();
</script>

<style scoped>
div {
  height: 100%;
  width: 100%;
}

img {
  object-fit: contain;
  width: 100%;
  height: 100%;
  border: 1px rgba(0, 0, 0, 0) dashed;
  box-sizing: border-box;
}

@media (hover: hover) {
  .image:hover {
    border: 1px var(--accent) dashed;
  }
}
</style>
