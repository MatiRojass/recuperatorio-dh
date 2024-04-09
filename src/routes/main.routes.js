const express = require("express")
const router = express.Router()
const moviesController = require("../controllers/moviesController")
const usersController = require("../controllers/usersController")

const registerValidations = require("../middlewares/registerValidations")
const moviesValidations = require("../middlewares/moviesValidations")
const authMiddleware = require("../middlewares/authMiddleware")

router.get("/", moviesController.index)

//USERS
router.get("/login", usersController.loginForm)
router.post("/login", usersController.login)
router.get("/register", usersController.registerForm)
router.post("/register", registerValidations, usersController.register)
router.get("/check", usersController.check)
router.get("/logout", usersController.logout)


router.get("/genres", moviesController.genres)

//crear pelicula
router.get("/create", authMiddleware, moviesController.createForm)
router.post("/create", moviesValidations, moviesController.create)

//editar pelicula
router.get("/movie/:id/edit", authMiddleware, moviesController.editForm)
router.post("/movie/:id/edit", moviesValidations, moviesController.update)

//eliminar pelicula
router.post("/movie/:id/delete", authMiddleware,moviesController.delete)

router.get("/movie/:id", moviesController.detail)

module.exports = router