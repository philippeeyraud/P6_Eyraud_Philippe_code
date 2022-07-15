const Sauce = require('../models/sauce');

//L'objet requête va etre envoyée sous forme Json mais en chaîne de caractere donc il faut parser cet objet
//On va supprimer deux champs _id(id de l'objet va être genéré par la base de données), et userId(la personne qui a crée l objet)
//On va utiliser le userId du token d'auth.

exports.createSauce = (req, res, next) => {

    try {

        console.log(JSON.stringify(req.body));

        const sauceObject = JSON.parse(req.body.sauce);
        console.log(req.auth);
        console.log("ICI");
        const sauce = new Sauce({

            ...sauceObject,
            userId: req.auth.userId,
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`


        });
        console.log("LA");
        //Enregistrer l'objet ds la base
        sauce.save()
            .then(() => { res.status(201).json({ message: 'Objet enregistré !' }) })
            .catch(error => { res.status(400).json({ error }) });

    }
    catch (error) {
        console.log(`erreur GLOBALE ${error}`);
        return res.status(500).json({ error });
    }

};
exports.modifySauce = (req, res, next) => {
    Sauce.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Objet modifié !' }))
        .catch(error => res.status(400).json({ error }));
};
exports.deleteSauce = (req, res, next) => {
    Sauce.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Objet supprimé !' }))
        .catch(error => res.status(400).json({ error }))
};
exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
        .then(sauces => res.status(200).json(sauces))
        .catch(error => res.status(400).json({ error }));
};
exports.getAllSauce = (req, res, next) => {
    Sauce.find()
        .then(sauces => res.status(200).json(sauces))
        .catch(error => res.status(400).json({ error }));
};

//Integration du dislike et du like
//La personne n'aime pas la sauce, ajout d'un dislike,ajout du username et du dislike ds le tabbleau
//La personne aime la sauce, ajout d'un like, ajout du username plus like dans le tableau  
//La personne a fait une erreur
exports.createLike = (req, res) => {
    try {
        Sauce.findOne({
            _id: req.params.id

        })
            .then(sauce => {
                if (req.body.likes == -1) {
                    sauce.disliked++;
                    sauce.usersDisliked.push(req.body.userId);
                    sauce.save();

                }

                if (req.body.likes == 1) {
                    sauce.liked++;
                    sauce.usersLiked.push(req.body.userId);
                    sauce.save();
                }

                if (req.body.likes == 0) {

                    if (sauce.usersLiked.indexOf(req.body.userId) != -1) {
                        sauce.likes--;
                        sauce.userLiked.splice(sauce.usersLiked.indexOf(req.body.userId), 1);
                    } else {
                        sauce.dislikes--;
                        sauce.usersDisliked.splice(sauce.usersDisliked.indexOf(req.body.userId), 1);

                    }
                    sauce.save();
                }
                res.status(200).json({ message: 'Like acceptés !' })

                .catch(error => res.status(400).json({error}));

            }


            )
    }

    catch (error) {
        console.log(`erreur  ${error}`);
        return res.status(500).json({ error });
    }
}











