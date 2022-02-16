$(document).ready(function () {

  $(".plus").on("click", function () {
    var inputVal = $(this).closest("div").find(".inputNum")
    var currentVal = parseInt(inputVal.val())
    //increment currentVal
    inputVal.val(currentVal + 1)
    // console.log(inputNum.val())
  })

  $(".minus").on("click", function () {
    var inputVal = $(this).closest("div").find(".inputNum")
    var currentVal = parseInt(inputVal.val())
    if (currentVal > 1) {
      inputVal.val(currentVal - 1)
    }
  })

  $(".fa-shopping-cart").on("click", () => {
    $(".modal-container").show()
  })

  $(".closeModal").on("click", function () {
    $(".modal-container").hide()
  })

  $(".burgerMenu").on("click", function (e) {
    $(".nav-items").toggleClass("active")
  })

  $(window).resize(function () {
    if ($(".nav-items").hasClass("active")) {
      $(".nav-items").removeClass("active");
    }
  })

  //Sign in and sign up event
  $("#signUp").on("click", () => {
    $(".container").addClass("right-panel-active")
    console.log("signup")
  })

  $("#signIn").on("click", () => {
    $(".container").removeClass("right-panel-active")
    console.log("signin")
  })

  $(".userIcon").on("click", function () {
    $(".loginModal").show()
  })

  //Close Modal event
  $(".closeModal").on("click", function () {
    $(".loginModal").hide()
    $(".forgetPwModal").hide()
  })


  $(".forgetPwBtn").on("click", function () {
    $(".loginModal").hide()
    $(".forgetPwModal").show()
  })

  $(".loginBtn").on("click", function () {
    $(".forgetPwModal").hide()
    $(".loginModal").show()
  })

});


let thumbnails = document.getElementsByClassName('thumbnail')

let activeImages = document.getElementsByClassName('active')

for (var i = 0; i < thumbnails.length; i++) {

  thumbnails[i].addEventListener('click', function () {
    console.log(activeImages)

    if (activeImages.length > 0) {
      activeImages[0].classList.remove('active')
    }

    this.classList.add('active')
    document.getElementById('featured').src = this.src
  })
}