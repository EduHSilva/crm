<script setup lang="ts">
import SideBar from '~/components/SideBar.vue'
import DashCard from '~/components/DashCard.vue'

const { locale } = useI18n()
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
            to="/clients/new"
            class="bg-primary dark:bg-primary-dark m-2"
          >
            {{ $t('newClient') }}
          </UButton>
          <UButton
            to="/services/new"
            variant="outline"
          >
            {{ $t('newService') }}
          </UButton>
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
          :content="formatCurrency(locale, 0)"
          :footer="$t('dash.total')"
        />
      </div>
    </div>
  </div>
</template>
