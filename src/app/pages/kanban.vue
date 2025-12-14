<script setup lang="ts">
import SideBar from '~/components/SideBar.vue'
import { type DragChangeEvent, type DraggableItem, VueDraggableNext as Draggable } from 'vue-draggable-next'

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
        <!-- NEW -->
        <UPageCard title="New">
          <ClientOnly>
            <Draggable
              :list="news"
              group="kanban"
              class="space-y-2 min-h-[200px]"
              @change="handleChangeNew"
            >
              <div
                v-for="item in news"
                :key="item.id"
                class="
                  rounded-lg border bg-white p-4 shadow-sm
                  cursor-move transition hover:shadow-md
                  dark:bg-gray-900 dark:border-gray-700
                "
              >
                <p class="font-medium text-sm">
                  {{ item.title }}
                </p>
              </div>
            </Draggable>
          </ClientOnly>
        </UPageCard>

        <!-- WORKING -->
        <UPageCard title="Working">
          <ClientOnly>
            <Draggable
              :list="working"
              group="kanban"
              class="space-y-2 min-h-[200px] kanban-working"
              @change="handleChangeWorking"
            >
              <div
                v-for="item in working"
                :key="item.id"
                class="
                  rounded-lg border bg-white p-4 shadow-sm
                  cursor-move transition hover:shadow-md
                  dark:bg-gray-900 dark:border-gray-700
                "
              >
                <p class="font-medium text-sm">
                  {{ item.title }}
                </p>
              </div>
            </Draggable>
          </ClientOnly>
        </UPageCard>

        <UPageCard title="Done">
          <ClientOnly>
            <Draggable
              :list="done"
              group="kanban"
              class="space-y-2 min-h-[200px] kanban-done"
              @change="handleChangeDone"
            >
              <div
                v-for="item in done"
                :key="item.id"
                class="
                  rounded-lg border bg-white p-4 shadow-sm
                  cursor-move transition hover:shadow-md
                  dark:bg-gray-900 dark:border-gray-700
                "
              >
                <p class="font-medium text-sm">
                  {{ item.title }}
                </p>
              </div>
            </Draggable>
          </ClientOnly>
        </UPageCard>
      </UPageGrid>
    </div>
  </div>
</template>
