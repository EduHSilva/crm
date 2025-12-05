export type DefaultResponse<T> = {
  data: T
  message: string
  links: object
}

export type Page<T> = {
  items: T
  total: number
  page: number
  size: number
}

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

export type Client = {
  email: string
  name: string
  phone: string
  observations: string
}
