const mongoose=require('mongoose')
,       bcrypt = require('bcrypt');


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
        }
})

UserSchema.pre('save',  function (next) {

        const user = this

        bcrypt.hash(user.password, 10, (err, encrypted) => {
                user.password = encrypted
                next()
        })

})


module.exports =  mongoose.model('User', UserSchema)