let express = require('express');
let orderRouter = express.Router();
let conn = require('../db');

orderRouter.get('/unChecked/page/:id',function(req, res){
    let orderData=[];
    let page = req.params.id;
    let rowsPerPage = 5;
    let rowsStart = (page-1)*rowsPerPage;
    conn.queryAsync(`SELECT o.*, SUM(od.productNum*od.productPrice) AS total FROM orderlist o LEFT JOIN orderdetail od ON(o.orderId=od.orderId) WHERE o.orderStatus="未確認" GROUP BY o.orderId LIMIT ${rowsStart},${page*rowsPerPage}`)
        .then(allCols=>{
            orderData.push(allCols);
            return conn.queryAsync('SELECT COUNT(*) AS COUNT FROM orderlist WHERE orderStatus="未確認"');
        }).then(rowsCount=>{
            orderData.push(rowsCount);
            res.send(orderData);
        }).catch(err=>{
            console.log(err);
    });
})

orderRouter.get('/unChecked/orderDetail/:id',function(req, res){
    let detailId= req.params.id;
    conn.queryAsync(`SELECT od.*, od.productNum * od.productPrice AS subTotal, p.productTitle, s.sizeName FROM orderdetail od JOIN product p ON(od.productId=p.productId) JOIN productsize s ON (p.sizeId=s.sizeId) WHERE orderId = "${detailId}"`)
    .then(detail=>{
        res.send(detail);
    }).catch(err=>{
        console.log(err);
    })
})


orderRouter.get('/notClaimed/page/:id',function(req, res){
    let orderData=[];
    let page = req.params.id;
    let rowsPerPage = 5;
    let rowsStart = (page-1)*rowsPerPage;
    conn.queryAsync(`SELECT o.*, SUM(od.productNum*od.productPrice) AS total FROM orderlist o LEFT JOIN orderdetail od ON(o.orderId=od.orderId) WHERE o.orderStatus="確認訂單" AND o.paymementStatus="未付款" GROUP BY o.orderId LIMIT ${rowsStart},${page*rowsPerPage}`)
        .then(allCols=>{
            orderData.push(allCols);
            return conn.queryAsync('SELECT COUNT(*) AS COUNT FROM orderlist WHERE orderStatus="確認訂單" AND paymementStatus="未付款"');
        }).then(rowsCount=>{
            orderData.push(rowsCount);
            res.send(orderData);
        }).catch(err=>{
            console.log(err);
    });
})

module.exports = orderRouter;