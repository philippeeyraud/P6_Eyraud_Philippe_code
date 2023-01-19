const Message = require('../models/message');

const log = require('../utils/winston');
const fs = require('fs');
const { json } = require('express');
//L'objet requête va etre envoyée sous forme Json mais en chaîne de caractere donc il faut parser cet objet
//On va supprimer deux champs _id(id de l'objet va être genéré par la base de données), et userId(la personne qui a crée l objet)
//On va utiliser le userId du token d'auth.




 exports.createMessage = (req, res, next) => {


    try {

  console.log(JSON.stringify(req.body));

       const messageObject = (req.body.message);
        //delete messageObject._id;
        //delete messageObject._userId;
        console.log(req.auth);

    const message = new Message({
      
           ...messageObject,
            userId: req.auth.userId,

           // imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`

          



        });

        //Enregistrer l'objet ds la base
            message.save()
            .then(() => { res.status(201).json({ message: 'Objet enregistré !' }) })
                .catch(error => { log.error(`error dans create message ${error}`); res.status(400).json({ error }) });
;
    }
    catch (error) {
log.error(`error dans create message ${error}`);
     return res.status(500).json({ error });
    }

};

exports.getMessage = (req, res, next) => {

    try {

        Message.find()
            .then(message => res.status(200).json(message))
            .catch(error => res.status(400).json({ error }));

    }
    catch (error) {
        log.error(`error dans create message ${error}`);
        return res.status(500).json({ error });
    }

};


/*exports.getOneMessage = (req, res, next) => {
    Message.findOne({ _id: req.params.id })
        .then(messages => res.status(200).json(messages))
        .catch(error => res.status(400).json({ error }));
}
 

/*exports.getAllMessage = (req, res, next) => {
    Message.find()
        .then(messages => res.status(200).json(messages))
        .catch(error => res.status(400).json({ error }));
};*/











