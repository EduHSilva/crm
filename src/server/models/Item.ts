import { DataTypes } from 'sequelize'
import sequelize from '../utils/sequelize'

const Item = sequelize.define('item', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING
  },
  quantity: {
    type: DataTypes.INTEGER
  },
  priceUn: {
    type: DataTypes.DOUBLE
  }
})

export default Item
