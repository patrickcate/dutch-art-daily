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

// Build template markup.
function buildSlideTemplate(slideData) {

  return '<div class="slide ' + 'slide--' + slideData.id + ' swiper-slide" data-hash="' + slideData.id + '">' + '<article class="artwork" vocab="http://schema.org/" typeof="Painting"><div class="artwork__inner"><div class="artwork__header"><h3 class="artwork__date">' + slideData.date + '<sup class="artwork__ordinal">' + slideData.date_ordinal + '</sup></h3></div><div class="artwork__image"><img property="image" data-src="/images/' + slideData.img_src + '" alt="' + slideData.title + '" class="img swiper-lazy" data-srcset="' + slideData.srcset + '" sizes="' + slideData.srcset_sizes + '" /><div class="artwork__preloader swiper-lazy-preloader swiper-lazy-preloader-white"></div></div><div class="artwork__content"><h3 property="name" class="artwork__title">' + slideData.title + '</h3><h4 property="creator" typeof="Person" class="artwork__artist"><span property="name">' + slideData.artist + '</span></h4><p><svg class="icon icon--date" role="presentation"><use xlink:href="#icon--date"></use></svg> ' + slideData.art_date + '<br /><svg class="icon icon--medium" role="presentation"><use xlink:href="#icon--medium"></use></svg> ' + slideData.art_type + '<br /><svg class="icon icon--size" role="presentation"><use xlink:href="#icon--size"></use></svg> ' + slideData.art_height + ' cm &times; ' + slideData.art_width + ' cm<br /><svg class="icon icon--location" role="presentation"><use xlink:href="#icon--location"></use></svg> ' + slideData.art_location + '<br /><svg class="icon icon--link" role="presentation"><use xlink:href="#icon--link"></use></svg> ' + slideData.cite_author + ': <a href="' + slideData.cite_url + '" target="_blank"><em>' + slideData.title + ' (' + slideData.artist + ')</em></a></p></div></article></div>';

  // console.log(slideData);

  // return slideContent;
}

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
    slidesPerView: 'auto',
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
      // svg4everybody();
    },
    // onLazyImageLoad: function(swiper, slide, image) {
    //   // console.log(image.complete);
    // },
    onLazyImageReady: function(swiper, slide, image) {
        window.picturefill();
        swiper.update(true);

        // Fix iOS Safari update bug.
        setInterval(swiper.update(true), 1000);
    },
    onSlideChangeStart: function(swiper) {
      // var currentSlideDate = swiper.slides[swiper.activeIndex].querySelector('.artwork__date').innerHTML;
      // document.getElementById('js-header-date').innerHTML = currentSlideDate;
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
