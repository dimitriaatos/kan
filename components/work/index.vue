<template>
  <button v-if="open" @click="handleTitleClick" class="title">
    <h2>{{ work.title }}</h2>
  </button>
  <h2 class="title" v-else>{{ work.title }}</h2>
  <div class="work">
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

const handleTitleClick = (event: MouseEvent): void => {
  event.stopPropagation();
  emit("close");
};

const emit = defineEmits<(e: "close") => void>();
</script>

<style scoped>
.column {
  flex: 1 1 0px;
  padding: var(--work-vertical-padding) 0;
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

.work {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex: 1 1 0px;
  gap: 1em;
  width: 100%;
}

.title {
  text-align: left;
  width: 100%;
  border-bottom: solid black 1px;
}

@media (max-width: 850px) {
  .closedImage {
    display: none;
  }
  .column {
    padding: 2em 0;
  }
  .work {
    display: block;
  }
}
</style>
