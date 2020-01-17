module.exports= (req,res) => {
    
    console.log(req.session);
    req.session.destroy( () => {
        res.redirect('/')
    })

}