<template>
  <div :class="{ square: !preview, preview: preview }">
    <img :src="src" :class="{ image: !preview }" />
  </div>
</template>

<script lang="ts" setup>
defineProps<{ src: string; preview: boolean }>();
</script>

<style scoped>
.square {
  aspect-ratio: 1/1;
  width: 100%;
}

.preview {
  height: 100%;
  width: 100%;
}

img {
  object-fit: contain;
  width: 100%;
  height: 100%;
  border: 1px rgba(0, 0, 0, 0) dashed;
}

@media (hover: hover) {
  .image:hover {
    border: 1px var(--accent) dashed;
  }
}
</style>
