const express = require('express');
const route = express.Router();

route.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'order details'
    });
});

route.post('/', (req, res, next) => {
     const order = {
        productId: req.body.productId,
        productName:req.body.productName,
        productDesc:req.body.productDesc,
        productImg:req.body.productImg,
        productPrice:req.body.productPrice
    };
    res.status(200).json({
        message: 'order updated',
        order: order
    });
});

route.delete('/', (req, res, next) => {
    res.status(200).json({
        message: 'order deleted'
    });
});
module.exports = route;