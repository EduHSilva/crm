import { DataTypes } from 'sequelize'
import sequelize from '../utils/sequelize'

const Budget = sequelize.define('budgets', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  validateDate: {
    type: DataTypes.DATE
  },
  description: {
    type: DataTypes.TEXT
  },
  terms: {
    type: DataTypes.STRING
  },
  observations: {
    type: DataTypes.TEXT
  }
})

export default Budget
