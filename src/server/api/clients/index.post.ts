import Client from '../../models/Client'
import type { NewClientRequest } from '#shared/types'
import { checkDataNewUser } from '~~/server/api/clients/validations'

export default defineEventHandler(async (event) => {
  try {
    const body: NewClientRequest = await readBody(event)

    checkDataNewUser(body)

    const client = await Client.create({
      name: body.name,
      email: body.email,
      phone: body.phone,
      status: 'new',
      observations: body.observations
    })

    return {
      message: 'Client created successfully',
      data: client
    }
  } catch (error) {
    console.error('Error creating client:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error'
    })
  }
})
