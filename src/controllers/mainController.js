const db = require("../database/models")

const mainController = {
    index: (req, res)=>{
        db.Movies.findAll({
            order: [
                ["title", "ASC"]
            ]
        })
        .then(movies =>{
            // console.log(JSON.stringify(movies, null, 4))
            res.render("index", {movies: movies})
        })
        .catch(error => {
            console.error("Error")
        })
        
    }  
}

module.exports = mainController