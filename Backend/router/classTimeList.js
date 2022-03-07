let express = require('express');
let classTimeListRouter = express.Router();
let conn = require('../db');


classTimeListRouter.get('/page/:id', function (req, res) {
    let classTitleData = [];
    let page = req.params.id;
    let rowsPerPage = 4;
    let rowStart = (page - 1) * rowsPerPage;
    let today = new Date;
    let currentDate = `${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, 0)}-${today.getDate().toString().padStart(2, 0)}`;

    conn.queryAsync(`SELECT classtime.*, classlist.classTitle FROM classtime JOIN classlist ON classlist.classId = classtime.classId where classtime.startDate>="${currentDate}"  order by startDate limit ${rowStart} , ${rowsPerPage};`)
        .then(allCols => {
            classTitleData.push(allCols);

            return conn.queryAsync(`SELECT COUNT(*) AS COUNT FROM classtime where classtime.startDate>="${currentDate}"`);
        }).then(rowsCount => {
            classTitleData.push(rowsCount);
            return conn.queryAsync('SELECT classId, classTitle FROM classlist');
        }).then(classTitle => {
            classTitleData.push(classTitle);
            res.send(classTitleData);
        }).catch(err => {
            console.log(err);
        });

})
// 開課時間option
classTimeListRouter.get('/classIdOption', function (req, res) {
    conn.query('select classId,classTitle from classlist', function (err, classlist) {
        if (err) {
            console.log(err);
        }
        res.send(classlist);
    })
});
// 新增開課時間
classTimeListRouter.post('/addClassTime', function (req, res) {
    conn.query('insert into classtime (classId,startDate,startTime,totalPeople,remain) values (?,?,?,?,?)'
        , [req.body.classId, req.body.startDate, req.body.startTime, req.body.totalPeople, req.body.totalPeople], function (err) {
            if (err) {
                console.log(err);
            }
        });
    res.send('ok');
})
// 取得該課程時間資訊
classTimeListRouter.get('/showEditClassTime', function (req, res) {

    let data = []
    conn.queryAsync(`select * from classreservation where classTimeId="${req.query.classTimeId}"`)
        .then(rows => {
            data.push(rows.length);
            return conn.queryAsync(`select * from classtime where classTimeId="${req.query.classTimeId}"`)
        }).then(classTimeData => {
            data.push(classTimeData[0]);
            // console.log(data);
            res.send(data);
        }).catch(err => {

            if (err) {
                console.log(err);
            }

        })
});
// 編輯
classTimeListRouter.post('/editClassTime', function (req, res) {
    // console.log(req.body);
    let temp = [];
    let newTotalPeople=req.body.totalPeople;
    let newRemain=0;
    
    conn.queryAsync(`select * from classtime where classTimeId=${req.body.classTimeId}`)
        .then(classTimeData => {
            temp.push(classTimeData[0]);
            return conn.queryAsync(`select sum(guestNum) guestNum from classreservation where classTimeId="${req.body.classTimeId}"`)
        }).then(reservedNum => {
            if (req.body.totalPeople < reservedNum[0].guestNum) {
                res.send(reservedNum[0]);
            } else {
                newRemain= temp[0].remain -(temp[0].totalPeople-newTotalPeople);
                // console.log(newRemain);
                // date=  new Date(req.body.startDate).toLocaleDateString("sq-AL", { year: 'numeric', month: '2-digit', day: '2-digit' });
                
                conn.query(`update classtime set classId="${req.body.classId}", startDate="${req.body.startDate}",startTime="${req.body.startTime}" ,totalPeople="${newTotalPeople}",remain="${newRemain}" where classTimeId="${req.body.classTimeId}"`
                ,function(err){
                    if(err){
                        console.log(err);
                    }
                    res.send('success');
                })
            }
        })
        .catch(err => {
            if (err) {
                console.log(err);
            }
        })
    // let totalPeople =req.body.totalPeople;
    // let remain=req.body.remain;
    // conn.queryAsync(`select sum(guestNum) guestNum from classreservation where classTimeId="${req.body.classTimeId}"`)
    // .then(reserveData=>{
    //     // 判斷新的開放如數不能小於已預約人數
    //     if( req.body.totalPeople<reserveData[0].guestNum){
    //         res.send(reserveData[0]);
    //     }else{
    //         remain = remain-(reserveDa)

    //         res.send('success');
    //     }
    //     // console.log(reserveData[0].guestNum);
    // }).catch(err=>{
    //     if(err){
    //         console.log(err);
    //     }
    // })
})

// 刪除
classTimeListRouter.post('/deleteClassTime', function (req, res) {
    conn.queryAsync(`select * from classreservation where classTimeId=${req.body.timeId}`)
        .then(reservationResult => {
            if (reservationResult.length > 0) {
                res.send(reservationResult);
            } else {
                conn.query('delete from classtime where classTimeId=?', [req.body.timeId], function (err) {
                    if (err) {
                        console.log(err);
                    }
                    res.end();
                })
            }
        }).catch(err => {
            if (err) {
                console.log(err);
            };
        })
});

// 課程時間查詢
classTimeListRouter.get('/:classTimeKeyWord', function (req, res) {
    let classTimeListData = [];
    let today = new Date;
    let currentDate = `${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, 0)}-${today.getDate().toString().padStart(2, 0)}`;

    conn.queryAsync(`SELECT classtime.*, classlist.classTitle FROM classtime JOIN classlist ON classlist.classId = classtime.classId where classlist.classTitle like  "%${req.params.classTimeKeyWord}%" and classtime.startDate>="${currentDate}" order by classTimeId`)
        .then(classTimeInfo => {
            classTimeListData.push(classTimeInfo);
            return conn.queryAsync("select classId,classTitle from classlist")
        }).then(classTitle => {
            classTimeListData.push(classTitle);
            res.send(classTimeListData);
        }).catch(err => {
            if (err) {
                console.log(err);
            }
        })
    // select classId,classTitle from classlist
    // conn.query(`SELECT classtime.*, classlist.classTitle FROM classtime JOIN classlist ON classlist.classId = classtime.classId where classlist.classTitle like  "%${req.params.classTimeKeyWord}%" order by classTimeId`,
    // function(err,result){
    //     if(err){
    //         console.log(err);
    //     }
    //     res.send(result);
    // })
})
module.exports = classTimeListRouter;