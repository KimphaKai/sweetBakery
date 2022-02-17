$(document).ready(function () {

  //search Function
  var max = [];
  var productNameLength = $('.productName').length;
  for (i = 0; i <= productNameLength; i++) {
    max.push({ name: $('.productName:eq(' + i + ')').text() });
  }

  $(".searchBtn").on("click", function () {  //inputID
    // $("#testSearch").html("");
    var val = $.trim(this.value);
    if (val) {
      val = val.toLowerCase();
      $.each(max, function (_, item) {
        if (item.name.toLowerCase().indexOf(val) != -1) {
          console.log("test")
          // $("#testSearch").append(item.name + '<br>');
        }
      });
    }
  });

  //increment/decrement
  var remain = $(".remain").text()

  $(".plus").on("click", function () {
    // var inputVal = $(this).closest("div").find(".inputNum")
    // var currentVal = parseInt(inputVal)

    var inputNum = $(".inputNum");
    var value = $(".inputNum").val();
    value++;
    inputNum.val(value);

    if (value > remain) {
      $(".errorMsg").css("display", "inline-block");
      $(".signUpBtn").prop("disabled", true);
    } else {
      $(".errorMsg").css("display", "none");
      $(".signUpBtn").prop("disabled", false);
    }

    // console.log(`plus: ${value}`)
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

  $(".modal-overlay").on("click", function () {
    $(".loginModal").hide()
  })

  $(".searchBtn").on("click", function () {
    $(".search-input").toggleClass("active")
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