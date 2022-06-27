//importer express
//création de l'application express
//Importation de mongoose et connection à mongoDB. Utilisation de .end pour permettre al'utilisateur de mettre ses propres info sans toucher au code.
const express = require('express');
require("dotenv").config()

const app = express();

const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
//const saucesRoutes = require('./routes/sauces');
mongoose.connect(`${process.env.DB_URL}://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_URL_CLUSTER}`,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));



//definition des headers pour le CORS(cross origin ressource share)
//Le middelware intercepte toute les requêtes qui ont un content type json et met a disposition ce contenu sur l objet requete body
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(express.json());

app.use('/api/auth', authRoutes);

//app.use('/api/sauces', saucesRoutes);


//export de l application express pour que l'on puisse y accèder depuis les fichiers de notre projet et particulierement node.
module.exports = app;