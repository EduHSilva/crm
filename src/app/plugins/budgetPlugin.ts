import budgetService from '~/services/budgetService'
import { resolveApiUrl } from '~/utils/apiUrl'

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()

  const service = budgetService({
    apiUrl: resolveApiUrl(`${config.public.apiUrl}/crm/`)
  })

  return {
    provide: {
      budgetService: service
    }
  }
})
