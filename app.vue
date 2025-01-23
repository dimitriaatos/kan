<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<style>
:root {
  --padding: 2em;
  --half-padding: calc(var(--padding) / 2);
}

body {
  margin: 0 var(--padding) var(--padding) var(--padding);
  font-size: 15px;
  font-family: "Satoshi";
}

button {
  border: none;
  background-color: inherit;
  padding: 0;
  color: inherit;
  cursor: pointer;
  padding: 0;
  font-family: "Satoshi";
}

a {
  color: inherit;
  text-decoration: none;
}

h1 {
  font-size: 40px;
}

.h2size,
h2 {
  font-size: 24px;
}

h1,
h2,
h3,
h4,
h5 {
  margin: 0;
}

button,
img {
  user-select: none;
}

ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.clickable:hover {
  text-decoration: underline;
  cursor: pointer;
}

@media (hover: none) {
  .clickable:hover {
    text-decoration: none;
    cursor: default;
  }
}

.selected {
  text-decoration: underline;
}
</style>
