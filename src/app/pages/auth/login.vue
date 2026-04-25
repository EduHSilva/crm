<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent, AuthFormField } from '@nuxt/ui'
import { useUser } from '~/plugins/userService'
import { getTokenCookie } from '~/utils/util'

const toast = useToast()

const fields: AuthFormField[] = [{
  name: 'email',
  type: 'email',
  label: $t('email'),
  placeholder: $t('enterEmail'),
  required: true
}, {
  name: 'password',
  label: $t('password'),
  type: 'password',
  placeholder: $t('enterPassword'),
  required: true
}, {
  name: 'remember',
  label: $t('rememberMe'),
  type: 'checkbox'
}]

const providers = [{
  label: $t('auth.google'),
  icon: 'i-simple-icons-google',
  onClick: () => {}
}, {
  label: $t('auth.github'),
  icon: 'i-simple-icons-github',
  onClick: () => {}
}]

const schema = z.object({
  email: z.email($t('errors.invalidEmail')),
  password: z.string($t('errors.required')).min(8, $t('errors.passwordRules'))
})

type Schema = z.output<typeof schema>

async function onSubmit(payload: FormSubmitEvent<Schema>) {
  const { $userService } = useNuxtApp()
  try {
    const data = await $userService.login(payload.data.email, payload.data.password)
    if (!data) {
      toast.add({
        title: $t('attention'),
        description: $t('errors.loginError'),
        icon: 'i-lucide-alert-triangle',
        color: 'error'
      })
    } else {
      const token = getTokenCookie()
      token.value = { token: data.data.token }
      useUser().value = data.data
      navigateTo('/dashboard')
    }
  } catch (e) {
    console.error(e)
    toast.add({
      title: $t('attention'),
      description: $t('errors.loginError'),
      icon: 'i-lucide-alert-triangle',
      color: 'error'
    })
  }
}
</script>

<template>
  <div class="mx-auto grid min-h-[calc(100vh-12rem)] w-full max-w-6xl items-center gap-6 px-4 py-8 lg:grid-cols-2">
    <UCard class="order-2 lg:order-1 bg-cards dark:bg-cards-dark">
      <template #header>
        <h2 class="font-title text-xl font-bold md:text-2xl">
          {{ $t('auth.loginPanelTitle') }}
        </h2>
      </template>

      <p class="text-sm text-muted">
        {{ $t('auth.loginPanelDescription') }}
      </p>

      <div class="mt-4 space-y-3">
        <div class="rounded-lg border border-default p-3">
          <p class="text-sm font-medium">
            {{ $t('auth.panelPointOneTitle') }}
          </p>
          <p class="mt-1 text-sm text-muted">
            {{ $t('auth.panelPointOneDescription') }}
          </p>
        </div>
        <div class="rounded-lg border border-default p-3">
          <p class="text-sm font-medium">
            {{ $t('auth.panelPointTwoTitle') }}
          </p>
          <p class="mt-1 text-sm text-muted">
            {{ $t('auth.panelPointTwoDescription') }}
          </p>
        </div>
        <div class="rounded-lg border border-default p-3">
          <p class="text-sm font-medium">
            {{ $t('auth.panelPointThreeTitle') }}
          </p>
          <p class="mt-1 text-sm text-muted">
            {{ $t('auth.panelPointThreeDescription') }}
          </p>
        </div>
      </div>
    </UCard>

    <UPageCard class="order-1 w-full max-w-md justify-self-center border-default lg:order-2">
      <UAuthForm
        :schema="schema"
        :fields="fields"
        :providers="providers"
        :title="$t('login')"
        :description="$t('auth.loginSubtitle')"
        :submit="{ label: $t('login') }"
        :separator="$t('or')"
        icon="i-lucide-lock"
        @submit="onSubmit"
      >
        <template #description>
          {{ $t('dontHaveAccount') }}
          <ULink
            to="/auth/register"
            class="text-primary font-medium"
          >
            {{ $t('register') }}
          </ULink>
        </template>

        <template #password-hint>
          <ULink
            to="#"
            class="text-primary font-medium"
            tabindex="-1"
          >
            {{ $t('forgotPassword') }}
          </ULink>
        </template>
      </UAuthForm>
    </UPageCard>
  </div>
</template>
