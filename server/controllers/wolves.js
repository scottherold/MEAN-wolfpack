// This module handles the 'wolves' controller functions
// <--- Modules --->
const Wolf = require('mongoose').model('Wolf'); // Wolf Model

// <--- Controller Functions --->
module.exports = {
    all(req, res) {
        // all
        Wolf.find()
            .then(wolves => res.json(wolves)) // send data to client via JSON
            .catch(err => {
                console.log(err); 
                res.status(400).json(err)
            });
    },
    show(req, res) {
        // display one Wolf by _id
        Wolf.findById(req.params.id) // Query DB for single wolf based on path variable
            .then(wolf => res.json(wolf))
            .catch(err => {
                console.log(err); 
                res.status(400).json(err);
            });
    },
    create(req, res) {
        Wolf.create(req.body) // save to DB
            .then(wolf => res.json(wolf))
            .catch(err => {
                console.log(err); 
                res.status(400).json(err)
            });
    },
    update(req, res) {
        // Update a single instance in the DB
        Wolf.findByIdAndUpdate(req.params.id, req.body, {runValidators: true}) // Run validators on update query
        .then(wolf => res.json(wolf))
        .catch(err => {
            console.log(err); 
            res.status(400).json(err)
        });
    },
    destroy(req, res) {
        Wolf.findByIdAndRemove(req.params.id) // remove wolf by id
            .then( result => res.json(result))
            .catch(err => {
                console.log(err); 
                res.status(400).json(err)
            });
    }
}