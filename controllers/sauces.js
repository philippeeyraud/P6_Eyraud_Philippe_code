
const sauces = require('../models/sauce');

//L'objet requête va etre envoyée sous forme Json mais en chaîne de caractere donc il faut parser cet objet
//On va supprimer deux champs _id(id de l'objet va être genéré par la base de données), et userId(la personne qui a crée l objet)
//On va utiliser le userId du token d'auth.

exports.createSauces = (req, res, next) => {
    const saucesObject = JSON.parse(req.body.sauces);
    delete saucesObject._id;
    delete saucesObject._userId;
    const sauces = new sauces({
       
        ...saucesObject,
   userId: req.auth.userId,
   imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`


    });
    //Enregistrer l'objet ds la base
    sauces.save()
        .then(() => {res.status(201).json({message: 'Objet enregistré !' })})
        .catch(error => {res.status(400).json({ error })});
};
exports.modifySauces = (req, res, next) => {
    sauces.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Objet modifié !' }))
        .catch(error => res.status(400).json({ error }));
};
exports.deleteSauces = (req, res, next) => {
    sauces.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Objet supprimé !' }))
        .catch(error => res.status(400).json({ error }))
};
exports.getOneSauce = (req, res, next) => {
    sauces.findOne({ _id: req.params.id })
        .then(sauces => res.status(200).json(sauces))
        .catch(error => res.status(400).json({ error }));
};
exports.getAllSauces = (req, res, next) => {
    sauces.find()
        .then(sauces => res.status(200).json(sauces))
        .catch(error => res.status(400).json({ error }));
};        