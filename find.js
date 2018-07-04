const express = require('express');
const mongoose = require('mongodb').MongoClient;
const db = "mongodb://nayan:08kitunayan@ds119651.mlab.com:19651/shop";

mongoose.connect(db, function(err, conn) {
  if (err) throw err;
  var dbo = conn.db("shop");
  dbo.collection("products").find({},{_id:0,productId:0}).toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
    conn.close();
  });
});