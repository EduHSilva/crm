<script setup lang="ts">
import { reactive } from 'vue'
import { z } from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'
import type { Client } from '~/utils/types'

const props = defineProps<{
  client: Client | null
  mode?: 'create' | 'edit'
}>()

const emit = defineEmits<{
  (e: 'submitted', data: Client | { observations: string }): void
}>()

// ------------------
// ZOD SCHEMA
// ------------------
const schema = z.object({
  name: z.string().min(1, { message: $t('errors.required') }),
  email: z.email({ message: $t('errors.invalidEmail') }),
  phone: z.string().min(1, { message: $t('errors.required') }),
  observations: z.string().optional()
})

type Schema = z.infer<typeof schema>

// ------------------
// STATE
// ------------------
const state = reactive<Schema>({
  name: props.client?.name || '',
  email: props.client?.email || '',
  phone: props.client?.phone || '',
  observations: props.client?.observations || ''
})

function onSubmit(event: FormSubmitEvent<Schema>) {
  if (props.mode === 'edit' && props.client?.id) {
    emit('submitted', { observations: event.data.observations || '' })
  } else {
    emit('submitted', {
      name: event.data.name,
      email: event.data.email,
      phone: event.data.phone,
      observations: event.data.observations || ''
    })
  }
}
</script>

<template>
  <UForm
    :schema="schema"
    :state="state"
    class="space-y-6"
    @submit="onSubmit"
  >
    <UFormField
      :label="$t('client.name')"
      name="name"
    >
      <UInput
        v-model="state.name"
        icon="i-lucide-user"
        placeholder="Ex: Maria Silva"
        class="w-full"
      />
    </UFormField>

    <UFormField
      :label="$t('client.email')"
      name="email"
    >
      <UInput
        v-model="state.email"
        icon="i-lucide-mail"
        placeholder="email@exemplo.com"
        class="w-full"
      />
    </UFormField>

    <UFormField
      :label="$t('client.phone')"
      name="phone"
    >
      <UInput
        v-model="state.phone"
        icon="i-lucide-phone"
        placeholder="(11) 99999-9999"
        class="w-full"
      />
    </UFormField>

    <UFormField
      :label="$t('client.observations')"
      name="observations"
    >
      <UTextarea
        v-model="state.observations"
        placeholder="Notas sobre o cliente..."
        autoresize
        :rows="3"
        class="w-full"
      />
    </UFormField>

    <slot />
  </UForm>
</template>
