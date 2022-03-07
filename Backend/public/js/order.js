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


// 訂單頁籤
$('.tabButton').on('click', function () {
    $('.tabButton').removeClass('tabBtnActive');
    $(this).addClass('tabBtnActive');
    let showArea = $(this).text();
    if (showArea === '未確認訂單') {
        $('#notClaimed').hide();
        $('#unCheckList').show();
        $('#claimed').hide();
        showOrderUncheckedTable(1);
    } else if (showArea === '未取貨') {
        $('#notClaimed').show();
        $('#unCheckList').hide();
        $('#claimed').hide();
        showOrderNotClaimedTable(1);
    } else {
        $('#notClaimed').hide();
        $('#unCheckList').hide();
        $('#claimed').show();
        showOrderClaimedTable(1);
    }
});






//modalClose功能
$(".modalClose").on("click", function () {
    $(".bigModal").hide();
})




//print pagination
function printPagination(currentPage, event, numPerPage, selector){
    let pagesNum = Math.ceil(event[1][0].COUNT / numPerPage);
    let newPage = parseInt(currentPage) + 1;

    if (pagesNum > 1) {
        $(selector).text('');
        $(selector).append('<a href="#" class="preNextPage">&lt;</a>');
        for (var i = 1; i <= pagesNum; i++) {
            $(selector).append(`<a href="#" class="pages nonActivePage">${i}</a>`);
        }
        $(`.pages:nth-child(${newPage})`).removeClass('nonActivePage').addClass('activePage');
        $(selector).append('<a href="#" class="preNextPage">&gt;</a>');
    };
}





//do pagination
function doPagination(selector, func){
    $(selector).on('click', '.pages', function (e) {
        e.preventDefault();
        page = $(this).text();
        // console.log(this);
        func(page);
    
    })
    $(selector).on('click', '.preNextPage:first', function (e) {
        e.preventDefault();
        let prePage = $(this).parent(selector).find('.activePage').prev().text();
        if (!isNaN(prePage)) {
            func(prePage)
        } else {
    
        }
    })
    
    $(selector).on('click', '.preNextPage:last', function (e) {
        e.preventDefault();
        let prePage = $(this).parent(selector).find('.activePage').next().text();
        if (!isNaN(prePage)) {
            func(prePage);
        } else {
    
        };
    })
}




//未確認的資料
showOrderUncheckedTable(1);
function showOrderUncheckedTable(currentPage) {
    $.get(`/order/unChecked/page/${currentPage}`, function (e) {
        let orderUncheckTable = e[0];

        //分頁
        printPagination(currentPage, e, 5, '.unCheckPagination');

        //print data
        $('#unCheckList tbody').empty();
        orderUncheckTable.map(value => {
            var trHtml = `
            <tr>
                <td>${value.orderId}</td>
                <td>${value.buyerName}</td>
                <td>${value.buyerPhone}</td>
                <td>${value.orderDate.substr(0, 10)}</td>
                <td>${value.pickupDate.substr(0, 10)}</td>
                <td>${value.total}</td>
                <td><button class="btnStyle checkedBtn">確定</button><button class="btnStyle cancelBtn">取消</button></td>
                </tr>
                `
            $('#unCheckList tbody').append(trHtml);
        })
    })
}

doPagination('.unCheckPagination', showOrderUncheckedTable);








function getOrderDetail(detailId, total) {
    $.get(`/order/orderDetail/${detailId}`, function (e) {
        console.log(e);
        e.map(value => {
            var trHtml = `
                <div class="orderItem">
                    <p class="orderItemTitle">${value.productTitle}</p>
                <div>
                    <span class="orderItemSize">規格:${value.sizeName}</span>
                    <span>${value.productPrice}</span>
                    </div>
                    <p>x${value.productNum}</p>
                    <hr>
                    <span class="subTotal">
                    <span>小計:</span>
                    <span>${value.subTotal}</span>
                    </span>
                </div>
                `;
            $('.orderContent').append(trHtml);
        })
        $('.orderContent').append(`<div class="oderTotal"><span>訂單金額: </span><span>$<span>${total}</span></span></div>`);
    })
}


//訂單明細彈跳視窗
function popUpOrderDetail(selector){
    
    $(selector).on("click", "tbody tr", function () {
        $(".bigModal").css("display", "flex").show();
        $('.orderContent').text('').append('<p id="mainModalTitle">訂單細項</p>');
        let detailId = $(this).children('td:first').text();
        let total = $(this).children('td:nth-of-type(6)').text();
        getOrderDetail(detailId, total);
    
    })
};

popUpOrderDetail("#unCheckList");
popUpOrderDetail("#notClaimed");
popUpOrderDetail("#claimed");




//未確認訂單狀態操作Btn
$('#unCheckList').on('click', 'button',function(e){
    e.stopPropagation();    
    let data = {
        orderId:$(this).closest('#unCheckList tr').find('td:first').text(),
        btn:$(this).text()
    }
    console.log(data.btn);
    $.ajax({
        url:'/order/unChecked/editOrderStatus',
        type: 'put',
        data: data,
        success: function(data){
            console.log(data);
            showOrderUncheckedTable(1);
            doPagination('.unCheckPagination', showOrderUncheckedTable);
        }
    })
})




//未取貨
function showOrderNotClaimedTable(currentPage) {

    $.get(`/order/notClaimed/page/${currentPage}`, function (e) {
        let notClaimedTable = e[0];
        
        //分頁
        printPagination(currentPage, e, 5, '.notClaimedPagination');


        //print data
        $('#notClaimed tbody').empty();
        notClaimedTable.map(value => {
            var trHtml = `
                <tr>
                    <td>${value.orderId}</td>
                    <td>${value.buyerName}</td>
                    <td>${value.buyerPhone}</td>
                    <td>${value.orderDate.substr(0, 10)}</td>
                    <td>${value.pickupDate.substr(0, 10)}</td>
                    <td>${value.total}</td>
                    <td><span class="paymentStatus">${value.paymementStatus}</span><button class="btnStyle paid">已付款</button></td>
                    <td><button class="btnStyle cancelBtn">取消</button></td>
                </tr>
                `
            $('#notClaimed tbody').append(trHtml);
        })
    })

}

doPagination('.notClaimedPagination', showOrderNotClaimedTable);





//未取貨付款狀態操作Btn
$('#notClaimed').on('click', '.paid',function(e){
    e.stopPropagation(); 
    // console.log('123');   
    let data = {
        orderId:$(this).closest('#notClaimed tr').find('td:first').text(),
    }
    $.ajax({
        url:'/order/notClaimed/editPaymentStatus',
        type: 'put',
        data: data,
        success: function(data){
            console.log(data);
            showOrderNotClaimedTable(1);
            doPagination('.notClaimedPagination', showOrderNotClaimedTable);
        }
    })
})




//未取貨取消訂單操作Btn
$('#notClaimed').on('click', '.cancelBtn',function(e){
    e.stopPropagation(); 
    // console.log('123');   
    let data = {
        orderId:$(this).closest('#notClaimed tr').find('td:first').text()
    }
    $.ajax({
        url:'/order/notClaimed/cancelOrder',
        type: 'put',
        data: data,
        success: function(data){
            console.log(data);
            showOrderNotClaimedTable(1);
            doPagination('.notClaimedPagination', showOrderNotClaimedTable);
        }
    })
})





//已取貨
function showOrderClaimedTable(currentPage) {

    $.get(`/order/claimed/page/${currentPage}`, function (e) {
        // console.log(e);
        let claimedTable = e[0];

        //分頁
        printPagination(currentPage, e, 6, '.claimedPagination');

        $('#claimed tbody').empty();
        claimedTable.map(value => {
            var trHtml = `
                    <tr>
                        <td>${value.orderId}</td>
                        <td>${value.buyerName}</td>
                        <td>${value.buyerPhone}</td>
                        <td>${value.orderDate.substr(0, 10)}</td>
                        <td>${value.pickupDate.substr(0, 10)}</td>
                        <td>${value.total}</td>
                        <td><span class="paymentStatus">${value.paymementStatus}</span></td>
                    </tr>
                `
            $('#claimed tbody').append(trHtml);
        })
    })
}

doPagination('.claimedPagination', showOrderClaimedTable);






function printSearchData(path,numOrName) {
    $.get(`/order/search/${path}/${numOrName}`, function (e) {

        if(path === "unChecked"){
            $('#unCheckList tbody').empty();
            e.map(value => {
                let trHtml = `
                    <tr>
                        <td>${value.orderId}</td>
                        <td>${value.buyerName}</td>
                        <td>${value.buyerPhone}</td>
                        <td>${value.orderDate.substr(0, 10)}</td>
                        <td>${value.pickupDate.substr(0, 10)}</td>
                        <td>${value.total}</td>
                        <td><button class="btnStyle">確定</button><button class="btnStyle cancelBtn">取消</button></td>
                    </tr>
                    `;
                $('#unCheckList tbody').append(trHtml);
    
    
            })
            $('.unCheckPagination').text('');
        }else if(path === "notClaimed"){
            $('#notClaimed tbody').empty();
            e.map(value=>{
                var trHtml = `
                <tr>
                    <td>${value.orderId}</td>
                    <td>${value.buyerName}</td>
                    <td>${value.buyerPhone}</td>
                    <td>${value.orderDate.substr(0, 10)}</td>
                    <td>${value.pickupDate.substr(0, 10)}</td>
                    <td>${value.total}</td>
                    <td><span class="paymentStatus">${value.paymementStatus}</span><button class="btnStyle paid">已付款</button></td>
                    <td><button class="btnStyle cancelBtn">取消</button></td>
                </tr>
                `
                $('#notClaimed tbody').append(trHtml);
            })
            $('.notClaimedPagination').text('');
        }

    })
}






function doSearchEvent(selector1, selector2, selector3, func1, func2, path){


    //input enter event
    $(selector1).bind('enterKey', function (e) {
        let inputVal = $(selector1).val();
        if (inputVal === "") {
            alert('不能為空白，請輸入姓名或電話來做查詢');
        } else {
            func1(path,inputVal);
        }
        // alert($(selector1).val());
    })
    
    $(selector1).keyup(function (e) {
        if (e.keyCode == 13) {
            $(this).trigger('enterKey');
        }
    })
    
    //times click event
    $(selector1).on('input', function () {
        if ($(selector1).val() === "") {
            $(selector2).css('visibility', 'hidden')
        } else {
            $(selector2).css('visibility', 'visible')
        }
    })
    
    $(selector2).on('click', function () {
        func2(1);
        $(selector1).val('');
        $(selector2).css('visibility', 'hidden')
    })

    $(selector3).on('click', function(){
        let inputVal = $(selector1).val();
        if (inputVal === "") {
            alert('不能為空白，請輸入姓名或電話來做查詢');
        } else {
            func1(path,inputVal);
        }
    })
};

doSearchEvent('#unCheckSearch', '.unCheckTimes', '.unCheckSearchIcon', printSearchData, showOrderUncheckedTable,'unChecked');
doSearchEvent('#notClaimedSearch', '.notClaimedTimes', '.notClaimedSearchIcon', printSearchData, showOrderNotClaimedTable,'notClaimed');



