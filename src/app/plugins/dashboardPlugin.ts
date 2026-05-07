import dashboardService from '~/services/dashboardService'
import { resolveApiUrl } from '~/utils/apiUrl'

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()

  const service = dashboardService({
    apiUrl: resolveApiUrl(`${config.public.apiUrl}/crm/`)
  })

  return {
    provide: {
      dashboardService: service
    }
  }
})
