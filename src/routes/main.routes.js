const express = require("express")
const Router = express.Router()
const mainController = require("../controllers/mainController")

Router.get("/", mainController.index)

module.exports = Router