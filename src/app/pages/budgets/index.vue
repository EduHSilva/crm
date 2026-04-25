<script setup lang="ts">
import { computed, h, ref } from 'vue'
import SideBar from '~/components/SideBar.vue'
import { getPaginationRowModel } from '@tanstack/vue-table'
import { UBadge, UButton } from '#components'
import BudgetModal from '~/components/modais/BudgetModal.vue'
import type { ColumnDef } from '@tanstack/vue-table'

type BudgetRow = Budget & { status?: string }

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
const data = ref<BudgetRow[]>(response.data.items || [])
let totalItems = response.data.total || 0
const statusFilter = [
  {
    label: $t('budget.filterAll'),
    id: ''
  },
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
  DRAFT: 'warning',
  WAITING: 'warning',
  SEND: 'info',
  WORKING: 'neutral',
  APPROVED: 'success',
  DONE: 'success',
  CANCEL: 'error',
  DENY: 'error',
  DELETED: 'error'
} as const

const cardsCount = computed(() => data.value.length)
const approvedCount = computed(() =>
  data.value.filter(item => item.status === 'APPROVED').length
)
const workingCount = computed(() =>
  data.value.filter(item => item.status === 'WORKING').length
)
const pipelineValue = computed(() =>
  data.value.reduce((acc, item) => acc + (item.total ?? 0), 0)
)

const quickFilterItems = [
  { label: $t('budget.filterAll'), id: '' },
  { label: $t('budget.draft'), id: 'DRAFT' },
  { label: $t('budget.waiting'), id: 'WAITING' },
  { label: $t('budget.approved'), id: 'APPROVED' },
  { label: $t('budget.working'), id: 'WORKING' },
  { label: $t('budget.done'), id: 'DONE' }
]

function setStatusFilter(statusId: string) {
  filter.value = statusId
  refresh()
}

function clearFilters() {
  search.value = ''
  filter.value = ''
  refresh()
}

function statusLabel(value: string) {
  switch (value) {
    case 'DRAFT': return $t('budget.draft')
    case 'SEND': return $t('budget.send')
    case 'WAITING': return $t('budget.waiting')
    case 'APPROVED': return $t('budget.approved')
    case 'WORKING': return $t('budget.working')
    case 'DONE': return $t('budget.done')
    case 'CANCEL': return $t('budget.cancel')
    case 'DENY': return $t('budget.deny')
    case 'DELETED': return $t('budget.deleted')
    default: return value
  }
}

const columns: ColumnDef<BudgetRow>[] = [
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
      const rawStatus = (row.getValue('status') as string) || 'DRAFT'
      const v = (rawStatus in status ? rawStatus : 'DRAFT') as keyof typeof status
      return h(
        UBadge,
        { class: 'capitalize', variant: 'subtle', color: status[v] },
        () => statusLabel(rawStatus)
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
            icon: 'i-lucide-eye',
            color: 'neutral',
            variant: 'ghost',
            onClick: () => viewBudget(row.original)
          }),
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
            onClick: () => deleteBudget(row.original.id ?? '')
          })
        ]
      )
  }
]
const router = useRouter()

function viewBudget(budget: BudgetRow) {
  router.push(`/budgets/${budget.id}/preview`)
}

function editBudget(row: BudgetRow) {
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
      description: $t('budget.deletedSuccess'),
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

    <div class="flex-1 p-8 pr-12 md:p-10 md:pr-12">
      <div class="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 class="font-bold font-title text-2xl md:text-3xl">
            {{ $t('budgets') }}
          </h1>
          <p class="mt-1 max-w-2xl text-sm text-muted">
            {{ $t('budget.manage') }}
          </p>
        </div>

        <div class="flex items-center gap-2">
          <UButton
            icon="i-lucide-refresh-cw"
            color="neutral"
            variant="outline"
            :label="$t('common.refresh')"
            @click="refresh"
          />
          <UButton
            icon="i-lucide-filter-x"
            color="neutral"
            variant="outline"
            :label="$t('common.clearFilters')"
            @click="clearFilters"
          />
          <UButton
            :label="$t('newBudget')"
            icon="i-lucide-plus"
            class="bg-primary dark:bg-primary-dark"
            @click="showModal"
          />
        </div>
      </div>

      <UPageGrid class="mb-5">
        <UPageCard
          :title="$t('budget.totalLoaded')"
          :description="`${cardsCount} ${$t('budget.itemsLabel')}`"
          icon="i-lucide-file-stack"
        />
        <UPageCard
          :title="$t('budget.approved')"
          :description="`${approvedCount} ${$t('budget.itemsLabel')}`"
          icon="i-lucide-badge-check"
        />
        <UPageCard
          :title="$t('budget.working')"
          :description="`${workingCount} ${$t('budget.itemsLabel')}`"
          icon="i-lucide-timer"
        />
        <UPageCard
          :title="$t('budget.pipelineValue')"
          :description="formatCurrency(pipelineValue)"
          icon="i-lucide-wallet-cards"
        />
      </UPageGrid>

      <UCard>
        <div class="grid gap-4 md:grid-cols-2">
          <UInput
            v-model="search"
            icon="i-lucide-search"
            :placeholder="$t('budget.search')"
            @change="refresh"
          />
          <USelectMenu
            v-model="filter"
            icon="i-lucide-filter"
            :placeholder="$t('budget.filter')"
            :items="statusFilter"
            value-key="id"
            @change="refresh"
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
