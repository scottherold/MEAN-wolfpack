// This module handles the 'wolves' controller functions
// <--- Modules --->
const Wolf = require('mongoose').model('Wolf');

// <--- Controller Functions --->
module.exports = {
    // root routing
    index: (req, res) => {
        res.render('index'); // generates single-page view
    }
}