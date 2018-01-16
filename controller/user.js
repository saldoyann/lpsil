var User = require('../modele/user.js');

module.exports.connect = function(req,res){

	User.findAll({
		where: {
			nom: req.body.nom,
			mdp: req.body.mdp
		}
	}).then(function(user){
		req.session.user=user[0].dataValues.id;
 		res.cookie( "id",req.session.user ,{ maxAge: 1000 * 60 * 10, httpOnly: false });
		res.cookie( "nom",user[0].dataValues.nom ,{ maxAge: 1000 * 60 * 10, httpOnly: false });

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
