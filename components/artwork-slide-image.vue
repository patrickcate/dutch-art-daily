<script>
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  name: 'ArtworkSlideImage',
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      imageWidths: {
        xs3: 640,
        xs2: 800,
        xs: 960,
        sm: 1120,
        md: 1280,
        lg: 1440,
        xl: 1600,
        xl2: 1760,
        xl3: 1920,
      },
    }
  },
  computed: {
    ...mapState(['activeId', 'currentArtworkHeight']),
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
    ...mapActions(['updateCurrentArtworkHeight', 'updateLoadedSlides']),
    imageHasLoaded() {
      this.updateLoadedSlides(this.id)
      this.updateImageHeight()
    },
    updateImageHeight() {
      if (this.activeId === this.id) {
        const slideHeight = this.$el.parentNode.scrollHeight

        if (slideHeight && slideHeight !== this.currentArtworkHeight) {
          this.updateCurrentArtworkHeight(this.$el.parentNode.scrollHeight)
        }
      }
    },
  },
}
</script>
<template>
  <div class="artwork-image-frame">
    <img
      :data-src="lazySrc"
      :data-srcset="srcSet"
      :data-sizes="srcSizes"
      :alt="altText"
      class="artwork-image swiper-lazy"
      @load="imageHasLoaded"
    />
  </div>
</template>

<style lang="scss">
@import '@theme';
// TODO: Update component class.
.artwork-image-frame {
  position: relative;
}

.artwork-image {
  display: block;
  max-height: 100vh;
  margin: 0 auto;
  box-shadow: $drop-shadow;

  @include media('height>md') {
    max-height: calc(100vh - 280px);
  }
}
</style>
