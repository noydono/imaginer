const User = require('../database/models/User')


module.exports = (req, res, next) => {
    //connecte toi dans la base de donnée
    User.findById(req.session.userId, (error, user) => {
        if (error || !user) {

            return res.redirect('/')
        }

            next()
        

        
    })
    
    //verifier le user

    //si il est dans la base de donnée

    //sinon tu le rediriges
}