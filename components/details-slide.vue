<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import DetailsList from '@components/details-list.vue'

export default {
  name: 'DetailsSlide',
  components: {
    DetailsList,
  },
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  computed: {
    ...mapState(['activeId']),
    ...mapGetters(['getArtworkById']),
    artwork() {
      return this.getArtworkById(this.id)
    },
  },
  watch: {
    activeId: {
      immediate: true,
      handler() {
        this.$nextTick(() => {
          if (this.$refs.details && this.id === this.activeId) {
            this.updateCurrentDetailsHeight(this.$refs.details.scrollHeight)
          }
        })
      },
    },
  },
  methods: {
    ...mapActions(['updateCurrentDetailsHeight']),
  },
}
</script>

<template>
  <li v-if="artwork">
    <div ref="details" class="js-details-slide details-slide">
      <div>
        <h2 class="details-slide__title">{{ artwork.title }}</h2>
        <h3 class="details-slide__artist"><em>by</em> {{ artwork.artist }}</h3>
      </div>
      <details-list :id="id" />
    </div>
  </li>
</template>

<style lang="scss">
@import '@theme';

.details-slide {
  display: grid;
  max-width: $max-width;
  padding: 0 $spacing;

  @include media('>md') {
    grid-template-columns: 1fr 1fr;
    grid-gap: $spacing;
  }

  @include media('>lg') {
    grid-template-columns: 1fr 1fr;
    grid-gap: $spacing;
  }

  @include media('>max-width') {
    margin-right: auto;
    margin-left: auto;
  }
}

.details-slide__title {
  margin-bottom: $quarter-spacing;
  font-family: $serif-font;
  font-size: $font-size-lg-alt;
  font-style: italic;
  color: set-color(secondary);

  @include media('>xs') {
    font-size: $font-size-xl;
  }
}

.details-slide__artist {
  margin-bottom: $spacing;
  font-family: $serif-font;
}
</style>
