const express = require('express');
const route = express.Router();
const mongoose = require('mongoose');
const Product = require('../models/product');
const checkAuth = require('../../middleware/check-auth')
// route.get('/', (req, res, next) => {
//     res.status(200).json({
//         message: 'Handling Get requests'
//     });
// });

// route.post('/', checkAuth, (req, res, next) => {
//     const product = {
//         productId: req.body.productId,
//         productName:req.body.productName,
//         productDesc:req.body.productDesc,
//         productImg:req.body.productImg,
//         productPrice:req.body.productPrice
//     };
//     res.status(200).json({
//         message: 'Handling Post requessts',
//         createdProduct:product
//     });
// });

route.get("/", (req, res, next) => {
    console.log("hi this is logger");
    Product.find()
      .select("-_id productId productName productDesc productImg productPrice")
      .exec()
      .then(docs => {
        const response = {
          count: docs.length,
          products: docs.map(doc => {
            return { 
                productName: doc.productName,
                productPrice: doc.productPrice,
                 _id: doc._id,
            };
          })
        };
        res.status(200).json(docs);
      })
      .catch(err => {
        res.status(500).json({
          error: err
        });
      });
  });

route.post('/', checkAuth, (req, res, next) => {
    console.log(req);
    const product = new Product ({
        _id: new mongoose.Types.ObjectId(),
        productId: req.body.productId,
        productName:req.body.productName,
        productDesc:req.body.productDesc,
        productImg:req.body.productImg,
        productPrice:req.body.productPrice
    });
    product.save().then(result => {
        console.log("Result:"+result);
        res.status(201).json({
            message: 'Created Records succesfully',
            createdProduct:product
        });
    }).catch(err => {
        console.log("Error:" + err);
        res.status(500).json({
           error: err,  
        });
    });

});

route.get('/:productId',( req, res, next) => {
    const id = req.params.productId;
    Product.findById(id).exec().then(doc => {
        if (doc) {
            console.log("from database", doc);
            res.status(200).json(doc);
        }
        else {
            res.status(404).json({message:"No valid id Found for provided id"});
        }
    }).catch(err => { 
        console.log(err);
        res.status(500).json({error:err});
    });
});

route.post('/:productId',( req, res, next) => {
    const id = req.params.productId;
    console.log("id passed");
    res.status(200).json({
        message: 'One Product post',
        id:id
    });
});

// request comes likes this
// [
// 	{"propName":"productDesc","value": "A Apple a day keeps the doctor away"},{"propName":"productPrice","value":"600"}
// ]

route.patch('/:productId',( req, res, next) => {
    const id = req.params.productId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value
    }   
   Product.update({_id: id}, {$set:updateOps}).exec().then( result => {
       res.status(200).json(result);
       console.log("update result",result)
   }).catch(err => { 
       res.status(500).json(err);
       console.log(err);
    });
});


route.delete('/:productId',( req, res, next) => {
    const id = req.params.productId;
    Product.remove({ _id : id})
    .exec()
    .then(result => {
        res.status(200).json(result);
    }).catch( err => {
        console.log("Error", err);
        res.status(500).json({error:err})
    });
    res.status(201).json({
        message: 'Deleted Product',
        id:id
    });
});


module.exports = route;