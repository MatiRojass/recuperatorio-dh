const db = require("../database/models")


const mainController = {
    detail: async (req, res)=>{
        try {
            const movie = await db.Movies.findByPk(req.params.id, {
                include: [{ association: "genre" }, { association: "actors" }]
            })
            
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

    createForm: async (req, res)=>{

        try {
            const genres = await db.Genres.findAll()

            res.render("createForm", { genres })

        } catch (error) {
            console.error(error)
        }
    },

    create: (req, res)=>{
        db.Movies.create({
            title: req.body.title,
            rating: req.body.rating,
            awards: req.body.awards,
            release_date: req.body.release_date,
            length: req.body.length,
            genre_id: req.body.genre,
        })

        res.redirect("/")
    },

    editForm: async (req, res)=>{
        try {
            const movie = await db.Movies.findByPk(req.params.id)
            res.render("editForm", {movie: movie})
        } catch (error) {
            console.error(error)
        }
    },

    update: (req, res)=>{
        db.Movies.update({
            title: req.body.title,
            rating: req.body.rating,
            awards: req.body.awards,
            release_date: req.body.release_date,
            length: req.body.length,
        }, {
            where: {
                id: req.params.id
            }
        })

        res.redirect("/")
    },

    delete: (req, res) => {
        db.Movies.destroy({
            where: {
                id: req.params.id
            }
        })

        res.redirect("/")
    }
}

module.exports = mainController