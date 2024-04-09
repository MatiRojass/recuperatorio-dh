module.exports = (sequelize, DataTypes) => {
    const alias = "Users"

    const cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING
        },
        rol: {
            type: DataTypes.BOOLEAN,
            default: 0
        }
    }

    const config = {
        tableName: "users",
        timeStamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at"
    }

    const User = sequelize.define(alias, cols, config)

    return User
}