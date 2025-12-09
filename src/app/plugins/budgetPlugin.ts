import budgetService from '~/services/budgetService'

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()

  const service = budgetService({
    apiUrl: `${config.public.apiUrl}/crm/`
  })

  return {
    provide: {
      budgetService: service
    }
  }
})
