let mongoose = require('mongoose');
let Actor = require('../models/Actor');
let Movie = require('../models/Movie');

module.exports = {                      // in Java terms, we are creating a class
    getAll: function (req, res) {
        Movie.find().populate('actors').exec(function (err, movies) {
            if (err) return res.status(400).json(err);
            res.json(movies);
        });
    },
    createOne: function (req, res) {
        let newMovieDetails = req.body;
        newMovieDetails._id = new mongoose.Types.ObjectId();
        Movie.create(newMovieDetails, function (err, movie) {
            if (err) return res.status(400).json(err);
            res.json(movie);
        });
    },
    getOne: function (req, res) {
        Movie.findOne({ _id: req.params.id })
            .populate('actors')
            .exec(function (err, movie) {
                if (err) return res.status(400).json(err);
                if (!movie) return res.status(404).json();
                res.json(movie);
            });
    },
    updateOne: function (req, res) {
        Movie.findOneAndUpdate({ _id: req.params.id }, req.body, function (err, movie) {
            if (err) return res.status(400).json(err);
            if (!movie) return res.status(404).json();
            res.json(movie);
        });
    },
    deleteOne: function (req, res) {
        Movie.findOneAndDelete({ _id: req.params.id }, function (err) {
            if (err) return res.status(400).json(err);
            res.json();
        });
    },
    deleteActor: function(req, res){
        let movId = req.params.movId;
        let actId = req.params.actId;

        Movie.findById(movId).exec(function(err, movie){
            console.log(movie.actors);
            movie.actors.pop(actId);
            movie.save(function(err){
                console.log(err);
            });
            if (err) return res.status(400).json(err);
            res.json(movie);
            console.log("second"+movie.actors);
        });
    },
    addActor: function(req, res){
        let movId = req.params.movId;
        let actId = req.params.actId;

        Movie.findById(movId, function(err, movie){     // doesn't matter if we find movie first or actor because
            Actor.findById(actId, function(err, actor){ // the processing is done after we've found both
                movie.actors.push(actor);
                movie.save(function(err){
                    console.log(err);
                    res.json({msg: 'Added'});
                });
            });
        });
    },
    year: function(req, res){
        let yOne = req.params.aYear;
        //let yTwo = req.params.year2;
        console.log('router', yOne);
        Movie.deleteMany({year: { $lte: yOne}}, function(err, data){
            console.log("err", err)
            if (err) return res.status(400).json(err);
            res.json(data);
        });
    }
};
