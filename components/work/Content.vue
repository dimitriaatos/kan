<template>
  <div class="parent">
    <button v-if="open" @click="handleTitleClick">
      <h2>{{ data.title }}</h2>
    </button>
    <h2 v-else>{{ data.title }}</h2>
    <section
      :class="{ closedSection: !open }"
      class="section"
      v-html="data.description"
    />
  </div>
  <div v-if="open" class="section">
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
      <li v-if="data.typology.length > 0">
        Tags:
        <span
          v-for="(category, index) in data.typology"
          :key="category.typology_id.title"
        >
          <NuxtLink class="tag clickable" :to="`/`">{{
            category.typology_id.title
          }}</NuxtLink>
          <span v-if="index + 1 !== data.typology.length">, </span>
        </span>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import type { ArchiveElementNoImage } from "~/schema";

const handleTitleClick = (event: MouseEvent): void => {
  event.stopPropagation();
  emit("close");
};

const props = defineProps<{
  open: boolean;
  data: ArchiveElementNoImage;
}>();

const metadata = Object.fromEntries(
  [
    ["Location", props.data.location],
    ["Year", props.data.year],
  ].filter(([key, value]) => value !== null)
);

const emit = defineEmits<{
  (e: "close"): void;
}>();
</script>

<style scoped lang="scss">
.parent {
  overflow: hidden;
  text-overflow: ellipsis;
}

h2 {
  text-align: center;
  margin-bottom: var(--padding);
}

.closedSection {
  display: -webkit-box;
  line-clamp: 4;
  -webkit-line-clamp: 4; /* Number of lines to display */
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.closedSection:deep(p) {
  margin-top: 0;
}

.section {
  text-align: left;
}

.tag {
  font-style: italic;
}
</style>
