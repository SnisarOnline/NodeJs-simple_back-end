const auth = require('../controllers/authorization');
const userRequest = require('../controllers/user');
const productRequest = require('../controllers/product');
const uploadMulterImg = require('../controllers/uploadMulterImg');
const uploadExpressFile = require('../controllers/uploadExpressFile');
const checkAuth = require('../middleware/checkAuth');

// ВСЕ В ОДНОМ ФАЙЛЕ СТАРАЯ ВЕРСИЯ
// @Info: https://expressjs.com/ru/guide/routing.html#response-methods
module.exports = function(app){

    const pathRoutes = '../frontend';

//================================================================//
//********** Routing Pages ***************************************//
//================================================================//
    app.get('/', function (request, response) {
        response.render(pathRoutes+'/index.ejs', {routPath: 'main'});
    });
    //************ Login ************//
    app.get('/login', function (request, response) {
        response.render(pathRoutes+'/index.ejs', {routPath: 'login'});
    });
    app.get('/logout', function (request, response) {
        response.redirect('/login');
    });
    //************ User ************//
    app.get('/user', function (request, response) {
        response.render(pathRoutes+'/index.ejs', {routPath: 'user'});
    });

//================================================================//
//********** Admin Routing Pages *********************************//
//================================================================//
    app.get('/admin', checkAuth, function (request, response) {
        response.render(pathRoutes+'/index.ejs', {routPath: 'admin'});
        // response.render(pathRoutes+'/templates/admin/admin.ejs');
    });
    app.get('/upload', checkAuth, function (request, response) {
        response.render(pathRoutes+'/index.ejs', {routPath: 'upload'});
    });

//================================================================//
//********** API Server ******************************************//
//================================================================//
    app.post('/api/auth', auth.signIn); // req.body

    //************ User ***************//
    app.get('/api/user', checkAuth, userRequest.getAllUser);
    app.get('/api/user/:id', checkAuth, userRequest.getOneUser);
    app.post('/api/user', userRequest.createUser);
    app.put('/api/user/:id',  checkAuth, userRequest.updateUser);
    app.delete('/api/user/:id', checkAuth, userRequest.removeUser);

    //************ Product ************//
    app.get( '/api/products',   productRequest.getAll);
    app.get( '/api/products/:id', productRequest.getOne);
    app.post('/api/products', checkAuth, productRequest.create);
    app.put( '/api/products/:id', checkAuth, productRequest.update);
    app.delete('/api/products/:id', checkAuth, productRequest.remove);

    //********** Upload files **********//
    app.post('/api/upload', uploadExpressFile.create);


    //************ 404 ****************//
    app.use(function(req, res, next){
        const err = new Error('Not Found');
        err.status = 404;
        next(err);
    });
};
