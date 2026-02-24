<script setup>
import { useUser } from '~/plugins/userService.ts'

const { locale, setLocale } = useI18n()

const localeOptions = [
  { value: 'pt', label: '🇧🇷 Português' },
  { value: 'en', label: '🇺🇸 English' }
]
const router = useRouter()

const handleLogout = () => {
  useUser().value = null
  router.push('/')
}
</script>

<template>
  <UHeader class="print:hidden">
    <template #left>
      <NuxtLink
        :to="useUser().value ? '/dashboard' : '/'"
      >
        <img
          src="/images/logo.png"
          alt="logo"
          class="w-30 dark:invert-100 dark:grayscale"
        >
      </NuxtLink>
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
        v-if="!useUser().value"
        to="/auth/login"
        class="bg-primary dark:bg-primary-dark"
      >
        {{ $t('login') }}
      </UButton>
      <UButton
        v-if="!useUser().value"
        to="/auth/register"
        variant="outline"
      >
        {{ $t('register') }}
      </UButton>

      <UButton
        v-if="useUser().value != null"
        class="bg-primary dark:bg-primary-dark"
        @click="handleLogout"
      >
        {{ $t('logout') }}
      </UButton>
    </template>
  </UHeader>
</template>
