<template>
  <component :is="condition ? linkComponent : 'div'" :to="to" :target="target">
    <slot></slot>
  </component>
</template>

<script lang="ts" setup>
defineProps<{ condition: boolean; to: string; target?: string }>();
const linkComponent = computed(() => {
  return resolveComponent("NuxtLink");
});
</script>

<style></style>
