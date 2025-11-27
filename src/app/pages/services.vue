<script setup lang="ts">
import SideBar from '~/components/SideBar.vue'
import NewClientModal from '~/components/modais/NewClientModal.vue'
import NewServiceModal from '~/components/modais/NewServiceModal.vue'

const items = ref(['Todo', 'In Progress', 'Done'])
const value = ref('')

const clients = await $fetch('/api/clients')
const data = ref(clients)
</script>

<template>
  <div>
    <div class="flex min-h-screen overflow-hidden">
      <SideBar active="services" />
      <div class="flex-1 p-10 pr-50">
        <div class="flex justify-between mb-5">
          <div class="font-bold font-title text-2xl">
            {{ $t('service.manage') }}
          </div>
          <div>
            <NewServiceModal />
          </div>
        </div>

        <UPageCard>
          <div class="grid grid-cols-2 gap-4 ">
            <UInputMenu
              v-model="value"
              icon="i-lucide-search"
              size="md"
              :items="items"
              :placeholder="$t('service.search')"
            />
            <UInputMenu
              v-model="value"
              icon="i-lucide-filter"
              size="md"
              :items="items"
              :placeholder="$t('service.filter')"
            />
          </div>
        </UPageCard>

        <div class="mt-10">
          <UEmpty
            v-if="data.length == 0"
            icon="i-lucide-axe"
            :title="$t('service.noData')"
            :description="$t('service.noDataDescription')"
          >
            <template #footer>
              <NewServiceModal />
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
