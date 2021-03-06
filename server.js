var express = require('express');
var morgan = require('morgan'); // Charge le middleware de logging
var logger = require('log4js').getLogger('Server');
var bodyParser = require('body-parser');
require('./base.js');
var app = express();
var user = require('./modele/user.js');
var userController = require('./controller/user.js');
var produit = require('./modele/produit.js');
var produitController = require('./controller/produit.js');
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
	res.render('login', { req: req});
});

app.get('/inscription', function(req,res){
	res.render('inscription');
});

app.get('/ping', function(req, res){
    res.send('ping');
});

app.get('/home', produitController.getProduit);

app.get('/suprProduit', produitController.getProduitForDelete);

app.get('/profil', function(req, res){
    var id = req.query.id;
    var nom = req.query.nom;
    var prenom = req.query.prenom;
    var email = req.query.email;
    res.render('profil', {id: id, nom: nom, prenom: prenom, email: email});
});

app.get('/modifMdp', function(req, res){
    res.render('modifMdp');
});

app.get('/connectionAdmin', function(req, res){
    res.render('connectionAdmin');
});

app.get('/panneauAdmin', function(req, res){
    res.render('panneauAdmin');
});

app.get('/ajoutProduit', function(req, res){
    res.render('ajoutProduit');
});

app.get('/deconnexion', userController.clearCookie);

app.get('/suprUsers', userController.getAllUsers);

app.get('/modifUsers', userController.getAllUsersForModif);

app.post('/login',userController.connect)

app.post('/inscription',userController.inscription)

app.post('/home',userController.getProfil)

app.post('/profil',userController.modifProfil)

app.post('/modifMdp',userController.changerMdp)

app.post('/connectionAdmin', userController.connectAdmin)

app.post('/ajoutProduit', produitController.ajout)

app.post('/suprUsers', userController.suprUsers)

app.post('/modifUsers', userController.modifUsers)

app.post('/suprProduit', produitController.suprProduit)

app.listen(process.env.PORT || 1313);

// app.delete('', userController.suprr)
