<script setup lang="ts">
import { VueDraggableNext as Draggable, type DragChangeEvent } from 'vue-draggable-next'
import type { Budget } from '~/utils/types'

const props = defineProps<{
  list: Budget[]
  handleChange: (evt: DragChangeEvent<Budget>) => Promise<void>
  title: string
  color: 'orange' | 'blue' | 'green'
}>()

const colorMap = {
  orange: 'bg-orange-400',
  blue: 'bg-blue-400',
  green: 'bg-green-400'
}
</script>

<template>
  <div
    class="flex flex-col rounded-xl bg-white dark:bg-gray-900
           border border-gray-200 dark:border-gray-700 shadow-sm"
  >
    <!-- HEADER -->
    <div class="px-4 py-3 border-b dark:border-gray-700 flex items-center gap-2">
      <span
        class="w-2 h-2 rounded-full"
        :class="colorMap[color]"
      />
      <h3 class="font-semibold text-gray-700 dark:text-gray-200">
        {{ title }}
      </h3>
      <span class="ml-auto text-sm text-gray-400">
        {{ list.length }}
      </span>
    </div>

    <!-- LIST -->
    <ClientOnly>
      <Draggable
        :list="list"
        group="kanban"
        class="flex-1 p-3 space-y-3 overflow-y-auto min-h-[200px]"
        ghost-class="ghost"
        chosen-class="chosen"
        :animation="200"
        @change="handleChange"
      >
        <div
          v-for="item in list"
          :key="item.id"
          class="
            rounded-lg border bg-white dark:bg-gray-800
            border-gray-200 dark:border-gray-700
            p-4 shadow-sm cursor-grab
            transition hover:shadow-md
            active:cursor-grabbing
          "
        >
          <p class="font-medium text-sm text-gray-800 dark:text-gray-100">
            {{ item.title }}
          </p>
        </div>
      </Draggable>
    </ClientOnly>
  </div>
</template>

<style scoped>
.ghost {
  opacity: 0.4;
}

.chosen {
  transform: rotate(1deg);
}
</style>
