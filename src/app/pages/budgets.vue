<script setup lang="ts">
import SideBar from '~/components/SideBar.vue'
import NewClientModal from '~/components/modais/NewClientModal.vue'
import NewBudgeModal from '~/components/modais/NewBudgeModal.vue'

const items = ref(['Todo', 'In Progress', 'Done'])
const value = ref('')

const clients = await $fetch('/api/clients')
const data = ref(clients)
</script>

<template>
  <div>
    <div class="flex min-h-screen overflow-hidden">
      <SideBar active="budgets" />
      <div class="flex-1 p-10 pr-50">
        <div class="flex justify-between mb-5">
          <div class="font-bold font-title text-2xl">
            {{ $t('budget.manage') }}
          </div>
          <div>
            <NewBudgeModal />
          </div>
        </div>

        <UPageCard>
          <UInputMenu
            v-model="value"
            icon="i-lucide-search"
            size="md"
            class="w-full"
            :items="items"
            :placeholder="$t('budget.search')"
          />
        </UPageCard>

        <div class="mt-10">
          <UEmpty
            v-if="data.length == 0"
            icon="i-lucide-notebook"
            :title="$t('budget.noData')"
            :description="$t('budget.noDataDescription')"
          >
            <template #footer>
              <NewBudgeModal />
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
