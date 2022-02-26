$(document).ready(function () {

  var loginUserEmail; // 會員信箱
  var loginUserPassword; // 會員密碼
  var compareEmail = 0; // 比對email狀態 1 = true
  var comparePassword = 0; //比對password狀態 0 = false

  var registerUserEmail; //註冊電子信箱
  var registerUserPassword; //註冊密碼
  var registerCheckUserPassword; //確認密碼
  var registerUserPhoneNumber; //註冊電話號碼
  var registerUserDate; //註冊生日
  var registerUserCheckPassword; //比對密碼狀態

  var databaseUserInformation = [{
    name: 'kai',
    email: 'hark521632@yahoo.com.tw',
    password: '123456',
    phoneNember: '0912345678',
    birthday: '2000-01-01'
  }, {
    name: 'lee',
    email: 'polo709168@gmail.com',
    password: '123456',
    phoneNember: '0912345678',
    birthday: '2000-02-02'
  }];
  var databaseUserPasswordCorrent; //密碼的位置



  //點擊登入
  $('.loginBtn').on('click', function () {
    GetInputLoginUserInformation(); // 取得資料
    if (loginUserEmail != null && loginUserPassword != null) {

      CheckUserEmail(); //比對信箱

      if (compareEmail == 1) {
        console.log('email is right');

        checkUserPassword(); //找到密碼
        if (comparePassword == 1) {
          alert('登入成功');
          $(".modal-container").hide();
          console.log('password is right');
        } else {
          alert('密碼錯誤');
          console.log('password is wrong');
          //message error password is wrong
        }
      } else {
        alert('信箱不存在，請註冊');
        //跳出視窗顯示，帳號不存在
        console.log('email is not exist');
      }

    } else {
      alert('帳號與密碼不得為空');
      console.log('error!! email or password is null'); //message error;
    }
    RefreshLoginUserInformation(); //初始化
  })

  //初始化
  function RefreshLoginUserInformation() {
    compareEmail = 0;
    comparePassword = 0;
    registerUserCheckPassword = 0;
  }

  //取得輸入資訊
  function GetInputLoginUserInformation() {

    loginUserEmail = $('.loginEmail').val();
    loginUserPassword = $('.loginPassword').val();
  }


  //察看信箱是否已經存在
  function CheckUserEmail() {
    RefreshLoginUserInformation();
    $(databaseUserInformation).each(function (index, item) {
      if (loginUserEmail == item.email) {
        compareEmail = 1;
        databaseUserPasswordCorrent = index;
        return false; //跳出
      }
    })
  }

  //比對密碼是否正確
  function checkUserPassword() {
    RefreshLoginUserInformation();
    if (loginUserPassword == databaseUserInformation[databaseUserPasswordCorrent].password) {
      comparePassword = 1;
      return false; //跳出
    }

    databaseUserPasswordCorrent = 0;
  }

  // 輸入信箱，密碼，確認密碼，電話號碼，生日>
  // 比對信箱有無存在 > 比對密碼跟確認密碼是否一樣 > 
  // 如果無存在 > 新增到資料庫內


  $('.signupBtn').on('click', function () {
    //得到輸入的內容
    GetInputRegisterUserInformation();
    if (registerUserEmail, registerUserPassword, registerCheckUserPassword, registerUserPhoneNumber, registerUserDate != null) {
      //比對信箱
      CheckRegisterUserEmail()
      if (compareEmail == 0) {
        //比對密碼是否一致
        CheckRegisterUserPassword();
        if (registerUserCheckPassword == 1) {
          //資料傳入
          pushDatabaseUserInformation();
          alert('註冊成功');

          $(".modal-container").hide();
        }
      } else {
        alert('帳號已存在');
      }
      //初始狀態
      RefreshLoginUserInformation();
    }
  })

  //初始化
  function RefreshRegisterUserInformation() {

  }

  //註冊得到輸入的資料
  function GetInputRegisterUserInformation() {
    registerUserEmail = $('.signupEmail').val();
    registerUserPassword = $('.signupPassword').val();
    registerCheckUserPassword = $('.signupCheckPassword').val();
    registerUserPhoneNumber = $('.signupPhoneNumber').val();
    registerUserDate = $('.signupDate').val();
  }

  //比對註冊信箱
  function CheckRegisterUserEmail() {
    $(databaseUserInformation).each(function (index, item) {
      if (registerUserEmail == item.email) {
        // console.log('信箱已註冊過');
        compareEmail = 1;
      } else {
        // console.log('此信箱可以註冊');
      }
    })
  }

  //比對註冊密碼一致
  function CheckRegisterUserPassword() {
    if (registerUserPassword != registerCheckUserPassword) {
      alert('密碼不一致，請重新輸入');
    } else {
      registerUserCheckPassword = 1;
    }
  }

  //將資料傳入databaseUserInformation
  function pushDatabaseUserInformation() {
    databaseUserInformation.push({
      name: '',
      email: registerUserEmail,
      password: registerUserPassword,
      phoneNember: registerUserPhoneNumber,
      birthday: registerUserDate
    });
  }

  $('.sendBtn').on('click', function () {
    var forgetPassword = $('.forgetpassword').val();
    var forgetPasswrodNow = 0;
    $(databaseUserInformation).each(function (index, item) {
      if (forgetPassword == item.email) {
        alert(`你的密碼為: ${item.password}`);
        forgetPasswrodNow = 1;
        return false;
      }
    })
    if (forgetPasswrodNow == 0) {
      alert('找不到您的信箱');
    }
  })
})




