<script>
import {
  getDateObjFromId,
  dateId,
  yesterdayDateId,
  tomorrowDateId,
} from '@utils/format-date'

export default {
  name: 'PageBackgrounds',
  computed: {
    images() {
      return this.$store.state.slides
    },
    todayId() {
      return this.$store.state.currentPage
    },
    yesterdayId() {
      const yesterday = getDateObjFromId(this.todayId)

      return yesterdayDateId(yesterday)
    },
    tomorrowId() {
      const tomorrow = getDateObjFromId(this.todayId)

      return tomorrowDateId(tomorrow)
    },
  },
  methods: {
    visibleBackground(id) {
      return id === this.todayId ? 'page-background-container--today' : null
    },
    srcUrl(image) {
      return `/photos/${image.id}/${image.id}--xs3-${image.hash}.jpg`
    },
    srcSet(image) {
      const imageWidths = this.$store.state.imageWidths
      const imageSizes = Object.keys(imageWidths)
      const srcset = imageSizes.reduce((accumulator, size) => {
        if (image[size]) {
          accumulator.push(
            `/photos/${image.id}/${image.id}--${size}-${image.hash}.jpg` +
              ` ${image[size].width}w`
          )
        }

        return accumulator
      }, [])

      return srcset.join(', ')
    },
    srcSizes(image) {
      return `(min-aspect-ratio: ${image.width}/${image.height}) calc((${image.width} / ${image.height}) * (100vh - 280px)), 100vw`
    },
  },
}
</script>
<template>
  <transition-group tag="div">
    <div
      v-for="image in images"
      :key="image.id"
      class="page-background-container"
      :class="visibleBackground(image.id)"
    >
      <img
        :src="srcUrl(image)"
        :srcset="srcSet(image)"
        :sizes="srcSizes"
        role="presentation"
        alt=""
        class="page-background"
      />
    </div>
  </transition-group>
</template>

<style lang="scss">
@import '@theme';

.page-background-container {
  width: 100%;
  height: 100%;
  opacity: 0;
  transition: opacity $speed-slower ease;
}

.page-background-container--today {
  opacity: 1;
  will-change: opacity;
}

.page-background {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  width: 100%;
  height: 100%;
  filter: blur($blur-size) brightness(0.75);
  background-position: center;
  background-size: cover;
  transform: scale3d(1.15, 1.15, 1.15) rotate(0.01deg);
  object-fit: cover;
}
</style>
