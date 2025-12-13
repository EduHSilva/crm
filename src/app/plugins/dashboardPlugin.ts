import dashboardService from '~/services/dashboardService'

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()

  const service = dashboardService({
    apiUrl: `${config.public.apiUrl}/crm/`
  })

  return {
    provide: {
      dashboardService: service
    }
  }
})
