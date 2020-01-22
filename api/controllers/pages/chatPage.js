const Model = require('../../../database/models/Model'),
    User = require('../../../database/models/User');

// Page Index racine 
module.exports = {



    get: async (req, res) => {
        const dbModel = await Model.find({})
        const dbUser = await User.find({})
        const sess = req.session

        res.render('chat', {
            dbModel,
            dbUser,
            sess
        })
    }

}