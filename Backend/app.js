let express = require('express');
let app= express();
let productListRouter = require('./router/product');
let homeRouter = require('./router/home');
let classListRouter = require('./router/classList');
let classTimeListRouter = require('./router/classTimeList');
let orderRouter = require('./router/order');
let productCategoryRouter = require('./router/productCategory');
let classReservationRouter= require('./router/classReservation');

app.listen(3000);
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));
app.use('/productList',productListRouter);
app.use('/home', homeRouter);
app.use('/classList', classListRouter);
app.use('/classTimeList', classTimeListRouter);
app.use('/order', orderRouter);
app.use('/classReservation',classReservationRouter);
app.use('/productCategory',productCategoryRouter);

