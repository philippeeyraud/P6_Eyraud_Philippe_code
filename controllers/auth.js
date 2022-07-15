const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const User = require('../models/user');

//Création de nouveau user à partir de l'app frontend
//On récupere le hash du mot de passe que l'on va enregistrer ds un nouveau user ds la base de donnée
//On enregistre le user ds la base de donnée
exports.signup =(req, res, next) => {
   console.log(`req body = ${JSON.stringify(req.body)}`);
bcrypt.hash(req.body.password, 10)
   .then(hash => {
      console.log(hash);
      const user = new User({
         email: req.body.email,
         password: hash
    })
    console.log(`user = ${JSON.stringify(user)}`);
     user.save()

      .then(() => res.status(201).json({message: 'Utilisateur crée!'}))

      .catch((error) => {
         console.log (`error ${error}`);
         return res.status(400).json({error})
      }
      );
    })
   .catch(error => res.status(500).json({error}));
 
   };
  //On utilise login pour que l'utilisateur existant puisse se connecter à l'application
  //On va trouver le user, ds la base de donnée ,qui correspond à l'adresse email qui est rentré par l'utilisateur ds l'appliocation 
  //On compare le mot de passe entré avec le hash donné ds la base de donnée
  //Si la comparaison est bonne on lui revoi le userid et le token
  exports.login = (req, res, next) =>{

   User.findOne({ email: req.body.email})
 
  .then(user => {
    if (user === null) {
       res.status(401).json({ message: 'Paire identifiant /mot de passe incorect'});
      
        
    }
    else {
      bcrypt.compare(req.body.password, user.password)
      .then(valid => {
            if(!valid) {
                res.status(401).json({ message: 'Paire identifiant /mot de passe incorect'});
            }
         
            else{
            res.status(200).json({
               userId: user._id,
               token: jwt.sign(
                  { userId: user._id},
                     process.env.SECRET_TOKEN
                     
               )
               
              
             });
            }
         })

         .catch(error => {
            res.status(500).json({ error});
         })
      }
   })
  .catch(error =>{res.status(500).json({ error});
}) 
};









 //Crypter le mot passe
 //Verifier que le mail a un bon format
    // formValidation.email = validateControl(this, "^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$", "emailErrorMsg", "Email non valide");
 //Utiliser crypto js pour hacher le mail


