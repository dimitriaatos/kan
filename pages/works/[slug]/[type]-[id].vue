<template>
  <div id="parent">
    <div id="overlay">
      <ConditionalLink
        :class="{ left: !edges.includes(Edge.Start) }"
        class="goto"
        :to="`${route.params.type}-${index + Direction.Back}`"
        :condition="!edges.includes(Edge.Start)"
      >
        <div class="goto" />
      </ConditionalLink>
      <ConditionalLink
        :class="{ right: !edges.includes(Edge.End) }"
        class="goto"
        :to="`${route.params.type}-${index + Direction.Forward}`"
        :condition="!edges.includes(Edge.End)"
      >
        <div class="goto" />
      </ConditionalLink>
      <Close
        :to="isMobile ? `/works/${route.params.slug}` : '/'"
        @click="handleClose"
        class="close"
      />
    </div>
    <div id="gallery">
      <img
        :src="
          prependAssetURI(
            work[route.params.type][Number(route.params.id)].directus_files_id
              .id
          )
        "
        alt=""
      />

      <NuxtLink
        :to="isMobile ? `/works/${route.params.slug}` : '/'"
        @click="handleClose"
      >
        <h2>{{ work.title }}</h2>
      </NuxtLink>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useWindowSize } from "vue-window-size";
import { z } from "zod";
import {
  type ColumnType,
  getPageTitle,
  prependAssetURI,
} from "~/assets/common";
import {
  archiveBySlugQuery,
  archiveElementSchema,
  type Archive,
} from "~/schema";

const { width } = useWindowSize();
const isMobile = computed(() =>
  width.value !== 0 ? width.value < 850 : false
);

const { $directus } = useNuxtApp();
const route = useRoute() as ReturnType<typeof useRoute> & {
  params: {
    id: string;
    type: ColumnType.Image | ColumnType.Drawing;
    slug: string;
  };
};

const index = Number(route.params.id);

const { data } = await useAsyncData(route.params.slug, () => {
  return $directus.query<{ archive_by_id: Archive[number] }>(
    archiveBySlugQuery,
    { slug: route.params.slug }
  );
});

const work = computed(() => {
  return z.object({ archive_by_id: archiveElementSchema }).parse(data.value)
    .archive_by_id;
});

const archiveStore = useArchiveStore();
const { toggleAccordion } = archiveStore;
const { parsedWorks } = storeToRefs(archiveStore);

const handleClose = () => {
  const index = parsedWorks.value.findIndex((work) => {
    work.work.slug === route.params.slug;
  });
  toggleAccordion(index, true);
};

enum Direction {
  Back = -1,
  Forward = 1,
}

enum Edge {
  Start = 0,
  End = 1,
}

const edges = computed((): Edge[] => {
  const value: Edge[] = new Array();
  if (index === 0) value.push(Edge.Start);
  if (index >= work.value[route.params.type].length - 1) value.push(Edge.End);
  return value;
});

useHead({
  title: getPageTitle(work.value.title),
  meta: [
    { hid: "og-title", property: "og:title", content: work.value.title },
    {
      hid: "og-image",
      property: "og:image",
      content: `${prependAssetURI(
        work.value[route.params.type][Number(route.params.id)].directus_files_id
          .id
      )}`,
    },
  ],
});
</script>

<style lang="scss" scoped>
#parent {
  position: relative;
}

.close {
  position: absolute;
  right: 2vw;
  top: 1em;
}

.goto {
  width: 100%;
  height: 100%;
}

.left {
  /* background-color: rgba(30, 0, 255, 0.5); */
  cursor: url("/icons/left.png") -15 25, w-resize;
}

.right {
  /* background-color: rgba(9, 255, 0, 0.5); */
  cursor: url("/icons/right.png") 15 25, e-resize;
}

#overlay {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  /* border: solid 5px red; */
}

#gallery {
  height: 70vh;
  display: flex;
  flex-direction: column;
  align-items: center;
}

#gallery > img {
  object-fit: contain;
  width: 100%;
  height: 100%;
  padding: var(--padding);
}
</style>
