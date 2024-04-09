const { body } = require('express-validator')

const validations = [
    body('title')
        .notEmpty().withMessage('Debe ingresar un titulo')
        .bail()
        .isString().withMessage('Debe ser una cadena de texto'),
    body('rating')
        .notEmpty().withMessage('Debe ingresar un rating')
        .bail()
        .isFloat({ min: 0, max: 10 }).withMessage('El rating debe ser un número decimal entre 0 y 10'),
    body('release_date')
        .notEmpty().withMessage('Debe ingresar una fecha de estreno'),
    body('length')
        .notEmpty().withMessage('Debe ingresar una duracion')
]


   
module.exports = validations