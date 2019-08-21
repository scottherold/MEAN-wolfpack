// This module handles the 'wolf' model
// <--- Modules --->
const mongoose = require('mongoose'); // imports mongoose for model construction
const { Schema } = mongoose; // constructs an empty schema object from mongoose

// <--- Schema --->
// users blanck Schema object to be added to the mongoose object with export
const WolfSchema = new Schema({
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

// <--- Document Model --->
module.exports = mongoose.model('Wolf', WolfSchema); // Attach schema mongoose object to create documents and chain mongoose methods, added in DB connection file