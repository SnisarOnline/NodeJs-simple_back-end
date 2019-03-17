const jwt = require('jsonwebtoken');
const {authorization} = require('../helpers/myconfig');

/**
 * Проверка токена доступа к роутам
 * @param req
 * @param res
 * @param next передаем обработку дальше
 */
module.exports = function (req, res, next) {
    const authHeader = req.get('Authorization');

    if (!authHeader) {
        res.status(401).json({message: `Token not provided!`});
    }

    const token = authHeader.replace('Bearer :', '');
    try{
        jwt.verify(token, authorization.jwtSecret)
    } catch (e) {
        if (e instanceof jwt.JsonWebTokenError) {
            res.status(401).json({message: `Invalid token!`});
        }
    }

    next();
};