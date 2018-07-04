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
    var myquery = { "productId": "1233"};
    dbo.collection("customers").deleteOne(myquery, function(err, obj) {
      if (err) throw err;
      console.log("1 document deleted");
      conn.close();
    });
});