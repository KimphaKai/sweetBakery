

// 導覽列次項目展開
$('.navItem').on('click', function () {
    $('.navItem').removeClass('navActive');
    $(this).addClass('navActive');
});


// 被選取的次項目
$('.sub1>li').on('click', function () {
    $('.sub1>li>a').removeClass('subActive');
    $(this).find('a').addClass('subActive');
});



//新增/編輯課程時間彈跳視窗
function openModal() {
    $(".miniModal").css("display", "flex").show();
};

function closeModal() {
    $(".miniModal").hide();
}
$(".editPerformance").on("click", function () {
    var target = $('.hideData').text();
    $('.targetInput').val(target);
    openModal();
})



//modalSave
$('.modalSave').on('click', function () {
    if ($('.targetInput').val() != 0) {
        $('.hideData').text($('.targetInput').val());
        var newTarget = Math.trunc($('.targetInput').val() / 10000);
        $('.targetSales').text(newTarget);
    }
    closeModal();
})

//modalClose功能
$(".modalClose").on("click", function () {
    closeModal()
})
$(".modalCancel").on("click", function () {
    closeModal()
})


// 頁籤
$('.tabItem').on('click', function () {
    $('.tabItem').removeClass('tabActive');
    $(this).addClass('tabActive');
    let showArea = $(this).text();
    if (showArea === '商品排行') {
        $('#salesInfo').hide();
        $('#rankInfo').show();
        showProductRank(1);
    } else {
        $('#salesInfo').show();
        $('#rankInfo').hide();
    }
});




//-------------上方三個資訊--------


//first/last date of this week
var today = new Date;
var thisYear = today.getFullYear(); //今年
var thisMonth = today.getMonth()+1; //這個月
var first = new Date(today.setDate(today.getDate()-today.getDay()));
var last =  new Date(today.setDate(today.getDate()-today.getDay()+6));
//first/last date of last week
var lastWeekLast = new Date(today.setDate(today.getDate()-7));
var lastWeekFirst = new Date(today.setDate(today.getDate()-6));
//first/last date of this month
var today1 = new Date();
var firstm = new Date(today1.setDate(1));
var lastm = new Date();
lastm.setMonth(lastm.getMonth()+1); //取得下個月的月份
lastm.setDate(1); //設定為下個月的第一天
lastm.setDate(lastm.getDate()-1); //下個月的第一天-1


var firstDay = first.toLocaleDateString();
var lastDay = last.toLocaleDateString();
var lastWeekFirstDay = lastWeekFirst.toLocaleDateString();
var lastWeekLastDay = lastWeekLast.toLocaleDateString();
var firstmDay = firstm.toLocaleDateString();
var lastmDay = lastm.toLocaleDateString();


function formatDate(day){
    var dayArray = day.split('/');
    //月日不足2位數補零  
    dayArray[1] = dayArray[1].padStart(2,"0");
    dayArray[2] = dayArray[2].padStart(2,"0");
    return dayArray.join('');
}

var firstDate = formatDate(firstDay);
var lastDate = formatDate(lastDay);
var lastWeekFirstDate = formatDate(lastWeekFirstDay);
var lastWeekLastDate = formatDate(lastWeekLastDay);
var firstmDate = formatDate(firstmDay);
var lastmDate = formatDate(lastmDay);


//千分位','
function numberFormat (num){
    let str = (Math.abs(num)).toString().split(".");
    str[0] = str[0].replace(/\B(?=(\d{3})+(?!\d))/g, ","); // \B中間  \d符合一個數字字元
    return str.join(".");
}

increasingSalesData();
orderData();
performanceData();
salesInfoData();
//本週成長銷售額(這週-上週)
function increasingSalesData(){
    $.get(`/home/capsule/sales/${firstDate}/${lastDate}/${lastWeekFirstDate}/${lastWeekLastDate}`,function(e){
        // console.log(e);
        let lastTot = e[0][0].total;
        let currTot = e[1][0].total;
        let value = currTot-lastTot;
        if(value<0){
            $('.salesData').text("-"+numberFormat(value));
        }else{
            $('.salesData').text("+ "+numberFormat(value));
        }
    })
}


//本週取消/已完成訂單
function orderData(){
    $.get(`/home/capsule/orders/${firstDate}/${lastDate}`,function(e){
        let cancel = e[0][0].COUNT;
        let confirm = e[1][0].COUNT;
        $('.cancelData').text(cancel);
        $('.confirmData').text(confirm);
    })
}


//本月目前業績
function performanceData(){
    $.get(`/home/capsule/monthSales/${firstmDate}/${lastmDate}`,function(e){
        if(e[0].total<10000){ 4300
            var value =Math.round( (e[0].total/10000)*100)/100;
        }else if(e[0].total<1000000){ 
            var value =Math.round( (e[0].total/10000)*10)/10;
        }else if(e[0].total>999999){
            var value =Math.round( (e[0].total/10000));
        }
    
        $('.currSales').text(value);
    })
}


setInterval(function(){
    increasingSalesData();
    orderData();
    performanceData();
    salesInfoData();
},300000)
//-------------下方銷售額--------------



//抓那年1月的最後一天
function getLastDateYearJan(selectedYear){
    let thatDate = new Date(selectedYear, 1);//設定為那一年的2月的第1天
    thatDate.setDate(thatDate.getDate()-1); //2的第1天減一天回到1月最後1天
    let ylmDate = formatDate(thatDate.toLocaleDateString());
    return ylmDate;
}
//抓那個月的最後一天
function getFirLasInOneMonth(year,month){
    let thatFirstDate = new Date(year,month-1);//取得該月份的第一天
    let thatLastDate = new Date(year, month); //取得該月份上個月的日期
    thatLastDate.setDate(thatLastDate.getDate()-1);//取得該月份的最後一天
    thatFirstDate = formatDate(thatFirstDate.toLocaleDateString());
    thatLastDate = formatDate(thatLastDate.toLocaleDateString());
    return [thatFirstDate,thatLastDate];
}

function salesInfoData(){
    $.get(`/home/salesInfo/${firstmDate}/${lastmDate}`,function(e){
        $('#sales').text(numberFormat(e[0][0].total));
        // console.log(e[1]);
        let salesDataArr =doChartData(e[1]);
    
        //處理chart data(沒資料的那天塞0)
        function doChartData(data){
            let i =1;
            let arr = [];
            data.forEach(function(value){
                //把日期轉成數值
                let date =parseInt(value.date.substr(6,8));
                //比對是否有哪天沒有資料，若沒有塞0
                while(date !== i){
                    arr.push(0);
                    i++;
                }
                arr.push(value.total);
                i++;
            })
            return arr;
        }
        
        
        var nowDate = new Date();
        nowDate = nowDate.getDate();
        var dateLabels=[];
        var bgColor=[];
        var borColor=[];
        function doChartLabels(lastMonthDate){
            let arr=[];
            let lastDateOfMonth = parseInt(lastMonthDate.substr(6,7));
            for(var i = 1; i<=lastDateOfMonth ;i++){
                
                arr.push(i);
            }
            return arr;
        }
    
    
    
        dateLabels = doChartLabels(lastmDate);
        dateLabels.map(date=>{
            if(date==nowDate){
                bgColor.push('rgba(250, 147, 162, 0.3)');
                borColor.push('#fa8292');
            }else{
                bgColor.push('rgba(175, 245, 110, 0.3)');
                borColor.push('#84cf3e');
            }
        });
        
        
        //--------------折線圖----------------//
        var ctx = $('#myChart');
    
    
        var myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: dateLabels,
                datasets: [{
                    label: '日營業額',
                    data: salesDataArr,
                    backgroundColor: bgColor,
                    borderColor: borColor,
                    borderWidth: 1,
                    order:2
                 }//,{
                //     label: 'Line Dataset',
                //     data: salesDataArr,
                //     type: 'line',
                //     fill: false,
                //     // backgroundColor:"#978484",
                //     borderColor: "rgb(54, 99, 16)",
                //     order:1,
                //     borderWidth: 1,
                //     lineTension:0
                //     // this dataset is drawn on top
                // }
                ]
            },
            options: {
                title: {
                    display: true,
                    text: '營業額分析長條圖',
                    fontSize: 30,
                    fontColor: '#604545',
                },
                responsive: false,
                //保持縱橫比
                maintainAspectRatio: false,
                legend: {
                    display: false,
                    position: 'top',
                },
                scales: {
                    xAxes: [{
                        // x 軸標題
                        scaleLabel: {
                            display: true,
                            labelString: "日期",
                            fontSize: 20
                        },
                    }],
                    yAxes: [{
                        // y 軸標題
                        scaleLabel: {
                            display: true,
                            labelString: "日營業額",
                            fontSize: 20
                        }
                    }]
                },
                layout: {
                    padding: {
                        left: 20,
                        right: 20,
                        top: 10,
                        bottom: 10
                    }
                }
            }
        });
    
        //----------------select-----------------
        //select default years
        $('#salesYear').text('');
        e[2].map(value=>{
            let optionsHTML = `<option value="${value.year}">${value.year}年</option>` 
            $('#salesYear').append(optionsHTML);
        })
        $('#salesYear').val(`${thisYear}`);
    
        //select default months
        $('#salesMonth').text('');
        e[3].map(value=>{
            let month = parseInt(value.month);
            let optionsHTML = `<option value="${month}">${month}月</option>`
            $('#salesMonth').append(optionsHTML);
        })
        $('#salesMonth').val(`${thisMonth}`);
    
    
        // select years option
        $('#salesYear').on('change',function(){
    
            let selectedYear = $('#salesYear').val();//抓點選的年份
    
            let ylmDate=(getLastDateYearJan(selectedYear));//抓那年1月的最後一天
            $.get(`/home/salesInfo/years/options/${selectedYear}0101/${ylmDate}`,function(e){
                //totSales
                $('#sales').text(numberFormat(e[0][0].total));
    
                //chart data
                myChart.data.datasets[0].data=doChartData(e[1]);
                // myChart.data.datasets[1].data=doChartData(e[1]);
                myChart.data.labels=doChartLabels(ylmDate);
                myChart.data.datasets[0].backgroundColor="rgba(175, 245, 110, 0.3)";
                myChart.data.datasets[0].borderColor="#84cf3e";
                myChart.update();
    
                //months options
                $('#salesMonth').text('');
                e[2].map(value=>{
                    let month = parseInt(value.month);
                    let optionsHTML = `<option value="${month}">${month}月</option>`
                    $('#salesMonth').append(optionsHTML);
                })
                $('#salesMonth').val('1');
    
            })
            
        })
        
        // select months option
        $('#salesMonth').on('change',function(){
            let year = $('#salesYear').val();
            let month = $('#salesMonth').val();//取得選到的月份
            let thatFirstDate = getFirLasInOneMonth(year,month)[0];
            let thatLastDate = getFirLasInOneMonth(year,month)[1];
            $.get(`/home/salesInfo/months/options/${thatFirstDate}/${thatLastDate}`,function(e){
                
                //totSales
                $('#sales').text(numberFormat(e[0][0].total));
    
                //chart data
                // console.log(doChartData(e[1]));
                myChart.data.datasets[0].data=doChartData(e[1]);
                // myChart.data.datasets[1].data=doChartData(e[1]);
                myChart.data.labels=doChartLabels(thatLastDate);
                myChart.data.datasets[0].backgroundColor="rgba(175, 245, 110, 0.3)";
                myChart.data.datasets[0].borderColor="#84cf3e";
                myChart.update();
            })
        })
    })
}


//-------------下方商品排行--------------


// print pagination
function printPagination(currentPage, rowsCount, numPerPage, tableElm){
    let pagesNum = Math.ceil( rowsCount/ numPerPage);
    let newPage = parseInt(currentPage) + 1;
    if (pagesNum > 1) {
        $(tableElm).text('');
        $(tableElm).append('<a href="#" class="preNextPage">&lt;</a>');
        for (var i = 1; i <= pagesNum; i++) {
            $(tableElm).append(`<a href="#" class="pages nonActivePage">${i}</a>`);
        }
        $(`.pages:nth-child(${newPage})`).removeClass('nonActivePage').addClass('activePage');
        $(tableElm).append('<a href="#" class="preNextPage">&gt;</a>');
    };
}



//do pagination
function doPagination(paginationElm, showRankFunc){
    $(paginationElm).on('click', '.pages', function (e) {
        e.preventDefault();
        page = $(this).text();
        showRankFunc(page);
    
    })
    $(paginationElm).on('click', '.preNextPage:first', function (e) {
        e.preventDefault();
        let prePage = $(this).parent(paginationElm).find('.activePage').prev().text();
        if (!isNaN(prePage)) {
            showRankFunc(prePage)
        } else {
    
        }
    })
    
    $(paginationElm).on('click', '.preNextPage:last', function (e) {
        e.preventDefault();
        let prePage = $(this).parent(paginationElm).find('.activePage').next().text();
        if (!isNaN(prePage)) {
            showRankFunc(prePage);
        } else {
    
        };
    })
}



//產生名次放入陣列裡面
function doRankData(numPerPage, currentPage, dataArr, rowsCount){
    let endIdx = numPerPage * currentPage;//一頁有4筆1當前的頁面 
    let startIdx = endIdx - 4 + 1; 
    var placeArr = [];//存放名次
    let newArr=[]; //新陣列
    for(let i= startIdx; i <= ((endIdx>rowsCount)?rowsCount:endIdx); i++){ //如果實際數量小於算出來的最後一頁，就以實際數量為主
        placeArr.push(i);
    }
    placeArr.map(function(val,index){
        newArr.push({
            rank:val,
            productId: dataArr[index].productId,
            productTitle: dataArr[index].productTitle,
            numTotal: dataArr[index].numTotal
        });
    })
    return newArr;
}



function showProductRank(currentPage){
    $.get(`/home/rankList/${firstmDate}/${lastmDate}/${currentPage}`,function(e){
        let numPerPage = e[4].rowsPerPage;
        let rowsCount = e[3][0].COUNT;
        let rankArr = doRankData(currentPage, numPerPage, e[0],rowsCount)

        //渲染列表
        $('#rankTable tbody').text('');
        rankArr.map(value=>{
            var trHtml = `
            <tr>
                <td>${value.rank}</td>
                <td>${value.productTitle}</td>
                <td>${value.numTotal}</td>
            </tr>
            `
            $('#rankTable tbody').append(trHtml);
        })

        printPagination(currentPage, rowsCount, numPerPage, '#paginationArea')
        doPagination('#paginationArea',showProductRank);
        

        //default year select
        $('#rankYear').text('');
        e[1].map(value=>{
            $('#rankYear').append(`<option value="${value.year}">${value.year}年</option>`);
        })
        $('#rankYear').val(thisYear);

        //default month select
        $('#rankMonth').text('');
        e[2].map(value=>{
            let month = parseInt(value.month);
            $('#rankMonth').append(`<option value="${month}">${month}月</option>`);
        });
        $('#rankMonth').val(thisMonth);

        //default category select
        $('#productType').text('');
        $('#productType').append('<option value="0">全部種類</option>');
        e[5].map(value=>{
            $('#productType').append(`<option value="${value.categoryId}">${value.categoryName}</option>`);
        })
        $('#productType').val(0)
    })


}
//select year option
$('#rankYear').on('change',function(){
    let selectedYear = $('#rankYear').val();
    let yfmDate = selectedYear+'0101'
    let ylmDate = (getLastDateYearJan(selectedYear));//抓那年1月的最後一天
    doSelect(yfmDate,ylmDate,selectedYear,1,0,'DESC','year',1);


})

$('#rankMonth').on('change',function(){
    let selectedYear = $('#rankYear').val();
    let selectedMonth = $('#rankMonth').val();
    let firLasDate =getFirLasInOneMonth(selectedYear,selectedMonth);
    let yfmDate = firLasDate[0];
    let ylmDate = firLasDate[1];
    doSelect(yfmDate,ylmDate,selectedYear,selectedMonth,0,'DESC','month',1);
})


$('#productType').on('change',function(){
    let selectedYear = $('#rankYear').val();
    let selectedMonth = $('#rankMonth').val();
    let firLasDate =getFirLasInOneMonth(selectedYear,selectedMonth);
    let yfmDate = firLasDate[0];
    let ylmDate = firLasDate[1];
    let category = $('#productType').val();
    doSelect(yfmDate,ylmDate,selectedYear,selectedMonth,category,'DESC','category',1);
})

$('#selectSort').on('change',function(){
    let selectedYear = $('#rankYear').val();
    let selectedMonth = $('#rankMonth').val();
    let firLasDate =getFirLasInOneMonth(selectedYear,selectedMonth);
    let yfmDate = firLasDate[0];
    let ylmDate = firLasDate[1];
    let category = $('#productType').val();
    let orderBy = $('#selectSort').val();
    doSelect(yfmDate,ylmDate,selectedYear,selectedMonth,category,orderBy,'category',1);
})

function doSelect(yfmDate,ylmDate,selectedYear,month,category,order,selectElm,currentPage){
    $.get(`/home/rankList/${yfmDate}/${ylmDate}/${selectedYear}/${month}/${category}/${order}/1`,function(e){
        let numPerPage = e[2].rowsPerPage;
        let rowsCount = e[1][0].COUNT;
        let rankArr = doRankData(currentPage, numPerPage, e[0],rowsCount)


        // 渲染列表
        $('#rankTable tbody').text('');
        rankArr.map(value=>{
            var trHtml = `
            <tr>
                <td>${value.rank}</td>
                <td>${value.productTitle}</td>
                <td>${value.numTotal}</td>
            </tr>
            `
            $('#rankTable tbody').append(trHtml);
        })


        //do pagination
        $('#paginationArea').text('');
        printPagination(currentPage, rowsCount, numPerPage, '#paginationArea')
        doPagination('#paginationArea',doSelect);


        switch(selectElm) {
            case 'year':
                // console.log('years');

                //select month
                $('#rankMonth').text('');
                e[3].map(value=>{
                    let month = parseInt(value.month);
                    $('#rankMonth').append(`<option value="${month}">${month}月</option>`);
                })
                $('#rankMonth').val(1);

                //select category
                $('#productType').text('');
                $('#productType').append('<option value="0">全部種類</option>');
                e[4].map(value=>{
                    $('#productType').append(`<option value="${value.categoryId}">${value.categoryName}</option>`);
                })
                $('#productType').val(0);

                //select sort
                $('#selectSort').val("DESC");
                break;


            case 'month':


                // select category
                $('#productType').text('');
                $('#productType').append('<option value="0">全部種類</option>');
                e[4].map(value=>{
                    $('#productType').append(`<option value="${value.categoryId}">${value.categoryName}</option>`);
                })
                $('#productType').val(0);



                // //select sort
                $('#selectSort').val("DESC");
                break;


            case 'category':
                console.log('category');
                // //select sort
                $('#selectSort').val("DESC");
                break;

        }
        // console.log('ok');
        // console.log(data);
    })

}
