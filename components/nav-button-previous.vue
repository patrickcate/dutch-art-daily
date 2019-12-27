<script>
import SvgIcon from '@components/svg-icon'
import IconArrowLeft from '@icons/icon-arrow-left.svg'

export default {
  name: 'NavButtonPrevious',
  components: {
    SvgIcon,
  },
  data() {
    return {
      iconArrowLeft: IconArrowLeft,
    }
  },
  computed: {
    currentSlideIndex() {
      return this.$store.state.currentSlideIndex
    },
    disabledPrevButton() {
      return this.currentSlideIndex <= 0
    },
  },
  methods: {
    toPrevSlide() {
      if (this.currentSlideIndex > 0) {
        this.$root.swipers.carousel.slideTo(this.currentSlideIndex - 1)
      }
    },
  },
}
</script>

<template>
  <button
    type="button"
    class="nav-button nav-button--next"
    :disabled="disabledPrevButton"
    @click="toPrevSlide()"
  >
    <span class="u-sr-only">Go to previous slide</span>
    <svg-icon :icon="iconArrowLeft" class="icon" role="presentation" />
  </button>
</template>
