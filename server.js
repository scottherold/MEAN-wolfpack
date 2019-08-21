// <--- Modules --->
const express = require('express'); // imports express module
const session = require('express-session'); // imports session
const flash = require('express-flash'); // imports flash message

// <--- Server Constructors --->
const port = process.env.PORT || 8000; // estbalishes port
const app = express(); // constructors express server

// <--- Server Settings --->
app.set('view engine', 'ejs'); // sets templating engine to ejs
app.set('views', __dirname + '/client/views'); // maps views dir
app.use(express.urlencoded({extended: true})); // allows POST routes
// ** Sessions Settings **
app.use(session({
    secret: 'wolvesKey',
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: 60000}
}));
app.use(flash()); // flash messages

// <--- Server Config --->
require(__dirname + '/server/config/database'); // DB Connection
require(__dirname + '/server/config/routes')(app); // Routing

// <--- Port Listening --->
app.listen(port, () => console.log(`Express server listening on port ${ port }`)); // note on listen
