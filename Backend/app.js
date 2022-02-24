let express = require('express');
let app= express();
let productListRouter = require('./router/product');
let homeRouter = require('./router/home');
let classListRouter = require('./router/classList');
let classTimeListRouter = require('./router/classTimeList');
let orderRouter = require('./router/order');
app.listen(3000);
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));
app.use('/productList',productListRouter);
app.use('/Home', homeRouter);
app.use('/classList', classListRouter);
app.use('/classTimeList', classTimeListRouter);
app.use('/order', orderRouter);

