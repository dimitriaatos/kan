<template>
  <!-- TODO avoid double link content -->
  <NuxtLink
    v-if="preview"
    :to="`works/${data.slug}`"
    style="height: 100%; display: block"
  >
    <h2>{{ data.title }}</h2>
    <section
      :class="preview ? 'previewSection' : 'section'"
      v-html="data.description"
    />
  </NuxtLink>
  <div v-else>
    <h2>{{ data.title }}</h2>
    <section
      :class="preview ? 'previewSection' : 'section'"
      v-html="data.description"
    />
  </div>
  <div v-if="!preview">
    <ul>
      <li v-for="(value, key) in metadata" :key="key">
        {{ key }}: {{ value }}
      </li>
      <li>
        Tags:
        <span v-for="(tag, index) in data.tags" :key="tag">
          <NuxtLink class="tag clickable" :to="`works/${data.slug}`">{{
            tag
          }}</NuxtLink>
          <span v-if="index + 1 !== data.tags.length">, </span>
        </span>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { capitalizeFirstLetter } from "~/assets/common";

const props = defineProps(["data", "preview"]);

const metadataKeys = ["location", "year", "team"];

const metadata = Object.fromEntries(
  Object.entries(props.data)
    .filter(([key]) => metadataKeys.includes(key))
    .map(([key, value]) => {
      return [capitalizeFirstLetter(key), value];
    })
);

console.log(props.data);
</script>

<style scoped lang="scss">
h2 {
  text-align: center;
  margin-bottom: 1em;
}
.previewSection {
  text-align: left;
  display: -webkit-box;
  line-clamp: 4;
  -webkit-line-clamp: 4; /* Number of lines to display */
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
.section {
  text-align: left;
}

.tag {
  font-style: italic;
}
</style>
