<script setup lang="ts">
import { type DragChangeEvent, VueDraggableNext as Draggable } from 'vue-draggable-next'
import type { Budget } from '~/utils/types'

const props = defineProps<{
  list: Budget[]
  handleChange: (evt: DragChangeEvent<Budget>) => Promise<void>
  title: string
}>()
</script>

<template>
  <UPageCard :title="props.title">
    <ClientOnly>
      <Draggable
        :list="props.list"
        group="kanban"
        class="space-y-2 min-h-[200px]"
        @change="props.handleChange"
      >
        <div
          v-for="item in props.list"
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
</template>

<style scoped>

</style>
