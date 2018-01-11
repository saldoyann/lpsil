var User = require('../modele/user.js');

module.exports.connect = function(req,res){

	User.findAll({
		where: {
			nom: req.body.nom,
			mdp: req.body.mdp
		}
	}).then(function(user){
		req.session.user=user[0].dataValues.nom;
 		res.cookie( "name" ,req.session.user ,{ maxAge: 1000 * 60 * 10, httpOnly: false });
		res.redirect("/home"/*,{result :req.session.user }*/);
	}).catch(function(err){
		console.log(err)
		res.render("error",{result : "KO"});
	});
}

module.exports.inscription = function(req,res){

	User.create({ nom: req.body.nom, prenom: req.body.prenom, mdp: req.body.mdp, email: req.body.email })
	.then(user => {
		return res.render("login") 
	})
}

/*module.exports.suppr = function(req,res){

}	*/
