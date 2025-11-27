import Client from './Client'
import Service from './Service'
import Budget from './Budget'
import Item from './Item'

// Client ↔ Service (1:N)
Service.belongsTo(Client, { foreignKey: 'client_id' })
Client.hasMany(Service, { foreignKey: 'client_id' })

// Budget ↔ Service (1:1 ou 1:N)
Service.belongsTo(Budget, { foreignKey: 'budget_id' })
Budget.hasOne(Service, { foreignKey: 'budget_id' })

// Budget ↔ Item (N:N)
Item.belongsToMany(Budget, { through: 'budget_items' })
Budget.belongsToMany(Item, { through: 'budget_items' })

export { Client, Service, Budget, Item }
