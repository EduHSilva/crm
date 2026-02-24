<script setup lang="ts">
import SideBar from '~/components/SideBar.vue'
import type { DragChangeEvent } from 'vue-draggable-next'

const { $dashboardService, $budgetService } = useNuxtApp()

const { data } = await useAsyncData('kanban', () =>
  $dashboardService.findKanban()
)

const news = ref<Budget[]>([])
const working = ref<Budget[]>([])
const done = ref<Budget[]>([])

watchEffect(() => {
  if (data.value?.data) {
    news.value = data.value.data.news ?? []
    working.value = data.value.data.working ?? []
    done.value = data.value.data.done ?? []
  }
})

async function handleChangeNew(evt: DragChangeEvent<Budget>) {
  if (evt.added) {
    const budget = evt.added.element
    budget.status = 'APPROVED'
    await $budgetService.update(budget.id ?? '', budget)
  }
}

async function handleChangeWorking(evt: DragChangeEvent<Budget>) {
  if (evt.added) {
    const budget = evt.added.element
    budget.status = 'WORKING'
    await $budgetService.update(budget.id ?? '', budget)
  }
}

async function handleChangeDone(evt: DragChangeEvent<Budget>) {
  if (evt.added) {
    const budget = evt.added.element
    budget.status = 'DONE'
    await $budgetService.update(budget.id ?? '', budget)
  }
}
</script>

<template>
  <div class="flex min-h-screen">
    <SideBar active="kanban" />

    <div class="flex-1 p-8">
      <div class="mb-6 flex items-center justify-between">
        <div>
          <h1 class="text-4xl font-bold font-title">
            {{ $t('kanban.title') }}
          </h1>
          <p class="text-gray-500">
            {{ $t('kanban.manage') }}
          </p>
        </div>

        <UButton
          icon="i-heroicons-plus"
          size="lg"
        >
          Novo orçamento
        </UButton>
      </div>

      <UPageGrid class="mb-6">
        <UPageCard :title="news.length + ' ' + $t('kanban.news')" />
        <UPageCard :title="working.length + ' ' + $t('kanban.working')" />
        <UPageCard :title="done.length + ' ' + $t('kanban.done')" />
      </UPageGrid>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <KanbanBoard
          title="Novos"
          color="orange"
          :list="news"
          :handle-change="handleChangeNew"
        />

        <KanbanBoard
          title="Em andamento"
          color="blue"
          :list="working"
          :handle-change="handleChangeWorking"
        />

        <KanbanBoard
          title="Finalizados"
          color="green"
          :list="done"
          :handle-change="handleChangeDone"
        />
      </div>
    </div>
  </div>
</template>
