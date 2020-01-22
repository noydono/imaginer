module.exports = {

    get: (req, res) => {
        
        console.log(req.session);
        req.session.destroy(() => {
            res.redirect('/')
        })
    }


}