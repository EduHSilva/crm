import { DataTypes } from 'sequelize'
import sequelize from '../utils/sequelize'

const Client = sequelize.define('clients', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    }
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('new', 'working', 'done')
  },
  observations: {
    type: DataTypes.TEXT
  }
})

export default Client
