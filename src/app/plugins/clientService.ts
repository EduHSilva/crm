import clientService from '~/services/clientService'
import { resolveApiUrl } from '~/utils/apiUrl'

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()

  const service = clientService({
    apiUrl: resolveApiUrl(`${config.public.apiUrl}/crm/`)
  })

  return {
    provide: {
      clientService: service
    }
  }
})
