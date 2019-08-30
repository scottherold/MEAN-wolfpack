// This module constructs the database connection
const mongoose = require('mongoose'); // imports mongoose for server connection
const fs = require('fs'); // file-system so that we can load, read and require all model files
const path = require('path'); // utilizes path for easy dir/file joining
const modelsPath = path.resolve('server', 'models'); // Dir where models are located
const reg = new RegExp('\\.js$', 'i'); // REGEX for .js extensions
const db = 'mongodb://localhost/wolfpack'; // URL for DB connection

// <--- DB Settings --->
mongoose.connect(db, {useNewUrlParser: true}); // Connect to the DB
mongoose.Promise = global.Promise; // OVerride mongoose promises with global promises

// <--- DB Connection Events --->
// ** Successful Connection **
mongoose.connection.on('connected', () => {
    console.log(`Mongoose default connection open to ${ db }`);
});

// ** Error on Connection **
mongoose.connection.on('error', err => {
    console.error(`Mongoose default connection error: ${ err }`);
    process.exit(0); // kills DB connection
});

// ** Connection Disconnect **
mongoose.connection.on('disconnected', () => {
    console.log('Mongoose default connection disconnected'); 
});

// Node process end = > mongoose disconnect **
process.on('SIGINT', () => {
    mongoose.connection.close( () => {
        console.log('Mongoose default connection disconnected through program termination');
        process.exit(0); // kills DB connection
    });
});

// <--- Model Connection --->
// read all the files in the models dir and check if it is a JS file, then require
fs.readdirSync(modelsPath).forEach(file => {
    if(reg.test(file)) {
        require(path.join(modelsPath, file));
    }
})

