<template>
  <div>
    <nav>
      <NuxtLink class="h2size element clickable" to="/">About</NuxtLink>
      <h1 class="element">KAN</h1>
      <button class="h2size element clickable">Arrange by</button>
    </nav>
  </div>
</template>

<script lang="ts" setup></script>

<style scoped>
nav {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  height: 5em;
  align-items: center;
  border-bottom: solid black 1px;
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

.clickable:hover {
  text-decoration: underline;
}
</style>
