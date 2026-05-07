<script setup>
import CustomHeader from '~/components/CustomHeader.vue'

useHead({
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { name: 'theme-color', content: '#0284C7' },
    { name: 'apple-mobile-web-app-capable', content: 'yes' },
    { name: 'apple-mobile-web-app-status-bar-style', content: 'default' },
    { name: 'google-signin-client_id', content: '955111681226-htvif7bd6os7fd84jl4ucae21fh0phh3.apps.googleusercontent.com' }

  ],
  link: [
    { rel: 'icon', href: '/favicon.ico' },
    { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' }
  ],
  htmlAttrs: {
    lang: 'pt-BR'
  }
})

const title = 'EHS Kontrol'
const description = 'EHS Kontrol by EHS Solutions: platform for clients, budgets, kanban and reminders.'

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description
})
</script>

<template>
  <div>
    <CustomHeader />
    <NuxtPage />
    <footer class="border-t border-default px-4 py-3 text-sm text-muted">
      EHS Solutions • EHS Kontrol • © {{ new Date().getFullYear() }}
    </footer>
  </div>
</template>
