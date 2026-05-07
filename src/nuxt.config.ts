// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/ui',
    '@nuxtjs/i18n',
    '@vite-pwa/nuxt'
  ],

  devtools: {
    enabled: true
  },

  css: ['~/assets/css/main.css'],
  runtimeConfig: {
    public: {
      apiUrl: process.env.NUXT_PUBLIC_API_URL,
      googleClientId: process.env.NUXT_PUBLIC_GOOGLE_CLIENT_ID
    }
  },

  routeRules: {
    '/': { prerender: true }
  },

  compatibilityDate: '2025-01-15',

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  },

  i18n: {
    defaultLocale: 'pt',
    locales: [
      { code: 'en', name: 'English', file: 'en.json' },
      { code: 'pt', name: 'Pt', file: 'pt.json' }
    ],
    strategy: 'no_prefix',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root'
    }
  },

  pwa: {
    registerType: 'autoUpdate',
    includeAssets: ['favicon.ico', 'apple-touch-icon.png'],
    manifest: {
      name: 'EHS Solutions • EHS Kontrol',
      short_name: 'EHS Kontrol',
      description: 'EHS Solutions platform for clients, budgets, kanban and reminders.',
      theme_color: '#0284C7',
      background_color: '#F8FAFC',
      display: 'standalone',
      orientation: 'portrait',
      scope: '/',
      start_url: '/dashboard',
      icons: [
        {
          src: '/icons/pwa-192x192.png',
          sizes: '192x192',
          type: 'image/png'
        },
        {
          src: '/icons/pwa-512x512.png',
          sizes: '512x512',
          type: 'image/png'
        },
        {
          src: '/icons/pwa-maskable-512x512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'maskable'
        }
      ]
    },
    devOptions: {
      enabled: true,
      type: 'module'
    },
    workbox: {
      globPatterns: ['**/*.{js,css,html,png,svg,ico,webp,woff2}'],
      navigateFallbackDenylist: [/^\/api\//],
      runtimeCaching: [
        {
          urlPattern: /^https?:\/\/.*\/api\/.*/i,
          handler: 'NetworkOnly',
          method: 'GET'
        },
        {
          urlPattern: /^https?:\/\/.*\/api\/.*/i,
          handler: 'NetworkOnly',
          method: 'POST'
        },
        {
          urlPattern: /^https?:\/\/.*\/api\/.*/i,
          handler: 'NetworkOnly',
          method: 'PUT'
        },
        {
          urlPattern: /^https?:\/\/.*\/api\/.*/i,
          handler: 'NetworkOnly',
          method: 'DELETE'
        }
      ]
    }
  }
})
