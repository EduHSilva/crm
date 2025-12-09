<script setup lang="ts">
import SideBar from '~/components/SideBar.vue'
import DashCard from '~/components/DashCard.vue'
import ClientModal from '~/components/modais/ClientModal.vue'
import BudgetModal from '~/components/modais/BudgetModal.vue'

const clientModalRef = ref<InstanceType<typeof ClientModal> | null>(null)

function openModal() {
  clientModalRef.value?.openModal()
}

const budgetModalRef = ref<InstanceType<typeof BudgetModal> | null>(null)

function openModalBudget() {
  budgetModalRef.value?.openModal()
}
</script>

<template>
  <div class="flex min-h-screen overflow-hidden">
    <SideBar
      active="dashboard"
    />

    <div class="flex-1 p-10 pr-50">
      <div class="flex justify-between mb-5">
        <div class="font-bold font-title text-2xl">
          {{ $t('dash.generalVision') }}
        </div>
        <div>
          <UButton
            :label="$t('newClient')"
            class="bg-primary dark:bg-primary-dark m-2"
            @click="openModal"
          />
          <UButton
            :label="$t('newBudget')"
            variant="outline"
            class="bg-primary dark:bg-primary-dark m-2"
            @click="openModalBudget"
          />
        </div>
      </div>
      <div class="flex justify-between">
        <DashCard
          :title="$t('dash.totalOfClients')"
          icon="i-lucide:users"
          content="0"
        />
        <DashCard
          :title="$t('dash.pendingServices')"
          content="0"
          icon="i-lucide:timer"
          :footer="$t('dash.waitingInit')"
        />
        <DashCard
          :title="$t('dash.working')"
          content="0"
          icon="i-lucide:check"
          :footer="$t('dash.projectsActives')"
        />
        <DashCard
          :title="$t('dash.income')"
          icon="i-lucide:coins"
          :content="formatCurrency(0)"
          :footer="$t('dash.total')"
        />
      </div>
    </div>
    <ClientModal
      ref="clientModalRef"
      :client="null"
    />
    <BudgetModal
      ref="budgetModalRef"
      :budget="null"
    />
  </div>
</template>
