
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