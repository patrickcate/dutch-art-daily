<script>
import { mapState } from 'vuex'
import DetailsSlide from '@components/details-slide.vue'

export default {
  name: 'ArtDetails',
  components: {
    DetailsSlide,
  },
  data() {
    return {
      detailsHeight: null,
    }
  },
  computed: {
    ...mapState(['slides', 'currentPage']),
    currentDetailsHeight() {
      return this.detailsHeight
        ? {
            height: `${this.detailsHeight}px`,
          }
        : null
    },
  },
  methods: {
    updateDetailsHeight(height) {
      this.detailsHeight = height
    },
  },
}
</script>

<template>
  <base-carousel name="details" :style="currentDetailsHeight">
    <details-slide
      v-for="slide in slides"
      :id="slide.id"
      :key="slide.id"
      @details-have-changed="updateDetailsHeight"
    />
  </base-carousel>
</template>
