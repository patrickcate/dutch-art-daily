<script>
import { mapState, mapGetters } from 'vuex'
import DetailsList from '@components/details-list'
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
    ...mapState(['currentPage']),
    ...mapGetters(['getArtworkById']),
    artwork() {
      return this.getArtworkById(this.id)
    },
  },
  watch: {
    currentPage: {
      immediate: true,
      handler() {
        this.$nextTick(() => {
          if (this.$el && this.id === this.currentPage) {
            this.$emit(
              'details-have-changed',
              this.$el.childNodes[0].scrollHeight
            )
          }
        })
      },
    },
  },
}
</script>

<template>
  <li v-if="artwork">
    <div class="details">
      <div>
        <h2 class="details__title">{{ artwork.title }}</h2>
        <h3 class="details__artist"><em>by</em> {{ artwork.artist }}</h3>
      </div>
      <details-list :id="id" />
    </div>
  </li>
</template>

<style lang="scss">
@import '@theme';

.details {
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

.details__title {
  margin-bottom: $quarter-spacing;
  font-family: $serif-font;
  font-size: $font-size-lg-alt;
  font-style: italic;
  color: set-color(secondary);

  @include media('>xs') {
    font-size: $font-size-xl;
  }
}

.details__artist {
  margin-bottom: $spacing;
  font-family: $serif-font;
}
</style>
