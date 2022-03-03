var express = require("express");
var cartRouter = express.Router();
var db = require('../db');
// var session = require('session');

cartRouter.get("/", function (req, res) {
  let productInformation = {};
  let productPic = {};
// req.session.username
  db.queryAsync('SELECT c.*, p.*,s.sizeName,(p.productPrice*c.productNum) AS subTotal FROM cartlist c JOIN product p ON(c.productId=p.productId) JOIN productsize s ON(p.sizeId=s.sizeId) WHERE c.memberId="handsome"')
    .then(category =>{
      productInformation = category;
      console.log(category);
      return db.queryAsync('SELECT * FROM productimg');
    }).then(productImage=>{
      productPic = productImage
      // console.log(productInformation);
      res.render("cart",{
        productInformation: productInformation,
        productPic: productPic
      })
    })
    .catch(err=>{
      console.log(err)
    })
})

//-------------------------------------------------------
// input更改數量的值可以儲存進資料庫
cartRouter.put('/updateNum/input',function(req,res){
  // console.log(req.body.pId);
  db.query("UPDATE cartlist SET productNum = ? WHERE memberId=? AND productId=?",
  [req.body.inputVal, "handsome", req.body.pId],function(err, result){
    if(err){
      console.log(err);
    }else{
      console.log('success!');
    }
  })
})

// 加,減 更改數量的值可以儲存進資料庫
cartRouter.put('/updateNum/button',function(req,res){
  // console.log(req.body.pId);
  db.query("UPDATE cartlist SET productNum = ? WHERE memberId=? AND productId=?",
  [req.body.inputVal, "handsome", req.body.pId],function(err, result){
    if(err){
      console.log(err);
    }else{
      console.log('success!');
    }
  })
})

// 刪除訂單可以刪除資料庫資料
cartRouter.post('/updateNum/delete',function(req,res){
  console.log(req.body.pId);
  db.query("DELETE FROM cartlist WHERE memberId=? AND productId=?",
  ["handsome",req.body.pId],function(err, result){
    if(err){
      console.log(err);
    }else{
      console.log('success!');
    }
  })
})

module.exports = cartRouter;