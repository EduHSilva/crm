<script setup lang="ts">
import type { FormError, FormSubmitEvent } from '@nuxt/ui'

const props = defineProps({
  extraClass: {
    type: String
  }
})

const state = reactive({
  email: undefined,
  password: undefined
})

type Schema = typeof state

function validate(state: Partial<Schema>): FormError[] {
  const errors = []
  if (!state.email) errors.push({ name: 'email', message: 'Required' })
  if (!state.password) errors.push({ name: 'password', message: 'Required' })
  return errors
}

const toast = useToast()
async function onSubmit(event: FormSubmitEvent<Schema>) {
  toast.add({ title: 'Success', description: 'The form has been submitted.', color: 'success' })
  console.log(event.data)
}
</script>

<template>
  <UModal title="Modal with title">
    <UButton
      :label="$t('newClient')"
      class="bg-primary dark:bg-primary-dark"
      :class="props.extraClass"
    />

    <template #body>
      <UForm
        :validate="validate"
        :state="state"
        class="space-y-4"
        @submit="onSubmit"
      >
        <UFormField
          label="Email"
          name="email"
        >
          <UInput v-model="state.email" />
        </UFormField>

        <UFormField
          label="Password"
          name="password"
        >
          <UInput
            v-model="state.password"
            type="password"
          />
        </UFormField>

        <USeparator />
        <UButton type="submit">
          Submit
        </UButton>
      </UForm>
    </template>
  </UModal>
</template>
