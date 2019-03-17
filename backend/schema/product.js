const mongoose = require('mongoose');

const productScheme = new mongoose.Schema(
    {
        imgUrl: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true,
            minlength:2,
            maxlength:40
        },
        price: {
            type: Number,
            required: true
        },
        category: {
            type: Array,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        author: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true, // https://mongoosejs.com/docs/guide.html#timestamps
        versionKey: false // https://mongoosejs.com/docs/guide.html#versionKey
    }
);

productScheme.set('toJSON',{virtuals:true});
// module.exports = productScheme;
mongoose.model("Product", productScheme);
