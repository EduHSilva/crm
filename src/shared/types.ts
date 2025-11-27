export type User = {
  email: string
  username: string
  id: string
  token: string
}

export type NewClientRequest = {
  email: string
  name: string
  phone: string
  observations: string
}
