const express = require('express');
const route = express.Router();
const mongoose = require('mongoose');
const Order = require('../models/order');
const Product = require('../models/product');

// Handle incoming GET requests to /orders
route.get("/", (req, res, next) => {
    console.log("hi orders pade");
    // Product.findById(req.body.productId).then(product => {
    //     if (!product) {
    //         return res.status(404).json({
    //             "message":"product not found"
    //         });
    //         console.log(product);
    //     }
    console.log("orders page");
    Order.find()
        .select("product quantity _id")
        .exec()
        .then(docs => {
            // console.log(product);
            // console.log("product");
            res.status(200).json({
                count: docs.length,
                orders: docs.map(doc => {
                    return {
                        _id: doc._id,
                        product: doc.product,
                        quantity: doc.quantity,
                        request: {
                            type: "GET",
                            url: "http://localhost:3000/orders/" + doc._id
                        }
                    };
                })
            });
        });
    // }).catch(err => res.status(500).json({
    //     message: "product not found",
    //     err: err
    // }));

});


route.post('/', (req, res, next) => {
    console.log(req.body.productId);
    console.log(req.body.quantity);
    const order = new Order({
        _id: mongoose.Types.ObjectId(),
        product: req.body.productId,
        quantity: req.body.quantity
    });
    order.save().then(result => {
        console.log(result);
        res.status(201).json(result);
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    })
});

route.get("/:orderId", (req, res, next) => {
    console.log(req.params.orderId);
    const orderId = req.params.orderId;
    Order.findById(orderId)
        .exec()
        .then(order => {
            if (order) {
                console.log(order + "result came");
            }
            console.log(order + "fgxg");
            res.status(200).json({
                order: order,
                request: {
                    type: "GET",
                    url: "http://localhost:3000/orders:orderid" + order._id
                }

            });
        }).catch(err => {
            res.status(500).json({
                error: err,
                error: 'not found'
            });
        });
});

route.delete('/:orderId', (req, res, next) => {
    Order.remove({
        _id: req.params.orderId
    }).exec().then(result => {
        console.log("deleted");
        // console.log(result);
        //     if (!result) {
        //         console.log("deleted");
        //         return res.status(404).json({
        //             message: "Order not Found"
        //         });
        //     } else {
                res.status(200).json({
                    message: "Order deleted"
                });
           // }
    }).catch();
});
module.exports = route;

// route.get('/', (req, res, next) => {
//     Order.find().select('-__v').exec().then(docs=> { 
//         res.status(200).json(docs);
//     });
// });

//body {
// 	"productId": "5b35c2096d76193b20b9f1f0",
// 	"quantity": "3"
// }


// route.post('/', (req, res, next) => {
//     const order = {
//        productId: req.body.productId,
//        productName:req.body.productName,
//        productDesc:req.body.productDesc,
//        productImg:req.body.productImg,
//        productPrice:req.body.productPrice
//    };
//    res.status(200).json({
//        message: 'order updated',
//        order: order
//    });
// });