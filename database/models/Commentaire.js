const mongoose=require('mongoose');


const CommentaireSchema = new mongoose.Schema({

        articleID: String,
        name: String,
        content: String,
        avatar : String,
        createDate: {
            type: Date,
            default: new Date()
    }
        

})

const Commentaire = mongoose.model('Commentaire', CommentaireSchema);


module.exports = Commentaire