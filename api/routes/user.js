const express = require('express');
const route = express.Router();
const mongoose = require('mongoose');
const User = require('../models/user');

route.post('/signup',(req,res,next) => {
    const user = new User({
        _id: new mongoose.Types.ObjectId(),
        email: req.body.email,
        password: bcryt.hash(req.body.password)
    })

});