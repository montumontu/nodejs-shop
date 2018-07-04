const mongoose = require('mongoose');
const productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    productId: {type:String, required: true},
    productName: {type:String, required: true},
    productDesc: {type:String, required: true},
    productImg: {type:String, required: true},
    productPrice: {type:Number, required: true},
});

module.exports = mongoose.model('Product', productSchema);