// this module handles 'wolves' routing
module.exports = (app, server, mongoose, WolfSchema) => {
    // ** Document Model **
    const Wolf = mongoose.model('Wolf', WolfSchema); // Model to create documents and chain mongoose methods

    // <--- Routing --->
    // ** GET routes **
    // new
    app.get('/wolves/new', (req, res) => {
        res.render('new');
    });

    // show
    app.get('/wolves/:id', (req, res) => {
        Wolf.findOne({_id: req.params.id}) // Query DB for single wolf based on path variable
            .then(data => res.render('show', {wolf: data}))
            .catch(err => req.json(err));
    });

    // edit
    app.get('/wolves/edit/:id', (req, res) => {
        Wolf.findOne({_id: req.params.id}) // Query DB for single wolf based on path variable
            .then(data => res.render('edit', {wolf: data}))
            .catch(err => req.json(err));
    })

    // ** POST Routes **
    // new
    app.post('/wolves', (req, res) => {
        const wolf = new Wolf(req.body); // constructs new wolf object using form data;
        wolf.save() // save to DB
            .then( () => res.redirect('/')) // on successful save, redirect to root
            .catch(err => {
                for (var key in err.errors) {
                    req.flash('formErrors', err.errors[key].message); // add error to formErrors
                }
                res.redirect('/wolves/new');
            });
    });

    // edit
    app.post('/wolves/:id', (req, res) => {
        // Update a single instance in the DB
        Wolf.updateOne({_id: req.params.id}, {
            name: req.body.name,
            role: req.body.role,
            age: req.body.age
        }, {runValidators: true})
        .then(result => res.redirect('/')) // redirect to show with updated data
        .catch(err => {
            for (var key in err.errors) {
                req.flash('formErrors', err.errors[key].message); // add error to formerrors
            }
            res.redirect(`/wolves/edit/${req.params.id}`);
        });
    });

    // delete
    app.post('/wolves/destroy/:id', (req, res) => {
        Wolf.deleteOne({_id: req.params.id}) // remove wolf by id
            .then( () => res.redirect('/')) // on successful delete, redirect to root
            .catch(err => res.json(err));
    })
}