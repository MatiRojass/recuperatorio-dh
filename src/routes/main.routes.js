const express = require("express")
const Router = express.Router()
const mainController = require("../controllers/mainController")
const moviesController = require("../controllers/moviesController")

Router.get("/", mainController.index)

Router.get("/details/:id", moviesController.detail)
Router.get("/genres", moviesController.genres)
Router.get("/create", moviesController.createForm)

module.exports = Router