const db = require("../database/models")
const { validationResult } = require("express-validator")


const mainController = {
    index: (req, res) => {
        db.Movies.findAll({
            order: [
                ["title", "ASC"]
            ]
        })
            .then(movies => {
                // console.log(JSON.stringify(movies, null, 4))
                res.render("index", { movies: movies, session: req.session })
            })
            .catch(error => {
                console.error("Error")
            })

    },
    detail: async (req, res) => {
        try {
            const movie = await db.Movies.findByPk(req.params.id, {
                include: [{ association: "genre" }, { association: "actors" }]
            })
            res.render("detail", { movie, session: req.session })
        } catch (error) {
            console.error(error)
        }

    },

    genres: async (req, res) => {
        try {
            const genres = await db.Genres.findAll()

            res.render("genres", { genres: genres, session: req.session })
        } catch (error) {
            console.error(error)
        }
    },

    createForm: async (req, res) => {

        try {
            const genres = await db.Genres.findAll()

            res.render("createForm", { genres, session: req.session })

        } catch (error) {
            console.error(error)
        }
    },

    create: async (req, res) => {

        const validations = validationResult(req)

        if (validations.errors.length > 0) {
            try {
                const genres = await db.Genres.findAll()
                return res.render("createForm", { errors: validations.mapped(), old: req.body, genres, session: req.session })
            } catch (error) {
                console.error(error)
            }
        }

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

    editForm: (req, res) => {

        const genres = db.Genres.findAll()
        const movie = db.Movies.findByPk(req.params.id)

        Promise.all([genres, movie])
            .then(([genres, movie]) => {
                res.render("editForm", { movie: movie, genres: genres, session: req.session })
            })
            .catch(error => {
                console.error(error)
            })

    },

    update: (req, res) => {

        const validations = validationResult(req)

        if (validations.errors.length > 0) {
            const genres = db.Genres.findAll()
            const movie = db.Movies.findByPk(req.params.id)

            Promise.all([genres, movie])
                .then(([genres, movie]) => {
                    return res.render("editForm", { errors: validations.mapped(), old: req.body, movie: movie, genres: genres, session: req.session })
                })
                .catch(error => {
                    console.error(error)
                })
        
        }

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