<script>
import { dateId, generateDateList } from '@utils/format-date'
import TheHeader from '@components/the-header'
import TheFooter from '@components/the-footer'
import PageBackgrounds from '@components/page-backgrounds'

export default {
  components: {
    TheHeader,
    TheFooter,
    PageBackgrounds,
  },
  computed: {
    id() {
      return this.$store.state.currentPage
    },
    background() {
      const artwork = this.$store.getters.getArtById(this.id)

      return artwork
        ? {
            backgroundColor: artwork.darkMuted,
            backgroundImage: `url('/photos/${artwork.id}/${artwork.id}--lqi-${artwork.hash}.jpg')`,
          }
        : null
    },
  },
  created() {
    // Set a swipers object to store the individual swiper references.
    this.$root.swipers = {}

    // Set the inital page id to the current page.
    if (!this.$store.state.currentPage) {
      this.$store.dispatch('setCurrentPage', this.$route.params.date)
    }
  },
}
</script>

<template>
  <div class="l-page">
    <page-backgrounds
      v-if="background"
      class="l-page__bg"
      :style="background"
    />
    <div class="l-page__content">
      <the-header class="l-page__header" />
      <nuxt />
      <the-footer v-once class="l-page__footer" />
    </div>
  </div>
</template>

<style lang="scss">
@import '@theme';

.l-page__bg {
  background-position: center;
}
</style>
