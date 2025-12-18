<script setup lang="ts">
import SideBar from '~/components/SideBar.vue'
import type { DragChangeEvent } from 'vue-draggable-next'

/* ===============================
 * DATA (SSR SAFE)
 * =============================== */
const { $dashboardService, $budgetService } = useNuxtApp()

const { data } = await useAsyncData('kanban', () =>
  $dashboardService.findKanban()
)

/* ===============================
 * STATE
 * =============================== */
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

/* ===============================
 * METHODS
 * =============================== */
async function handleChangeNew(evt: DragChangeEvent<Budget>) {
  if (evt.added) {
    const budget: Budget = evt.added.element
    budget.status = 'APPROVED'
    await $budgetService.update(budget.id ?? '', budget)
  }
}

async function handleChangeWorking(evt: DragChangeEvent<Budget>) {
  if (evt.added) {
    const budget: Budget = evt.added.element
    budget.status = 'WORKING'
    await $budgetService.update(budget.id ?? '', budget)
  }
}

async function handleChangeDone(evt: DragChangeEvent<Budget>) {
  if (evt.added) {
    const budget: Budget = evt.added.element
    budget.status = 'DONE'
    await $budgetService.update(budget.id ?? '', budget)
  }
}
</script>

<template>
  <div class="flex min-h-screen overflow-hidden">
    <SideBar active="kanban" />

    <div class="flex-1 p-10 pr-12">
      <h1 class="font-bold font-title text-4xl">
        {{ $t('kanban.title') }}
      </h1>
      <h2 class="font-bold font-title text-2xl">
        {{ $t('kanban.manage') }}
      </h2>

      <!-- COUNTERS -->
      <UPageGrid class="mt-4">
        <UPageCard
          :title="news.length + ' ' + $t('kanban.news')"
          :ui="{ title: 'text-orange-400' }"
        />
        <UPageCard
          :title="working.length + ' ' + $t('kanban.working')"
          :ui="{ title: 'text-blue-400' }"
        />
        <UPageCard
          :title="done.length + ' ' + $t('kanban.done')"
          :ui="{ title: 'text-green-400' }"
        />
      </UPageGrid>

      <!-- KANBAN -->
      <UPageGrid class="mt-6 grid-cols-3 gap-4">
        <KanbanBoard
          :list="news"
          :handle-change="handleChangeNew"
          :title="$t('kanban.news')"
        />
        <KanbanBoard
          :list="working"
          :handle-change="handleChangeWorking"
          :title="$t('kanban.working')"
        />
        <KanbanBoard
          :list="done"
          :handle-change="handleChangeDone"
          :title="$t('kanban.done')"
        />
      </UPageGrid>
    </div>
  </div>
</template>
