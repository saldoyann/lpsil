var Produit = require('../modele/produit.js');
var sequelize = require('../base.js');

module.exports.ajout = function(req,res){
	//console.log(req.body);
  Produit.create({
  	nomProduit: req.body.nomProduit,
    descriptionProduit: req.body.descriptionProduit,
  	prixProduit: req.body.prixProduit,
  	quantiteProduit: req.body.quantiteProduit
  }).then(produit => {
    res.render('panneauAdmin');
  })
}

module.exports.suprProduit = function(req,res){

  Produit.destroy({
    where: { id: req.body.idProduit }
  }).then(produit=> {
    res.render('panneauAdmin');
  }).catch(function(err){
    res.render("error",{result: "Erreur: suppression non effectué"});
  });
}

module.exports.getProduit = function(req,res){

	sequelize.query("SELECT * FROM `produit`", { type: sequelize.QueryTypes.SELECT})
	.then(listeProduit=> {
		res.render("home", {listeProduit: listeProduit});
	})
}
