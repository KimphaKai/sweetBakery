let express = require('express');
let classListRouter =express.Router();
let multer = require('multer');
let conn= require('../db');
let uuid = require('uuid');
let uuidv1 = uuid.v1();
let bucket = require('../firebase');
// 課程資訊的List
// classListRouter.get('/',function(){

// })

// 新增課程資訊

let upload = multer({
    storage: multer.memoryStorage()
});

classListRouter.post('/addClassInfo',upload.array('files'),function(req,res){
    let classInfo =req.body.classInfo;
    let classTitle =req.body.classTitle;
    let classPrice =req.body.classPrice;
    let classDuration =req.body.classDuration;
    // console.log(req.body);
    let dataValue=`'${classTitle}','${classInfo}',${classPrice},${classDuration},0`;
    conn.queryAsync(`insert into classlist (classTitle,classInfo,classPrice,classDuration,classId) values (${dataValue})`)

    .then(()=>{
        return conn.queryAsync('select * from classlist');
        
    }).then(result=>{
        let classId=result[result.length-1].classId;
        let imgUrl=[];
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
                conn.queryAsync(`insert into classimg (classId,imgPath) values (${classId},'${file.url}')`)
                .catch(error=>{
                    console.log(error);
                })
            })
            res.send({success:'ok'});
        }).catch(error => {
            res.send('file upload error:' + error);
        })
        
    })
    .catch(error=>{
        console.log(error);
    })
    
});
module.exports=classListRouter;