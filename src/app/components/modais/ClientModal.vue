<script setup lang="ts">
import { reactive, ref, watch } from 'vue'
import type { FormSubmitEvent } from '@nuxt/ui'
import { z } from 'zod'
import type { Client } from '~/utils/types'

const open = ref(false)

// -------------------------
// PROPS
// -------------------------
const props = defineProps<{
  client: Client | null
  mode?: 'create' | 'edit'
}>()

const emit = defineEmits<{
  (e: 'saved'): void
}>()

// -------------------------
// ZOD SCHEMA
// -------------------------
const schema = z.object({
  name: z.string().min(1, { message: $t('errors.required') }),
  email: z.email({ message: $t('errors.invalidEmail') }),
  phone: z.string().min(1, { message: $t('errors.required') }),
  observations: z.string().optional()
})

type Schema = z.infer<typeof schema>

// -------------------------
// FORM STATE
// -------------------------
const state = reactive<Schema>({
  name: '',
  email: '',
  phone: '',
  observations: ''
})

// -------------------------
// PREENCHE QUANDO ABRE
// -------------------------
watch(
  () => [props.client, open.value],
  ([client, open]) => {
    if (open && client) {
      state.name = props.client?.name || ''
      state.email = props.client?.email || ''
      state.phone = props.client?.phone || ''
      state.observations = props.client?.observations || ''
    }

    if (open && !client) {
      state.name = ''
      state.email = ''
      state.phone = ''
      state.observations = ''
    }
  },
  { immediate: true }
)

const loading = ref(false)
const toast = useToast()

// -------------------------
// SUBMIT
// -------------------------
async function onSubmit(event: FormSubmitEvent<Schema>) {
  const { $clientService } = useNuxtApp()
  loading.value = true

  try {
    let saved

    if (props.mode === 'edit' && props.client?.id) {
      saved = await $clientService.update(
        props.client.id,
        event.data.observations
      )
    } else {
      const client: Client = {
        name: event.data.name,
        email: event.data.email,
        phone: event.data.phone,
        observations: event.data.observations || ''
      }
      saved = await $clientService.add(
        client
      )
    }

    if (!saved) {
      toast.add({
        title: $t('attention'),
        description: $t('errors.saveError'),
        icon: 'i-lucide-alert-triangle',
        color: 'error'
      })
    } else {
      open.value = false
      emit('saved')

      toast.add({
        title: $t('success'),
        description: props.mode === 'edit'
          ? $t('client.updated')
          : $t('client.created'),
        icon: 'i-lucide-check',
        color: 'success'
      })
    }
  } catch (e) {
    console.error(e)
  } finally {
    loading.value = false
  }
}

function closeModal() {
  open.value = false
}

function openModal() {
  open.value = true
}

defineExpose({
  closeModal, openModal
})
</script>

<template>
  <UModal
    v-model:open="open"
    prevent-close
    :title="mode === 'edit' ? $t('client.edit') : $t('client.new')"
  >
    <template #body>
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

        <USeparator />

        <UButton
          type="submit"
          block
          :loading="loading"
          class="bg-primary dark:bg-primary-dark"
        >
          {{ mode === 'edit' ? $t('update') : $t('save') }}
        </UButton>
      </UForm>
    </template>
  </UModal>;
</template>
