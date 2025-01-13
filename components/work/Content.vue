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
      <li v-if="data.team.length > 0">
        Team:
        <span
          v-for="(collaborator, index) in data.team"
          :key="collaborator.collaborators_id.id"
        >
          <NuxtLink
            class="clickable"
            target="_blank"
            v-if="collaborator.collaborators_id.link"
            :to="collaborator.collaborators_id.link"
            >{{ collaborator.collaborators_id.name }}</NuxtLink
          >
          <span v-else>{{ collaborator.collaborators_id.name }}</span>
          <span v-if="index + 1 !== data.team.length">, </span>
        </span>
      </li>
      <li v-if="data.categories.length > 0">
        Tags:
        <span
          v-for="(category, index) in data.categories"
          :key="category.categories_id.title"
        >
          <NuxtLink class="tag clickable" :to="`/`">{{
            category.categories_id.title
          }}</NuxtLink>
          <span v-if="index + 1 !== data.categories.length">, </span>
        </span>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import type { ArchiveElementNoImage } from "~/schema";

const props = defineProps<{
  preview: boolean;
  data: ArchiveElementNoImage;
}>();

const metadata = Object.fromEntries(
  [
    ["Location", props.data.location],
    ["Year", props.data.year],
  ].filter(([key, value]) => value !== null)
);
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
