<script setup lang="ts">
import { h, ref } from 'vue'
import SideBar from '~/components/SideBar.vue'
import ClientModal from '~/components/modais/ClientModal.vue'
import type { TableColumn } from '#ui/components/Table.vue'
import { getPaginationRowModel } from '@tanstack/vue-table'
import { UBadge, UButton } from '#components'
import type { Client } from '~/utils/types'

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
const data = ref<Client[]>(response.data.items || [])
let totalItems = response.data.total || 0
const statusFilter = [
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
  NEW: 'neutral'
} as const

const columns: TableColumn<Client>[] = [
  { accessorKey: 'name', header: $t('client.name') },
  { accessorKey: 'email', header: $t('client.email') },
  { accessorKey: 'phone', header: $t('client.phone') },
  {
    accessorKey: 'status',
    header: $t('client.status'),
    cell: ({ row }) => {
      const v = row.getValue('status') as keyof typeof status
      return h(
        UBadge,
        { class: 'capitalize', variant: 'subtle', color: status[v] },
        () => $t(v.toLowerCase())
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

function editClient(row: Client) {
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
      description: 'ok',
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
    <div class="flex-1 p-10 pr-12">
      <div class="flex justify-between mb-5">
        <h1 class="font-bold font-title text-2xl">
          {{ $t('client.manage') }}
        </h1>

        <UButton
          :label="$t('newClient')"
          class="bg-primary dark:bg-primary-dark"
          @click="showNewClient"
        />
      </div>

      <UPageCard>
        <div class="grid grid-cols-2 gap-4">
          <UInput
            v-model="search"
            icon="i-lucide-search"
            :placeholder="$t('client.search')"
            @change="refreshClients"
          />
          <UInputMenu
            v-model="filter"
            icon="i-lucide-filter"
            :placeholder="$t('client.filter')"
            :items="statusFilter"
            value-key="id"
            @change="refreshClients"
          />
        </div>
      </UPageCard>

      <div class="mt-10">
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
