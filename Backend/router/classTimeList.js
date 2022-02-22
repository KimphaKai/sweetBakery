let express = require('express');
let classTimeListRouter = express.Router();
let path = require('path');
let conn = require('./db');



classTimeListRouter.get('/', function(req, res){
    conn.query("select * from classtime,B where A.a = B.b;",[],
        function(err, rows){
            res.send(JSON.stringify(rows));
        }    
    )
})

module.exports = classTimeListRouter;