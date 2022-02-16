const swiper = new Swiper('.swiper', {
  // Optional parameters
  effect: "fade",
  autoplay: {
    delay: 3000
  },
  loop: true,

  // pagination
  pagination: {
    el: '.swiper-pagination',
    clickable: true
  },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  }

});