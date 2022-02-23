
// ---------Swiper JS------
var swiper = new Swiper(".recommendSwiper", {
  slidesPerView: 3,
  spaceBetween: -100,
  slidesPerGroup: 3,
  loop: true,
  loopFillGroupWithBlank: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});



// ----數量增減按鈕-----
var remain = parseInt($(".remain").text())

$(".plus").on("click", function () {

  var inputNum = $(".inputNum");
  var value = $(".inputNum").val();
  value++;
  inputNum.val(value);
  console.log(value)

  if (value > remain) {
    $(".errorMsg").css("display", "inline-block");
    $(".signUpBtn").prop("disabled", true);
  } else {
    $(".errorMsg").css("display", "none");
    $(".signUpBtn").prop("disabled", false);
  }

  sessionStorage.setItem("key", value)
  var data = sessionStorage.getItem("key")
  $(".test").text(data)

})

$(".inputNum").on("keyup", function () {
  var value = $(".inputNum").val();

  if (value > remain) {
    $(".errorMsg").css("display", "inline-block");
    $(".signUpBtn").prop("disabled", true);
  } else {
    $(".errorMsg").css("display", "none");
    $(".signUpBtn").prop("disabled", false);
  }

  sessionStorage.setItem("key", value)
  var data = sessionStorage.getItem("key")
  console.log(`storage ${data}`)

})

$(".minus").on("click", function () {

  var inputNum = $(".inputNum");
  var value = $(".inputNum").val();
  if (value > 1) {
    value--;
    inputNum.val(value);
  }

  if (value <= remain) {
    $(".errorMsg").css("display", "none");
    $(".signUpBtn").prop("disabled", false)
  } else {
    $(".errorMsg").css("display", "inline-block");
    $(".signUpBtn").prop("disabled", true)
  }

  sessionStorage.setItem("key", value)
  var data = sessionStorage.getItem("key")
  console.log(`session storage ${data}`)
  $(".test").text(data)
})