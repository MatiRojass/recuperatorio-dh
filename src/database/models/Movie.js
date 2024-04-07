module.exports = (sequelize, DataTypes) => {
    const alias = "Movies"

    const cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: DataTypes.STRING(500),
            allowNull: false,
        },
        rating: {
            type: DataTypes.DECIMAL(3, 1),
            allowNull: false,
            unsigned: true,
        },
        awards: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unsigned: true,
            default: 0,
        },
        release_date: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            get() {
                const releaseDate = this.getDataValue('release_date');
                // Formatear la fecha y hora a DD/MM/YYYY HH:MM:SS
                // Formatear la fecha y hora a DD/MM/YYYY HH:MM:SS
                return releaseDate ? `${String(releaseDate.getDate()).padStart(2, '0')}/${String(releaseDate.getMonth() + 1).padStart(2, '0')}/${releaseDate.getFullYear()} ${releaseDate.toLocaleTimeString('es-ES')}` : null;
            },
        },
        length: {
            type: DataTypes.INTEGER,
            unsigned: true,
            default: null
        },
        genre_id: {
            type: DataTypes.INTEGER
        }
    }

    const config = {
        tableName: "movies",
        timeStamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at"
    }
    
    const Movie = sequelize.define(alias, cols, config)

    return Movie
}