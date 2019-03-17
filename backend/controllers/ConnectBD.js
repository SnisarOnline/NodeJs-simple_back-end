const mongoose = require('mongoose');
const myconfig = require('../helpers/myconfig');
const log = require('../helpers/log')(module);

module.exports = function(app) {
    if (myconfig.IS_DEVELOPMENT) {
        mongoose.set('debug', true)
    }

    mongoose.connect(myconfig.mongoose.uri, myconfig.mongoose.options)
        .then( () => {
            console.info("Mongoose connection opened on process.pid = " + process.pid);
            log.verbose("Mongoose connection opened on process.pid = " + process.pid);
        }).catch(error => console.log(`Error connection to Mongo: ${myconfig.mongoose.uri}`, error));
};