module.exports = (sequelize, DataTypes) => {
    const alias = "Actors"

    const cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        first_name: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        last_name: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        rating: {
            type: DataTypes.DECIMAL(3, 1),
        },
    }

    const config = {
        tableName: "actors",
        timestamps: false,
    }
    
    const Actor = sequelize.define(alias, cols, config)

    Actor.associate = function(models){
        Actor.belongsToMany(models.Movies, {
            as: "movies",
            through: "actor_movie",
            foreignKey: "actor_id",
            otherKey: "movie_id",
            timestamps: false,
        })
    }

    return Actor
}