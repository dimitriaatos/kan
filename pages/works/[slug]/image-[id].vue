<template>
  <div id="parent">
    <div id="overlay">
      <ConditionalLink
        :class="{ left: edge !== Edge.Start }"
        class="goto"
        :to="`image-${index + Direction.Back}`"
        :condition="edge !== Edge.Start"
      >
        <div class="goto" />
      </ConditionalLink>
      <ConditionalLink
        :class="{ right: edge !== Edge.End }"
        class="goto"
        :to="`image-${index + Direction.Forward}`"
        :condition="edge !== Edge.End"
      >
        <div class="goto" />
      </ConditionalLink>
    </div>
    <div id="gallery">
      <img
        :src="
          prependAssetURI(
            work.images[Number(route.params.id)].directus_files_id.id
          )
        "
        alt=""
      />

      <NuxtLink :to="`/works/${route.params.slug}`">
        <h2>{{ work.title }}</h2>
      </NuxtLink>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { z } from "zod";
import { prependAssetURI, TITLE } from "~/assets/common";
import {
  archiveBySlugQuery,
  archiveElementSchema,
  type Archive,
} from "~/schema";

const { $directus } = useNuxtApp();
const route = useRoute() as ReturnType<typeof useRoute> & {
  params: {
    id: string;
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

enum Direction {
  Back = -1,
  Forward = 1,
}

enum Edge {
  Start,
  Middle,
  End,
}

const edge = computed((): Edge => {
  return index === 0
    ? Edge.Start
    : index < work.value.images.length - 1
    ? Edge.Middle
    : Edge.End;
});

useHead({
  title: `${work.value.title} | ${TITLE}`,
  meta: [
    { hid: "og-title", property: "og:title", content: work.value.title },
    {
      hid: "og-image",
      property: "og:image",
      content: `${prependAssetURI(
        work.value.images[Number(route.params.id)].directus_files_id.id
      )}`,
    },
  ],
});
</script>

<style scoped>
#parent {
  position: relative;
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

#close {
  display: block;
  aspect-ratio: 1/1;
  border-radius: 50%;
  background-color: rgb(255 0 0);
  width: 1em;
  position: absolute;
  right: 2vw;
  top: 1em;
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
