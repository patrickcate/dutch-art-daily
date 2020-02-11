<script>
import { dateId, generateDateList } from '@utils/format-date'
import { mapState } from 'vuex'
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
    ...mapState({
      activeId: 'currentPage',
    }),
    routeDate() {
      return this.$route.params.date
    },
  },
  created() {
    // Set a swipers object to store the individual swiper references.
    this.$root.swipers = {}

    // Set the inital page activeId to the current page.
    if (!this.activeId) {
      this.$store.dispatch('setCurrentPage', this.routeDate)
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
      <nuxt :key="routeDate" />
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
