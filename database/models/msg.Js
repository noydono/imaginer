const mongoose=require('mongoose');


const msgSchema = new mongoose.Schema({

        name: String,
        content: String
        

})

const chatMsg = mongoose.model('message', msgSchema);


module.exports = chatMsg