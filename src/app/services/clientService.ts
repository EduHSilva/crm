import { getTokenCookie } from '~/utils/util'
import type { Client } from '~/utils/types'

export interface ClientServiceOptions {
  apiUrl: string | unknown
}

export interface ClientService {
  find(page: number, name: string | null, status: string | null): Promise<DefaultResponse<Page<Client>>>

  add(client: Client): Promise<Client>

  update(id: string, observation: string | undefined): Promise<Client>

  delete(id: string): Promise<void>
}

export default function clientService({ apiUrl }: ClientServiceOptions): ClientService {
  return {

    async find(page: number, name: string | null, status: string | null) {
      let base = `${apiUrl}clients?page=${page}`
      if (name != null && name != '') {
        base += `&name=${name}`
      }
      if (status != null && status != '') {
        base += `&status=${status}`
      }
      return await $fetch(base, {
        headers: {
          Authorization: 'Bearer ' + getTokenCookie().value?.token
        }
      })
    },

    async add(client: Client): Promise<Client> {
      return await $fetch(`${apiUrl}clients`, {
        headers: {
          Authorization: 'Bearer ' + getTokenCookie().value?.token
        },
        method: 'POST',
        body: client
      })
    },

    async update(id: string, obs: string): Promise<Client> {
      return await $fetch(`${apiUrl}clients/${id}`, {
        headers: {
          Authorization: 'Bearer ' + getTokenCookie().value?.token
        },
        method: 'PUT',
        body: {
          observations: obs
        }
      })
    },

    async delete(id: string): Promise<void> {
      return await $fetch(`${apiUrl}clients/${id}`, {
        headers: {
          Authorization: 'Bearer ' + getTokenCookie().value?.token
        },
        method: 'DELETE'
      })
    }
  }
}
