<script>
import * as artwork from '~/data/01/01-02.json'

export default {
  name: 'ErrorPage',
  layout: 'error-layout',
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      artwork,
    }
  },
  computed: {
    errorImage() {
      return this.artwork
        ? `/photos/01-02/01-02--xs3-${artwork.hash}.jpg`
        : null
    },
  },
  head() {
    return {
      title: 'Page not found | Dutch Art Daily',
    }
  },
}
</script>

<template>
  <div class="error">
    <h1 v-if="error && error.statusCode === 404" class="error__header">
      Oops, looks like that page is not found.
    </h1>
    <h1 v-else class="error__header">Oops, an error occurred</h1>
    <h2 class="error__subheader">Maybe someone was sleeping on the job?</h2>

    <div v-if="errorImage" class="artwork-image-frame artwork--portrait">
      <img
        alt="Nicolaes Maes's painting: The Idle Servant"
        class="artwork-image error__image"
        :src="errorImage"
      />
    </div>

    <p class="error__message">
      You'll have better luck
      <a href="/" rel="home">going to the Homepage</a>
    </p>
  </div>
</template>

<style lang="scss" scoped>
@import '@theme';

.error {
  display: block;
  padding: $spacing;
  margin: 0 auto;
  text-align: center;
}

.error__header {
  display: block;
  margin-bottom: $spacing;
  font-family: $serif-font;
  font-size: $font-size-lg-alt;
  color: set-color(secondary);

  @include media('>xs') {
    font-size: $font-size-xl;
  }
}

.error__subheader {
  margin-bottom: $spacing;
  font-family: $serif-font;
}

.error__image {
  @include media('>xs') {
    max-width: em(320px);
  }

  @include media('>md') {
    max-width: em(480px);
  }
}

.error__message {
  margin-top: $spacing;
  font-size: $font-size-md;
}
</style>
