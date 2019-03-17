//================================================================//
//********** Common **********************************************//
//================================================================//
let myconfig = {
    port: process.env.PORT || 4200,
    companyName: "#test",
    homePath: "",
    IS_DEVELOPMENT: process.env.NODE_ENV === 'development'
};

//================================================================//
//********** Mongoose ********************************************//
//================================================================//
myconfig.mongoose = {
    uri: "mongodb://127.0.0.1:27017/apiExample",
    options: {
        useCreateIndex: true,
        useNewUrlParser: true,
        // autoIndex: process.env.NODE_ENV == 'production', // тогда в схеме "unique:true" не будет работать https://mongoosejs.com/docs/guide.html#indexes
    }
};

//================================================================//
//********** Authorization ***************************************//
//================================================================//
myconfig.authorization = {
    "jwtSecret": "nodeJSForever",
    "bCryptSaltSync": 10,
};

//================================================================//
//********** Session *********************************************//
//================================================================//
myconfig.session = {
    "secret": "nodeJSForever",
    "key": "sid",
    "cookie": {
        "httpOnly": true,
        "maxAge": null
    }
};



module.exports = myconfig;