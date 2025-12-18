<template>
  <div>
    <UPageHero
      :title="$t('landingPage.easyCRM')"
      :description="$t('landingPage.manageClients')"
      :links="[{
        label: $t('landingPage.startFree'),
        to: '/auth/register',
        trailingIcon: 'i-lucide-arrow-right',
        size: 'xl',
        class: 'bg-primary dark:bg-primary-dark'
      }, {
        label: $t('landingPage.viewDemo'),
        to: 'https://github.com/nuxt-ui-templates/starter',
        target: '_blank',
        icon: 'i-simple-icons-youtube',
        size: 'xl',
        color: 'neutral',
        variant: 'outline'
      }]"
    />

    <UPageSection
      id="features"
      :title="$t('landingPage.allYouNeed')"
      :description="$t('landingPage.featuresPlanning')"
      :features="[{
        icon: 'i-lucide-user',
        title: $t('landingPage.clientsManagement'),
        description: $t('landingPage.clientsManagementDescription'),
        class: 'rounded-lg p-10 bg-cards dark:bg-cards-dark'
      }, {
        icon: 'i-lucide-blocks',
        title: $t('landingPage.projects'),
        description: $t('landingPage.projectsDescription'),
        class: 'rounded-lg p-10 bg-cards dark:bg-cards-dark'
      }, {
        icon: 'i-lucide-zap',
        title: $t('landingPage.smartAlarm'),
        description: $t('landingPage.smartAlarmDescription'),
        class: 'rounded-lg p-10 bg-cards dark:bg-cards-dark'
      }, {
        icon: 'i-lucide-blocks',
        title: $t('landingPage.dashboardCompleted'),
        description: $t('landingPage.dashboardCompletedDescription'),
        class: 'rounded-lg p-10 bg-cards dark:bg-cards-dark'
      }]"
    />

    <UPageSection>
      <UPageCTA
        :title="$t('landingPage.readyToOrganize')"
        :description="$t('landingPage.seeDifference')"
        variant="subtle"
        :links="[{
          label: $t('landingPage.startFree'),
          to: '/register',
          trailingIcon: 'i-lucide-arrow-right',
          color: 'neutral',
          class: 'bg-primary dark:bg-primary-dark'
        }, {
          label: $t('landingPage.aboutMore'),
          to: 'https://github.com/nuxt-ui-templates/starter',
          icon: 'i-simple-icons-youtube',
          color: 'neutral',
          variant: 'outline'
        }]"
        :ui="{ container: 'bg-cards dark:bg-cards-dark' }"
      />
    </UPageSection>
  </div>
</template>
