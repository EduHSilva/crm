import userService from '@/services/userService'
import type { User } from '~/utils/types'
import { resolveApiUrl } from '~/utils/apiUrl'

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()

  const service = userService({
    apiUrl: resolveApiUrl(`${config.public.apiUrl}/users/`)
  })

  return {
    provide: {
      userService: service
    }
  }
})

export const useUser = () => useState<User | null>('user', () => null)
