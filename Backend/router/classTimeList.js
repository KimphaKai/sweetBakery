let express = require('express');
let classTimeListRouter = express.Router();
let conn = require('../db');


classTimeListRouter.get('/page/:id', function(req, res){
    let classTitleData = [];
    let page = req.params.id;
    let rowsPerPage = 4;
    let rowStart = (page-1)*rowsPerPage;
    conn.queryAsync(`SELECT classtime.*, classlist.classTitle FROM classtime JOIN classlist ON classlist.classId = classtime.classId order by classTimeId limit ${rowStart} , ${page*rowsPerPage};`)
        .then(allCols=>{
            classTitleData.push(allCols);
            return conn.queryAsync('SELECT COUNT(*) AS COUNT FROM classtime');
        }).then(rowsCount=>{
            classTitleData.push(rowsCount);
            return conn.queryAsync('SELECT classId, classTitle FROM classlist');
        }).then(classTitle=>{
            classTitleData.push(classTitle);
            res.send(classTitleData);
        }).catch(err=>{
            console.log(err);
    });
    
})



module.exports = classTimeListRouter;