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

// Check if the JSON data is empty.
function emptyData(data) {
  if (data === null || data.length === 0) {
    return true;
  }
  return false;
}

// Get today's date.
// var today = new Date('2016-01-01 12:00:00 -05:00');
var today = new Date();
var currentMonth = formatMonth(today);
var currentDay = formatDay(today);


// Build metadata markup.
function buildSlideMetadata(slideData) {
  var art_date = !emptyData(slideData.art_date) ? slideData.art_date : '';
  var art_medium = !emptyData(slideData.art_medium) ? slideData.art_medium : '';
  var art_surface = !emptyData(slideData.art_surface) ? slideData.art_surface : '';
  var art_height = !emptyData(slideData.art_height) ? slideData.art_height + ' cm' : '';
  var art_width = !emptyData(slideData.art_width) ? slideData.art_width + ' cm' : '';

  return {
    "@context": "http://schema.org",
    "@type": "VisualArtwork",
    "sameAs": "http://www.dutchartdaily.com" + slideData.url,
    "name": slideData.title,
    "image": "http://www.dutchartdaily.com/images/" + slideData.id + '--huge.jpg',
    "artform": 'Painting',
    "dateCreated": art_date,
    "creator": [{
      "@type": "Person",
      "name": slideData.artist
    }],
    "height": [{
      "@type": "Distance",
      "name": art_height
    }],
    "width": [{
      "@type": "Distance",
      "name": art_width
    }],
    "artMedium": art_medium,
    "artworkSurface": art_surface
  };

}

// Build template markup.
function buildSlideTemplate(slideData) {
  var isToday = '';
  var art_date = !emptyData(slideData.art_date) ? '<svg class="icon icon--date" role="presentation"><title>Date Created:</title><use xlink:href="#icon--date"></use></svg> ' + slideData.art_date + '<br />' : '';
  var art_medium = !emptyData(slideData.art_medium) ? '<svg class="icon icon--medium" role="presentation"><title>Artwork Medium:</title><use xlink:href="#icon--medium"></use></svg> ' + slideData.art_medium : '';
  var art_surface = !emptyData(slideData.art_surface) ? ' on ' + slideData.art_surface + '<br />' : '';
  var art_size = !emptyData(slideData.art_height) ? '<svg class="icon icon--size" role="presentation"><title>Artwork Size:</title><use xlink:href="#icon--size"></use></svg> ' + slideData.art_height + ' cm &times; ' + slideData.art_width + ' cm<br />' : '';
  var art_location = !emptyData(slideData.art_location) ? '<svg class="icon icon--location" role="presentation"><title>Currently located at:</title><use xlink:href="#icon--location"></use></svg> ' + slideData.art_location + '<br />' : '';

  var today = new Date();

  if (slideData.id === formatMonth(today) + '-' + formatDay(today)) {
    isToday = 'Today,&ensp;';
  }
  else if (slideData.id === formatMonth(subtractDays(today, 1)) + '-' + formatDay(subtractDays(today, 1))) {
    isToday = 'Yesterday,&ensp;';
  }

  return '<div class="slide ' + 'slide--' + slideData.id + ' swiper-slide" data-hash="' + slideData.id + '">' + '<article class="artwork"><div class="artwork__inner"><div class="artwork__header"><h1 class="artwork__date">' + isToday + slideData.date + '<sup>' + slideData.date_ordinal + '</sup></h1></div><div class="artwork__image"><img data-src="/images/' + slideData.image + '" alt="Photo of painting: ' + slideData.title + '" class="img swiper-lazy" data-srcset="' + slideData.srcset + '" sizes="' + slideData.srcset_sizes + '" /><div class="artwork__preloader swiper-lazy-preloader swiper-lazy-preloader-white"></div></div><div class="artwork__content"><span class="is-visually-hidden">Artwork Name:</span><h2 class="artwork__title">' + slideData.title + '</h2><span class="is-visually-hidden">Created by artist:</span><h4 class="artwork__artist">' + slideData.artist + '</h4><p>' + art_date + art_medium + art_surface + art_size + art_location + '<svg class="icon icon--link" role="presentation"><title>Citation:</title><use xlink:href="#icon--link"></use></svg> ' + slideData.cite_author + ': <a href="' + slideData.cite_url + '" target="_blank"><em>' + slideData.title + ' (' + slideData.artist + ')</em></a></p></div></article></div>';

}

// JSONP callback function
function dutchartdailyslides(data) {
  var slideMetadata = [];
  var slideContent = '';
  var totalSlides = data.total;
  var sliderData = data.posts;

  for (var i = 0; i < totalSlides; i++) {
    var postMonth = formatMonth(subtractDays(today, i));
    var postDate = postMonth + '-' + formatDay(subtractDays(today, i));
    var id = 'slide--' + postDate;

    // Add metadata to array.
    slideMetadata.push(buildSlideMetadata(sliderData[postDate]));

    // Concat slide markup.
    slideContent = buildSlideTemplate(sliderData[postDate]) + slideContent;
  }

  // Add slide markup to page.
  document.getElementById('js-slider__inner').innerHTML = slideContent;

  // Create script tag for metadata and add to head.
  var scriptTag = document.createElement('script');
  scriptTag.type = 'application/ld+json';
  scriptTag.innerHTML = JSON.stringify(slideMetadata);
  document.head.appendChild(scriptTag);

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
    // hashnav: true,
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
      // window.picturefill();
    },
    // onLazyImageLoad: function(swiper, slide, image) {
    //   // console.log(image.complete);
    // },
    onLazyImageReady: function(swiper, slide, image) {
      // window.picturefill();
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

  var path = '/api/' + currentMonth + '-posts.json.js';

  JSONP({
    url: path,
    callbackName: 'dutchartdailyslides',
    // error: function(data) { console.log(data); },
    // success: function(data) { console.log(data); },
    // complete: function(data) { console.log(data); },
  });
});
