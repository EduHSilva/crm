import userService from '@/services/userService'
import type { User } from '~/types'

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()

  const service = userService({
    apiUsersUrl: config.public.apiUserUrl
  })

  return {
    provide: {
      userService: service
    }
  }
})

export const useUser = () => useState<User | null>('user', () => null)
