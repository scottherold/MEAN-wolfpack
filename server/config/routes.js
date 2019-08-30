// This module handles routing
// <--- Modules --->
const indexController = require('../controllers/index'); // imports the index controller
const wolvesController = require('../controllers/wolves'); // imports the wolves controller

// <--- Routing --->
module.exports = app => {
    app.get('/', indexController.index); // generates the view file
    app.get('/wolves', wolvesController.all); // GET - root
    app.get('/wolves/:id', wolvesController.show); // GET -- show
    app.delete('/wolves/:id', wolvesController.destroy); // DELETE - delete wolf
    app.post('/wolves', wolvesController.create); // POST - new wolf
    app.put('/wolves/:id', wolvesController.update); // PUT - update wolf
}