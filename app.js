const
    express = require('express'),
    app = require('express')(),
    http = require('http').Server(app)
io = require('socket.io')(http);
router = express.Router(),
    Handlebars = require('handlebars'),
    hbs = require('express-handlebars'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    fileupload = require('express-fileupload'),
    expressSession = require('express-session'),
    MongoStore = require('connect-mongo'),
    connectFlash = require('connect-flash'),
    {
        stripTags
    } = require('./helpers/hbs'),
    port = 3000,
    ROUTER = require('./api/router/router');
//mongoose
// mongoose.connect('mongodb://localhost:27017/blog', {

//     useNewUrlParser: true,
//     useUnifiedTopology: true
// })

const db = require('./config/keys.js').MongoUrl
mongoose

    .connect(db, {

        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('connecter a mongo cloud'))
    .catch(err => console.log(err));


var handlebars = require('handlebars');
var momentHandlebars = require('handlebars.moment');
momentHandlebars.registerHelpers(handlebars);

//express
const mongoStore = MongoStore(expressSession)


const session = expressSession({

    secret: 'securite',
    name: 'biscuit',
    saveUninitialized: true,
    resave: false,
    store: new mongoStore({
        mongooseConnection: mongoose.connection
    })

}),
sharedsession = require("express-socket.io-session");

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
    layoutsDir: __dirname + '/views/layouts/',
    helpers: {
        stripTag: stripTags
    },

}));

app.use(session)
app.use('*', (req, res, next) => {


    if (res.locals.user = req.session.userId) {
        if (req.session.status === 'user') {

            if (req.session.isAdmin === true) {



                res.locals.isAdmin = req.session.isAdmin

            }
            res.locals.user = req.session.status


        }
    }
    // La function next permet qu'une fois la condition effectuer il reprenne son chemin
    next()
})

io.use(sharedsession(session));
io.on('connection', function (socket) {
    console.log(socket.handshake.session.nameSess);
    
    name = socket.handshake.session.nameSess
    console.log(name + ' user connected');

    socket.on('new user', (name) => {
        console.log(name);
        io.emit(' new user ', name + ' est connecter')
    })

    socket.on('disconnect', function () {

        console.log(name + ' is disconnected');

    })

    socket.on('chat message', function (msg) {

        name = socket.handshake.session.nameSess
        io.emit('chat message', name + ':' + ' ' + msg)

    })

})

app.use('/', ROUTER)

app.use((req, res) => {
    res.render('error404')
})

http.listen(process.env.PORT, function () {
    console.log('server on sur le PORT');

})
