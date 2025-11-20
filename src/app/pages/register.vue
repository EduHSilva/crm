<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent, AuthFormField } from '@nuxt/ui'

const fields: AuthFormField[] = [{
  name: 'email',
  type: 'email',
  label: $t('email'),
  placeholder: $t('enterEmail'),
  required: true
}, {
  name: 'username',
  label: $t('username'),
  type: 'text',
  placeholder: $t('enterUsername'),
  required: true
}, {
  name: 'password',
  label: $t('password'),
  type: 'password',
  placeholder: $t('enterPassword'),
  required: true
}]

const providers = [{
  label: 'Google',
  icon: 'i-simple-icons-google',
  onClick: () => {
  }
}, {
  label: 'GitHub',
  icon: 'i-simple-icons-github',
  onClick: () => {

  }
}]

const schema = z.object({
  email: z.email($t('errors.invalidEmail')),
  password: z.string($t('errors.required')).min(8, $t('errors.passwordRules'))
})

type Schema = z.output<typeof schema>

function onSubmit(payload: FormSubmitEvent<Schema>) {
  console.log(payload)
}
</script>

<template>
  <div class="flex flex-col items-center justify-center gap-4 p-4">
    <UPageCard class="w-full max-w-md">
      <UAuthForm
        :schema="schema"
        :fields="fields"
        :providers="providers"
        :title="$t('register')"
        icon="i-lucide-lock"
        :submit="{ label: $t('register') }"
        :separator="$t('or')"
        @submit="onSubmit"
      >
        <template #description>
          {{ $t('haveAccount') }}
          <ULink
            to="/login"
            class="text-primary font-medium"
          > {{ $t('login') }}
          </ULink>
        </template>
      </UAuthForm>
    </UPageCard>
  </div>
</template>
