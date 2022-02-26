const swiper = new Swiper('.heroSwiper', {
  effect: "fade",
  autoplay: {
    delay: 2000
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