import Client from '../../models/Client'

export default defineEventHandler(async (_event) => {
  try {
    return await Client.findAll()
  } catch (error) {
    console.error('Error fetching clients:', error)
    throw createError({ statusCode: 500, statusMessage: 'Internal Server Error' })
  }
})
