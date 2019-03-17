const mongoose = require('mongoose');
const bCrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const log = require('../helpers/log.js')(module);
const {authorization} = require('../helpers/myconfig');

const IUser = mongoose.model('User');

/**
 * Функция авторизации пользователей
 * Проверяем наличие пользователя в базе, и возвращаем JsonWebToken
 * @param req
 * @param res
 */
exports.signIn = function(req, res) {

    const {email, password} = req.body;

    IUser.findOne({email})
        .exec()
        .then((dbUser)=> {

            if (!dbUser) {
                log.error({message: `User does not exist`});
                res.status(401).json({message: `User does not exist`});
            }

            const isValid = bCrypt.compareSync(password, dbUser.password); // проверка hashPassword на совпадение

            if (isValid) {
                const token = jwt.sign(dbUser.id.toString(), authorization.jwtSecret);
                log.verbose(`get token: ${token}`);

                const { id, imgUrl, admin, name, email, password, product, date } = dbUser;
                const userRes = { id, imgUrl, admin, name, email, date };

                res.json({token: token, user: userRes });
            } else {
                log.error({message: `Invalid credentials!`});
                res.status(401).json({message: `Invalid credentials!`});
            }
        })
        .catch(err => {
            log.error({message: error});
            res.status(500).json({message: err.message})
        } )
};
