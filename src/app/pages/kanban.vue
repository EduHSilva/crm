<script setup lang="ts">
import SideBar from '~/components/SideBar.vue'

const response = {
  news: {
    budgets: [],
    total: 0
  },
  working: {
    budgets: [],
    total: 0
  },
  done: {
    budgets: [],
    total: 0
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
      <UPageGrid class="mt-4">
        <UPageCard
          :title="response.news.total + ' ' + $t('kanban.news')"
          :ui="{ title: 'text-orange-400',
                 description: 'text-orange-400 text-md',
                 container: 'rounded border text-card-foreground shadow kanban-column bg-amber-100 border-amber-200 dark:bg-amber-900/20 dark:border-amber-800' }"
        />
        <UPageCard
          :title="response.working.total + ' ' + $t('kanban.working')"
          :ui="{ title: 'text-blue-400',
                 description: 'text-blue-400 text-md',
                 container: 'rounded border text-card-foreground shadow kanban-column bg-blue-100 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800' }"
        />
        <UPageCard
          :title="response.done.total + ' ' + $t('kanban.done')"
          :ui="{ title: 'text-green-400',
                 description: 'text-green-400 text-md',
                 container: 'rounded border text-card-foreground shadow kanban-column bg-green-100 border-green-200 dark:bg-green-900/20 dark:border-green-800' }"
        />
      </UPageGrid>
      <UPageCard
        class="mt-4"
        title="Done"
        :ui="{ title: 'text-blue-400',
               container: 'rounded border text-card-foreground shadow kanban-column bg-blue-100 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800' }"
      />
      <UPageGrid class="mt-4">
        <UPageCard
          class="min-h-100"
          title="News"
          :ui="{
            container: 'rounded border text-card-foreground shadow kanban-column bg-amber-100 border-amber-200 dark:bg-amber-900/20 dark:border-amber-800' }"
        />
        <UPageCard
          title="Working"
          :ui="{
            container: 'rounded border text-card-foreground shadow kanban-column bg-blue-100 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800' }"
        />
        <UPageCard
          class=""
          title="Done"
          :ui="{
            container: 'rounded border text-card-foreground shadow kanban-column bg-green-100 border-green-200 dark:bg-green-900/20 dark:border-green-800' }"
        />
      </UPageGrid>
    </div>
  </div>
</template>

<style scoped>

</style>
