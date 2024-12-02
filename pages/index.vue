<template>
  <div>
    <article v-for="work in works" class="work">
      <button v-for="column in work" class="column">
        <WorkContent :data="column.data" />
        <WorkImage
          v-if="column.type === ColumnType.Image"
          :data="column.data"
        />
      </button>
    </article>
  </div>
</template>

<script lang="ts" setup>
import mockedWorks from "@/assets/mockedData/works";

enum ColumnType {
  Description,
  Image,
}

const works = mockedWorks.map((work, index) => {
  const {
    title,
    description,
    images: [image1, image2],
  } = work;

  let columnData = [
    { data: { title, description }, type: ColumnType.Description },
    { data: image1, type: ColumnType.Image },
    { data: image2, type: ColumnType.Image },
  ];

  // re-order columns
  for (let times = 0; times < index % columnData.length; times++) {
    columnData.unshift(columnData.pop() as (typeof columnData)[number]);
  }

  return columnData;
});
</script>

<style scoped>
.work {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: stretch;
  border-bottom: 1px solid black;
  flex: 1 1 0px;
  gap: 1em;
}

.column {
  flex: 1 1 0px;
  padding: 3.5em 0;
}

.column:hover >>> h2 {
  text-decoration: underline;
}
</style>
