const express = require('express');
const sauce = require('../models/sauce');
const router = express.Router();
const Sauce = require('../models/sauce');

//pour intercepter les req post on crée une nouvelle instance de notre modele Sauce.
router.post('/', (req, res, next) => {

    const sauce = new Sauce({
        ...req.body
    });
    //Enregistrer l'objet ds la base
    sauce.save()
        .then(() => res.status(201).json({
            message: 'Objet enregistré !'
        }))
        .catch(error => res.status(400).json({ error }));
});
//Rajouter une route put pour pouvoir modifier notre objet
//Quel objet on modifie? C'est celui dont l'id correspond à celui envoyé ds les parametres de requête.

router.put('/:id', (req, res, next) => {
    Sauce.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Objet modifié !' }))
        .catch(error => res.status(400).json({ error }));
});
router.delete('/:id', (req, res, next) => {
    Sauce.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Objet supprimé !' }))
        .catch(error => res.status(400).json({ error }));
});
//Trouver un seul objet par son identifiant avec la methode find
//On veut que l'id du thing(objet en vente) soit le même que le param de requête.
router.get('/:id', (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => res.status(200).json(sauce))
        .catch(error => res.status(404).json({ error }));
});


//on rajoute l'url visée par l'application(la route)
//On va utiliser la methode find, on veut la liste complete des objets, on récupère le tableau de la collection thing (things)retournés  par la base de donnée et on les renvoie avec un code 200.
router.get('/', (req, res, next) => {
    Sauce.find()
        .then(sauces => res.status(200).json(sauces))
        .catch(error => res.status(400).json({ error }));


});



