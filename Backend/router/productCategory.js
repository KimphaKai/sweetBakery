let express = require('express');
let productCategoryRouter = express.Router();
let conn = require('../db');
// 取得種類
productCategoryRouter.get('/', function (req, res) {
    conn.queryAsync('select * from productCategory')
        .then(result => {
            res.send(result);

        }).catch(err => {
            res.send(err);
        })

});
// 新增種類
productCategoryRouter.post('/addCategory', function (req, res) {
    // console.log(req.body);
    conn.queryAsync('select * from productCategory')
        .then(result => {
            let categoryId = result[result.length - 1].categoryId;
            categoryId++;
            let categoryName = req.body.categoryName;
            conn.queryAsync(`insert into productcategory(categoryId,categoryName) values(${categoryId},'${categoryName}')`)
                .then(() => {
                    res.send('ok');
                })
                .catch(err => {
                    res.send(err);
                })
        }).catch(err => {
            console.log(err);
            res.send(err);
        })


});
productCategoryRouter.post('/editCategory', function (req, res) {

    let categoryId = req.body.id;
    let categoryName = req.body.name;
    conn.query('update productCategory set categoryName=? where categoryId=?',
        [categoryName, categoryId], function (err, result) {
            if (err) {
                console.log(err);
            }
        })
    res.send('ok');
});
productCategoryRouter.post('/deleteCategory', function (req, res) {

    conn.queryAsync(`select * from product where categoryId=${req.body.id}`)
        .then((result) => {
            if (result.length > 0) {
                res.send('have product');

            } else {
                conn.query('delete from productCategory where categoryId=?',[req.body.id],function(err){
                    if(err){
                        res.send(err);
                    }else{

                        res.send(req.body);
                    }
                })
            }
        })
})
module.exports = productCategoryRouter;