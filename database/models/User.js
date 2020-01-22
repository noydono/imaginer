const mongoose = require('mongoose'),
        bcrypt = require('bcrypt');


const UserSchema = new mongoose.Schema({

        name: {
                type: String,
                required: [true, 'le nom est obligatoire']

        },
        email: {
                type: String,
                required: [true, 'l\'email est obligatoire'],
                unique: true
        },
        password: {
                type: String,
                required: [true, 'le password est obligatoire']
        },
        googleId: String,
        status: {
                type: String,
                default: 'user'
        },
        isVerified: {
                type: Boolean,
                default: false
        },
        isAdmin: {
                type: Boolean,
                default: false
        },
        isBan: {
                type: Boolean,
                default: false
        },
        logo: {
                type: String,
                default: "https://s2.qwant.com/thumbr/0x380/6/e/46f11d586d9cbdb2eb380182ce63468791ede023d2a2ac4fc38ac1e8443d0e/img_210318.png?u=http%3A%2F%2Fcdn.onlinewebfonts.com%2Fsvg%2Fimg_210318.png&q=0&b=1&p=0&a=1"
        },

})

UserSchema.pre('save', function (next) {

        const user = this

        bcrypt.hash(user.password, 10, (err, encrypted) => {
                user.password = encrypted
                next()
        })

})


module.exports = mongoose.model('User', UserSchema)