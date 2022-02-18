$(document).ready(function () {

    var registerUserEmail; //註冊電子信箱
    var registerUserPassword; //註冊密碼
    var registerCheckUserPassword; //確認密碼
    var registerUserPhoneNumber; //註冊電話號碼
    var registerUserDate; //註冊生日

    var databaseUserEmail = []; //資料庫內的資料


    $('.signBtn').on('click', function(){
        //得到輸入的內容
        RefreshRegisterUserInformation();

        if(registerUserEmail, registerUserPassword, registerCheckUserPassword, registerUserPhoneNumber, registerUserDate != null){
            if(CompareUserEmail()){
                if(registerUserPassword == registerCheckUserPassword){

                }else{
                    // message error password is not same
                }
            }
        }
    })

    //初始化
    function RefreshRegisterUserInformation (){
        registerUserEmail = $('.signupEmail').val();
        registerUserPassword = $('.signupPassword').val();
        registerCheckUserPassword = $('.signupCheckPassword').val();
        registerUserPhoneNumber = $('.signupPhoneNumber').val();
        registerUserDate = $('.signupDate').val();
    }

    //比對註冊的信箱有沒有已經存在
    function CompareUserEmail() {
        $.each(databaseUserEmail,function(index, item){
            if(registerUserEmail == item){

            }    
        })
    }
})