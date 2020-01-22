const Post = require('../../../database/models/Article'),
    Com = require('../../../database/models/Commentaire');


module.exports = {


    get: async (req, res) => {

        const dbCom = await Com.find({ articleID: req.params.id})

        Coms = dbCom.reverse()

        const article = await Post.findById(req.params.id)
        
        res.render('article', {

            article,
            Coms

        })

    }
    

}