<script setup>
import { useUser } from '~/plugins/userService.ts'

const { locale, setLocale } = useI18n()

const localeOptions = [
  { value: 'pt', label: '🇧🇷 Português' },
  { value: 'en', label: '🇺🇸 English' }
]
const logged = useUser().value != null
let namePage = useRoute().name
if (!namePage) {
  namePage = 'dashboard'
}
</script>

<template>
  <UHeader>
    <template #left>
      <NuxtLink
        v-if="!logged"
        to="/"
      >
        <img
          src="/images/logo.png"
          alt="logo"
          class="w-40 dark:invert-100 dark:grayscale"
        >
      </NuxtLink>
      <div
        v-if="logged"
        class="font-bold"
      >
        {{ $t(namePage) }}
      </div>
    </template>

    <template #right>
      <UColorModeSwitch />
      <USelect
        v-model="locale"
        :items="localeOptions"
        option-attribute="label"
        value-attribute="value"
        size="sm"
        @update:model-value="setLocale($event)"
      />

      <UButton
        v-if="!logged"
        to="/login"
        class="bg-primary dark:bg-primary-dark"
      >
        {{ $t('login') }}
      </UButton>
      <UButton
        v-if="!logged"
        to="/register"
        variant="outline"
      >
        {{ $t('register') }}
      </UButton>
    </template>
  </UHeader>
</template>
