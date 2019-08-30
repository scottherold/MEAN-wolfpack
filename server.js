// <--- Modules --->
const compress = require('compression'); // imports compression module
const parser = require('body-parser'); // imports body-parser module
const express = require('express'); // imports express module
const helmet = require('helmet'); // imports helmet module
const logger = require('morgan'); // imports morgan module
const path = require('path'); // imports path module (for DB validation)
const cors = require('cors'); // imports CORS

// <--- Server Constructors --->
const port = process.env.PORT || 8000; // estbalishes port
const app = express(); // constructors express server

// <--- Server Settings --->
app.set('view engine', 'ejs') // sets templating engine to ejs
    .set('views', __dirname + '/client/views'); // maps views dir
app.use(express.static(__dirname + '/client/static')) // points to static folder
    .use(helmet()) // HTTP headers -- status codes
    .use(compress()) // Compress HTTP requests
    .use(cors()) // restricts AJAX access
    .use(logger('dev')) // USer with helmet for error logging
    .use(parser.json()) // for interpretting JSON data
    .use(parser.urlencoded({extended: true})) // allows POST routes

// <--- Server Config --->
require(__dirname + '/server/config/database'); // DB Connection
require(__dirname + '/server/config/routes')(app); // Routing

// <--- Port Listening --->
app.listen(port, () => console.log(`Express server listening on port ${ port }`)); // note on listen
