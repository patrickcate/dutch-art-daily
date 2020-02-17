<script>
import { mapState } from 'vuex'
import SvgIcon from '@components/svg-icon'
import iconArrowRight from '@icons/icon-arrow-right.svg'

export default {
  name: 'NavButtonNext',
  components: {
    SvgIcon,
  },
  data() {
    return {
      iconArrowRight: iconArrowRight,
    }
  },
  computed: {
    ...mapState(['slides', 'currentSlideIndex']),
    maxSlideIndex() {
      return this.slides.length - 1
    },
    disabledNextButton() {
      return this.currentSlideIndex >= this.maxSlideIndex
    },
  },
  methods: {
    toNextSlide() {
      if (this.currentSlideIndex < this.maxSlideIndex) {
        this.$root.swipers.carousel.slideTo(this.currentSlideIndex + 1)
      }
    },
  },
}
</script>

<template>
  <button
    type="button"
    class="nav-button nav-button--next"
    :disabled="disabledNextButton"
    @click="toNextSlide()"
  >
    <span class="u-sr-only">Go to next slide</span>
    <svg-icon :icon="iconArrowRight" class="icon" role="presentation" />
  </button>
</template>
