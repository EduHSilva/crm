<template>
  <div>
    <UPageHero
      title="CRM Simples para Freelancers"
      description="Gerencie seus clientes, projetos e lembretes em um só lugar. Feito especialmente para profissionais autônomos."
      :links="[{
        label: 'Começar gratuitamente',
        to: '/register',
        trailingIcon: 'i-lucide-arrow-right',
        size: 'xl',
        class: 'bg-primary dark:bg-primary-dark'
      }, {
        label: 'Ver demo',
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
      title="Tudo que você precisa para organizar seu negócio"
      description="Funcionalidades pensadas para simplicidade e produtividade"
      :features="[{
        icon: 'i-lucide-user',
        title: 'Gestão de Clientes',
        description: 'Mantenha todas as informações dos seus clientes organizadas e acessíveis.',
        class: 'rounded-lg p-10 bg-cards dark:bg-cards-dark'
      }, {
        icon: 'i-lucide-blocks',
        title: 'Acompanhamento de Projetos',
        description: 'Visualize o progresso dos seus projetos com nosso sistema Kanban intuitivo.',
        class: 'rounded-lg p-10 bg-cards dark:bg-cards-dark'
      }, {
        icon: 'i-lucide-zap',
        title: 'Lembretes Inteligentes',
        description: 'Nunca mais perca um prazo com nosso sistema de lembretes automáticos.',
        class: 'rounded-lg p-10 bg-cards dark:bg-cards-dark'
      }, {
        icon: 'i-lucide-blocks',
        title: 'Dashboard Completo',
        description: 'Tenha uma visão geral do seu negócio com métricas e relatórios em tempo real.',
        class: 'rounded-lg p-10 bg-cards dark:bg-cards-dark'
      }]"
    />

    <UPageSection>
      <UPageCTA
        title="Pronto para organizar seu negócio?"
        description="Comece gratuitamente e veja a diferença em poucos minutos"
        variant="subtle"
        :links="[{
          label: 'Começar gratuitamente',
          to: '/register',
          trailingIcon: 'i-lucide-arrow-right',
          color: 'neutral',
          class: 'bg-primary dark:bg-primary-dark'
        }, {
          label: 'Saiba mais',
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
