const { body } = require('express-validator')

const validations = [
    body('name')
        .notEmpty().withMessage('Debe ingresar un nombre')
        .bail()
        .isAlpha().withMessage('Solo debe contener letras'),
    body('email')
        .notEmpty().withMessage('Debe ingresar un email')
        .bail()
        .isEmail().withMessage('Debe ingresar un email valido'),
    body('password')
        .notEmpty().withMessage('Debe ingresar una contraseña')
        .bail()
        .isLength({ min:5 }).withMessage('Debe contener al menos 5 caracteres'),
]


   
module.exports = validations