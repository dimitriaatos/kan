<template>
  <div class="center-column">
    <AboutSection :condition="about.about !== null" title="About">
      <div v-html="about.about" />
    </AboutSection>
    <AboutSection :condition="about.news !== null" title="News">
      <div v-html="about.news" />
    </AboutSection>
    <AboutSection :condition="about.awards.length > 0" title="Awards">
      <AboutRecord :records="about.awards" />
    </AboutSection>
    <AboutSection
      :condition="about.publications.length > 0"
      title="Publications"
    >
      <AboutRecord :records="about.publications" />
    </AboutSection>
    <!-- <section v-if="about.collaborators.length > 0">
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
    </section> -->
    <AboutSection :condition="about.contact !== null" title="Contact">
      <div v-html="about.contact"></div>
    </AboutSection>
  </div>
</template>

<script lang="ts" setup>
import { z } from "zod";
import { prependAssetURI, TITLE } from "~/assets/common";
import { aboutQuery, aboutSchema } from "~/schema";

const { $directus } = useNuxtApp();

const { data } = await useAsyncData("about", () => {
  return $directus.query(aboutQuery);
});

const about = computed(() => {
  return z.object({ about: aboutSchema }).parse(data.value).about;
});

useHead({
  title: `About | ${TITLE}`,
});
</script>

<style scoped>
.center-column,
.center-column > section {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
