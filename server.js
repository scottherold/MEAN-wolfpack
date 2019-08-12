// <--- Modules --->
const express = require('express'); // imports express module
const session = require('express-session'); // imports session
const mongoose = require('mongoose'); // imports mongoose
const flash = require('express-flash'); // imports flash message

// <--- DB Settings --->
mongoose.connect('mongodb://localhost/wolfpack', {useNewUrlParser: true}); // connects the app to the DB; create DB on first connection

// ** Schema **
let WolfSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: [2, 'The minimum length for name is two characters!'],
        maxlength: [20, 'The maximum length for name is two characters!'],
        required: [true, 'Name is required!']
    },
    role: {
        type: String,
        minlength: [5, 'The minimum length for role is four characters!'],
        maxlength: [20, 'The maximum length for role is twenty characers!'],
        required: [true, 'Role is required!']
    },
    age: {
        type: Number,
        required: [true, 'Age is required!']
    }
}, {timestamps : true});

// <--- Server Constructors --->
const app = express(); // constructors express server
const server = app.listen(8000); // port-listening

// <--- Server Settings --->
app.set('view engine', 'ejs'); // sets templating engine to ejs
app.set('views', __dirname + '/views'); // maps views dir
app.use(express.urlencoded({extended: true})); // allows POST routes
// ** Sessions Settings **
app.use(session({
    secret: 'wolvesKey',
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: 60000}
}));
app.use(flash()); // flash messages

// <--- Routing --->
const index = require(__dirname + '/routes/index.js')(app, server, mongoose, WolfSchema); // Index
const wolves = require(__dirname + '/routes/wolves.js')(app, server, mongoose, WolfSchema); // Wolves
