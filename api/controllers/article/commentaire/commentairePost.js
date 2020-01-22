const Com = require('../../../../database/models/Commentaire'),
    Post = require('../../../../database/models/Article');


module.exports = {


    post: async (req, res) => {

        const article = await Post.findById({
            _id: req.params.id
        })


        Com.create(

            {
                articleID: article._id,
                name: req.session.nameSess,
                content: req.body.content,
                avatar: String,



            }, (err, post) => {
                res.redirect('/')

            }
            )



    }
}