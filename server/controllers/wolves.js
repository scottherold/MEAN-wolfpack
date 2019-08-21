// This module handles the 'wolves' controller functions
// <--- Modules --->
const Wolf = require('mongoose').model('Wolf');

// <--- Controller Functions --->
module.exports = {
    index: (req, res) => {
        Wolf.find() // Query MongoDB w/ mongoose for all wolves
            .then(data => res.render('index', {wolves: data})) // bind queried data to view
            .catch(err => res.json(err)); // list error in JSON
    },
    new: (req, res) => {
        res.render('new');
    },
    show: (req, res) => {
        Wolf.findOne({_id: req.params.id}) // Query DB for single wolf based on path variable
            .then(data => res.render('show', {wolf: data}))
            .catch(err => req.json(err));
    },
    edit: (req, res) => {
        Wolf.findOne({_id: req.params.id}) // Query DB for single wolf based on path variable
            .then(data => res.render('edit', {wolf: data}))
            .catch(err => req.json(err));
    },
    create: (req, res) => {
        const wolf = new Wolf(req.body); // constructs new wolf object using form data;
        wolf.save() // save to DB
            .then( () => res.redirect('/')) // on successful save, redirect to root
            .catch(err => {
                for (var key in err.errors) {
                    req.flash('formErrors', err.errors[key].message); // add error to formErrors
                }
                res.redirect('/wolves/new');
            });
    },
    update: (req, res) => {
        // Update a single instance in the DB
        Wolf.updateOne({_id: req.params.id}, {
            name: req.body.name,
            role: req.body.role,
            age: req.body.age
        }, {runValidators: true}) // Run validators on update query
        .then(result => res.redirect('/')) // redirect to show with updated data
        .catch(err => {
            for (var key in err.errors) {
                req.flash('formErrors', err.errors[key].message); // add error to formerrors
            }
            res.redirect(`/wolves/edit/${req.params.id}`);
        });
    },
    destroy: (req, res) => {
        Wolf.deleteOne({_id: req.params.id}) // remove wolf by id
            .then( () => res.redirect('/')) // on successful delete, redirect to root
            .catch(err => res.json(err));
    }
}