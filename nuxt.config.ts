// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: 'The Motherfucking Bearodactyl',
      meta: [
        { property: 'og:type', content: 'website' },
        { property: 'og:title', content: 'The Motherfucking Bearodactyl' },
        { property: 'og:image', content: 'https://github.com/TheBearodactyl/bearodactyl.dev/raw/refs/heads/main/assets/images/bearodactyl_painting.jpg' },
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height', content: '630' },
        { property: 'og:description', content: 'rabies' },
        { name: 'twitter:title', content: 'The Motherfucking Bearodactyl' },
        { name: 'twitter:image', content: 'https://github.com/TheBearodactyl/bearodactyl.dev/raw/refs/heads/main/assets/images/bearodactyl_painting.jpg' }
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