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
        :title="$t('login')"
        :submit="{ label: $t('login') }"
        :separator="$t('or')"
        icon="i-lucide-lock"
        @submit="onSubmit"
      >
        <template #description>
          {{ $t('dontHaveAccount') }}
          <ULink
            to="/register"
            class="text-primary font-medium"
          > {{ $t('register') }}
          </ULink>
        </template>
        <template #password-hint>
          <ULink
            to="#"
            class="text-primary font-medium"
            tabindex="-1"
          >{{ $t('forgotPassword') }}
          </ULink>
        </template>
      </UAuthForm>
    </UPageCard>
  </div>
</template>
