function rememberMeMiddleware(req, res, next){
    next()

    if(req.cookies.user != undefined && req.session.user == undefined){
        
    }
}

module.exports = rememberMeMiddleware