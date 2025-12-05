<script setup lang="ts">
import SideBar from '~/components/SideBar.vue'
import NewClientModal from '~/components/modais/NewClientModal.vue'

const items = ref(['Todo', 'In Progress', 'Done'])
const value = ref('')
const { $clientService } = useNuxtApp()

const clients = await $clientService.findClients()
const data = ref(clients.data.items)
</script>

<template>
  <div>
    <div class="flex min-h-screen overflow-hidden">
      <SideBar active="clients" />
      <div class="flex-1 p-10 pr-50">
        <div class="flex justify-between mb-5">
          <div class="font-bold font-title text-2xl">
            {{ $t('client.manage') }}
          </div>
          <div>
            <NewClientModal />
          </div>
        </div>

        <UPageCard>
          <div class="grid grid-cols-2 gap-4 ">
            <UInputMenu
              v-model="value"
              icon="i-lucide-search"
              size="md"
              :items="items"
              :placeholder="$t('client.search')"
            />
            <UInputMenu
              v-model="value"
              icon="i-lucide-filter"
              size="md"
              :items="items"
              :placeholder="$t('client.filter')"
            />
          </div>
        </UPageCard>

        <div class="mt-10">
          <UEmpty
            v-if="data.length == 0"
            icon="i-lucide-user"
            :title="$t('client.noData')"
            :description="$t('client.noDataDescription')"
          >
            <template #footer>
              <NewClientModal />
            </template>
          </UEmpty>
          <UTable
            v-else
            :data="data"
            class="flex-1"
          />
        </div>
      </div>
    </div>
  </div>
</template>
