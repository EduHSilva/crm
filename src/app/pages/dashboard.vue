<script setup lang="ts">
import SideBar from '~/components/SideBar.vue'
import DashCard from '~/components/DashCard.vue'
import ClientModal from '~/components/modais/ClientModal.vue'
import BudgetModal from '~/components/modais/BudgetModal.vue'
import type { AccordionItem } from '@nuxt/ui/components/Accordion.vue'

const clientModalRef = ref<InstanceType<typeof ClientModal> | null>(null)

function openModal() {
  clientModalRef.value?.openModal()
}

const budgetModalRef = ref<InstanceType<typeof BudgetModal> | null>(null)

function openModalBudget() {
  budgetModalRef.value?.openModal()
}

const { $dashboardService } = useNuxtApp()
const data = await $dashboardService.find()
const dashData = data.data
const recentBudgets: AccordionItem[] = dashData.recentServices satisfies AccordionItem[]
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
      </div>
      <div class="flex justify-between">
        <DashCard
          :title="$t('dash.totalOfClients')"
          icon="i-lucide:users"
          :content="dashData.totalClients.toString()"
        />
        <DashCard
          :title="$t('dash.pendingServices')"
          :content="dashData.pendingServices.toString()"
          icon="i-lucide:timer"
          :footer="$t('dash.waitingInit')"
        />
        <DashCard
          :title="$t('dash.working')"
          :content="dashData.workingServices.toString()"
          icon="i-lucide:check"
          :footer="$t('dash.projectsActives')"
        />
        <DashCard
          :title="$t('dash.income')"
          icon="i-lucide:coins"
          :content="formatCurrency(dashData.totalReceived)"
          :footer="$t('dash.total')"
        />
      </div>
      <div class="flex justify-between mt-5">
        <div class="w-full p-5 pl-0">
          <UCard>
            <template #header>
              <h3 class="font-bold text-xl">
                {{ $t('recentBudgets') }}
              </h3>
            </template>
            <UAccordion
              :items="recentBudgets"
              label-key="title"
            >
              <template #content="{ item }">
                <UBadge
                  color="neutral"
                  size="sm"
                >
                  {{ item.clientName }}
                </UBadge>

                <p class="pt-2 pb-3.5 text-sm text-muted">
                  {{ item.description }}
                </p>
              </template>
            </UAccordion>
          </UCard>
        </div>
        <div class="w-full p-5">
          <UCard>
            <template
              #header
            >
              <h3 class="font-bold text-xl">
                {{ $t('shortcuts') }}
              </h3>
            </template>
            <div class="flex-col">
              <UPageFeature
                :title=" $t('newClient')"
                :description="$t('client.manage')"
                icon="i-lucide-users"
                @click="openModal"
              />
              <USeparator class="my-4" />
              <UPageFeature
                :title=" $t('newBudget')"
                :description="$t('budget.manage')"
                icon="i-lucide-notebook"
                @click="openModalBudget"
              />
              <USeparator class="my-4" />
              <UPageFeature
                :title=" $t('newReminder')"
                :description="$t('reminder.manage')"
                icon="i-lucide-bell"
                @click="openModalBudget"
              />
              <USeparator class="my-4" />
              <UPageFeature
                :title=" $t('viewKanban')"
                :description="$t('kanban.manage')"
                icon="i-lucide-kanban"
                to="/kanban"
              />
            </div>
          </UCard>
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
  </div>
</template>
