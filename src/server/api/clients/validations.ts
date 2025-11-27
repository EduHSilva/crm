import type { NewClientRequest } from '#shared/types'

export function checkDataNewUser(data: NewClientRequest): void {
  if (!data) throw Error('missing data')
  if (data.name && data.name.length > 0) throw Error('name already exists')
  return
}
