var User = require('../modele/user.js');


User.sync().then(function () {
User
  .create({ nom: 'John', prenom: 'senior engineer', mdp:'111', email:'a@email.com' })
  .then(user => {
  	console.log(user);
    console.log(user.get('nom')); // John Doe (SENIOR ENGINEER)
    console.log(user.get('prenom')); // SENIOR ENGINEER

    User.findAll({
	where: {
		nom: "John",
		mdp: "111"
	}
}).then(function(res){
	console.log(res)
}).catch(function(err){
	console.log(err)
});
  })

});


