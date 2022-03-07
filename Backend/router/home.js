let express = require('express');
let homeRouter = express.Router();
let conn = require('../db');


//-------------上方三個資訊----------

//本週成長銷售額(這週-上週)
homeRouter.get('/capsule/sales/:first/:last/:Lfirst/:Llast',function(req,res){
    let value=[];
    conn.queryAsync(`SELECT SUM(od.productPrice*od.productNum) AS total FROM orderlist o JOIN orderdetail od ON(o.orderId=od.orderId) WHERE o.orderId>"${req.params.Lfirst}0000" AND o.orderId <= "${req.params.Llast}9999" AND o.paymementStatus="已付款"`)
        .then(lastWeekTot=>{
            value.push(lastWeekTot);
            return conn.queryAsync(`SELECT SUM(od.productPrice*od.productNum) AS total FROM orderlist o JOIN orderdetail od ON(o.orderId=od.orderId) WHERE o.orderId>"${req.params.first}0000" AND o.orderId <= "${req.params.last}9999" AND o.paymementStatus="已付款"`)
        }).then(thisWeekTot=>{
            value.push(thisWeekTot);
            res.send(value);
        }).catch(err=>{
            console.log(err);
        })
    
})

//本週取消/已完成訂單
homeRouter.get('/capsule/orders/:first/:last',function(req, res){
    let value = [];
    conn.queryAsync(`SELECT COUNT(*) AS COUNT FROM orderlist WHERE orderId>"${req.params.first}0000" AND orderId <= "${req.params.last}9999" AND orderStatus="取消訂單"`)
    .then(cancel=>{
        value.push(cancel);
        return conn.queryAsync(`SELECT COUNT(*) AS COUNT FROM orderlist WHERE orderId>"${req.params.first}0000" AND orderId <= "${req.params.last}9999" AND paymementStatus="已付款"`)
    }).then(confirm=>{
        value.push(confirm);
        res.send(value);
    }).catch(err =>{
        console.log(err);
    })
})


//本月目前業績
homeRouter.get('/capsule/monthSales/:first/:last',function(req,res){
    conn.queryAsync(`SELECT SUM(od.productPrice*od.productNum) AS total FROM orderlist o JOIN orderdetail od ON(o.orderId=od.orderId) WHERE o.orderId>"${req.params.first}0000" AND o.orderId <= "${req.params.last}9999" AND o.paymementStatus="已付款"`)
    .then(sales =>{
        res.send(sales);
    }).catch(err=>{
        console.log(err);
    })
})



//-------------下方銷售額(預設)----------


homeRouter.get('/salesInfo/:first/:last',function(req,res){
    let value=[];
    conn.queryAsync(`SELECT SUM(od.productPrice*od.productNum) AS total FROM orderlist o JOIN orderdetail od ON(o.orderId=od.orderId) WHERE o.orderId>"${req.params.first}0000" AND o.orderId <= "${req.params.last}9999" AND o.paymementStatus="已付款"`)
    .then(totSales =>{
        value.push(totSales);
        return conn.queryAsync(`SELECT SUBSTRING(o.orderId, 1, 8) AS date, SUM(od.productPrice*od.productNum) AS total FROM orderlist o JOIN orderdetail od ON(o.orderId=od.orderId) WHERE o.orderId>"${req.params.first}0000" AND o.orderId <= "${req.params.last}9999" AND o.paymementStatus="已付款" GROUP BY date`);
    }).then(dateSales =>{
        value.push(dateSales);
        return conn.queryAsync(`SELECT SUBSTRING(orderId, 1, 4) AS year FROM orderlist WHERE paymementStatus="已付款" GROUP BY year`)
    }).then(years=>{
        value.push(years);
        return conn.queryAsync(`SELECT SUBSTRING(orderId, 5, 2) AS month FROM orderlist WHERE orderId>"202200000000" AND orderId <= "202213329999" AND paymementStatus="已付款" GROUP BY month`);
    }).then(months=>{
        value.push(months);
        res.send(value);
    })
    .catch(err=>{
        console.log(err);
    })
})


//-------------下方銷售額(select years options)----------

homeRouter.get('/salesInfo/years/options/:yfmdate/:ylmDate',function(req,res){
    let value = [];
    let year = req.params.yfmdate.substring(0,4);
    conn.queryAsync(`SELECT SUM(od.productPrice*od.productNum) AS total FROM orderlist o JOIN orderdetail od ON(o.orderId=od.orderId) WHERE o.orderId>"${req.params.yfmdate}0000" AND o.orderId <= "${req.params.ylmDate}9999" AND o.paymementStatus="已付款"`)
    .then(totSales=>{
        value.push(totSales);
        return conn.queryAsync(`SELECT SUBSTRING(o.orderId, 1, 8) AS date, SUM(od.productPrice*od.productNum) AS total FROM orderlist o JOIN orderdetail od ON(o.orderId=od.orderId) WHERE o.orderId>"${req.params.yfmdate}0000" AND o.orderId <= "${req.params.ylmDate}9999" AND o.paymementStatus="已付款" GROUP BY date`)
    }).then(dateSales=>{
        value.push(dateSales);
        return conn.queryAsync(`SELECT SUBSTRING(orderId, 5, 2) AS month FROM orderlist WHERE orderId>"${year}00000000" AND orderId <= "${year}99999999" AND paymementStatus="已付款" GROUP BY month`);
    }).then(months=>{
        value.push(months);
        res.send(value);
    }).catch(err=>{
        console.log(err);
    })
})


//-------------下方銷售額(select months options)----------
homeRouter.get('/salesInfo/months/options/:yfmdate/:ylmDate',function(req,res){
    let value=[];
    conn.queryAsync(`SELECT SUM(od.productPrice*od.productNum) AS total FROM orderlist o JOIN orderdetail od ON(o.orderId=od.orderId) WHERE o.orderId>"${req.params.yfmdate}0000" AND o.orderId <= "${req.params.ylmDate}9999" AND o.paymementStatus="已付款"`)
    .then(totSales=>{
        value.push(totSales);
        return conn.queryAsync(`SELECT SUBSTRING(o.orderId, 1, 8) AS date, SUM(od.productPrice*od.productNum) AS total FROM orderlist o JOIN orderdetail od ON(o.orderId=od.orderId) WHERE o.orderId>"${req.params.yfmdate}0000" AND o.orderId <= "${req.params.ylmDate}9999" AND o.paymementStatus="已付款" GROUP BY date`)
    }).then(dateSales=>{
        value.push(dateSales);
        res.send(value);
    }).catch(err=>{
        console.log(err);
    })
})


//-------------下方商品排行------------


homeRouter.get('/rankList/:firstmDate/:lastmDate/:page', function(req,res){
    let value =[];
    let page = req.params.page;
    let rowsPerPage = 4;
    let rowsStart = (page-1)*rowsPerPage;
    let thisYear = req.params.firstmDate.substring(0,4);
    conn.queryAsync(`SELECT od.productId,p. productTitle, SUM(od.productNum) AS numTotal FROM orderdetail od JOIN orderlist o ON(od.orderId=o.orderId) JOIN product p ON(od.productId = p.productId) WHERE od.orderId>${req.params.firstmDate}0000 AND od.orderId <= ${req.params.lastmDate}9999 AND o.paymementStatus="已付款" GROUP BY od.productId ORDER BY numTotal DESC LIMIT ${rowsStart},${rowsPerPage}`)
        .then(allCols=>{
            value.push(allCols);
            return conn.queryAsync(`SELECT SUBSTRING(od.orderId, 1, 4) AS year FROM orderdetail od JOIN orderlist o ON (od.orderId=o.orderId) WHERE o.paymementStatus="已付款" GROUP BY year`)
        }).then(years=>{
            value.push(years);
            return conn.queryAsync(`SELECT SUBSTRING(od.orderId, 5, 2) AS month FROM orderdetail od JOIN orderlist o ON (od.orderId=o.orderId) WHERE o.paymementStatus="已付款" AND SUBSTRING(od.orderId, 1, 4)=${thisYear} GROUP BY month;`)
        }).then(months=>{
            value.push(months);
            return conn.queryAsync(`SELECT COUNT(DISTINCT od.productId) AS COUNT FROM orderdetail od JOIN orderlist o ON(od.orderId=o.orderId) WHERE od.orderId>${req.params.firstmDate}0000 AND od.orderId <= ${req.params.lastmDate}9999 AND o.paymementStatus="已付款" ;`);
        }).then(countRows=>{
            value.push(countRows)
            value.push({rowsPerPage:4});
            return conn.queryAsync(`SELECT c.categoryId, c.categoryName  FROM orderdetail od JOIN orderlist o ON(od.orderId=o.orderId) JOIN product p ON(od.productId = p.productId) JOIN productcategory c ON(p.categoryId=c.categoryId) WHERE od.orderId>${req.params.firstmDate}0000 AND od.orderId <= ${req.params.lastmDate}9999 AND o.paymementStatus="已付款" GROUP BY c.categoryId; `)
        }).then(cat=>{
            value.push(cat);
            res.send(value);
        }).catch(err=>{
            console.log(err);
        })
})

homeRouter.get('/rankList/:firstmDate/:lastmDate/:year/:month/:category/:orderBy/:page',function(req,res){
    let value =[];
    let page = req.params.page;
    let rowsPerPage = 4;
    let rowsStart = (page-1)*rowsPerPage;
    let category;
    if(req.params.category!=='0'){
        category=`AND SUBSTRING(od.productId, 1, 1) = ${req.params.category}`
    }else{
        category=""
    }

    conn.queryAsync(`SELECT od.productId,p. productTitle, SUM(od.productNum) AS numTotal FROM orderdetail od JOIN orderlist o ON(od.orderId=o.orderId) JOIN product p ON(od.productId = p.productId) WHERE od.orderId>${req.params.firstmDate}0000 AND od.orderId <= ${req.params.lastmDate}9999 AND o.paymementStatus="已付款" ${category} GROUP BY od.productId ORDER BY numTotal ${req.params.orderBy} LIMIT ${rowsStart},${rowsPerPage}`)
    .then(allCols=>{
        value.push(allCols);
        return conn.queryAsync(`SELECT COUNT(DISTINCT od.productId) AS COUNT FROM orderdetail od JOIN orderlist o ON(od.orderId=o.orderId) WHERE od.orderId>${req.params.firstmDate}0000 AND od.orderId <= ${req.params.lastmDate}9999 AND o.paymementStatus="已付款" ${category};`)
    }).then(countRows=>{
        value.push(countRows)
        value.push({rowsPerPage:4})
        return conn.queryAsync(`SELECT SUBSTRING(od.orderId, 5, 2) AS month FROM orderdetail od JOIN orderlist o ON (od.orderId=o.orderId) WHERE o.paymementStatus="已付款" AND SUBSTRING(od.orderId, 1, 4)=${req.params.year} ${category} GROUP BY month;`)
    }).then(months=>{
        value.push(months);
        return conn.queryAsync(`SELECT c.categoryId, c.categoryName  FROM orderdetail od JOIN orderlist o ON(od.orderId=o.orderId) JOIN product p ON(od.productId = p.productId) JOIN productcategory c ON(p.categoryId=c.categoryId) WHERE od.orderId>${req.params.firstmDate}0000 AND od.orderId <= ${req.params.lastmDate}9999 AND o.paymementStatus="已付款" GROUP BY c.categoryId; `)
    }).then(cat=>{
        value.push(cat);
        res.send(value);
    }).catch(err=>{
        console.log(err);
    })
})


module.exports = homeRouter;