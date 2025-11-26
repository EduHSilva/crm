import type { User } from '~/utils/types'
import { getTokenCookie } from '~/utils/util'

export interface UserServiceOptions {
  apiUsersUrl: string | unknown
}

export interface UserService {
  login(email: string, password: string): Promise<User>
  getUser(): Promise<User>
  register(username: string, email: string, password: string): Promise<User>
}

export default function userService({ apiUsersUrl }: UserServiceOptions): UserService {
  return {
    async login(email: string, password: string) {
      return await $fetch(`${apiUsersUrl}/auth/login`, {
        method: 'POST',
        body: { email, password }
      })
    },

    async getUser() {
      return await $fetch(`${apiUsersUrl}/auth/me`, {
        headers: {
          Authorization: 'Bearer ' + getTokenCookie().value?.token
        }
      })
    },

    async register(username: string, email: string, password: string) {
      return await $fetch(`${apiUsersUrl}/user`, {
        method: 'POST',
        body: { username, email, password, role: 'CRM' }
      })
    }
  }
}
