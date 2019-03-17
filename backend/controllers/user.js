const mongoose = require('mongoose');
const bCrypt = require('bcrypt');
const auth = require('./authorization');
const log = require('../helpers/log.js')(module);
const {authorization} = require('../helpers/myconfig');

const IUser = mongoose.model('User');

/**
 * Шифровка пароля
 * @param password
 * @returns {*}
 */
function passwordEncryption(password) {
    const salt = bCrypt.genSaltSync(authorization.bCryptSaltSync); // количество раундов для обработки данных.

    return bCrypt.hashSync(password, salt); // шифруем пароль
}

exports.getAllUser = function (req, res) {
    IUser.find()
        .exec()
        .then(users => {
            res.json(users)
        })
        .catch( error => {
            log.error({message: error.message});
            res.status(500).json({message: error.message});
        });
};

exports.getOneUser = function (req, res) {
    IUser.findOne({_id: req.params.id})
        .exec()
        .then( (user) => {
            res.json(user)
        })
        .catch( error => {
            log.error({message: error.message});
            res.status(500).json({message: error.message});
        });
};

exports.createUser = function (req, res) {

    const {imgUrl, admin, name, email, password} = req.body;

    const hashPassword = passwordEncryption(password);
    const newUser = {
        imgUrl:imgUrl,
        admin:admin,
        name:name,
        email:email,
        password: hashPassword,
        product: []
    };

    IUser.findOne({email: email})
        .exec()
        .then( (dbUser) => {
            if (!dbUser) {

                IUser.create( newUser )
                    .then(createdUser => {
                        auth.signIn(req, res);
                    })
                    .catch( error => {
                        log.error({message: error.message});
                        res.status(500).json({message: error.message});
                    });

            } else {
                res.status(400).json({message: 'Мейл уже занят'});
            }
        })
        .catch( error => {
            log.error({message: error.message});
            res.status(500).json({message: error.message});
        });
};

exports.updateUser = function (req, res) {
    IUser.findOneAndUpdate({ _id: req.params.id}, req.body)
        .exec()
        .then(updateUser => {
            res.json(updateUser)
        })
        .catch( error => {
            log.error({message: error.message});
            res.status(500).json({message: error.message});
        });
};

exports.removeUser = function (req, res) {
    IUser.deleteOne({ _id: req.params.id})
        .exec()
        .then( (result) => {
            res.json({success: true})
        })
        .catch( error => {
            log.error({message: error.message});
            res.status(500).json({message: error.message});
        });
};

