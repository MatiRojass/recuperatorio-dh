const db = require("../database/models")
const { validationResult } = require('express-validator')

const usersController = {
    registerForm: (req, res) => {
        res.render("register")
    },

    register: (req, res) => {

        const validations = validationResult(req)

        if(validations.errors.length > 0){
            return res.render("register", { errors: validations.mapped(), old: req.body })
        }

        db.Users.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        })

        res.redirect("/")
    },

    loginForm: (req, res) => {
        res.render("login")
    },

    login: async (req, res) => {
        
        const { email, password } = req.body

        try {
            user = await db.Users.findOne({ where: { email: email } }) 

            if(user && user.password == password){
                req.session.user = user

                if(req.body.rememberMe != undefined){
                    res.cookie("rememberMe", user.email, {maxAge: 600000})
                }
                
                res.redirect("/")
            }else{
                res.send("Email o Contraseña invalidos")
            }
        } catch (error) {
            console.error(error)
        } 
    },

    check: (req, res) => {
        if(req.session.user != undefined){
            res.send("Hola " + req.session.user.name)
        } else {
            res.send("No estas logueado")
        }
    },

    logout: (req, res)=>{
         // Eliminar la sesión
        req.session.destroy(function(err) {
        if(err) {
            console.error(err);
        } else {
            // Eliminar la cookie
            res.clearCookie('user');
            
            // Redirigir al usuario a la página de inicio de sesión o a otra página
            res.redirect('/');
        }
    });
    }

}

module.exports = usersController