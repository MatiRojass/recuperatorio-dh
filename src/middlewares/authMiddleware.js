const db = require("../database/models");

async function authMiddleware(req, res, next) {
    try {
        if (req.session.user == undefined) {
            res.send("Necesitas ingresar");
            return;
        }

        const user = await db.Users.findOne({ where: { email: req.session.user.email } });

        if (user && user.rol == 1) {
            next();
        } else {
            res.send("Necesitas permisos de administrador");
        }
    } catch (error) {
        console.error(error);
    }
}

module.exports = authMiddleware;