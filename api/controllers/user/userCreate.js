module.exports = {

    get: (req, res) => {
        
        console.log(req.flash('data'));

        res.render('register', {

            errors: req.flash('registerError'),
            data: req.flash('data')[0]



        })
    }


}