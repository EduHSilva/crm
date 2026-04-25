<script setup lang="ts">
import { computed, h, ref } from 'vue'
import SideBar from '~/components/SideBar.vue'
import ClientModal from '~/components/modais/ClientModal.vue'
import { getPaginationRowModel } from '@tanstack/vue-table'
import type { ColumnDef } from '@tanstack/vue-table'
import { UBadge, UButton } from '#components'
import type { Client } from '~/utils/types'

type ClientStatus = 'NEW' | 'WORKING' | 'DONE'
type ClientRow = Client & { status?: ClientStatus }

const search = ref('')
const filter = ref('')
const table = useTemplateRef('table')
const pagination = ref({
  pageIndex: 0,
  pageSize: 10
})
const { $clientService } = useNuxtApp()
const toast = useToast()

const response = await $clientService.find(pagination.value.pageIndex, null, null)
const data = ref<ClientRow[]>(response.data.items || [])
let totalItems = response.data.total || 0
const statusFilter = [
  {
    label: $t('client.filterAll'),
    id: ''
  },
  {
    label: $t('client.new'),
    id: 'NEW'
  },
  {
    label: $t('client.working'),
    id: 'WORKING'
  },
  {
    label: $t('client.done'),
    id: 'DONE'
  }
]

const modalRef = ref<InstanceType<typeof ClientModal> | null>(null)

const edit = ref(false)
const selectedClient = ref<Client | null>(null)
function openModal() {
  modalRef.value?.openModal()
}

function refreshClients() {
  $clientService.find(pagination.value.pageIndex, search.value, filter.value).then((res) => {
    totalItems = res.data.total ?? 0
    data.value = res.data.items
  })
}

const status = {
  NEW: 'neutral',
  WORKING: 'warning',
  DONE: 'success'
} as const

const cardsCount = computed(() => data.value.length)
const newCount = computed(() =>
  data.value.filter(client => client.status === 'NEW').length
)
const workingCount = computed(() =>
  data.value.filter(client => client.status === 'WORKING').length
)
const doneCount = computed(() =>
  data.value.filter(client => client.status === 'DONE').length
)

const quickFilterItems = [
  { label: $t('client.filterAll'), id: '' },
  { label: $t('client.new'), id: 'NEW' },
  { label: $t('client.working'), id: 'WORKING' },
  { label: $t('client.done'), id: 'DONE' }
]

function setStatusFilter(statusId: string) {
  filter.value = statusId
  refreshClients()
}

function clearFilters() {
  search.value = ''
  filter.value = ''
  refreshClients()
}

function statusLabel(value: ClientStatus) {
  if (value === 'WORKING') return $t('client.working')
  if (value === 'DONE') return $t('client.done')
  return $t('client.new')
}

const columns: ColumnDef<ClientRow>[] = [
  { accessorKey: 'name', header: $t('client.name') },
  { accessorKey: 'email', header: $t('client.email') },
  { accessorKey: 'phone', header: $t('client.phone') },
  {
    accessorKey: 'status',
    header: $t('client.status'),
    cell: ({ row }) => {
      const rawStatus = (row.getValue('status') as ClientStatus) || 'NEW'
      const v = (rawStatus in status ? rawStatus : 'NEW') as keyof typeof status
      return h(
        UBadge,
        { class: 'capitalize', variant: 'subtle', color: status[v] },
        () => statusLabel(rawStatus)
      )
    }
  },
  { accessorKey: 'observations', header: $t('client.observations') },
  {
    id: 'actions',
    cell: ({ row }) =>
      h(
        'div',
        { class: 'flex justify-end space-x-2' },
        [
          h(UButton, {
            icon: 'i-lucide-pencil',
            color: 'primary',
            variant: 'ghost',
            onClick: () => editClient(row.original)
          }),
          h(UButton, {
            icon: 'i-lucide-trash',
            color: 'error',
            variant: 'ghost',
            onClick: () => deleteClient(row.original.id || '')
          })
        ]
      )
  }
]

function editClient(row: ClientRow) {
  selectedClient.value = { ...row }
  edit.value = true
  openModal()
}

function showNewClient() {
  selectedClient.value = null
  edit.value = false
  openModal()
}

function deleteClient(id: string) {
  $clientService.delete(id).then(() => {
    toast.add({
      title: $t('attention'),
      description: $t('client.deleted'),
      icon: 'i-lucide-alert-triangle',
      color: 'error'
    })
    refreshClients()
  })
}
</script>

<template>
  <div class="flex min-h-screen overflow-hidden">
    <SideBar active="clients" />

    <div class="flex-1 p-8 pr-12 md:p-10 md:pr-12">
      <div class="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 class="font-bold font-title text-2xl md:text-3xl">
            {{ $t('clients') }}
          </h1>
          <p class="mt-1 max-w-2xl text-sm text-muted">
            {{ $t('client.manage') }}
          </p>
        </div>

        <div class="flex items-center gap-2">
          <UButton
            icon="i-lucide-refresh-cw"
            color="neutral"
            variant="outline"
            :label="$t('common.refresh')"
            @click="refreshClients"
          />
          <UButton
            icon="i-lucide-filter-x"
            color="neutral"
            variant="outline"
            :label="$t('common.clearFilters')"
            @click="clearFilters"
          />
          <UButton
            :label="$t('newClient')"
            icon="i-lucide-plus"
            class="bg-primary dark:bg-primary-dark"
            @click="showNewClient"
          />
        </div>
      </div>

      <UPageGrid class="mb-5">
        <UPageCard
          :title="$t('client.totalLoaded')"
          :description="`${cardsCount} ${$t('client.items')}`"
          icon="i-lucide-users"
        />
        <UPageCard
          :title="$t('client.new')"
          :description="`${newCount} ${$t('client.items')}`"
          icon="i-lucide-user-plus"
        />
        <UPageCard
          :title="$t('client.working')"
          :description="`${workingCount} ${$t('client.items')}`"
          icon="i-lucide-hourglass"
        />
        <UPageCard
          :title="$t('client.done')"
          :description="`${doneCount} ${$t('client.items')}`"
          icon="i-lucide-check-circle-2"
        />
      </UPageGrid>

      <UCard>
        <div class="grid gap-4 md:grid-cols-2">
          <UInput
            v-model="search"
            icon="i-lucide-search"
            :placeholder="$t('client.search')"
            @change="refreshClients"
          />
          <USelectMenu
            v-model="filter"
            icon="i-lucide-filter"
            :placeholder="$t('client.filter')"
            :items="statusFilter"
            value-key="id"
            @change="refreshClients"
          />
        </div>

        <div class="mt-3 flex flex-wrap gap-2">
          <UButton
            v-for="item in quickFilterItems"
            :key="item.id || 'ALL'"
            size="xs"
            color="neutral"
            :variant="filter === item.id ? 'solid' : 'soft'"
            @click="setStatusFilter(item.id)"
          >
            {{ item.label }}
          </UButton>
        </div>
      </UCard>

      <div class="mt-6">
        <UEmpty
          v-if="!data?.length"
          icon="i-lucide-user"
          :title="$t('client.noData')"
          :description="$t('client.noDataDescription')"
        >
          <template #footer>
            <UButton
              :label="$t('newClient')"
              class="bg-primary dark:bg-primary-dark"
              @click="showNewClient"
            />
          </template>
        </UEmpty>

        <UTable
          v-else
          ref="table"
          v-model:pagination="pagination"
          :columns="columns"
          :data="data"
          :pagination-options="{ getPaginationRowModel: getPaginationRowModel() }"
        />

        <div class="flex justify-end border-t border-default pt-4 px-4">
          <UPagination
            :page="(table?.tableApi?.getState().pagination.pageIndex || 0) + 1"
            :items-per-page="table?.tableApi?.getState().pagination.pageSize"
            :total="totalItems"
            @update:page="(p) => table?.tableApi?.setPageIndex(p - 1)"
          />
        </div>
      </div>
    </div>
    <ClientModal
      ref="modalRef"
      :client="selectedClient"
      :mode="edit ? 'edit' : 'create'"
      @saved="refreshClients"
    />
  </div>
</template>
