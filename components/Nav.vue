<template>
  <div>
    <nav>
      <span class="element">
        <NuxtLink v-if="isHome" class="h2size clickable" to="/about"
          >About</NuxtLink
        >
        <NuxtLink v-else class="h2size clickable" to="/">Archive</NuxtLink>
      </span>
      <h1 class="element">KAN</h1>
      <span class="element">
        <button
          v-if="isHome"
          @click="toggleArrangeBy()"
          @mouseover="handleMouseOver"
          class="h2size clickable"
          :class="{ selected: isOpen }"
        >
          Arrange by
        </button>
      </span>
    </nav>
  </div>
</template>

<script lang="ts" setup>
const route = useRoute();
const isHome = computed(() => route.path === "/");
const archiveStore = useArchiveStore();
const { toggleArrangeBy } = archiveStore;
const { isOpen } = storeToRefs(archiveStore);

const handleMouseOver = () => {
  const { matches: isMobile } = window.matchMedia("(hover: hover)");
  if (isMobile) {
    toggleArrangeBy(true);
  }
};
</script>

<style scoped>
nav {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  padding: var(--padding) 0;
}

.element:first-child {
  justify-self: start;
}

.element:nth-child(2) {
  justify-self: center;
}

.element:last-child {
  justify-self: end;
}

a {
  user-select: none;
}
</style>
