const express = require('express'),
    app = express(),
    router = express.Router(),
    homepage = require('../controllers/pages/homepage'),
    articleAddController = require('../controllers/article/articleAdd'),
    articleSingleController = require('../controllers/article/articleSingle'),
    articleEditorController = require('../controllers/article/articleEditor'),
    contactController = require('../controllers/pages/contact'),
    userCreate = require('../controllers/user/userCreate'),
    userRegister = require('../controllers/user/userRegister'),
    userLogin = require('../controllers/user/userLogin'),
    userLoginAuth = require('../controllers/user/userLoginAuth'),
    userLogout = require('../controllers/user/userLogout'),
    commentairePost = require('../controllers/article/commentaire/commentairePost'),
    commentaireDelete = require('../controllers/article/commentaire/commentaireDelete'),
    adminPage = require('../controllers/admin/adminPage');
    chatPage = require('../controllers/pages/chatPage')
//Middleware
const
    redirectAuthSucess = require('../../middleware/redirectAuthSucess'),
    isAdmin = require('../../middleware/isAdmin'),
    auth = require('../../middleware/auth'),
    articleValidPost = require('../../middleware/articleValidPost');



// index
router.get('/', homepage);



//Article

router.route('/article/add')
    .get(articleAddController.get)
    .post(articleAddController.post);


router.route('/article/:id')
    .get(articleSingleController.get);


router.route('/article/:id/articleEditor')
    .get(articleEditorController.get)
    .post(articleEditorController.post)


router.route('/commentaire/:id')
    .get(isAdmin, commentaireDelete.get)
    .post(auth, commentairePost.post);

//User

router.route('/user/logout')
    .get(userLogout.get);

router.route('/user/login')
    .get(redirectAuthSucess, userLogin.get);

router.route('/user/create')
    .get(redirectAuthSucess, userCreate.get);

router.route('/user/loginAuth')
    .post(redirectAuthSucess, userLoginAuth.post);

router.route('/user/register')
    .post(redirectAuthSucess, userRegister.post);




//chat
router.route('/chat')
    .get(auth, chatPage.get)




router.route('/admin') 
    .get(isAdmin, adminPage.get)

//Contact

router.route('/contact')
    .get(contactController.get)

app.use("/articles/post", articleValidPost);


app.use("/articles/add", auth)


module.exports = router;