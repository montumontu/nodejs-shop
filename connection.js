const express = require('express');
const mongoose = require('mongodb').MongoClient;
const db = "mongodb://nayan:08kitunayan@ds119651.mlab.com:19651/shop";
mongoose.connect(db, (err, conn) => {
    if (err) {
        console.error("Error ! " + err);
    } else {
        console.log("Connected to MongoDB" + conn);
    }
    let dbo = conn.db("shop");
    let myobj = [{
            "productId": "1231",
            "productName": "Apple",
            "productDesc": "Stay healthy",
            "productImg": "apple",
            "productPrice": "100"
        },
        {
            "productId": "1232",
            "productName": "Cherry",
            "productDesc": "Stay healthy",
            "productImg": "cherry",
            "productPrice": "200"
        },
        {
            "productId": "1233",
            "productName": "Mango",
            "productDesc": "Stay healthy",
            "productImg": "mango",
            "productPrice": "300"
        },
        {
            "productId": "1234",
            "productName": "Litchi",
            "productDesc": "Stay healthy",
            "productImg": "litchi",
            "productPrice": "400"
        }
    ];

    dbo.collection("products").insertMany(myobj, function (err, res) {
        if (err) throw err;
        console.log("1 document inserted");
    });
    conn.close();
});