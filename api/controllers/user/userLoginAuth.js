const User = require('../../../database/models/User'),
    bcrypt = require('bcrypt');


module.exports = {

    post: (req, res) => {
        
        const {email,password} = req.body;

        User.findOne({
            email
        }, (error, user) => {

            if (user) {

                bcrypt.compare(password, user.password, (error, same) => {
                    if (same) {


                        req.session.userId = user._id

                        req.session.nameSess = user.name

                        req.session.status = user.status

                        req.session.isAdmin = user.isAdmin

                        



                        res.redirect('/')

                    } else {
                        res.redirect('/user/login')

                    }
                })
            } else {
                return res.redirect('/user/login')
            }


        })
    }
}