// This module handles 'root' routing
module.exports = (app, server, mongoose, WolfSchema) => {
    // ** Document Model **
    const Wolf = mongoose.model('Wolf', WolfSchema); // Model to create documents and chain mongoose methods

    // <--- Routing --->
    // ** GET Routes **
    // Root
    app.get('/', (req, res) => {
        Wolf.find() // Query MongoDB w/ mongoose for all wolves
            .then(data => res.render('index', {wolves: data})) // bind queried data to view
            .catch(err => req.json(err)); // list error in JSON
    })
}