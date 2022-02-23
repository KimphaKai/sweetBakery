let express = require('express');
let classTimeListRouter = express.Router();
let conn = require('../db');


classTimeListRouter.get('/page/:id', function(req, res){
    let classTitleOption = [];
    let page = req.params.id;
    let rowsPerPage = 4;
    let rowStart = (page-1)*rowsPerPage;
    conn.queryAsync(`SELECT classtime.*, classlist.classTitle FROM classtime JOIN classlist ON classlist.classId = classtime.classId order by classTimeId limit ${rowStart} , ${page*rowsPerPage};`)
        .then(allCols=>{
            classTitleOption.push(allCols);
            return conn.queryAsync('SELECT classId, classTitle FROM classlist');
        }).then(classTitle=>{
            classTitleOption.push(classTitle);
            res.send(classTitleOption);
        }).catch(err=>{
            console.log(err);
        })
    
})
classTimeListRouter.get('/countRows', function(req, res){
    conn.query('SELECT COUNT(*) AS COUNT FROM classtime',[],
        function(err, rows){
            res.send(JSON.stringify(rows));
        });

})


module.exports = classTimeListRouter;