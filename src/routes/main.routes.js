const express = require("express")
const router = express.Router()
const mainController = require("../controllers/mainController")
const moviesController = require("../controllers/moviesController")

router.get("/", mainController.index)

router.get("/genres", moviesController.genres)

//crear pelicula
router.get("/create", moviesController.createForm)
router.post("/create", moviesController.create)

//editar pelicula
router.get("/:id/edit", moviesController.editForm)
router.post("/:id/edit", moviesController.update)

//eliminar pelicula
router.post("/:id/delete", moviesController.delete)

router.get("/:id", moviesController.detail)

module.exports = router