<script>
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'ArtImage',
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  computed: {
    ...mapState(['currentPage', 'currentHeight', 'imageWidths']),
    ...mapGetters(['getArtworkById']),
    artwork() {
      return this.getArtworkById(this.id)
    },
    altText() {
      return `${this.artwork.artist}'s painting: ${this.artwork.title}`
    },
    lazySrc() {
      return `/photos/${this.id}/${this.id}--xs3-${this.artwork.hash}.jpg`
    },
    srcSet() {
      const imageSizes = Object.keys(this.imageWidths)
      const srcset = imageSizes.reduce((accumulator, size) => {
        if (this.artwork[size]) {
          accumulator.push(
            `/photos/${this.id}/${this.id}--${size}-${this.artwork.hash}.jpg` +
              ` ${this.artwork[size].width}w`
          )
        }

        return accumulator
      }, [])

      return srcset.join(', ')
    },
    srcSizes() {
      return `(min-height: 700px) calc((${this.artwork.width} / ${this.artwork.height}) * (100vh - 280px)), calc((${this.artwork.width} / ${this.artwork.height}) * 100vh), 100vw`
    },
  },
  methods: {
    imageHasLoaded() {
      // TODO: Refactor to use mapMutations.
      this.$store.commit('SET_LOADED_SLIDES', this.id)
      this.updateImageHeight()
    },
    updateImageHeight() {
      if (this.currentPage === this.id) {
        const slideHeight = this.$el.parentNode.scrollHeight

        if (slideHeight && slideHeight !== this.currentHeight) {
          // TODO: Refactor to use mapMutations.
          this.$store.commit(
            'SET_CURRENT_HEIGHT',
            this.$el.parentNode.scrollHeight
          )
        }
      }
    },
  },
}
</script>
<template>
  <div class="art-image-frame">
    <img
      :data-src="lazySrc"
      :data-srcset="srcSet"
      :data-sizes="srcSizes"
      :alt="altText"
      class="art-image swiper-lazy"
      @load="imageHasLoaded"
    />
  </div>
</template>

<style lang="scss">
@import '@theme';

.art-image-frame {
  position: relative;
}

.art-image {
  display: block;
  max-height: 100vh;
  margin: 0 auto;
  box-shadow: $drop-shadow;

  @include media('height>md') {
    max-height: calc(100vh - 280px);
  }
}
</style>
