<script>
import { mapState } from 'vuex'
import DetailsSlide from '@components/details-slide.vue'

export default {
  name: 'DetailsCarousel',
  components: {
    DetailsSlide,
  },
  computed: {
    ...mapState(['slides', 'currentDetailsHeight']),
    detailsHeight() {
      return this.currentDetailsHeight
        ? {
            height: `${this.currentDetailsHeight}px`,
          }
        : null
    },
  },
}
</script>

<template>
  <base-carousel name="details" :style="detailsHeight">
    <details-slide v-for="slide in slides" :id="slide.id" :key="slide.id" />
  </base-carousel>
</template>
