/On va créer un modele current avec mongoose et on va créer un schema en utilisant la fonction schéma de mongoose
//On va exporter ce schema sous forme de model (current)
const mongoose = require('mongoose');

const currentSchema = mongoose.Schema({
     userId: { type: String, required: true},
    name: { type: String, required: true},
    email: { type: String, required: true, unique: true},
    password: { type: String, required: true },
     is_administrator: {type: Boolean, default:false}
});


module.exports = mongoose.model('current', currentSchema);
