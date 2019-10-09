let mongoose = require('mongoose');

let actorSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        required: true
    },
    bYear: {
        validate: {
            validator: function (newAge) {
                if (Number.isInteger(newAge))
                    return true;
                else return false
            },
            message: 'Birth year should be integer'
        },
        type: Number,
        required: true
    },
    movies: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Movie'
    }]
});

let actorModel = mongoose.model('Actor', actorSchema);   // the collection will be lowercase and plural. ie. actors

module.exports = actorModel;