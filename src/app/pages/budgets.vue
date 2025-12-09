<script setup lang="ts">
import { h, ref } from 'vue'
import SideBar from '~/components/SideBar.vue'
import type { TableColumn } from '#ui/components/Table.vue'
import { getPaginationRowModel } from '@tanstack/vue-table'
import { UBadge, UButton } from '#components'
import BudgetModal from '~/components/modais/BudgetModal.vue'

const search = ref('')
const filter = ref('')
const table = useTemplateRef('table')
const pagination = ref({
  pageIndex: 0,
  pageSize: 10
})
const { $budgetService } = useNuxtApp()
const toast = useToast()

const response = await $budgetService.find(pagination.value.pageIndex, null, null)
const data = ref<Budget[]>(response.data.items || [])
let totalItems = response.data.total || 0
const statusFilter = [
  {
    label: $t('budget.draft'),
    id: 'DRAFT'
  },
  {
    label: $t('budget.send'),
    id: 'SEND'
  },
  {
    label: $t('budget.waiting'),
    id: 'WAITING'
  },
  {
    label: $t('budget.approved'),
    id: 'APPROVED'
  },
  {
    label: $t('budget.working'),
    id: 'WORKING'
  },
  {
    label: $t('budget.done'),
    id: 'DONE'
  },
  {
    label: $t('budget.cancel'),
    id: 'CANCEL'
  },
  {
    label: $t('budget.deny'),
    id: 'DENY'
  },
  {
    label: $t('budget.deleted'),
    id: 'DELETED'
  }
]

const modalRef = ref<InstanceType<typeof BudgetModal> | null>(null)

const edit = ref(false)
const selectedBudget = ref<Budget | null>(null)

function openModal() {
  modalRef.value?.openModal()
}

function refresh() {
  $budgetService.find(pagination.value.pageIndex, search.value, filter.value).then((res) => {
    totalItems = res.data.total ?? 0
    data.value = res.data.items
  })
}

const status = {
  NEW: 'neutral'
} as const

const columns: TableColumn<Budget>[] = [
  { accessorKey: 'title', header: $t('budget.title') },
  { accessorKey: 'description', header: $t('budget.description') },
  { accessorKey: 'clientName', header: $t('budget.client') },
  {
    accessorKey: 'total',
    header: $t('budget.total'),
    cell: ({ row }) => {
      const v = row.getValue('total') as number
      return formatCurrency(v)
    }
  },
  {
    accessorKey: 'status',
    header: $t('budget.status'),
    cell: ({ row }) => {
      const v = row.getValue('status') as keyof typeof status
      return h(
        UBadge,
        { class: 'capitalize', variant: 'subtle', color: status[v] },
        () => v
      )
    }
  },
  { accessorKey: 'observations', header: $t('budget.observations') },
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
            onClick: () => editBudget(row.original)
          }),
          h(UButton, {
            icon: 'i-lucide-trash',
            color: 'error',
            variant: 'ghost',
            onClick: () => deleteBudget(row.original.id || '')
          })
        ]
      )
  }
]

function editBudget(row: Budget) {
  selectedBudget.value = { ...row }
  edit.value = true
  openModal()
}

function showModal() {
  selectedBudget.value = null
  edit.value = false
  openModal()
}

function deleteBudget(id: string) {
  $budgetService.delete(id).then(() => {
    toast.add({
      title: $t('attention'),
      description: 'ok',
      icon: 'i-lucide-alert-triangle',
      color: 'error'
    })
    refresh()
  })
}
</script>

<template>
  <div class="flex min-h-screen overflow-hidden">
    <SideBar active="budgets" />
    <div class="flex-1 p-10 pr-12">
      <div class="flex justify-between mb-5">
        <h1 class="font-bold font-title text-2xl">
          {{ $t('budget.manage') }}
        </h1>

        <UButton
          :label="$t('newBudget')"
          class="bg-primary dark:bg-primary-dark"
          @click="showModal"
        />
      </div>

      <UPageCard>
        <div class="grid grid-cols-2 gap-4">
          <UInput
            v-model="search"
            icon="i-lucide-search"
            :placeholder="$t('budget.search')"
            @change="refresh"
          />
          <UInputMenu
            v-model="filter"
            icon="i-lucide-filter"
            :placeholder="$t('budget.filter')"
            :items="statusFilter"
            value-key="id"
            @change="refresh"
          />
        </div>
      </UPageCard>

      <div class="mt-10">
        <UEmpty
          v-if="!data?.length"
          icon="i-lucide-user"
          :title="$t('budget.noData')"
          :description="$t('budget.noDataDescription')"
        >
          <template #footer>
            <UButton
              :label="$t('newBudget')"
              class="bg-primary dark:bg-primary-dark"
              @click="showModal"
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
    <BudgetModal
      ref="modalRef"
      :budget="selectedBudget"
      :mode="edit ? 'edit' : 'create'"
      @saved="refresh"
    />
  </div>
</template>
