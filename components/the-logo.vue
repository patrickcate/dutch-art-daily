<script>
import { mapGetters } from 'vuex'
import { dateId } from '@utils/format-date.js'
import AppLogo from '@assets/images/logos/logo.svg'
import AppLogoCondensed from '@assets/images/logos/logo-sm.svg'

export default {
  name: 'TheLogo',
  data() {
    return {
      AppLogo,
      AppLogoCondensed,
    }
  },
  computed: {
    ...mapGetters(['getSlideIndexById']),
  },
  methods: {
    today() {
      const today = dateId(new Date())

      if (this.getSlideIndexById(today) >= 0) {
        this.$root.swipers.carousel.slideTo(6)
      } else {
        this.$router.push(today ? `/${today}` : '/')
      }
    },
  },
}
</script>

<template>
  <div>
    <a href="/" rel="home" class="home" @click.prevent="today">
      <base-icon
        :icon="AppLogo"
        class="logo"
        role="presentation"
        focusable="false"
        aria-hidden="true"
      />
      <base-icon
        :icon="AppLogoCondensed"
        class="logo-sm"
        role="presentation"
        focusable="false"
        aria-hidden="true"
      />
      <span class="u-sr-only">Home</span>
    </a>
  </div>
</template>

<style lang="scss">
@import '@theme';

.home {
  display: inline-block;
}

.logo {
  display: none;
  width: 131px;
  height: 50px;

  @include media('>sm') {
    display: block;
  }
}

.logo-sm {
  display: inline-block;
  width: 39px;
  height: 39px;

  @include media('>sm') {
    display: none;
  }
}
</style>
