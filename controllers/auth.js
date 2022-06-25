const bcrypt = require('bcrypt');
const user = require('../models/user');


exports.signup =(req, res, next) => {
bcrypt.hash(req.body.password, 10)
  //On récupere le hash de mot de passe que l'on va enregistrer ds un nouveau user
   .then(hash => {
      const user = new user({
         email: req.body.email,
         password: hash
    })
    user.save()
      .then(() => res.status(201).json({message: 'Utilisateur crée!'}))
      .catch(error => res.status(400).json({error}));


   })
   .catch(error => res.status(500).json({error}));
  
  
      //Enregistrer le user ds la base de donnée
      user.save()
      .then(() => res.status(201).json({ message: 'Utilisateur crée !'}))
      .catch(error => res.status(400).json({error}));
   };
  
  exports.login = (req, res, next) =>{
user.findOne({ email: req.body.email})
  .then(user => {
    if (!user) {
      return res.status(401).json({ error: 'Utilisateur non trouvé!'});
    }
      bcrypt.compare(req.body.password, user.password)
         .then(valid => {
            if(!valid) {
               return res.status(401).json({ error: 'Mot de passe incorect'});
            }
            res.status(200).json({
               userId: user._id,
               token:'TOKEN'

            });

         })

         .catch(error => res.status(500).json({ error}));
   })
  .catch(error => res.status(500).json({ error}));
  };    
 






 //Crypter le mot passe
 //Verifier que le mail a un bon format
    // formValidation.email = validateControl(this, "^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$", "emailErrorMsg", "Email non valide");
 //Utiliser crypto js pour hacher le mail
 

 //Au niveau du login 
 //Gestion du token
 //Verifier que l utilisateur existe ds la base de donnée
 //si il exsiste retourne un token et un status200
 //si il n'existe pas retourne un status 401
 //Bcryt.compare pour comparer le password saisie et le password ds la base