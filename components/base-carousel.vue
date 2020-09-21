<script>
import { mapState, mapActions } from 'vuex'
import {
  A11y,
  Controller,
  Lazy,
  Navigation,
  Swiper,
} from 'swiper/js/swiper.esm'

export default {
  name: 'BaseCarousel',
  props: {
    slideNumber: {
      type: Number,
      default: 1,
    },
    name: {
      type: String,
      required: true,
    },
    keyboard: {
      type: Boolean,
      default: false,
    },
    simulateTouch: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      initialized: false,
    }
  },
  computed: {
    ...mapState({
      currentSlideIndex: 'currentSlideIndex',
      slides: 'slides',
      paginationNumber: 'paginationNumber',
    }),
    initialSlide() {
      return this.slides.length - 1
    },
    initClass() {
      return this.initialized ? 'swiper--initialized' : null
    },
    wrapperClass() {
      return `${this.name}__list`
    },
  },
  mounted() {
    // Add the default carousel slide class.
    this.addSlideClass()

    const self = this
    Swiper.use([A11y, Lazy, Navigation, Controller])

    const options = {
      speed: 500,
      centeredSlides: true,
      slidesPerView: self.slideNumber,
      roundLengths: true,
      keyboard: {
        enabled: self.keyboard,
        onlyInViewport: true,
      },
      a11y: {
        enabled: true,
      },
      initialSlide: self.initialSlide,
      slideToClickedSlide: true,
      simulateTouch: self.simulateTouch,
      controller: true,
      updateOnWindowResize: self.name !== 'timeline',
      passiveListeners: true,
      preloadImages: false,
      lazy: {
        loadPrevNext: true,
        loadOnTransitionStart: true,
        loadPrevNextAmount: 2,
      },
      on: {
        init() {
          self.initialized = true
        },
        slideChange() {
          self.changeSlide(this.slides, this.activeIndex)
        },
        resize() {
          // TODO: Add debounce.
          self.updateHeight(this.slides[this.activeIndex])

          if (self.name === 'timeline') {
            self.updatePaginationNumber()
            this.updateSize()
            this.updateSlides()
          }
        },
      },
    }

    const swiperInstance = new Swiper(this.$refs.swiperInstance, options)

    this.$nextTick(() => {
      this.$root.swipers[this.name] = swiperInstance
      this.setCarouselControllers(this.$root.swipers)
    })
  },
  methods: {
    ...mapActions([
      'updateCurrentPage',
      'updateCurrentSlideIndex',
      'updatePaginationNumber',
      'updateCurrentArtworkHeight',
      'updateCurrentDetailsHeight',
    ]),
    setCarouselControllers(rootSwipers) {
      const swiperNames = Object.keys(rootSwipers)

      if (swiperNames.length === 3) {
        swiperNames.forEach(name => {
          switch (name) {
            case 'carousel':
              rootSwipers.carousel.controller.control = rootSwipers.timeline
              break

            case 'timeline':
              rootSwipers.timeline.controller.control = [
                rootSwipers.carousel,
                rootSwipers.details,
              ]
              break

            case 'details':
              rootSwipers.details.controller.control = rootSwipers.timeline
              break
          }
        })
      }
    },
    addSlideClass() {
      // Add the default swiper 'swiper-slide' CSS class to all slot slides.
      this.$children.forEach(slide => {
        slide.$el.classList.add('swiper-slide')
      })
    },
    changeSlide(slides, activeIndex) {
      this.updateCurrentSlide(activeIndex)
      this.updateHeight(slides[activeIndex])
    },
    updateCurrentSlide(index) {
      if (this.currentSlideIndex !== index && this.slides[index]) {
        this.updateCurrentSlideIndex(index)
        this.updateCurrentPage(this.slides[index].id)
      }
    },
    updateHeight(slide) {
      this.$nextTick(() => {
        if (this.name === 'carousel' && slide) {
          const imageHeight = slide.querySelector('img')

          if (imageHeight) {
            this.updateCurrentArtworkHeight(slide.children[0].scrollHeight)
          }
        }

        if (this.name === 'details' && slide) {
          const detailsHeight = slide.querySelector('.js-details-slide')

          if (detailsHeight) {
            this.updateCurrentDetailsHeight(detailsHeight.scrollHeight)
          }
        }
      })
    },
  },
}
</script>
<template>
  <div ref="swiperInstance" class="swiper-container" :class="initClass">
    <ul class="swiper-wrapper" :class="wrapperClass">
      <slot></slot>
    </ul>
  </div>
</template>

<style lang="scss">
@import '@theme';

.swiper-wrapper {
  padding: 0;
  margin: 0;
  list-style: none;
}

.swiper-container {
  opacity: 0;

  &.swiper--initialized {
    opacity: 1;
  }
}

.swiper-lazy {
  opacity: 0;

  &.swiper-lazy-loaded {
    opacity: 1;
  }
}
</style>
