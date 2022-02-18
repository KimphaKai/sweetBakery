$(document).ready(function () {

    var loginUserEmail; // 會員信箱
    var loginUserPassword; // 會員密碼
    var databaseUserEmail = []; 
    // 資料庫內的資料
    // [{user = {
    //     email:'',
    //     password:''
    //     }}
    // ]
    

    //點按鈕登入 > 判斷內容是否為空 > 
    //信箱是否有註冊過(如果無註冊 須提醒) >
    //開始比對信箱 > 比對密碼 > 
     

    //點擊登入
    $('.loginBtn').on('click', function () {
        RefreshLoginUserInformation();
        if(loginUserEmail != null && loginUserPassword != null){
            if(CheckUserEmail()){
                return;
            }else{
                //message error email is wrong
            }
            if(checkUserPassword){
                return;
            }else{
                //message error password is wrong
            }
        }else{
            //message error;
        }
        
    })

    //初始化
    function RefreshLoginUserInformation(){

        loginUserEmail = $('.loginEmail').val();
        loginUserPassword = $('.loginPassword').val();

        // return loginUserEmail,loginUserEmail;
    }

    //取得會員信箱
    function GetUserEmail() {
            
    }

    //比對有無存在相同信箱
    function CheckUserEmail() {
        GetUserEmail();

        $(formdatebase).each(function (index, item) {
            if (item == loginUserEmail) {
                //continum
            } else {
                //error mesasage
            }
        })
    }


    //取得會員密碼
    function GetUserPassword() {
     
    }

    //比對密碼是否正確
    function checkUserPassword() {
        GetUserPassword()

        $(formdatebase).each(function (index, item) {
            if (item == loginUserPassword) {
                //continum
            } else {
                //error mesasage
            }
        })
    }


})