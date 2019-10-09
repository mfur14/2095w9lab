let mongoose = require('mongoose');

let movieSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    actors: [{
        type: mongoose.Schema.ObjectId,  // any difference? mongoose.Schema.Types.ObjectId
        ref: 'Actor'
    }]
});

let movieModel = mongoose.model('Movie', movieSchema);  // the collection will be lowercase and plural. ie. movies
module.exports = movieModel;