<template>
  <div
    v-for="column in work"
    :class="{ column: true, underlinePreview: preview }"
  >
    <WorkContent
      v-if="column.type === ColumnType.Description"
      :data="column.data"
      :preview="preview"
    />
    <WorkImage v-if="column.type === ColumnType.Image" :data="column.data" />
  </div>
</template>

<script lang="ts" setup>
import { ColumnType } from "~/assets/common";

defineProps(["work", "preview"]);
</script>

<style scoped>
.column {
  flex: 1 1 0px;
  padding: 3.5em 0;
}

.underlinePreview:hover >>> h2 {
  text-decoration: underline;
}
</style>
