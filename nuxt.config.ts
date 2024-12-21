// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      meta: [
        { property: 'og:type', content: 'website' },
        { property: 'og:title', content: "The Motherfucking Bearodactyl" },
        { property: 'og:image', content: '~/assets/images/bearodactyl_painting.jpg' },
        { property: 'og:description', content: 'rabies' },
      ]
    }
  },
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss'],
  css: ['~/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
})