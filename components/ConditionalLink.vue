<template>
  <NuxtLink v-if="condition" :to="to" :target="target" class="link">
    <slot />
  </NuxtLink>
  <slot v-else />
</template>

<script lang="ts" setup>
defineProps<{ condition: boolean; to: string; target?: string }>();
</script>

<style scoped>
@media (hover: hover) {
  .link:hover:deep(h2),
  .link:hover:deep(h3) {
    text-decoration: underline;
  }
}
</style>
