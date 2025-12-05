import clientService from '~/services/clientService'

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()

  const service = clientService({
    apiUrl: `${config.public.apiUrl}/crm/`
  })

  return {
    provide: {
      clientService: service
    }
  }
})
