<template>
  <div v-for="record in records">
    <ConditionalLink
      :condition="Boolean(record.link)"
      :to="record.link || ''"
      target="_blank"
    >
      {{ record.year }} <span class="title">{{ record.title }}</span>
      {{ record.type }}
    </ConditionalLink>
  </div>
</template>

<script lang="ts" setup>
import type { AboutRecord } from "~/schema";
import ConditionalLink from "../ConditionalLink.vue";
defineProps<{ records: AboutRecord[] }>();
</script>

<style scoped>
.title {
  font-weight: bolder;
  font-style: italic;
}
</style>
