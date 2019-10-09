let mongoose = require('mongoose');
let Actor = require('../models/Actor');
let Movie = require('../models/Movie');

module.exports = {                      // in Java terms, we are creating a class
    getAll: function (req, res) {
        Actor.find().populate('movies').exec(function (err, actors) {
            if (err) {
                return res.status(404).json(err);
            } else {
                res.json(actors);
            }
        });
    },
    createOne: function (req, res) {
        let newActorDetails = req.body;
        newActorDetails._id = new mongoose.Types.ObjectId();
        let actor = new Actor(newActorDetails);
        actor.save(function (err) {
            res.json(actor);
        });
    },
    getOne: function (req, res) {
        Actor.findOne({ _id: req.params.id })
            .populate('movies')
            .exec(function (err, actor) {
                if (err) return res.status(400).json(err);
                if (!actor) return res.status(404).json();
                res.json(actor);
            });
    },
    updateOne: function (req, res) {
        Actor.findOneAndUpdate({ _id: req.params.id }, req.body, function (err, actor) {
            if (err) return res.status(400).json(err);
            if (!actor) return res.status(404).json();
            res.json(actor);
        });
    },
    deleteOne: function (req, res) {
        Actor.findOneAndRemove({ _id: req.params.id }, function (err) {
            if (err) return res.status(400).json(err);
            res.json();
        });
    },
    addMovie: function (req, res) {
        Actor.findOne({ _id: req.params.id }, function (err, actor) {
            if (err) return res.status(400).json(err);
            if (!actor) return res.status(404).json();
            Movie.findOne({ _id: req.body.id }, function (err, movie) {
                if (err) return res.status(400).json(err);
                if (!movie) return res.status(404).json();
                actor.movies.push(movie._id);
                actor.save(function (err) {
                    if (err) return res.status(500).json(err);
                    res.json(actor);
                });
            })
        });
    },
    deleteAll: function(req, res){
        Actor.findOneAndDelete({_id: req.params.id}, function(err){
            Movie.deleteMany({actors: req.params.id}, function(err){
                if (err) return res.status(400).json(err);
                res.json({msg: 'Deleted all movies'});
            });
            if (err) return res.status(400).json(err);
            res.json({msg: 'Deleted actor'});
        });
    },
    deleteMovie: function(req, res){
        let actId = req.params.actId;
        let movId = req.params.movId;

        Actor.findById(actId).exec(function(err, actor){
            console.log(actor.movies);
            actor.movies.pop(movId);
            actor.save(function(err){
                console.log(err);
            });
            if (err) return res.status(400).json(err);
            res.json(actor);
            console.log("second"+actor.movies);
        });
    },
    incAge: function(req, res){
        let Num = req.params.num;

        Actor.find({bYear: {$lt: 1969}}, function(err, actor){
            for (let i = 0; i < actor.length; i++) {  // can use updateMany mongoose function instead
                //console.log(actor[i].bYear);
                actor[i].bYear = actor[i].bYear - Num;
                //console.log("~~",actor[i].bYear);
                actor[i].save(function(err){
                    console.log(err);
                });
                //console.log("~~~",actor[i].bYear);
            };
            res.json(actor);
        });
    }
};
