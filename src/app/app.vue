<script setup>
import CustomHeader from "~/components/CustomHeader.vue";

useHead({
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' }
  ],
  link: [
    { rel: 'icon', href: '/favicon.ico' }
  ],
  htmlAttrs: {
    lang: 'pt/br'
  }
})

const title = 'Kontrol'
const description = 'A custom Customer Relationship Management (CRM) for clients management.'

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description
})
</script>

<template>
  <UApp class="bg-light dark:bg-dark">
    <CustomHeader />
    <UMain>
      <NuxtPage class="bg-light dark:bg-dark" />
    </UMain>
    <CustomFooter />
  </UApp>
</template>
