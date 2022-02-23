let express = require('express');
let productListRouter = express.Router();
let multer = require('multer');
let conn = require('./db');

let admin = require('firebase-admin');
let uuid = require('uuid');
let uuidv1 = uuid.v1();
let serviceAccount = require('./sweetbakeryimg-firebase-adminsdk-4i2ot-d21b8fc5df.json');

// 取得商品列表
// productListRouter.get('/',function(){

// });
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
        }).catch(erro => {
            console.log(erro);
        })
    // res.send(addProductOption);
});
// ===========================================================================
// 新增產品
// 新增產品(圖片處理)
const defaultApp = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: "sweetbakeryimg.appspot.com",
});
const bucket = defaultApp.storage().bucket();

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
                    .catch(error=>{
                        console.log(error);
                    })
                })
                res.send('ok');
            }).catch(error => {
                res.send('file upload error:' + error);
            })
        }).catch(error => {
            console.log(error);
        })


    // console.log(req.body);


})
module.exports = productListRouter;