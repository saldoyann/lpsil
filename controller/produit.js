var Produit = require('../modele/produit.js');

module.exports.ajout = function(req,res){
	console.log(req.body);
  Produit.create({
  	nomProduit: req.body.nomProduit, 
  	prixProduit: req.body.prixProduit, 
  	quantiteProduit: req.body.quantiteProduit 
  }).then(produit => {
    res.render('panneauAdmin');
  })
}
