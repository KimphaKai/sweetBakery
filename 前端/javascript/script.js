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
    $(".modal-overlay").show()
  })

  $(".closeModal").on("click", function () {
    $(".modal-overlay").hide()
  })

  $(".burgerMenu").on("click", function (e) {
    $(".nav-items").toggleClass("active")
  })

  $(window).resize(function () {
    if ($(".nav-items").hasClass("active")) {
      $(".nav-items").removeClass("active");
    }
  })


});


//  // Select required elements from the DOM
//  const modal = document.querySelector("#modal");
//  const body = document.querySelector("body");

//  const showModal = function (e) {
//      modal.classList.toggle("hidden");

//      if (!modal.classList.contains("hidden")) {
//          // Disable scroll
//          body.style.overflow = "hidden";
//      } else {
//          // Enable scroll
//          body.style.overflow = "auto";
//      }
//  };


// openModalButtons.forEach(button => {
//   button.addEventListener('click', () => {
//     const modal = document.querySelector(button.dataset.modalTarget)
//     openModal(modal)
//   })
// })

// overlay.addEventListener('click', () => {
//   const modals = document.querySelectorAll('.modal.active')
//   modals.forEach(modal => {
//     closeModal(modal)
//   })
// })

// closeModalButtons.forEach(button => {
//   button.addEventListener('click', () => {
//     const modal = button.closest('.modal')
//     closeModal(modal)
//   })
// })

// function openModal(modal) {
//   if (modal == null) return
//   modal.classList.add('active')
//   overlay.classList.add('active')
// }

// function closeModal(modal) {
//   if (modal == null) return
//   modal.classList.remove('active')
//   overlay.classList.remove('active')
// }


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