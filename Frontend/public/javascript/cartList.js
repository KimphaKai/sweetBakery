
// ----數量增減按鈕-----

$(".productQty").on("click", ".plus", function () {
  let btnPlus = $(this).parent('.productQty').find("#productNum");

  var inputNum = btnPlus.val();
  inputNum++;
  btnPlus.val(inputNum);

})

$(".productQty").on("click", '.minus', function () {
  let btnMinus = $(this).next('#productNum');
  var inputNum = btnMinus.val();
  inputNum--;


  var inputNum = parseInt(inputNum);
  if (inputNum > 1) {
    btnMinus.val(inputNum);
  } else {
    inputNum = 1;
    btnMinus.val(inputNum);
  }
  return inputNum;
})

// --------------------------

// function nameqqqq(名稱,規格){
//     $('.divider2').().val(`<div class="item">
//     <input class="chkBox" type="checkbox" name="" id="" />
//     <img src=" img/Cakes/butterscotch 1-2.jpg" alt="" />
//     <div class="productName">${名稱}</div>
//     <select name="" id="" class="productSize">
//       <option value="尺寸" disabled selected>尺寸</option>
//       <option value="cakeSize-6吋">${規格}</option>
//       <option value="cakeSize-8吋">${規格}</option>
//     </select>
//     <div class="productPrice">$<span>${單價}</span></div>
//     <div class="amount">
//       <div class="productQty">
//         <button class="minus btn fas fa-minus"></button>
//         <input id="productNum" class="inputNum" type="number" value="1" >
//         <button class="plus btn fas fa-plus" id="btn1"></button>
//       </div>
//     </div>
//     <div class="priceTotal">$<span>${總價}</span></span></div>
//     <button>刪除</button>
//   </div>`);

// }



// ---------Swiper JS------
var swiper = new Swiper(".mySwiper", {
  slidesPerView: 4,
  spaceBetween: 1,
  slidesPerGroup: 3,
  loop: true,
  loopFillGroupWithBlank: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});