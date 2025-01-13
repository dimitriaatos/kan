// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  experimental: {
    payloadExtraction: true,
  },
  ssr: true,
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ["/"],
    },
  },
  runtimeConfig: {
    public: {
      NUXT_PUBLIC_CMS_TOKEN: process.env.NUXT_PUBLIC_CMS_TOKEN,
      NUXT_PUBLIC_CMS_URI: process.env.NUXT_PUBLIC_CMS_URI,
    },
  },
  fonts: {
    families: [{ name: "Satoshi", provider: "fontshare", weights: [300] }],
    defaults: {
      fallbacks: {
        monospace: ["Tahoma"],
      },
    },
  },
  modules: ["@nuxt/fonts", "@unocss/nuxt", "@pinia/nuxt"],
});
