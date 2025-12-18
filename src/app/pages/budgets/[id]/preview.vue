<script setup lang="ts">
const route = useRoute()
const { $budgetService } = useNuxtApp()

const budgetId = route.params.id as string
const response = await $budgetService.findById(budgetId)
const budget = response.data
</script>

<template>
  <div class="max-w-4xl mx-auto p-10 bg-white dark:bg-dark">
    <h1 class="text-2xl font-bold mb-2">
      {{ budget?.title }}
    </h1>

    <p class="text-gray-500 mb-6">
      {{ budget?.clientName }}
    </p>

    <div class="space-y-2">
      <p><strong>Status:</strong> {{ budget?.status }}</p>
      <p><strong>Total:</strong> {{ formatCurrency(budget?.total || 0) }}</p>
      <p><strong>Observações:</strong></p>
      <p class="whitespace-pre-line">
        {{ budget?.observations }}
      </p>
    </div>

    <div class="flex gap-3 mt-10 print:hidden">
      <UButton
        icon="i-lucide-printer"
        label="Imprimir"
        @click="window.print()"
      />
      <UButton
        icon="i-lucide-file-down"
        label="Gerar PDF"
        variant="outline"
      />
    </div>
  </div>
</template>
