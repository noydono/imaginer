const Com = require('../../../../database/models/Commentaire');


module.exports = {

    get: (req, res) => {

        console.log('cc');
        
        Com.findByIdAndRemove(req.params.id, {

            useFindAndModify: false

        }, function (err) {

            if (!err) {

                res.redirect('/')

            } else {

                res.send(err)
            }
            
        })
    }


}