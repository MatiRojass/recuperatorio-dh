module.exports = (sequelize, DataTypes) => {
    const alias = "Genres"

    const cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        ranking: {
            type: DataTypes.DECIMAL(3, 1),
            allowNull: false,
            unsigned: true,
            unique: true,
        },
        active: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            unsigned: true,
            default: 1,
        }
    }

    const config = {
        tableName: "genres",
        timeStamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at"
    }
    
    const Genre = sequelize.define(alias, cols, config)

    Genre.associate = function(models){
        Genre.hasMany(models.Movies, {
            as: "movies",
            foreignKey: "genre_id"
        })
    }

    return Genre
}