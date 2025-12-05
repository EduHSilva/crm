import { getTokenCookie } from '~/utils/util'

export interface ClientServiceOptions {
  apiUrl: string | unknown
}

export interface ClientService {
  findClients(): Promise<DefaultResponse<Page<Client>>>
}

export default function clientService({ apiUrl }: ClientServiceOptions): ClientService {
  return {

    async findClients() {
      return await $fetch(`${apiUrl}clients`, {
        headers: {
          Authorization: 'Bearer ' + getTokenCookie().value?.token
        }
      })
    }
  }
}
