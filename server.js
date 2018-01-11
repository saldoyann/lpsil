var express = require('express');
var morgan = require('morgan'); // Charge le middleware de logging
var logger = require('log4js').getLogger('Server');
var bodyParser = require('body-parser');
require('./base.js');
var app = express();
var user = require('./modele/user.js');
var userController = require('./controller/user.js');
var session = require('express-session');

// config
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use(bodyParser.urlencoded({ extended: false}));
app.use(morgan('combined')); // Active le middleware de logging

app.use(express.static(__dirname + '/public')); // Indique que le dossier /public contient des fichiers statiques (middleware chargé de base)

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}));

logger.info('server start');

app.get('/', function(req, res){
    res.redirect('/login');
});

app.get('/login', function(req,res){
	res.render('login');
});

app.get('/inscription', function(req,res){
	res.render('inscription');
});

app.get('/ping', function(req, res){
    res.send('ping');
});

app.get('/home', function(req, res){
    res.render('Acchome');
});

app.post('/login',userController.connect)

app.post('/inscription',userController.inscription)


app.listen(process.env.PORT || 1313);

// app.delete('', userController.suprr)

