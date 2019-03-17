const mongoose = require('mongoose');

const userScheme = new mongoose.Schema(
    {
        imgUrl: {
            type: String
        },
        admin: {
            type: Boolean,
            default: false
        },
        name: {
            type: String,
            required: true,
            minlength:2,
            maxlength:30
        },
        email: {
            type: String,
            unique: true,
            required: true  // уникальный, недает создать если уже есть такой
        },
        password: {
            type: String,
            required: true
        },
        product: {
            type: Array
        },
    },
    {
        timestamps: true, // https://mongoosejs.com/docs/guide.html#timestamps
        versionKey: false // https://mongoosejs.com/docs/guide.html#versionKey
    }
);

userScheme.set('toJSON',{virtuals:true}); // убираем _ у id
// module.exports = userScheme;
mongoose.model("User", userScheme);

