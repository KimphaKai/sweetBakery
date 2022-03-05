const swiper = new Swiper('.heroSwiper', {
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
    nextEl: '.next-arrow',
    prevEl: '.prev-arrow',
  }

});