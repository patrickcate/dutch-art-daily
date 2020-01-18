<script>
import { mapState } from 'vuex'
import ArtDetailsList from '@components/art-details-list'
import SwiperCarousel from '@components/swiper-carousel'

export default {
  name: 'ArtDetails',
  components: {
    ArtDetailsList,
    SwiperCarousel,
  },
  computed: mapState(['slides']),
}
</script>

<template>
  <swiper-carousel class="details-list" name="details">
    <li
      v-for="slide in slides"
      :key="slide.id"
      class="details-list__item swiper-slide"
    >
      <div class="art-details">
        <div class="art-details__name">
          <h2 class="art-details__title">{{ slide.title }}</h2>
          <h3 class="art-details__artist"><em>by</em> {{ slide.artist }}</h3>
        </div>
        <art-details-list :art="slide" />
      </div>
    </li>
  </swiper-carousel>
</template>

<style lang="scss">
@import '@theme';

.art-details {
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

.art-details__title {
  margin-bottom: $quarter-spacing;
  font-family: $serif-font;
  font-size: $font-size-lg-alt;
  font-style: italic;
  color: set-color(secondary);

  @include media('>xs') {
    font-size: $font-size-xl;
  }
}

.art-details__artist {
  margin-bottom: $spacing;
  font-family: $serif-font;
}
</style>
