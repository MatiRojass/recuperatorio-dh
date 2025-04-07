const express = require("express")
const app = express()
const path = require("path")
const methodOverride = require("method-override")
const session = require("express-session")
const cookieParser = require("cookie-parser")
const PORT = 4321

app.set("views", path.join(__dirname, "./views/"))
app.set("view engine", "ejs")

app.use(express.static(path.join(__dirname, "../public")))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(session({
    secret: "secreto",
    resave: false, 
    saveUninitialized: false
}))
app.use(methodOverride("_method"))
app.use(cookieParser())

app.listen(PORT, ()=>{
    console.log(`\tServidor corriendo en el puerto ${PORT}`)
    console.log(`\tURL: http://localhost:${PORT}`)
})




const mainRouter = require("./routes/main.routes")
app.use("/", mainRouter)