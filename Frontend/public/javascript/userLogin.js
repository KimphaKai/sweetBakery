$(document).ready(function () {

//     var loginUserEmail; // 會員信箱
//     var loginUserPassword; // 會員密碼
//     var compareEmail = 0; // 比對email狀態 1 = true
//     var comparePassword = 0; //比對password狀態 0 = false
//     var databaseUserInformation = [{
//         name: 'cosmo',
//         email: 'cosmo4956@gmail.com',
//         password: 'cosmo',
//         phone: '0912345678'
//     }, {
//         name: 'kimpha',
//         email: 'hark521632@yahoo.com',
//         password: 'black',
//         phone: '0912345678'
//     },{
//         name: 'kimpha',
//         email: 'polo709168@gmail.com',
//         password: 'near',
//         phone: '0912345678'
//     }]
//     var databaseUserPasswordCorrent; //密碼的位置
// /// 如何拿到後台的資料放進databaseUserEmail[]裡面 ///


// //點擊登入
// $('.loginBtn').on('click', function () {
//     GetInputLoginUserInformation(); // 取得資料
//     if (loginUserEmail != null && loginUserPassword != null) {

//         CheckUserEmail(); //比對信箱

//         if (compareEmail == 1) {
//             console.log('email is right');

//             checkUserPassword();

//             if (comparePassword == 1) {
//                 console.log('password is right');
//             } else {
//                 console.log('password is wrong');
//                 //message error password is wrong
//             }
//         } else {
//             console.log('email is not exist');
//         }

//     } else {
//         console.log('error!! email or password is null'); //message error;
//     }
//     RefreshLoginUserInformation(); //初始化
// })

// //初始化
// function RefreshLoginUserInformation() {
//     compareEmail = 0;
//     comparePassword = 0;
// }

// //取得輸入資訊
// function GetInputLoginUserInformation() {
//     loginUserEmail = $('.loginEmail').val();
//     loginUserPassword = $('.loginPassword').val();
// }


// //察看信箱是否已經存在
// function CheckUserEmail() {
//     RefreshLoginUserInformation();
//     $(databaseUserInformation).each(function (index, item) {
//         if (loginUserEmail == item.email) {
//             compareEmail = 1;
//             databaseUserPasswordCorrent = index;
//             return false; //跳出
//         }
//     })
// }

// //比對密碼是否正確
// function checkUserPassword() {
//     RefreshLoginUserInformation();
//     if (loginUserPassword == databaseUserInformation[databaseUserPasswordCorrent].password) {
//         comparePassword = 1;
//         return false; //跳出
//     }
    
//     databaseUserPasswordCorrent = 0;
// }


})