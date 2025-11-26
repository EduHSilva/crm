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
    unique: false,
    validate: {
      isEmail: true
    }
  }
})

export default Client
