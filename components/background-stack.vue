<script>
import { mapState, mapGetters } from 'vuex'
import {
  getDateObjFromId,
  dateId,
  yesterdayDateId,
  tomorrowDateId,
} from '@utils/format-date'
import BackgroundStackItem from '@components/background-stack-item'

export default {
  name: 'BackgroundStack',
  components: {
    BackgroundStackItem,
  },
  computed: {
    ...mapState({
      activeId: 'currentPage',
      loadedSlides: 'loadedSlides',
    }),
    ...mapGetters(['getArtworkById']),
    activeArtwork() {
      return this.getArtworkById(this.activeId)
    },
    activeBackground() {
      return this.activeArtwork
        ? {
            backgroundColor: this.activeArtwork.darkMuted,
            backgroundImage: `url('/photos/${this.activeArtwork.id}/${this.activeArtwork.id}--lqi-${this.activeArtwork.hash}.jpg')`,
          }
        : null
    },
    hasLoadedSlide() {
      return Object.keys(this.loadedSlides).length
    },
  },
}
</script>

<template>
  <div v-if="hasLoadedSlide" class="background-stack" :style="activeBackground">
    <background-stack-item v-for="id in loadedSlides" :id="id" :key="id" />
  </div>
</template>

<style lang="scss">
@import '@theme';

.background-stack {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  max-width: 100%;
  overflow: hidden;
  background-position: center;
  background-size: cover;
  transition: background-color $speed-slow $base-easing;
  transform: translateZ(0);

  &:before,
  &:after {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    z-index: z-index(nudge);
    display: block;
    height: 50vh;
    content: '';
    overflow: hidden;
  }

  &:before {
    background-image: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.75),
      ease-out,
      rgba(0, 0, 0, 0)
    );
  }

  &:after {
    top: 50vh;
    bottom: 0;
    background-image: linear-gradient(
      to top,
      rgba(0, 0, 0, 0.75),
      ease-out,
      rgba(0, 0, 0, 0)
    );
  }
}
</style>
