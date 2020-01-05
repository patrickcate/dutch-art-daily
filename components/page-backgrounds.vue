<script>
import { mapState } from 'vuex'
import {
  getDateObjFromId,
  dateId,
  yesterdayDateId,
  tomorrowDateId,
} from '@utils/format-date'

export default {
  name: 'PageBackgrounds',
  computed: {
    ...mapState({
      todayId: 'currentPage',
      loadedSlides: 'loadedSlides',
    }),
  },
  methods: {
    image(id) {
      return this.$store.getters.getArtById(id)
    },
    visibleBackground(id) {
      return id === this.todayId ? 'page-background--today' : null
    },
    backgroundImage(image) {
      return {
        backgroundImage: `url('/photos/${image.id}/${image.id}--lqi-${image.hash}.jpg')`,
      }
    },
  },
}
</script>
<template>
  <div>
    <template v-for="id in loadedSlides">
      <div
        :key="id"
        class="page-background"
        :class="visibleBackground(id)"
        :style="backgroundImage(image(id))"
      ></div>
    </template>
  </div>
</template>

<style lang="scss">
@import '@theme';

.page-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  filter: blur(px($spacing));
  background-position: top;
  background-size: cover;
  opacity: 0;
  transition: opacity $speed-slowest ease, z-index $speed-slowest ease;
  transform: translateZ(0);
}

.page-background--today {
  z-index: 1;
  opacity: 1;
  will-change: opacity, z-index, filter;
}
</style>
