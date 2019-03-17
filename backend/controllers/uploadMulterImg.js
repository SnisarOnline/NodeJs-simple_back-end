/**
 * Multer
 * @Info https://github.com/expressjs/multer#multer---
 * @Info https://github.com/expressjs/multer/blob/master/doc/README-ru.md
 */
const mongoose = require('mongoose');
const multer  = require('multer');
const path  = require('path');
const log = require('../helpers/log.js')(module);

/**
 * @Info  https://github.com/expressjs/multer/blob/master/doc/README-ru.md#diskstorage
 */
const storage = multer.diskStorage({
    // расположение после загрузки.
    description: (req, file, collBeck) => {
        collBeck(null, '/Uploads');
    },
    // имя файла после загрузки.
    filename:(req, filse, collBeck) => {
        collBeck(null, Date.now(), path.extname(file.originalname))
    }
});

const upload = multer({
    storage,
    limits: { fieldSize: 2 * 1024 * 1024}, // 2mb
    fileFilter: (req, file, callBack) => {
        const ext = path.extname(file.originalname);
        if (ext !== '.jpg' && ext !== '.jpeg' && ext !== '.png') {
            const err = new Error("EXTENSION");
            err.code = 'EXTENSION';
            return callBack(err);
        }
        callBack(null, true);
    }
}).single('file');

exports.getAll = function (req, res) {};

exports.getOne = function (req, res) {};

/**
 * @Info Загрузка картинок
 * @param req
 * @param res
 */
exports.create = function (req, res) {
    upload( req, res, err => {
        console.log( req.file ); // req.file - файл `avatar`
        console.log( req.files ); // req.files - массив файлов `photos`
        console.log( req.body ); // req.body сохранит текстовые поля, если они будут

        let error = '';
        if (err instanceof multer.MulterError) {
            console.log( 'Случилась ошибка Multer при загрузке' );
        } else  if (err.code == 'EXTENSION'){
            console.log( 'только jpg и png' );
            error = 'только jpg и png';
        } else {
            // При загрузке произошла неизвестная ошибка.
            console.log( 'При загрузке произошла неизвестная ошибка' );
            console.log( err.code );
            console.log( err );
            console.log( error );
        }



        res.json({
            ok: !error,
            error
        });
    });
};

exports.remove = function (req, res) {};


