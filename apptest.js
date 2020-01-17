const mongoose = require('mongoose'),
    Article = require('./database/models/Article');


mongoose.connect('mongodb://localhost:27017/blog-test', {
    useUnifiedTopology: true
});









//find id plus update

// Article.findByIdAndUpdate("5e1a08ce74b2b32e3837546d", {

//         title: 'changement'
//     },
//     (err, post) => {

//         console.log(err, post);

//     })



//find by id 

// Article.findById("_id", (err, Article) => {

//     console.log(err, Article);

// })





//permet d'afficher du contenue 


// Article.find({}, (err, articles) => {
//     console.log(err, articles);

// })


//permet d'ajoutyer du contenue 

// Article.create({

//     title: "test",
//     intro: "test",
//     content: "test"

// }, (error, post) => {

//     console.log(error, post)

// });