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
      return `(orientation: portrait and min-aspect-ratio: ${this.image.width}/${this.image.height}) calc((${this.image.width} / ${this.image.height}) * (100vh - 250px)), 100vw`
    },
  },
}
</script>
<template>
  <div class="art-image-frame swiper-zoom-container">
    <img
      :src="`/photos/${id}/${id}--xs3-${image.hash}.jpg`"
      :srcset="srcSet"
      :sizes="srcSizes"
      :alt="alt"
      class="art-image"
    />
  </div>
</template>

<style lang="scss" scoped>
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
    max-height: calc(100vh - 200px);
  }
}
</style>
