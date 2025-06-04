<template>
  <div>
    <nav>
      <span
        class="navigation"
        :class="{ hideOnMobile: !isBurgerOpen }"
        @mouseover="toggleArrangeBy(OpenFrom.Hover, false)"
      >
        <NuxtLink
          v-if="isHome"
          class="h2size clickable"
          to="/about"
          @click="toggleBurger(false)"
          >about</NuxtLink
        >
        <NuxtLink
          v-else
          class="h2size clickable"
          to="/"
          @click="toggleBurger(false)"
          >archive</NuxtLink
        >
      </span>
      <h1 class="title">KAN</h1>
      <span class="arrangeBy" :class="{ hideOnMobile: !isBurgerOpen }">
        <button
          v-if="isHome"
          @click="
            toggleArrangeBy(({ state, from }) => {
              if (state && from === OpenFrom.Hover) {
                return { state: true, from: OpenFrom.Click };
              } else {
                return { state: !state, from: OpenFrom.Click };
              }
            })
          "
          @mouseover="handleMouseOver"
          class="h2size clickable"
          :class="{ selected: isOpen.state }"
        >
          arrange by
        </button>
      </span>
      <Circle class="burgerButton" color="green" @click="toggleBurger()" />
    </nav>
    <div
      class="overlay"
      @click="
        () => {
          toggleBurger(false);
          toggleArrangeBy(OpenFrom.Click, false);
        }
      "
      v-if="isBurgerOpen"
    />
  </div>
</template>

<script lang="ts" setup>
const route = useRoute();
const isHome = computed(() => route.path === "/");
const archiveStore = useArchiveStore();
const { toggleArrangeBy, toggleBurger } = archiveStore;
const { isOpen, isBurgerOpen } = storeToRefs(archiveStore);

const handleMouseOver = () => {
  const { matches: isMobile } = window.matchMedia("(hover: hover)");
  if (isMobile) {
    toggleArrangeBy(OpenFrom.Hover, true);
  }
};
</script>

<style scoped>
nav {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  grid-template-rows: auto;
  padding: var(--padding) 0;
  grid-template-areas: "navigation title arrangeBy";
}

span > * {
  display: block;
  width: 100%;
  height: 100%;
  text-align: left;
}

.navigation {
  grid-area: navigation;
  justify-self: start;
}

.title {
  grid-area: title;
  justify-self: center;
}

.arrangeBy {
  grid-area: arrangeBy;
  justify-self: end;
}

a {
  user-select: none;
}

.burgerButton {
  grid-area: burgerButton;
  display: none;
}

.hideOnMobile {
  display: block;
}

.overlay {
  display: none;
}

@media (max-width: 850px) {
  .burgerButton {
    display: block;
    justify-self: end;
  }

  .hideOnMobile {
    display: none;
  }

  .navigation {
    border-bottom: 1px solid black;
    width: 100%;
  }

  .navigation {
    align-self: end;
    padding-bottom: 0.5em;
  }

  .arrangeBy {
    padding-top: 0.5em;
    justify-self: start;
    width: 100%;
  }

  nav {
    grid-template-areas:
      ". title burgerButton"
      "navigation navigation navigation"
      "arrangeBy arrangeBy arrangeBy";
    padding-bottom: 0;
  }

  .overlay {
    display: block;
    z-index: -1;
    position: fixed;
    bottom: 0;
    top: 0;
    left: 0;
    right: 0;
  }
}
</style>
