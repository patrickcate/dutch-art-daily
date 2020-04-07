<script>
import { mapState, mapActions } from 'vuex'
import TheHeader from '@components/the-header.vue'
import TheFooter from '@components/the-footer.vue'
import BackgroundStack from '@components/background-stack.vue'

export default {
  name: 'DefaultLayout',
  components: {
    TheHeader,
    TheFooter,
    BackgroundStack,
  },
  computed: {
    ...mapState({
      activeId: 'activeId',
    }),
    routeDate() {
      return this.$route.params.date
    },
  },
  created() {
    // Set a swipers object to store the individual swiper references.
    if (!this.$root.swipers) {
      this.$root.swipers = {}
    }

    // Set the inital page activeId to the current page.
    if (!this.activeId && this.routeDate) {
      this.updateCurrentPage(this.routeDate)
    }
  },
  methods: {
    ...mapActions(['updateCurrentPage']),
  },
}
</script>

<template>
  <div class="l-page">
    <background-stack />
    <div class="l-page__content">
      <the-header class="l-page__header" />
      <nuxt :key="routeDate" />
      <the-footer class="l-page__footer" />
    </div>
  </div>
</template>

<style lang="scss">
@import '@theme';

.l-page {
  overflow: hidden;
}

.l-page__content {
  position: relative;
  z-index: z-index(nudge);
  display: grid;
  grid-template-rows: repeat(4, min-content);
  grid-template-columns: 100%;
}

.l-page__header {
  margin: $half-spacing $spacing 0 $spacing;
}

.l-page__footer {
  position: relative;
  z-index: z-index(step);
  margin: 0 $spacing $spacing $spacing;
}

@include media('>max-width') {
  .l-page__header,
  .l-page__footer {
    width: 100%;
    max-width: $max-width;
    margin-right: auto;
    margin-left: auto;
  }
}
</style>
