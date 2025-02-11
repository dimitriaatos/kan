<template>
  <div>
    <Nav id="nav" />
    <div style="height: 8em" />
    <slot />
  </div>
</template>

<script lang="ts" setup></script>

<style scoped>
#nav {
  position: fixed;
  top: 0;
  left: var(--padding);
  right: var(--padding);
  background-color: white;
}
</style>
