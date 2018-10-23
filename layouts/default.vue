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
    backgroundColor() {
      const artwork = this.$store.getters.getArtById(this.id)

      return artwork
        ? {
            backgroundColor: artwork.darkMuted,
          }
        : null
    },
  },
  created() {
    // Set a swipers object to store the individual swiper references.
    this.$root.swipers = {}

    // Set the inital page id to the current page.
    this.$store.commit('SET_CURRENT_PAGE', this.$route.params.date)
  },
}
</script>

<template>
  <div class="l-page">
    <page-backgrounds
      v-if="backgroundColor"
      class="l-page__bg"
      :style="backgroundColor"
    />
    <div class="l-page__content">
      <the-header class="l-page__header" />
      <nuxt />
      <the-footer v-once class="l-page__footer" />
    </div>
  </div>
</template>
