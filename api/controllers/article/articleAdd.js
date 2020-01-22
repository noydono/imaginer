const
    Post = require('../../../database/models/Article'),
    path = require('path'),
    fileupload = require('express-fileupload');


module.exports = {


    get: (req, res) => {

        if (req.session.userId) {

            res.render('articles/add')

        } else {

            res.redirect('/user/login')

        }

    },
    post: (req, res) => {


        const {image} = req.files;
        const uploadFile = path.resolve(__dirname,'..','..','..', 'public/articles', image.name)

        image.mv(uploadFile, (err) => {
            Post.create(

                {
                    ...req.body,
                    image: `/articles/${image.name}`
                }, (err, post) => {
                    res.redirect('/')

                })
        })

        console.log(req.files);
        


    }

};





















































// app.route('/article/add')
//         .get(function(req, res){




// if (req.session.userId) {

// return res.render('articles/add')

// } else {

//     res.redirect('/user/login')

// }

// })
// .post((req, res) => {

// const { image } = req.files;
// const uploadFile = path.resolve(__dirname, '..', 'public/articles', image.name)

// image.mv(uploadFile, (err) => {
//     Post.create(

//         {
//             ...req.body,
//             image: `/articles/${image.name}`
//         }, (err, post) => {
//             res.redirect('/')

//         })
// })

// })