<script setup lang="ts">
import SideBar from '~/components/SideBar.vue'

const items = ref(['Backlog', 'Todo', 'In Progress', 'Done'])
const value = ref('Backlog')

let clients = await $fetch('/api/clients')
const data = ref(clients)
</script>

<template>
  <div class="flex min-h-screen overflow-hidden">
    <SideBar active="clients" />
    <div class="flex-1 p-10 pr-50">
      <div class="flex justify-between mb-5">
        <div class="font-bold font-title text-2xl">
          {{ $t('managerUsers') }}
        </div>
        <div>
          <UButton
            to="/clients/new"
            class="bg-primary dark:bg-primary-dark m-2"
          >
            {{ $t('newClient') }}
          </UButton>
        </div>
      </div>

      <UPageCard>
        <div class="grid grid-cols-2 gap-4 ">
          <UInputMenu
            v-model="value"
            icon="i-lucide-search"
            size="md"
            :items="items"
          />
          <UInputMenu
            v-model="value"
            icon="i-lucide-filter"
            size="md"
            :items="items"
          />
        </div>
      </UPageCard>

      <div class="mt-10">
        <UEmpty
          v-if="data.length == 0"
          icon="i-lucide-file"
          title="No projects found"
          description="It looks like you haven't added any projects. Create one to get started."
          :actions="[
            {
              icon: 'i-lucide-plus',
              label: 'Create new'
            },
            {
              icon: 'i-lucide-refresh-cw',
              label: 'Refresh',
              color: 'neutral',
              variant: 'subtle'
            }
          ]"
        />
        <UTable
          v-else
          :data="data"
          class="flex-1"
        />
      </div>
    </div>
  </div>
</template>
