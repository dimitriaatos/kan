<template>
  <div class="center-column">
    <section v-if="about.about !== null">
      <h2>About</h2>
      <div v-html="about.about"></div>
    </section>
    <section v-if="about.news !== null">
      <h2>News</h2>
      <div v-html="about.news"></div>
    </section>
    <section v-if="about.awards.length > 0">
      <h2>Awards</h2>
      <AboutRecord :records="about.awards" />
    </section>
    <section v-if="about.publications.length > 0">
      <h2>Publications</h2>
      <AboutRecord :records="about.publications" />
    </section>
    <section v-if="about.collaborators.length > 0">
      <h2>Collaborators</h2>
      <div class="collaborators">
        <div
          v-for="collaborator in about.collaborators"
          :key="collaborator.collaborators_id.id"
        >
          <ConditionalLink
            :condition="Boolean(collaborator.collaborators_id.link)"
            :to="collaborator.collaborators_id.link || ''"
            target="_blank"
          >
            <img
              v-if="collaborator.collaborators_id.image"
              :src="prependAssetURI(collaborator.collaborators_id.image.id)"
              alt=""
            />
            {{ collaborator.collaborators_id.name }}
          </ConditionalLink>
        </div>
      </div>
    </section>
    <section v-if="about.contact !== null">
      <h2>Contact</h2>
      <div v-html="about.contact"></div>
    </section>
  </div>
</template>

<script lang="ts" setup>
import { z } from "zod";
import { prependAssetURI } from "~/assets/common";
import { aboutQuery, aboutSchema } from "~/schema";

const { $directus } = useNuxtApp();

const { data } = await useAsyncData("about", () => {
  return $directus.query(aboutQuery);
});

const about = computed(() => {
  return z.object({ about: aboutSchema }).parse(data.value).about;
});
</script>

<style scoped>
.center-column,
.center-column > section {
  display: flex;
  flex-direction: column;
  align-items: center;
}

section {
  border-bottom: solid black 1px;
  width: 100%;
}
</style>
