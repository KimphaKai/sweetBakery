let express = require('express');
let classReservationRouter = express.Router();
let conn= require('../db');


classReservationRouter.get('/',function(req,res){
    // conn.query('select class.classTitle, time.startDate,time.startTime, re.reservationId,re.guestName,re.guestNum,re.guestPhone from classtime time join classreservation re on(re.classTimeId=time.classTimeId) join classlist class on (time.classId=class.classId) ',
    // function(err,result){
    //     if(err){
    //         console.log(err);
    //     }
    //     res.send(result);
    // });
    let today = new Date();
    let currentDate=`${today.getFullYear()}-${(today.getMonth()+1).toString().padStart(2,0)}-${today.getDate().toString().padStart(2,0)}`;
    // console.log(currentDate);
    conn.query('select time.classTimeId, class.classTitle, time.startDate,time.startTime, re.reservationId,re.guestName,re.guestNum,re.guestPhone from classtime time join classreservation re on(re.classTimeId=time.classTimeId) join classlist class on (time.classId=class.classId) where time.startDate>=? order by time.startDate ',[currentDate],
    function(err,result){
        if(err){
            console.log(err);
        }
        res.send(result);
    });
});
classReservationRouter.post('/cancel',function(req,res){
    // res.send('ok');
    // 查詢剩餘人後更新剩餘人數，刪除預約人
    let remain =0;
    conn.queryAsync(`select * from classtime where classTimeId= "${req.body.classTimeId}"`)
    .then(classTimeData=>{
        // res.send(classTimeData);
        remain= parseInt( classTimeData[0].remain);
        remain+= parseInt( req.body.peopleNum);
        // console.log(remain);
        return conn.queryAsync(`update classtime set remain ='${remain}' where classTimeId='${req.body.classTimeId}'`)
    }).then(()=>{
        conn.query('delete from classreservation where reservationId=?',[req.body.reservationId],function(err){
            if(err){
                console.log(err);
            }
        });
        res.end();
    }).catch(err=>{
        if(err){
            console.log(err);
        }
    })
});
classReservationRouter.get('/search/:keyWord',function(req,res){
    let today = new Date();
    let currentDate=`${today.getFullYear()}-${(today.getMonth()+1).toString().padStart(2,0)}-${today.getDate().toString().padStart(2,0)}`;
    // console.log(currentDate);
    if( !isNaN(req.params.keyWord)  ){
        conn.query(`select time.classTimeId, class.classTitle, time.startDate,time.startTime, re.reservationId,re.guestName,re.guestNum,re.guestPhone from classtime time join classreservation re on(re.classTimeId=time.classTimeId) join classlist class on (time.classId=class.classId) where time.startDate>="${currentDate}" and re.guestPhone like "%${req.params.keyWord}%" order by time.startDate `,
        function(err,result){
            if(err){
                console.log(err);
            }
            res.send(result);
        });
    
        
    }else{
        conn.query(`select time.classTimeId, class.classTitle, time.startDate,time.startTime, re.reservationId,re.guestName,re.guestNum,re.guestPhone from classtime time join classreservation re on(re.classTimeId=time.classTimeId) join classlist class on (time.classId=class.classId) where time.startDate>="${currentDate}" and re.guestName like "%${req.params.keyWord}%" order by time.startDate `,
        function(err,result){
            if(err){
                console.log(err);
            }
            res.send(result);
        });
       
    }
})
module.exports= classReservationRouter;