<template>
  <div
    v-for="column in columns"
    class="column"
    :class="{
      description: column.type === ColumnType.Description,
      image: column.type !== ColumnType.Description,
      closedImage: column.type !== ColumnType.Description && !open,
    }"
  >
    <WorkContent
      v-if="column.type === ColumnType.Description"
      :data="column.data"
      :open="open"
      @close="emit('close')"
    />
    <ConditionalLink
      v-if="
        column.type === ColumnType.Image || column.type === ColumnType.Drawing
      "
      :condition="open"
      :to="`/works/${work.slug}/${column.type}-${0}`"
    >
      <WorkImage :src="column.src" :open="open" />
    </ConditionalLink>
  </div>
</template>

<script lang="ts" setup>
import type { WorkColumns } from "~/@types/work";
import { ColumnType } from "~/assets/common";
import type { Archive } from "~/schema";

defineProps<{
  open: boolean;
  columns: WorkColumns;
  work: Archive[number];
}>();

const emit = defineEmits<{
  (e: "close"): void;
}>();
</script>

<style scoped>
.column {
  flex: 1 1 0px;
  padding: 3.5em 0;
  box-sizing: border-box;
  overflow: hidden;
}

.overlay {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}

.description {
  align-self: flex-start;
}

.image {
  height: 30em;
}

@media (max-width: 850px) {
  .closedImage {
    display: none;
  }
  .column {
    padding: 2em 0;
  }
}
</style>
