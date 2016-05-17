'use strict';

// Left pad a number with a '0'
function padNumber(int) {
  if (int < 10) {
    return '0' + int;
  }
  return int;
}

// Formats a month with a left padded '0' if a single digit.
function formatMonth(date) {
  return padNumber(date.getMonth() + 1);
}

// Formats a day with a left padded '0' if a single digit.
function formatDay(date) {
  return padNumber(date.getDate());
}

// Subtrack a certain number of days from the date.
function subtractDays(date, days) {
  return new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate() - days,
    date.getHours(),
    date.getMinutes(),
    date.getSeconds(),
    date.getMilliseconds()
  );
}

// Get today's date.
// var today = new Date('2016-01-04 12:00:00 -05:00');
var today = new Date();
var currentMonth = formatMonth(today);
var currentDay = formatDay(today);


// var domReady = function(callback) {
//   if (document.readyState === "interactive" || document.readyState === "complete") {
//     callback();
//   }
//   else {
//     document.addEventListener("DOMContentLoaded", callback);
//   }
// };


// JSONP callback function
function dutchartdailyslides(data) {
  var slideContent = '';
  var totalSlides = data.total;
  var sliderData = data.posts;

  for (var i = 0; i < totalSlides; i++) {
    var postMonth = formatMonth(subtractDays(today, i));
    var postDate = postMonth + '-' + formatDay(subtractDays(today, i));
    var id = 'slide--' + postDate;

    slideContent = '<div class="slide ' + id + ' swiper-slide" data-hash="' + postDate + '">' + sliderData[postDate] + '</div>' + slideContent;
  }

  document.getElementById('js-slider__inner').innerHTML = slideContent;

  var mySwiper = new Swiper('#js-slider', {
    initialSlide: totalSlides - 1,
    slideClass: 'slide',
    // slideActiveClass: 'art-slider--is-active',
    // slideVisibleClass: 'art-slider__is-visible',
    // slideDuplicateClass: 'art-slider-is-duplicate',
    // slideNextClass: 'art-slider--is-next',
    // slidePrevClass: 'art-slider--is-prev',
    // wrapperClass: 'art-slider__inner',
    autoHeight: true,
    roundLengths: true,
    centeredSlides: true,
    slidesPerView: 1,
    spaceBetween: 0,
    // grabCursor: true,
    nextButton: '.nav-button--next',
    prevButton: '.nav-button--prev',
    buttonDisabledClass: 'nav-button--is-disabled',
    keyboardControl: true,
    uniqueNavElements: false,
    hashnav: true,
    preloadImages: false,
    updateOnImagesReady: false,
    pagination: '.slider__pager',
    paginationHide: false,
    paginationClickable: false,
    paginationElement: 'span',
    bulletClass: 'slider__pager-item',
    bulletActiveClass: 'slider__pager-item--is-active',
    lazyLoading: true,
    lazyLoadingInPrevNext: true,
    lazyLoadingInPrevNextAmount: 1,
    lazyLoadingOnTransitionStart: true,
    a11y: true,
    watchSlidesProgress: true,
    watchSlidesVisibility: true,
    observer: true,
    observeParents: true,
    onInit: function(swiper) {
      window.picturefill();
      svg4everybody();
    },
    // onLazyImageLoad: function(swiper, slide, image) {
    //   // console.log(image.complete);
    // },
    onLazyImageReady: function(swiper, slide, image) {
      // Double check to make sure the image is actually loaded.
      if (image.complete === true) {
        // console.log(image.complete);
        window.picturefill();
        swiper.update(true);
      }
    }
  });
}

// The dom is ready, do your magic.
domready(function() {

  var path = 'api/' + currentMonth + '-slides.json.js';

  JSONP({
    url: path,
    callbackName: 'dutchartdailyslides',
    // error: function(data) { console.log(data); },
    // success: function(data) { console.log(data); },
    // complete: function(data) { console.log(data); },
  });
});
