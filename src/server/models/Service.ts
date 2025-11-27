import { DataTypes } from 'sequelize'
import sequelize from '../utils/sequelize'

const Service = sequelize.define('services', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT
  },
  value: {
    type: DataTypes.DOUBLE
  },
  initialDate: {
    type: DataTypes.DATE
  },
  endDate: {
    type: DataTypes.DATE
  },
  priority: {
    type: DataTypes.ENUM('low', 'medium', 'high')
  },
  status: {
    type: DataTypes.ENUM('new', 'working', 'done')
  },
  observations: {
    type: DataTypes.TEXT
  }
})

export default Service
