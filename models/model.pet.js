const mongoose = require('mongoose');

const schemaPet = new mongoose.Schema({
    _id: false,
    petId: Number,
    name: String,
    type: String,
    breed: String,
    age: Number
});
module.exports = mongoose.model("pets", schemaPet);