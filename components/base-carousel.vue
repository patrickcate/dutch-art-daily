<script>
import { mapState } from 'vuex'
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
      slideIndex: 'currentSlideIndex',
      slides: 'slides',
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
    slideHeight: {
      get() {
        return this.$store.state.currentHeight
      },
      set(height) {
        this.$store.commit('SET_CURRENT_HEIGHT', height)
      },
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
      roundLengths: false,
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
          self.updateCurrentSlide(this.activeIndex)
          self.updateHeight(this.slides[this.activeIndex])
        },
        resize() {
          self.updateHeight(this.slides[this.activeIndex])

          const mql = window.matchMedia('(max-width: 600px)')

          if (mql.matches) {
            self.$root.swipers.timeline.params.slidesPerView = 3
          } else {
            self.$root.swipers.timeline.params.slidesPerView = 7
          }

          if (self.name === 'timeline') {
            this.updateSize()
            this.updateSlides()
          }
        },
      },
    }

    const swiperInstance = new Swiper(this.$refs.swiperInstance, options)

    this.$nextTick(() => {
      // DOM updated
      this.$root.swipers[this.name] = swiperInstance

      const swiperNames = Object.keys(this.$root.swipers)

      if (swiperNames.length === 3) {
        swiperNames.forEach(name => {
          switch (name) {
            case 'carousel':
              this.$root.swipers.carousel.controller.control = this.$root.swipers.timeline
              break

            case 'timeline':
              this.$root.swipers.timeline.controller.control = [
                this.$root.swipers.carousel,
                this.$root.swipers.details,
              ]
              break

            case 'details':
              this.$root.swipers.details.controller.control = this.$root.swipers.timeline
              break
          }
        })
      }
    })
  },
  methods: {
    addSlideClass() {
      // Add the default swiper 'swiper-slide' CSS class to all slot slides.
      this.$children.forEach(slide => {
        slide.$el.classList.add('swiper-slide')
      })
    },
    updateHeight(slide) {
      if (this.name === 'carousel') {
        this.$nextTick(() => {
          const imageHeight = slide.querySelector('img').scrollHeight

          if (imageHeight) {
            this.slideHeight = slide.children[0].scrollHeight
          }
        })
      }
    },
    updateCurrentSlide(index) {
      if (this.$store.state.currentSlideIndex !== index) {
        this.$store.commit('SET_CURRENT_SLIDE_INDEX', index)
        this.$store.dispatch(
          'setCurrentPage',
          this.$store.state.slides[index].id
        )
      }
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
