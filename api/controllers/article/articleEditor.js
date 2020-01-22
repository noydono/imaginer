const Post = require('../../../database/models/Article'),
    path = require('path');

module.exports = {


    get: async (req, res) => {
        const article = await Post.findById(req.params.id)

        res.render('articleEditor', {
            article
        })
    },

    post: async (req, res) => {


        const query = {

            _id: req.params.id

        }
        const dbPost = await Post.findById({

            _id: req.params.id

        })

        Post.findByIdAndUpdate(query, {

                title: req.body.title,
                content: req.body.content
            },
            (err, post) => {

                res.redirect('/')

            })
    }

}