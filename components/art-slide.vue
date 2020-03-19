<script>
import ArtImage from '@components/art-image.vue'

export default {
  name: 'ArtSlide',
  components: {
    ArtImage,
  },
  props: {
    artwork: {
      type: Object,
      required: true,
    },
  },
}
</script>

<template>
  <li class="carousel__list-item">
    <div
      class="carousel__slide"
      :class="`carousel__slide--${artwork.orientation}`"
    >
      <art-image
        :id="artwork.id"
        :class="`artwork--${artwork.orientation}`"
        class="carousel__slide-image"
      />
    </div>
  </li>
</template>

<style lang="scss">
@import '@theme';

.carousel__list-item {
  height: auto;
}

.carousel__slide {
  padding: #{$spacing + $quarter-spacing} 0;
}

.carousel__slide-image {
  margin: 0 $spacing;
}

@include media('>md') {
  .carousel__slide {
    grid-template-rows: 1fr;
    grid-template-columns: minmax(min-content, 34%) auto;
    grid-gap: $spacing;
    padding: $spacing 0;
    margin-right: auto;
    margin-left: auto;
  }

  .carousel__slide-image {
    grid-row: 1 / 2;
    grid-column: 2 / 3;
  }
}

@include media('>max-width') {
  .carousel__slide {
    max-width: $max-width;
  }

  .carousel__slide-image,
  .carousel__slide-details {
    margin: 0;
  }
}
</style>
