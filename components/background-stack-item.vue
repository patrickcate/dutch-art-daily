<script>
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'BackgroundStackItem',
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  computed: {
    ...mapState({
      activeId: 'currentPage',
    }),
    ...mapGetters(['getArtworkById']),
    artwork() {
      return this.getArtworkById(this.id)
    },
    activeBackgroundBlurred() {
      return this.id === this.activeId ? 'background-stack__item--today' : null
    },
    backgroundImage() {
      return {
        backgroundImage: `url('/photos/${this.id}/${this.id}--lqi-${this.artwork.hash}.jpg')`,
      }
    },
  },
}
</script>

<template>
  <div
    class="background-stack__item"
    :class="activeBackgroundBlurred"
    :style="backgroundImage"
  ></div>
</template>

<style lang="scss">
@import '@theme';

.background-stack__item {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  filter: blur($half-spacing);
  background-position: center;
  background-size: cover;
  opacity: 0;
  transition: opacity $speed-slowest ease, z-index $speed-slowest ease;
  transform: translateZ(0);
}

.background-stack__item--today {
  z-index: 1;
  opacity: 1;
  will-change: opacity, z-index, filter;
}
</style>
