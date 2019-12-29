<script>
import { fetchArtworkData } from '@utils/fetch-artwork-data'
import SwiperCarousel from '@components/swiper-carousel'
import ArtSlide from '@components/art-slide'
import TimelineNav from '@components/timeline-nav'
import NavButtonPrevious from '@components/nav-button-previous'
import NavButtonNext from '@components/nav-button-next'
import ArtDetails from '@components/art-details'

export default {
  layout: 'default',
  components: {
    ArtSlide,
    SwiperCarousel,
    TimelineNav,
    NavButtonPrevious,
    NavButtonNext,
    ArtDetails,
  },
  head() {
    return {
      title: `${this.page.title} | Dutch Art Daily`,
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        {
          hid: 'description',
          name: 'description',
          content: `${this.page.title} by ${this.page.artist}`,
        },
      ],
    }
  },
  validate({ params }) {
    // Must be a number
    return true
  },
  computed: {
    currentDate() {
      return this.$store.state.currentPage
    },
    page() {
      const artwork = this.$store.getters.getArtById(this.$route.params.date)
      return artwork
        ? artwork
        : {
            title: '',
            description: '',
          }
    },
    slides() {
      return this.$store.state.slides
    },
    currentHeight() {
      return `height:${this.$store.state.currentHeight}px`
    },
  },
  async fetch({ store, params, payload }) {
    const pageDate = payload ? payload : params.date

    const slides = await fetchArtworkData(pageDate)

    await store.dispatch('setSlideData', slides)
    store.commit('SET_CURRENT_SLIDE_INDEX', slides.length - 1)
    store.dispatch('setCurrentPage', pageDate)
  },
}
</script>

<template>
  <div>
    <main class="l-page__main">
      <swiper-carousel
        name="carousel"
        :keyboard="true"
        :simulate-touch="true"
        class="carousel"
        :style="currentHeight"
      >
        <art-slide v-for="slide in slides" :key="slide.id" :artwork="slide" />
      </swiper-carousel>
    </main>
    <nav class="l-page__nav">
      <nav-button-previous />
      <timeline-nav class="l-page__timeline" />
      <nav-button-next />
    </nav>
    <art-details class="l-page__details" />
  </div>
</template>

<style lang="scss">
@import '@theme';

.carousel {
  transition: height $speed-medium ease;
}
</style>
