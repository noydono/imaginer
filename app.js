


const
    express = require('express'),
    app = express(),
    Handlebars = require('handlebars'),
    hbs = require('express-handlebars'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    fileupload = require('express-fileupload'),
    expressSession = require('express-session'),
    MongoStore= require('connect-mongo'),
    connectFlash = require('connect-flash'),
    {stripTags} = require('./helpers/hbs'),
    Post = require('./database/models/Article')

    port = 3000;

//mongoose

const db = require('./config/keys.js').MongoUrl
mongoose
.connect( db , {      

    useNewUrlParser: true,
    useUnifiedTopology: true 
})
.then(() => console.log('connecter a mongo cloud'))
.catch(err => console.log(err));

////////controllers

//article

const
    articleAddController = require('./controllers/articleAdd'),
    homepage = require('./controllers/homepage'),
    articleSingleController = require('./controllers/articleSingle'),
    articlePostController = require('./controllers/articlePost'),
    articleEditor = require('./controllers/articleEditor'),
    articleEditorPost = require('./controllers/articleEditorPost');


//user

const
    userCreate = require('./controllers/userCreate'),
    userRegister = require('./controllers/userRegister'),
    userLogin = require('./controllers/userLogin'),
    userLoginAuth = require('./controllers/userLoginAuth'),
    userLogout = require('./controllers/userLogout');

//handlebar moment formater l'heure

var handlebars = require('handlebars');
var momentHandlebars = require('handlebars.moment');
momentHandlebars.registerHelpers(handlebars);

//express

const mongoStore = MongoStore(expressSession)

app.use (expressSession({

    secret:'securite',
    name: 'biscuit',
    saveUninitialized: true,
    resave: false,
    store: new mongoStore({
        mongooseConnection : mongoose.connection
    })

}));

//app.use
app.use(connectFlash())
app.use(fileupload());
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({

    extended: true

}));

//handlebars

app.set('view engine', 'hbs');
app.engine('hbs', hbs({

    extname: 'hbs',
    defaultLayout: 'main',
    helpers: {
        stripTag : stripTags
    },

}));



app.use('*', (req,res,next) =>{

    // dit que  res.locals.user ⁼ a user id qui est attacher au cockies 
    res.locals.user = req.session.userId;
    next()
    
})


//Middleware

const articleValidPost = require('./middleware/articleValidPost');
app.use("/articles/post", articleValidPost);


const auth = require('./middleware/auth');
app.use ("/articles/add", auth);

const redirectAuthSucess = require('./middleware/redirectAuthSucess');



app.get('/', homepage);


//Articles

app.get('/articles/add', auth, articleAddController);
app.get('/article/:id', articleSingleController);
app.get('/article/:id/articleEditor', auth, articleEditor);
app.post('/article/:id/articleEditor/post' , articleEditorPost);
app.post('/articles/post',articleValidPost, articlePostController);



//user


app.get('/user/create', redirectAuthSucess, userCreate);
app.post('/user/register',redirectAuthSucess, userRegister);
app.get('/user/login',redirectAuthSucess, userLogin);
app.post('/user/loginAuth',redirectAuthSucess, userLoginAuth);
app.get('/user/logout', userLogout);


//Contact

app.get('/contact', (req, res) => {

    res.render('contact')

});

app.use((req,res) => {
    res.render('error404')
})


// Handlebars.registerHelper('filter', (b) => {
   
//     const result =b.filter(c => revesB.length < 5)

//     return option.inverse(result)
// })


// Handlebars.registerHelper('filter', function(a) {
        

//      if(a.length < 5){

         
//          return a

//      }else{

//         return a.slice(0,4)
        
//      }
// })





app.listen(port, () => {

    console.log("le serveur tourne sur le prt: " + port);

});


