const express = require('express');
const route = express.Router();
const mongoose = require('mongoose');
const User = require('../models/user');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');
const staticvar = require('../nodemon.json');

route.post('/signup', (req, res, next) => {
    User.find({
            email: req.body.email
        }).exec()
        .then(result => {
            if (result.length > 0) {
                console.log(result.length+ "dfdf");
                console.log("wdwd");
                return res.status(200).json({
                    message: "User already exist"
                });
            } else {
                bcrypt.hash(req.body.password, null, null, (err, hash) => {
                    if (err) {
                        console.log("error");
                        return res.status(500).json({
                            error: err
                        });
                    } else {
                        const user = new User({
                            _id: new mongoose.Types.ObjectId(),
                            email: req.body.email,
                            password: hash
                        });
                        user.save().then(result => {
                            res.status(200).json({
                                message: 'user details Inserted'
                            });
                        }).catch(err => {
                            console.log("Error", err);
                            res.status(500).json({
                                error: err
                            })
                        });
                    }
                });

            }
        }).catch(err => {
            res.status(500).json({
                message: "Update Failed",
                err: err
            })
        });



    console.log(req.body.password);

    console.log("hi");
});

route.post('/login',(req,res,err) => {
    console.log("loginsdf");
    
    User.find({email: req.body.email}).exec().then(user => {
        if (user.length < 1 ){
            return res.status(401).json({
                error : "Auth Failed"
            });
        }
        console.log(user[0].password);
        bcrypt.compare(req.body.password, user[0].password, function(err, result) {
            if (err) {
                return res.status(401).json({
                    error : "Auth Failed"
                });
            }
            console.log(err+"error");
            if (result) {
                const token = jwt.sign({
                    email:user[0].email,
                    userId:user[0]._id,
                },
                staticvar.env.JWT_KEY,
                {
                    expiresIn:"1h"
                }
            );
                return res.status(200).json({
                    message : "Auth Successful",
                    token: token
                });
            }
            else {
                return res.status(401).json({
                    error : "Auth Failed"
                });
            }
        });
    }).catch(err => {
        res.status(500).json({
            error: err
        });
    });
});

route.delete('/signup/:userId', (req, res, err) => {
    User.remove({
        _id: req.params.userId
    }).exec().then(
        result => res.status(200).json({
            message: 'user deleted',
            result :result
        })
    ).catch(err => {
        res.status(500).json({
            error: err
        })

    })
});

route.post('/login',(req,res,err)=>{


    
})


module.exports = route;