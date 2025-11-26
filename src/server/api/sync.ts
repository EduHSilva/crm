import sequelize from '../utils/sequelize'
import Client from '../models/Client' // Import all your models

async function initializeDatabase() {
  try {
    console.log('Sync table ' + Client.name)
    await sequelize.authenticate()
    await sequelize.sync({ force: false }) // Set force to true to drop existing tables
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
}

initializeDatabase().then((_r) => {})
