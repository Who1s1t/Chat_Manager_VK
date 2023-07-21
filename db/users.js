const { DataTypes } = require('sequelize')
const db = require('./db.js')

const Users = db.define('users',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        vk_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        firstname: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastname: {
            type: DataTypes.STRING,
            allowNull: false
        },
        rate:  {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        role: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        mute: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }





    }

)

module.exports = Users