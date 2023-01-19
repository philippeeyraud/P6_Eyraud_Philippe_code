const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const currentUserSchema = mongoose.Schema({
    name: { type: String, required: true},
    email: { type: String, required: true, unique: true},
    password: { type: String, required: true },
    imageUrl: { type: String },
    is_administrator: {type: Boolean, default:false}
});
currentUserSchema.plugin(uniqueValidator)
module.exports = mongoose.model('user', currentUserSchema);