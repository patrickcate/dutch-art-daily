<script>
export default {
  name: 'ArtImage',
  props: {
    id: {
      type: String,
      required: true,
    },
    alt: {
      type: String,
      required: true,
    },
  },
  computed: {
    image() {
      return this.$store.getters.getArtById(this.id)
    },
    srcSet() {
      const imageWidths = this.$store.state.imageWidths
      const imageSizes = Object.keys(imageWidths)
      const srcset = imageSizes.reduce((accumulator, size) => {
        if (this.image[size]) {
          accumulator.push(
            `/photos/${this.id}/${this.id}--${size}-${this.image.hash}.jpg` +
              ` ${this.image[size].width}w`
          )
        }

        return accumulator
      }, [])

      return srcset.join(', ')
    },
    srcSizes() {
      return `(min-height: 700px) calc((${this.image.width} / ${this.image.height}) * (100vh - 280px)), calc((${this.image.width} / ${this.image.height}) * 100vh), 100vw`
    },
    currentPage() {
      return this.$store.state.currentPage
    },
    currentHeight() {
      return this.$store.currentHeight
    },
  },
  methods: {
    imageHasLoaded() {
      this.$store.commit('SET_LOADED_SLIDES', this.id)
      this.updateImageHeight()
    },
    updateImageHeight() {
      if (this.currentPage === this.id) {
        const slideHeight = this.$el.parentNode.scrollHeight

        if (slideHeight && slideHeight !== this.currentHeight) {
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
      :data-src="`/photos/${id}/${id}--xs3-${image.hash}.jpg`"
      :data-srcset="srcSet"
      :data-sizes="srcSizes"
      :alt="alt"
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
