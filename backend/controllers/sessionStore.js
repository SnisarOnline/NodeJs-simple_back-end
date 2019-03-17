
let session = require('express-session');
let mongoose = require('./mongooseConnection');
let mongoStore = require('connect-mongo')(session);

let sessionStore = new mongoStore({mongooseConnection: mongoose.connection});

module.exports = sessionStore;