// This module handles routing
// <--- Modules --->
const wolvesController = require('../controllers/wolves'); // imports the wolves controller

// <--- Routing --->
module.exports = app => {
    app.get('/', wolvesController.index); // GET - root
    app.get('/wolves/new', wolvesController.new); // GET - new wolf form
    app.get('/wolves/:id', wolvesController.show); // GET - show single wolf
    app.get('/wolves/edit/:id', wolvesController.edit); // GET - edit wolf form
    app.get('/wolves/destroy/:id', wolvesController.destroy); // GET - delete wolf
    app.post('/wolves', wolvesController.create); // POST - new wolf
    app.post('/wolves/:id', wolvesController.update); // POST - update wolf
}