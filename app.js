const express = require('express');
const myconfig = require('./backend/helpers/myconfig');
const log = require('./backend/helpers/log')(module);
const favicon = require('serve-favicon');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const cookieParser = require('cookie-parser');

myconfig.homePath = __dirname;

const app = express();

//================================================================//
//********** Config Express **************************************//
//================================================================//
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static( myconfig.homePath + '/frontend'));
app.use( fileUpload() );
app.use( cookieParser() );
app.use( favicon(myconfig.homePath + '/frontend/img/favicon.ico') );
app.set('view engine', 'ejs');
app.set('views', myconfig.homePath + '/frontend');


//================================================================//
//********** Schema Mongoose *************************************//
//================================================================//
require('./backend/schema');


//================================================================//
//********** Connect Mongoose ************************************//
//================================================================//
require('./backend/controllers/ConnectBD')(app);


//================================================================//
//********** Routes **********************************************//
//================================================================//
// todo: Разеделить роутеры,  https://expressjs.com/ru/guide/routing.html#express-router
require('./backend/routes/routesOriginal')(app);
// const router = require('./backend/routes');
// app.use('/page', router.page );
// app.use('/api', router.api );

//================================================================//
//********** Critical error **************************************//
//================================================================//
app.use((error, req, res, next)=>{
    res.status(error.status || 500);
    res.render('index.ejs', {
        routPath: 'errorPage',
        title: 'Oops...',
        message: error.message,
        error: myconfig.IS_DEVELOPMENT ? error : {},
    });
});

process.on('uncaughtException', function (err) {
    log.error((new Date).toUTCString() + ' uncaughtException: ', err.message);
    log.error(err.stack);
    process.exit(1);
});

app.listen(myconfig.port, () => {
    log.info( ` Server listening on port = ${myconfig.port}`);
    log.http( ` Server listening on port = ${myconfig.port}`);
    log.warn( ` Server listening on port = ${myconfig.port}`);
    log.error(` Server listening on port = ${myconfig.port}`);
    log.verbose( `Server listening on port = ${myconfig.port}`);
    log.debug(` Server listening on port = ${myconfig.port}`);
    log.silly(` Server listening on port = ${myconfig.port}`);
});