<script>
import AppLogo from '@assets/images/logos/logo.svg'
import TheFooter from '@components/the-footer.vue'
import * as artwork from '~/data/01/01-02.json'

export default {
  name: 'ErrorLayout',
  components: {
    TheFooter,
  },
  data() {
    return {
      AppLogo,
      artwork,
    }
  },
  computed: {
    backgroundImage() {
      return {
        backgroundColor: artwork.darkMuted,
        backgroundImage: `url(/photos/01-02/01-02--lqi-${artwork.hash}.jpg)`,
      }
    },
  },
}
</script>

<template>
  <div class="l-page l-page--error">
    <div class="background-stack" :style="backgroundImage">
      <div
        class="background-stack__item background-stack__item--today"
        :style="backgroundImage"
      ></div>
    </div>
    <div class="l-page__content">
      <div class="l-page__header">
        <div>
          <a href="/" rel="home" class="home">
            <base-icon
              :icon="AppLogo"
              width="131px"
              height="50px"
              aria-label="Home"
            />
          </a>
        </div>
      </div>
      <nuxt />
      <the-footer class="l-page__footer" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '@theme';

.home {
  display: inline-block;
}
</style>
