<template>
  <section v-if="condition">
    <div>
      <h2>{{ title }}</h2>
      <slot />
    </div>
  </section>
</template>

<script lang="ts" setup>
defineProps<{ condition: boolean; title: string }>();
</script>

<style scoped>
section {
  border-bottom: solid black 1px;
  width: 100%;
  padding-bottom: 1rem;
  text-align: center;
}

section > div {
  max-width: 30em;
}

section h2 {
  padding: 1rem 0;
}
</style>
