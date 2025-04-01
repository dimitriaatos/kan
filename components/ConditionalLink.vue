<template>
  <NuxtLink
    v-if="condition"
    :to="to"
    :target="target"
    class="link"
    :class="className"
    :style="style"
  >
    <slot />
  </NuxtLink>
  <slot v-else :class="className" :style="style" />
</template>

<script lang="ts" setup>
const props = defineProps<{
  condition: boolean;
  to: string;
  target?: string;
  class?: unknown;
  style?: unknown;
}>();

const { class: className } = props;
</script>

<style scoped>
@media (hover: hover) {
  .link:hover:deep(h2),
  .link:hover:deep(h3) {
    text-decoration: underline;
  }
}
</style>
