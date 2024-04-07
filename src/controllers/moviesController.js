const db = require("../database/models")


const mainController = {
    detail: async (req, res)=>{
        try {
            const movie = await db.Movies.findByPk(req.params.id)

            res.render("detail", {movie: movie})
        } catch (error) {
            console.error(error)
        }
        
    }, 

    genres: async (req, res) => {
        try {
            const genres = await db.Genres.findAll()

            res.render("genres", {genres: genres})
        } catch (error) {
            console.error(error)
        }
    },

    createForm: (req, res)=>{
        res.render("createForm")
    },
}

module.exports = mainController