var Produit = require('../modele/produit.js');
var jsonQ=require("jsonq");

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

  Produit.all().then(listeProduit=>{
    //console.log(listeProduit);
    var lignes = JSON.stringify(listeProduit);
    var jsonQobj=jsonQ(lignes);
    var listeId = jsonQobj,
        id = listeId.find('id');
    var listeNom = jsonQobj,
        nom = listeNom.find('nomProduit');
    var listePrix = jsonQobj,
        prix = listePrix.find('prixProduit');
    var listeDescription = jsonQobj,
        description = listeDescription.find('descriptionProduit');
    var listeQuantite = jsonQobj,
        quantite = listeQuantite.find('quantiteProduit');
    //console.log(id.value());
    //console.log(lignes);
    res.render("home", {id: id.value(), nom: nom.value(), prix: prix.value(), description: description.value(), quantite: quantite.value() });
  })
}
