const express = require('express');
const router = express.Router();
const auth = express.Router();
const multer = require('../middleware/multer-config');
const saucesCtrl = require('../controllers/sauces');


//pour intercepter les req post on crée une nouvelle instance de notre modele Sauce.
//Rajouter une route put pour pouvoir modifier notre objet
//Quel objet on modifie? C'est celui dont l'id correspond à celui envoyé ds les parametres de requête.
//Trouver un seul objet par son identifiant avec la methode find
//On veut que l'id de sauce(objet en vente) soit le même que le param de requête.
//on rajoute l'url visée par l'application(la route)
//On va utiliser la methode find, on veut la liste complete des objets, on récupère le tableau de la collection sauce (things)retournés  par la base de donnée et on les renvoie avec un code 200.

router.post('/', auth, multer, saucesCtrl.createSauces);
router.put('/:id', auth,multer,saucesCtrl.modifySauces);
router.delete('/:id', auth ,saucesCtrl.deleteSauces);
router.get('/:id',auth , saucesCtrl.getOneSauce);
router.get('/',auth  , saucesCtrl.getAllSauces);




module.exports = router;
