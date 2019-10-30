$(function() {
  var swiper = new Swiper(".swiper-container", {
    pagination: ".swiper-pagination",
    nextButton: ".swiper-button-next",
    prevButton: ".swiper-button-prev",
    paginationClickable: true,
    spaceBetween: 0,
    centeredSlides: true,
    autoplay: 5000,
    autoplayDisableOnInteraction: false
  });

  $("#index-colse").on("click", function() {
    $(this)
      .children()
      .eq(0)
      .toggleClass("active");
    $("#index-nav").slideToggle();
    $(".wrapper").fadeToggle();
  });

  var h = $(document.body).height();
  var product = $("#index-product > h2").offset().top;
  $(document).on("scroll", function(e) {
    if ($(this).scrollTop() + 160 >= h) {
      $("#index-hd").addClass("fixed");
    } else {
      $("#index-hd").removeClass("fixed");
    }
    if ($(this).scrollTop() + h / 2 >= product) {
      $("#index-product").addClass("scrolled");
    }
    $.each($("#product-main>div"), function(indexInArray, valueOfElement) {
      if (
        $(document).scrollTop() + (h * 3) / 4 >
        $(valueOfElement).offset().top
      ) {
        $(valueOfElement).addClass("scrolled");
      }
    });
  });

  $("#head-product").on("click", function() {
    $(this).toggleClass("open");
    $("#product-links").toggleClass("open");
    $("#index-back").toggleClass("open");
    if ($(this).hasClass("open")) {
      $("#nav-product").css({
        left: 0,
        display: "block"
      });
    } else {
      $("#nav-product").css({
        left: "100%"
      });
    }
  });

  $("#index-back").on("click", function() {
    $("#nav-product").css({
      left: "100%"
    });
  });
  $(".wrapper").on("click", function() {
    $(this).css({
      display: "none"
    });
  });
});
