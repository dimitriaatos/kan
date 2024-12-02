// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  fonts: {
    families: [{ name: "Satoshi", provider: "fontshare", weights: [300] }],
    defaults: {
      fallbacks: {
        monospace: ["Tahoma"],
      },
    },
  },
  modules: ["@nuxt/fonts", "@unocss/nuxt"],
});
