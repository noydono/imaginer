
const Post = require('../../../database/models/Article')

module.exports = async (req, res) => {

    const dbposts = await Post.find({})
          posts = dbposts.reverse().slice(0,4)

   
    

    res.render('index', {
        posts
    })

}