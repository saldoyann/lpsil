var User = require('../modele/user.js');
var sequelize = require('../base.js');

module.exports.connect = function(req,res){

	User.findAll({
		where: {
			nom: req.body.nom,
			mdp: req.body.mdp
		}
	}).then(function(user){
		req.session.user=user[0].dataValues;
		id = req.session.user.id;
 		res.cookie( "id",id ,{ maxAge: 1000 * 60 * 10, httpOnly: false });
		res.redirect("/home"/*,{result :req.session.user }*/);
	}).catch(function(err){
		console.log(err)
		res.render("error",{result : "Le nom ou le mot de passe est incorrect"});
	});
}

module.exports.inscription = function(req,res){

	User.create({ nom: req.body.nom, prenom: req.body.prenom, mdp: req.body.mdp, email: req.body.email, admin:0 })
	.then(user => {
		return res.render("login");
	})
}

module.exports.getProfil = function(req,res){

	User.findById(req.body.voirProfil).then(function(userProfil){
		//console.log(userProfil.id);
		var id = userProfil.id;
		var nom = userProfil.nom;
		var prenom = userProfil.prenom;
		var email = userProfil.email;
		var mdp = userProfil.mdp;
		res.redirect('/profil?id='+id+'&nom='+nom+'&prenom='+prenom+'&email='+email);
		//res.render("profil", { id: id, nom: nom, prenom: prenom, email: email, mdp: mdp});
}).catch(function(err){
	console.log(err)
	res.render("error",{result : "KO"});
});
}

module.exports.modifProfil = function(req,res){
	//console.log(userProfil.id);
					User.update({
					nom: req.body.nomUser,
					prenom: req.body.prenomUser,
					email: req.body.emailUser,
				},
				{ where: {id: req.body.idUser}} )
				.then(function(user){
					res.redirect('/home');
				}).catch(function(err){
					res.render("error",{result: "KO"});
				});
}

module.exports.changerMdp = function(req,res){

		User.update({
			mdp: req.body.nouveauMdp
		},
		{ where: {mdp: req.body.ancienMdp}} )
		.then(function(user){
		res.redirect('/home');
	}).catch(function(err){
		res.render("error",{result: "KO"});
	});
}

module.exports.connectAdmin = function(req,res){

	User.findAll({
		where: {
			nom: req.body.nomAdmin,
			mdp: req.body.mdpAdmin,
			admin: 1
		}
	}).then(function(user){
		req.session.user=user[0].dataValues.id;
 		res.cookie( "id",req.session.user ,{ maxAge: 1000 * 60 * 10, httpOnly: false });
		//res.cookie( "id",user[0].dataValues.id ,{ maxAge: 1000 * 60 * 10, httpOnly: false });

		res.redirect("/panneauAdmin"/*,{result :req.session.user }*/);
	}).catch(function(err){
		console.log(err)
		res.render("error",{result : "Le compte n'existe pas ou n'est pas un administrateur du site"});
	});
}

module.exports.getAllUsers = function(req,res){

	sequelize.query("SELECT * FROM `user`", { type: sequelize.QueryTypes.SELECT})
	.then(listeUsers=>{
		res.render("suprUsers", {listeUsers: listeUsers});
	})
}

module.exports.getAllUsersForModif = function(req,res){

	sequelize.query("SELECT * FROM `user`", { type: sequelize.QueryTypes.SELECT})
	.then(listeUsersForModif=>{
		res.render("modifUsers", {listeUsersForModif: listeUsersForModif});
	})
}

module.exports.suprUsers = function(req,res){

  User.destroy({
    where: { id: req.body.idUsers }
  }).then(user=> {
    res.render('panneauAdmin');
  }).catch(function(err){
    res.render("error",{result: "Erreur: suppression de l'utilisateur non effectué"});
  });
}

module.exports.modifUsers = function(req,res){

	User.update({
	nom: req.body.nomModifUser,
	prenom: req.body.prenomModifUser,
	email: req.body.emailModifUser,
	mdp: req.body.mdpModifUser,
},
{ where: {id: req.body.idModifUser}} )
.then(function(user){
	res.redirect('/panneauAdmin');
}).catch(function(err){
	res.render("error",{result: "Erreur : modification données utilisateurs non effectuées"});
});
}

module.exports.clearCookie = function (req,res){
	req.session.destroy();
	res.clearCookie("id");
	res.redirect("/");
}
