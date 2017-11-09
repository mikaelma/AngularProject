var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongooseUniqueValidator = require('mongoose-unique-validator');

var schema = new Schema({
    name: {type: String, required: true},
    description : {type: String},
    image: {type: String},
    glass: {type: String},
    ingredients: [{
        ingredientNumber: {type: Number, required: true},
        measurementModule: {type: String, required: true},
        ingredientName: {type: String, required: true}
    }],
    recipe: {type: String},
    author: {type: Schema.Types.ObjectId, ref: 'User'}
});

schema.plugin(mongooseUniqueValidator);

module.exports = mongoose.model('User', schema);