const express = require('express');
const router = express.Router();

const auth = require('../../controllers/authorization');
const userRequest = require('../../controllers/user');
const productRequest = require('../../controllers/product');
const checkAuth = require('../../middleware/checkAuth');


//================================================================//
//********** API Server ******************************************//
//================================================================//

router.post('/auth', auth.signIn);

//************ User ***************//
router.get('/user', checkAuth, userRequest.getAllUser);
router.get('/user/:id', checkAuth, userRequest.getOneUser);
router.post('/user', userRequest.createUser);
router.put('/user/:id',  checkAuth, userRequest.updateUser);
router.delete('/user/:id', checkAuth, userRequest.removeUser);

//************ Product ************//
router.get( '/api/products',   productRequest.getAll);
router.get( '/products/:id', productRequest.getOne);
router.post('/products', checkAuth, productRequest.create);
router.put( '/products/:id', checkAuth, productRequest.update);
router.delete('/products/:id', checkAuth, productRequest.remove);

//************ 404 ****************//
router.use(function(req, res, next){
    console.log( 'req.path = ', req.path );
    console.log( 'req.patch = ', req.patch );
    const err = new Error('Not Found Api');
    err.status = 404;
    next(err);
});

module.exports = router;
