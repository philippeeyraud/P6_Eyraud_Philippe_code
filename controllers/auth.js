const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const log = require('../utils/winston');
const sanitize = require('mongo-sanitize');
//Création de nouveau user à partir de l'app frontend
//On récupere le hash du mot de passe que l'on va enregistrer ds un nouveau user ds la base de donnée
//On enregistre le user ds la base de donnée
exports.signup = (req, res, next) => {
   log.info('SIGNUP');

   //Importation de cryptojs pour  chiffrer le mail
   const cryptojs = require("crypto-js");
   const validator = require("email-validator");
   // La fonction sanitize élimine toutes les clés qui commencent par '$' dans l'entrée,
   const emailIsValid = validator.validate(sanitize(req.body.email));
   if (!emailIsValid) {
      res.status(400).json({ message: 'email non valide' });
   } else {
      log.info("CONTENU :cryptojs");
      log.info(cryptojs);
      //Chiffre le mail avant de l'envoyer dans la base de donnée
      const emailCryptoJs = cryptojs.HmacSHA256(req.body.email, `${process.env.CRYPTOJS_EMAIL}`).toString();
      console.log("--->CONTENU: emailCryptoJs - contollers/auth")
      console.log(emailCryptoJs)


      bcrypt.hash(req.body.password, 10)
         .then(hash => {
            console.log(hash);
            const user = new User({
               email: emailCryptoJs,
               password: hash
            })


            console.log(`user = ${JSON.stringify(user)}`);
            user.save()

               .then(() => res.status(201).json({ message: 'Utilisateur crée!' }))

               .catch((error) => {
                  console.log(`error ${error}`);
                  return res.status(400).json({ error })
               }
               );
         })
         .catch(error => res.status(500).json({ error }));

   };
};

//On utilise login pour que l'utilisateur existant puisse se connecter à l'application
//On va trouver le user, ds la base de donnée ,qui correspond à l'adresse email qui est rentré par l'utilisateur ds l'appliocation 
//On compare le mot de passe entré avec le hash donné ds la base de donnée
//Si la comparaison est bonne on lui renvoi le userid et le token
//On utilise cryptojs pour vérifier que le login et le hash de la base sont conformes
exports.login = (req, res, next) => {
   const cryptojs = require("crypto-js");
   //Contenu de la requête
   console.log("--->CONTENU login: req.body.email- contollers/auth")
   console.log(req.body.email);
   console.log("--->CONTENU login: req.body.password - contollers/auth")
   console.log(req.body.password);
   //Chiffrer l'email de la requête
   const emailCryptoJs = cryptojs.HmacSHA256(req.body.email, `${process.env.CRYPTOJS_EMAIL}`).toString();
   console.log("--->CONTENU: emailCryptoJs - contollers/auth")
   console.log(emailCryptoJs)


   User.findOne({ email: emailCryptoJs })

      .then(user => {
         if (user === null) {
            res.status(401).json({ message: 'Paire identifiant /mot de passe incorect' });


         }
         else {
            bcrypt.compare(req.body.password, user.password)
               .then(valid => {
                  if (!valid) {
                     res.status(401).json({ message: 'Paire identifiant /mot de passe incorect' });
                  }

                  else {
                     res.status(200).json({
                        userId: user._id,
                        token: jwt.sign(
                           { userId: user._id },
                           process.env.SECRET_TOKEN

                        )


                     });
                  }
               })

               .catch(error => {
                  res.status(500).json({ error });
               })
         }
      })
      .catch(error => {
         res.status(500).json({ error });
      })
};









 //Crypter le mot passe
 //Verifier que le mail a un bon format
    // formValidation.email = validateControl(this, "^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$", "emailErrorMsg", "Email non valide");
 //Utiliser crypto js pour hacher le mail

