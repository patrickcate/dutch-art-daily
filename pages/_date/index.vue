<script>
import { mapState, mapGetters } from 'vuex'
import { generateRoutes } from '@utils/generate-routes'
import { generateDateList } from '@utils/format-date'
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
          hid: 'og:title',
          name: 'og:title',
          content: this.page.title,
        },
        {
          hid: 'author',
          name: 'author',
          content: this.page.artist,
        },
        {
          hid: 'description',
          name: 'description',
          content: `${this.page.title} by ${this.page.artist}`,
        },
        {
          hid: 'og:title',
          name: 'og:title',
          content: this.page.title,
        },
        {
          hid: 'og:description',
          name: 'og:description',
          content: `${this.page.title} by ${this.page.artist}`,
        },
        {
          hid: 'og:site_name',
          name: 'og:site_name',
          content: 'Dutch Art Daily',
        },
        {
          hid: 'og:image',
          name: 'og:image',
          content: `https://dutchartdaily.com/photos/${this.page.id}/${this.page.id}--xs3-${this.page.hash}.jpg`,
        },
        {
          hid: 'og:url',
          name: 'og:url',
          content: `https://dutchartdaily.com/${this.page.id}`,
        },
        {
          hid: 'twitter:card',
          name: 'twitter:card',
          content: 'photo',
        },
        {
          hid: 'twitter:site',
          name: 'twitter:site',
          content: 'Dutch Art Daily',
        },
        {
          hid: 'twitter:title',
          name: 'twitter:title',
          content: this.page.title,
        },
        {
          hid: 'twitter:creator',
          name: 'twitter:creator',
          content: this.page.artist,
        },
        {
          hid: 'twitter:url',
          name: 'twitter:url',
          content: `https://dutchartdaily.com/${this.page.id}`,
        },
        {
          hid: 'twitter:image',
          name: 'twitter:image',
          content: `https://dutchartdaily.com/photos/${this.page.id}/${this.page.id}--xs3-${this.page.hash}.jpg`,
        },
      ],
      link: [{ rel: 'apple-touch-icon', href: this.$icon(192) }],
    }
  },
  validate({ params }) {
    const allRoutes = generateRoutes()

    return allRoutes.includes(params.date)
  },
  computed: {
    ...mapState({
      currentDate: 'currentPage',
      slides: 'slides',
      currentHeight: 'currentHeight',
    }),
    ...mapGetters(['getArtworkById']),
    routeDate() {
      return this.$route.params.date
    },
    artwork() {
      return this.getArtworkById(this.routeDate)
    },
    page() {
      return this.artwork
        ? this.artwork
        : {
            title: '',
            description: '',
          }
    },
    currentSlideHeight() {
      return `height:${this.currentHeight}px`
    },
  },
  async fetch({ store, params, payload }) {
    const slideDates = generateDateList(params.date)

    const slides = await Promise.all(
      slideDates.map(async item => {
        // Break the date parameters into an array so we can access the month
        // and day separately.
        const date = item.split('-')

        // Use the function form of import to dynamically parse the .json content
        // files.
        const artwork = await import(
          `../../data/${date[0]}/${date[0]}-${date[1]}.json`
        )

        return artwork.default
      })
    )

    await store.dispatch('setSlideData', slides)
    store.commit('SET_CURRENT_SLIDE_INDEX', slides.length - 1)
    store.dispatch('setCurrentPage', params.date)
  },
  methods: {
    detailsHaveChanged(height) {
      this.currentDetailsHeight(height)
    },
    currentDetailsHeight(height) {
      return height
        ? {
            height: `${height}px`,
          }
        : {
            height: `${200}px`,
          }
    },
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
        class="l-page__carousel"
        :style="currentSlideHeight"
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

.l-page__carousel {
  transition: height $speed-medium $base-easing;

  @include media('<md') {
    margin-top: -#{$half-spacing + $quarter-spacing};
  }
}

.l-page__nav {
  @include media('<md') {
    margin-top: -#{$half-spacing};
  }
}
</style>
