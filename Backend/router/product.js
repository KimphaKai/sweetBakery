let express = require('express');
let productListRouter = express.Router();
let multer = require('multer');
let conn = require('../db');
let uuid = require('uuid');
let uuidv1 = uuid.v1();
let bucket = require('../firebase');

// 取得商品列表

productListRouter.get('/page/:id', function (req, res) {
    let productData = []
    let page = req.params.id;
    let rowsPerPage = 6; //實際是7筆
    let rowStart = (page - 1) * rowsPerPage;
    conn.queryAsync(`select p.*, c.categoryName,s.sizeName from product p join productcategory c on(p.categoryId=c.categoryId) join productsize s on(p.sizeId=s.sizeId) order by p.productId limit ${rowStart},${rowsPerPage}`)
        // conn.queryAsync('select p.*, c.categoryName,s.sizeName from product p join productcategory c on(p.categoryId=c.categoryId) join productsize s on(p.sizeId=s.sizeId) order by p.productId')
        .then(allCols => {
            productData.push(allCols);
            return conn.queryAsync('SELECT COUNT(*) AS COUNT FROM product');
        }).then(rowsCount => {
            productData.push(rowsCount);
            productData.push(rowsPerPage);
            res.send(productData);
        }).catch(err => {
            console.log(err);
            res.send(err);
        })
});
// 取得新增編輯商品視窗的選項
productListRouter.get('/editOrAddOption', function (req, res) {
    let addProductOption = [];
    conn.queryAsync('select * from productcategory')
        .then(result1 => {
            // 種類
            addProductOption.push(result1);

            return conn.queryAsync('select * from productsize')
        }).then(result2 => {
            // 規格
            addProductOption.push(result2);
            res.send(addProductOption);
        }).catch(err => {
            console.log(err);
        })
    // res.send(addProductOption);
});
// ===========================================================================
// 新增產品
// 新增產品(圖片處理)


let upload = multer({
    storage: multer.memoryStorage()
})
productListRouter.post('/addProduct', upload.array('files'), function (req, res) {
    // 接收文字資料
    let productTitle = req.body.productTitle;
    let productId = "";
    let categoryId = req.body.categoryId;
    let sizedId = req.body.sizeId;
    let productPrice = req.body.productPrice;
    let productStatus = req.body.productStatus;
    let productInfo = req.body.productInfo;
    let ingredient = req.body.ingredient;
    conn.queryAsync(`select * from product where productId like "${categoryId}%"`)
        .then(result1 => {
            let productAmount = result1.length + 1;
            productAmount = productAmount.toString();
            productId = `${categoryId}${productAmount.padStart(4, 0)}`;
            let dataValue = `"${productId}","${categoryId}","${sizedId}","${productTitle}","${productInfo}","${productPrice}","${ingredient}","${productStatus}"`;
            return conn.queryAsync(`insert into product (productId,categoryId,sizeId,productTitle,productInfo,productPrice,ingredient,productStatus) values (${dataValue})`);

        }).then(() => {
            // 檔案處理
            let imgUrl = [];
            for (let i = 0; i < req.files.length; i++) {
                let file = req.files[i];
                const blob = bucket.file(file.originalname);
                const fileProgress = new Promise((resolve, reject) => {


                    const blobStream = blob.createWriteStream({
                        metadata: {
                            metadata: {
                                firebaseStorageDownloadTokens: uuidv1,
                            }
                        }
                    });
                    blobStream.on('error', err => {

                        reject('upload error');
                    });
                    blobStream.on('finish', () => {
                        bucket.file(blob.name).getMetadata().then((data) => {
                            const metadata = data[0];
                            let Url = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURIComponent(file.originalname)}?alt=media&token=${metadata.metadata.firebaseStorageDownloadTokens}`;
                            resolve({ url: Url });

                        })
                    });
                    blobStream.end(file.buffer);


                });
                imgUrl.push(fileProgress);

            }
            Promise.all(imgUrl).then((response) => {
                response.forEach(file => {
                    conn.queryAsync(`insert into productimg (productId,imgPath) values (${productId},'${file.url}')`)
                        .catch(error => {
                            console.log(error);
                        })
                })
                res.send({ success: 'ok' });
            }).catch(error => {
                res.send('file upload error:' + error);
            });
        }).catch(error => {
            console.log(error);
        })


    // console.log(req.body);


});
// 產品上下架
productListRouter.post('/changeProductStatus', function (req, res) {
    conn.queryAsync(`update product set productStatus='${req.body.productStatus}' where productId='${req.body.productId}'`)
        .then(() => {

            res.send('ok');
        }).catch(err => {
            res.send(err);
        })
});
// 取得該編輯的產品
productListRouter.get('/showEditProduct', function (req, res) {
    let productItem = {}
    // conn.query('select * from product where productId=?',[req.query.productId],function(err,result){

    //     res.send(result);
    //     console.log(result);
    // })
    conn.queryAsync(`select * from product where productId=${req.query.productId}`)
        .then(result => {
            productItem = { ...result[0] };

            return conn.queryAsync(`select * from productimg where productId='${productItem.productId}'`)

        })
        .then(imgUrl => {
            productItem = { ...productItem, imgUrl };
            res.send(productItem);
        })
        .catch(err => {
            res.send(err);
        })

});
// 編輯該產品
productListRouter.post('/editProduct', function (req, res) {
    conn.query('update product set sizeId=?,productTitle=?,productPrice=?,productStatus=?,productInfo=?,ingredient=? where productId=?',
        [req.body.sizeId, req.body.productTitle, req.body.productPrice, req.body.productStatus, req.body.productInfo, req.body.ingredient, req.body.productId]
        , function (err) {
            if (err) {
                res.send(err);
            }
        });
    // console.log(req.body);
    res.send('ok');
});
productListRouter.post('/editMultipleProduct', function (req, res) {
    for (value of req.body) {
        conn.query('update product set productTitle=?,productPrice=? where productId=?'
            , [value.productTitle, value.productPrice, value.productId], function (err) {
                if (err) {
                    console.log(err);
                }
            })

    }
    res.send('ok');
});
// 刪除商品 先判斷訂單明細是否有該商品，刪除圖片路徑再刪商品
productListRouter.post('/deleteProduct', function (req, res) {

    conn.queryAsync(`select * from orderdetail where productId='${req.body.productId}'`)
        .then(detailResult => {
            // console.log(detailResult);
            if (detailResult.length > 0) {

                res.send('have data');
            } else {
                conn.queryAsync(`delete from productimg where productId=${req.body.productId}`)
                    .then(() => {
                        conn.query('delete from product where productId=?', [req.body.productId], function (err) {
                            if (err) {
                                console.log(err);
                            }
                        });
                    }).catch(err => {
                        if (err) {
                            console.log(err);
                        }
                    })
                res.send('無資料')
            }
        }).catch(err => {
            if (err) {
                res.send(err);
            }
        })
});

// 產品搜尋
productListRouter.get('/:productKeyWord', function (req, res) {

    // res.send(req.params.productKeyWord);
    conn.queryAsync(`select p.productId,p.productTitle, p.productPrice,p.productStatus,p.productPrice, c.categoryName,s.sizeName from product p join productcategory c on(p.categoryId=c.categoryId) join productsize s on(p.sizeId=s.sizeId) where p.productTitle like "%${req.params.productKeyWord}%" order by p.productId `
    ).then(result => {
        res.send(result);
    }).catch(err => {
        console.log(err);
    })
});

// 商品排序
productListRouter.post('/sortProduct', function (req, res) {

    let searchInputVal = req.body.searchInputVal;
    let sortbyCategory = req.body.sortbyCategory;
    let sortbyOthers = req.body.sortbyOthers;
    let condition = '';
    let order = '';
    if (searchInputVal == "") {
        
        if (sortbyCategory > 0 && sortbyOthers == 0) {
            // 種類O 其他X
            // res.send('種類O 其他X');
            condition = `where p.categoryId='${sortbyCategory}'`
            order = '';
        } else if (sortbyCategory == 0 && sortbyOthers != 0) {
            // 種類X 其他O
            // res.send('種類X 其他O');
            switch (sortbyOthers) {
                case "priceAsc":
                    order = 'order by p.productPrice';
                    condition = '';
                    break;
                case "priceDesc":
                    order = 'order by p.productPrice desc';
                    condition = '';
                    break;
                case "onMarket":
                    order = '';
                    condition = "where p.productStatus='上架中'";
                    break;
                case "productRecall":
                    order = '';
                    condition = "where p.productStatus='下架中'";
                    break;
                default:
                    break;
            }

        } else if (sortbyCategory > 0 && sortbyOthers != 0) {
            // 種類O 其他O
            switch (sortbyOthers) {
                case "priceAsc":
                    order = 'order by p.productPrice';
                    condition = `where p.categoryId ="${sortbyCategory}"`;
                    break;
                case "priceDesc":
                    order = 'order by p.productPrice desc';
                    condition = `where p.categoryId ="${sortbyCategory}"`;
                    break;
                case "onMarket":
                    order = '';
                    condition = `where p.productStatus='上架中' and p.categoryId ="${sortbyCategory}" `;
                    break;
                case "productRecall":
                    order = '';
                    condition = `where p.productStatus='下架中' and p.categoryId ="${sortbyCategory}" `;
                    break;
                default:
                    break;
            }
            
        }
    } else {

        if (sortbyCategory > 0 && sortbyOthers == 0) {
            // 種類O 其他X
            // res.send('種類O 其他X');
            condition = `where p.categoryId='${sortbyCategory}' and p.productTitle like "%${searchInputVal}%"`
            order = '';
        } else if (sortbyCategory == 0 && sortbyOthers != 0) {
            // 種類X 其他O
            // res.send('種類X 其他O');
            switch (sortbyOthers) {
                case "priceAsc":
                    order = 'order by p.productPrice';
                    condition = `where p.productTitle like "%${searchInputVal}%"`;
                    break;
                case "priceDesc":
                    order = 'order by p.productPrice desc';
                    condition = `where p.productTitle like "%${searchInputVal}%"`;
                    break;
                case "onMarket":
                    order = '';
                    condition = `where p.productStatus='上架中' and p.productTitle like "%${searchInputVal}%"`;
                    break;
                case "productRecall":
                    order = '';
                    condition = `where p.productStatus='下架中' and and p.productTitle like "%${searchInputVal}%"`;
                    break;
                default:
                    break;
            }

        } else if (sortbyCategory > 0 && sortbyOthers != 0) {
            // 種類O 其他O
            switch (sortbyOthers) {
                case "priceAsc":
                    order = 'order by p.productPrice';
                    condition = `where p.categoryId ="${sortbyCategory}"`;
                    break;
                case "priceDesc":
                    order = 'order by p.productPrice desc';
                    condition = `where p.categoryId ="${sortbyCategory}"`;
                    break;
                case "onMarket":
                    order = '';
                    condition = `where p.productStatus='上架中' and p.categoryId ="${sortbyCategory}" `;
                    break;
                case "productRecall":
                    order = '';
                    condition = `where p.productStatus='下架中' and p.categoryId ="${sortbyCategory}" `;
                    break;
                default:
                    break;
            }
            
        }
    }
    conn.query(`select p.productId,p.productTitle, p.productPrice,p.productStatus,p.productPrice, c.categoryName,s.sizeName from product p join productcategory c on(p.categoryId=c.categoryId) join productsize s on(p.sizeId=s.sizeId) ${condition} ${order}`,
        function (err, result) {
            if (err) {
                console.log(err)
            }
            res.send(result);
        })
})


module.exports = productListRouter;