const sequelize = require('../db')
const { DataTypes } = require('sequelize')

const User = sequelize.define('user', { 
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: "User"}
})

const Basket = sequelize.define('basket', { 
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
})

const BasketDevice = sequelize.define('basketDevice', { 
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
})

const Device = sequelize.define('device', { 
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, autoNull: false},
    price: {type: DataTypes.INTEGER,  autoNull: false},
    rating: {type: DataTypes.INTEGER,  defaultValue: 0},
    img: {type: DataTypes.STRING, autoNull: false}
})

const Type = sequelize.define('type', { 
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, autoNull: false},
})

const Brand = sequelize.define('brand', { 
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, autoNull: false},
})

const Rating = sequelize.define('rating', { 
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    rate: {type: DataTypes.STRING,  autoNull: false},
})

const DeviceInfo = sequelize.define('deviceInfo', { 
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING,  autoNull: false},
    description: {type: DataTypes.STRING,  autoNull: false},
})

const TypeBrand = sequelize.define('typeBrand', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
}

)

User.hasOne(Basket)
Basket.belongsTo(User)

User.hasMany(Rating)
Rating.belongsTo(User)

Basket.hasMany(BasketDevice)
BasketDevice.belongsTo(Basket)

BasketDevice.hasOne(Device)
Device.belongsTo(BasketDevice)

Device.hasMany(DeviceInfo, {as: 'info'})
DeviceInfo.belongsTo(Device)

Device.hasMany(Rating)
Rating.belongsTo(Device)

Type.hasMany(Device)
Device.belongsTo(Type)

Brand.hasMany(Device)
Device.belongsTo(Brand)

Type.belongsToMany(Brand, {through: TypeBrand})
Brand.belongsToMany(Type, {through: TypeBrand})
Device.sync({ alter: true })

module.exports = {
    User,
    Basket,
    Rating,
    BasketDevice,
    Device,
    DeviceInfo,
    Brand,
    Type,
    TypeBrand
}









    

