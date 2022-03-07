let express = require('express');
let orderRouter = express.Router();
let conn = require('../db');

orderRouter.get('/unChecked/page/:id',function(req, res){
    let orderData=[];
    let page = req.params.id;
    let rowsPerPage = 5;
    let rowsStart = (page-1)*rowsPerPage;
    conn.queryAsync(`SELECT o.*, SUM(od.productNum*od.productPrice) AS total FROM orderlist o LEFT JOIN orderdetail od ON(o.orderId=od.orderId) WHERE o.orderStatus="未確認" GROUP BY o.orderId LIMIT ${rowsStart},${rowsPerPage};`)
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

//訂單確認的btn
//訂單狀態變為確認訂單/取消訂單
orderRouter.put('/unChecked/editOrderStatus',function(req,res){
    res.send('connect success~~');
    let oStatus = req.body.btn;
    let newStatus = (oStatus==="確定")? "確認訂單":"取消訂單";
    console.log(newStatus);
    conn.query("UPDATE orderlist SET orderStatus=? WHERE orderId=?;",
        [newStatus,req.body.orderId],
        function(err, result){
            if(err){
                console.log(err);
            }else{
                console.log('update success!!!');
            }
        }
    )  
})


orderRouter.get('/orderDetail/:id',function(req, res){
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
    conn.queryAsync(`SELECT o.*, SUM(od.productNum*od.productPrice) AS total FROM orderlist o LEFT JOIN orderdetail od ON(o.orderId=od.orderId) WHERE o.orderStatus="確認訂單" AND o.paymementStatus="未付款" GROUP BY o.orderId LIMIT ${rowsStart},${rowsPerPage}`)
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

//未取貨的狀態Btn
orderRouter.put('/notClaimed/editPaymentStatus',function(req,res){
    res.send('connect success~~');
    conn.query("UPDATE orderlist SET paymementStatus='已付款' WHERE orderId=?;",
        [req.body.orderId],
        function(err, result){
            if(err){
                console.log(err);
            }else{
                console.log('update success!!!');
            }
        }
    )  
})

//未取貨取消訂單Btn
orderRouter.put('/notClaimed/cancelOrder',function(req,res){
    res.send('connect success~~');
    conn.query("UPDATE orderlist SET orderStatus='取消訂單' WHERE orderId=? AND paymementStatus='未付款';",
        [req.body.orderId],
        function(err, result){
            if(err){
                console.log(err);
            }else{
                console.log('update success!!!');
            }
        }
    )  
})


orderRouter.get('/claimed/page/:id',function(req,res){
    let orderData = [];
    let page = req.params.id;
    let rowsPerPage = 6;
    let rowsStart = (page-1) * rowsPerPage;
    conn.queryAsync(`SELECT o.*, SUM(od.productNum*od.productPrice) AS total FROM orderlist o LEFT JOIN orderdetail od ON(o.orderId=od.orderId) WHERE o.orderStatus="確認訂單" AND o.paymementStatus="已付款" GROUP BY o.orderId LIMIT ${rowsStart},${rowsPerPage};`)
        .then(allCols=>{
            orderData.push(allCols);
            return conn.queryAsync('SELECT COUNT(*) AS COUNT FROM orderlist WHERE orderStatus="確認訂單" AND paymementStatus="已付款";');
        }).then(rowsCount=>{
            orderData.push(rowsCount);
            res.send(orderData);
        }).catch(err=>{
            console.log(err);
        })
})

function searchOrder(path, condition){
    
    orderRouter.get(`/search/${path}/:numOrName`,function(req,res){
        let numOrName = req.params.numOrName;
        if(!isNaN(numOrName)){
            conn.queryAsync(`SELECT o.*, SUM(od.productNum*od.productPrice) AS total FROM orderlist o LEFT JOIN orderdetail od ON(o.orderId=od.orderId) WHERE ${condition} AND o.buyerPhone LIKE  "${numOrName}%" GROUP BY o.orderId;`)
                .then(row=>{
                    res.send(row);
                }).catch(err=>{
                    console.log(err);
                })
        }else{
            conn.queryAsync(`SELECT o.*, SUM(od.productNum*od.productPrice) AS total FROM orderlist o LEFT JOIN orderdetail od ON(o.orderId=od.orderId) WHERE ${condition} AND o.buyerName LIKE "${numOrName}%" GROUP BY o.orderId;`)
                .then(row=>{
                    res.send(row);
                }).catch(err=>{
                    console.log(err);
                })
        }
    })
}


searchOrder('unChecked','o.orderStatus="未確認"');
searchOrder('notClaimed','o.orderStatus="確認訂單" AND o.paymementStatus="未付款"');




module.exports = orderRouter;