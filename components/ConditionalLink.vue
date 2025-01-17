<template>
  <NuxtLink v-if="condition" :to="to" :target="target">
    <slot />
  </NuxtLink>
  <slot v-else />
</template>

<script lang="ts" setup>
defineProps<{ condition: boolean; to: string; target?: string }>();
</script>

<style></style>
