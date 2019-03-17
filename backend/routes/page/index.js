const express = require('express');
const router = express.Router();

const checkAuth = require('../../middleware/checkAuth');

    const pathRoutes = '../frontend';

//================================================================//
//********** Routing Pages ***************************************//
//================================================================//
    router.get('/', function (request, response) {
        response.render(pathRoutes+'/index.ejs', {routPath: 'main'});
    });
    //************ Login ************//
    router.get('/login', function (request, response) {
        response.render(pathRoutes+'/index.ejs', {routPath: 'login'});
    });
    router.get('/logout', function (request, response) {
        response.redirect('/login');
    });
    //************ User ************//
    router.get('/user', function (request, response) {
        response.render(pathRoutes+'/index.ejs', {routPath: 'user'});
    });

//================================================================//
//********** Admin Routing Pages *********************************//
//================================================================//
    router.get('/admin', checkAuth, function (request, response) {
        response.render(pathRoutes+'/index.ejs', {routPath: 'admin'});
    });
    router.get('/upload', checkAuth, function (request, response) {
        response.render(pathRoutes+'/index.ejs', {routPath: 'upload'});
    });

    //************ 404 ****************//
    router.use(function(req, res, next){
        console.log( 'req.path = ', req.path );
        const err = new Error('Not Found Page');
        err.status = 404;
        next(err);
    });

module.exports = router;
