const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true},
    password: { type: String, required: true}
});
//Ce validator on va l'appliquer au schema
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('user', userSchema);