module.exports = (req, res, next) => {
    if(!req.files){

        return res.redirect('/')
    }
    
    console.log("je suis un middleware");
    next()

}
