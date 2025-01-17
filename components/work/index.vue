<template>
  <div v-for="column in columns" class="column">
    <WorkContent
      v-if="column.type === ColumnType.Description"
      :data="column.data"
      :preview="preview"
    />
    <ConditionalLink
      :condition="!preview"
      :to="`/works/${work.slug}/image-${0}`"
    >
      <WorkImage
        v-if="column.type === ColumnType.Image"
        :src="column.src"
        :preview="preview"
      />
    </ConditionalLink>
  </div>
</template>

<script lang="ts" setup>
import type { WorkColumns } from "~/@types/work";
import { ColumnType } from "~/assets/common";
import type { Archive } from "~/schema";

defineProps<{
  preview: boolean;
  columns: WorkColumns;
  work: Archive[number];
}>();
</script>

<style scoped>
.column {
  flex: 1 1 0px;
  padding: 3.5em 0;
}

.overlay {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
</style>
