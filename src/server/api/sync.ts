import sequelize from '../utils/sequelize'
import {
  Client, Service, Budget, Item
} from '../models'

async function initializeDatabase() {
  try {
    console.log('Sync table ' + Client.name)
    console.log('Sync table ' + Service.name)
    console.log('Sync table ' + Budget.name)
    console.log('Sync table ' + Item.name)
    await sequelize.authenticate()
    await sequelize.sync({ force: false }) // Set force to true to drop existing tables
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
}

initializeDatabase().then((_r) => {})
