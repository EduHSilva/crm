<script setup>
const { locale, setLocale } = useI18n()

const localeOptions = [
  { value: 'pt', label: '🇧🇷 Português' },
  { value: 'en', label: '🇺🇸 English' }
]
</script>

<template>
  <UHeader class="bg-light dark:bg-dark">
    <template #left>
      <NuxtLink to="/">
        <img
          src="/images/logo.png"
          alt="logo"
          class="w-40 dark:invert-100 dark:grayscale"
        >
      </NuxtLink>
    </template>

    <template #right>
      <UColorModeButton />
      <USelect
        v-model="locale"
        :items="localeOptions"
        option-attribute="label"
        value-attribute="value"
        size="sm"
        @update:model-value="setLocale($event)"
      />

      <UButton
        to="/login"
        class="bg-primary dark:bg-primary-dark"
      >
        {{ $t('landingPage.login') }}
      </UButton>
      <UButton
        to="/login"
        variant="outline"
      >
        {{ $t('landingPage.register') }}
      </UButton>
    </template>
  </UHeader>
</template>
