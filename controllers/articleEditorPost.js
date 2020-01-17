const Post = require('../database/models/Article')
    , path = require('path');

module.exports = async (req, res) => {


  // db post id de l'article avant modif 
  // query id de l'article dan sun obj   
    
    const query = { _id: req.params.id }
    const dbPost = await Post.findById({_id: req.params.id})

    
    

    Post.findByIdAndUpdate(query, {

        title: req.body.title,
        content: req.body.content
    },
    (err, post) => {

        res.redirect('/')

    })

}







