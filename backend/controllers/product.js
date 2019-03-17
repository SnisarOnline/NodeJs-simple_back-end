const mongoose = require('mongoose');
const log = require('../helpers/log.js')(module);

const IProduct = mongoose.model('Product');

exports.getAll = function (req, res) {
    IProduct.find()
        .exec()
        .then(products => {
            res.json(products);
        })
        .catch( error => {
            log.error({message: error.message});
            res.status(500).json({message: error.message});
        });
};

exports.getOne = function (req, res) {
    IProduct.findOne({ _id: req.params.id})
        .exec()
        .then(product => {
            res.json(product)
        })
        .catch( error => {
            log.error({message: error.message});
            res.status(500).json({message: error.message});
        });
};

exports.create = function (req, res) {
    const {name, price, imgUrl, category, description, author} = req.body;

    const newProduct = {
        name,
        price,
        imgUrl,
        category,
        description,
        author
    };

    IProduct.create(newProduct)
        .then(createdProduct => {
            res.json(createdProduct);
        })
        .catch( error => {
            log.error({message: error.message});
            res.status(500).json({message: error.message});
        });
};

exports.update = function (req, res) {
    IProduct.findOneAndUpdate({ _id: req.params.id}, req.body)
        .exec()
        .then(product => {
            res.json(product);
        })
        .catch( error => {
            log.error({message: error.message});
            res.status(500).json({message: error.message});
        });
};

exports.remove = function (req, res) {
    IProduct.deleteOne({ _id: req.params.id})
        .exec()
        .then( (result) => {
            res.json({success: true})
        } )
        .catch( error => {
            log.error({message: error.message});
            res.status(500).json({message: error.message});
        });
};


