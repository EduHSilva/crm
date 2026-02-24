<script setup lang="ts">
import SideBar from '~/components/SideBar.vue'

const route = useRoute()
const { $budgetService } = useNuxtApp()

const budgetId = route.params.id as string
const response = await $budgetService.findById(budgetId)
const budget = response.data

const handlePrint = () => {
  if (import.meta.client) {
    window.print()
  }
}
const toast = useToast()
const router = useRouter()

const handleApprove = async () => {
  budget.status = 'APPROVED'
  $budgetService.update(budgetId, budget).then(() => {
    toast.add({
      title: $t('attention'),
      description: 'ok',
      icon: 'i-lucide-alert-triangle',
      color: 'error'
    })
    router.back()
  })
}
</script>

<template>
  <div class="flex min-h-screen overflow-hidden">
    <SideBar active="budgets" />

    <div
      id="budget-pdf"
      class="flex-1 p-10 pr-12 max-w-4xl mx-auto bg-white dark:bg-dark"
    >
      <h1 class="text-2xl font-bold mb-2">
        {{ budget?.title }}
      </h1>

      <p class="text-gray-500 mb-6">
        {{ budget?.clientName }}
      </p>

      <div class="space-y-2">
        <p><strong>{{ $t('budget.status') }}:</strong> {{ $t(budget?.status!.toLowerCase()) }}</p>
        <p><strong>{{ $t('budget.total') }}:</strong> {{ formatCurrency(budget?.total || 0) }}</p>
        <p><strong>{{ $t('budget.observations') }}:</strong></p>
        <p class="whitespace-pre-line">
          {{ budget?.observations }}
        </p>
      </div>

      <div class="flex gap-3 mt-10 print:hidden">
        <UButton
          icon="i-lucide-printer"
          :label="$t('budget.print')"
          @click="handlePrint"
        />
        <UButton
          v-if="budget.status == 'DRAFT' || budget.status == 'WAITING'"
          variant="outline"
          icon="i-lucide-check"
          :label="$t('budget.approve')"
          @click="handleApprove"
        />
      </div>
    </div>
  </div>
</template>
