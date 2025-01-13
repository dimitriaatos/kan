import { createDirectus, graphql, staticToken } from "@directus/sdk";
import type { Schema } from "~/schema";

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();

  const directus = createDirectus<Schema>(config.public.NUXT_PUBLIC_CMS_URI)
    .with(graphql())
    .with(staticToken(config.public.NUXT_PUBLIC_CMS_TOKEN));

  return {
    provide: { directus },
  };
});
