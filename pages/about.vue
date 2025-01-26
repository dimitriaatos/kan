<template>
  <div class="center-column">
    <AboutSection :condition="about.about !== null" title="About">
      <div v-html="about.about" />
    </AboutSection>
    <AboutSection :condition="about.news !== null" title="News">
      <div v-html="about.news" />
    </AboutSection>
    <AboutSection :condition="about.awards !== null" title="Awards">
      <div v-html="about.awards" />
    </AboutSection>
    <AboutSection :condition="about.publications !== null" title="Publications">
      <div v-html="about.publications" />
    </AboutSection>
    <section v-if="about.collaborators.length > 0" class="collaborators-parent">
      <h2>Collaborators</h2>
      <div class="collaborators">
        <div
          v-for="collaborator in [
            ...about.collaborators,
            ...about.collaborators,
            ...about.collaborators,
          ]"
          :key="collaborator.collaborators_id.id"
          class="collaborator"
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
            <h3>{{ collaborator.collaborators_id.name }}</h3>
          </ConditionalLink>
          <div v-html="collaborator.collaborators_id.description" />
        </div>
      </div>
    </section>
    <AboutSection :condition="about.contact !== null" title="Contact">
      <div v-html="about.contact"></div>
    </AboutSection>
  </div>
</template>

<script lang="ts" setup>
import { z } from "zod";
import { getPageTitle, prependAssetURI } from "~/assets/common";
import { aboutQuery, aboutSchema } from "~/schema";

const { $directus } = useNuxtApp();

const { data } = await useAsyncData("about", () => {
  return $directus.query(aboutQuery);
});

const about = computed(() => {
  return z.object({ about: aboutSchema }).parse(data.value).about;
});

useHead({
  title: getPageTitle("About"),
});
</script>

<style scoped>
.center-column,
.center-column > section {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.collaborators-parent {
  border-bottom: solid black 1px;
  width: 100%;
  padding: 1em 0;
}

.collaborators-parent h2 {
  padding-bottom: 1em;
}

.collaborators {
  display: grid;
  grid-template-rows: fit-content(8ch);
  grid-template-columns: repeat(auto-fill, minmax(10em, 1fr));
  grid-gap: var(--padding);
  justify-content: center;
  align-items: start;
  width: 100%;
}

@media (min-width: calc(calc(10em * 3) + 4em)) {
  .collaborators {
    grid-template-columns: repeat(3, minmax(10em, 1fr));
  }
}

.collaborator {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.collaborators img {
  display: block;
  aspect-ratio: 1/1;
  width: 10em;
  object-fit: contain;
}

.collaborator h3 {
  text-align: center;
  padding: 1em;
}
</style>
