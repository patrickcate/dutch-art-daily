<script>
import { mapState } from 'vuex'
import SvgIcon from '@components/svg-icon.vue'
import iconArrowRight from '@icons/icon-arrow-right.svg'
import IconArrowLeft from '@icons/icon-arrow-left.svg'

export default {
  name: 'TimelineNavButton',
  components: {
    SvgIcon,
  },
  props: {
    direction: {
      type: String,
      required: true,
      validator(value) {
        return value === 'prev' || value === 'next'
      },
    },
  },
  data() {
    return {
      iconArrowRight: iconArrowRight,
      iconArrowLeft: IconArrowLeft,
    }
  },
  computed: {
    ...mapState(['slides', 'currentSlideIndex']),
    maxSlideIndex() {
      return this.slides.length - 1
    },
    disableButton() {
      return this.direction === 'prev'
        ? this.currentSlideIndex <= 0
        : this.currentSlideIndex >= this.maxSlideIndex
    },
  },
  methods: {
    toPrevSlide() {
      if (this.currentSlideIndex > 0) {
        this.$root.swipers.carousel.slideTo(this.currentSlideIndex - 1)
      }
    },
    toNextSlide() {
      if (this.currentSlideIndex < this.maxSlideIndex) {
        this.$root.swipers.carousel.slideTo(this.currentSlideIndex + 1)
      }
    },
    toSlide() {
      if (this.direction === 'prev') {
        this.toPrevSlide()
      } else {
        this.toNextSlide()
      }
    },
  },
}
</script>

<template>
  <button
    type="button"
    class="nav-button"
    :disabled="disableButton"
    @click="toSlide()"
  >
    <template v-if="direction === 'prev'">
      <span class="u-sr-only">Go to previous slide</span>
      <svg-icon :icon="iconArrowLeft" class="icon" role="presentation" />
    </template>
    <template v-else>
      <span class="u-sr-only">Go to next slide</span>
      <svg-icon :icon="iconArrowRight" class="icon" role="presentation" />
    </template>
  </button>
</template>

<style lang="scss">
@import '@theme';

.nav-button {
  position: relative;
  display: block;
  width: $spacing * 2;
  height: $spacing * 2;
  padding: 0;
  margin-top: $quarter-spacing;
  font-size: $font-size-xxl;
  line-height: 1;
  color: $white;
  cursor: pointer;
  background-color: transparent;
  transition: color $speed-fast ease, opacity $speed-fast ease;

  @include media('>xs') {
    font-size: $font-size-xxxl;
  }

  @include media('>md') {
    margin-top: $half-spacing;
  }

  .svg-icon {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  &:hover {
    color: set-color(secondary);
  }

  &[disabled] {
    color: $white;
    pointer-events: none;
    cursor: default;
    opacity: 0.35;
  }
}
</style>
