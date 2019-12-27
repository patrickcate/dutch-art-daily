<script>
import SvgIcon from '@components/svg-icon.vue'
import AppLogo from '@assets/images/logos/logo.svg'
import AppLogoCondensed from '@assets/images/logos/logo-sm.svg'

export default {
  name: 'TheLogo',
  components: {
    SvgIcon,
  },
  data() {
    return {
      AppLogo,
      AppLogoCondensed,
    }
  },
}
</script>

<template>
  <div>
    <a href="/" rel="home" class="home" @click.prevent="$homepageRedirect()">
      <svg-icon :icon="AppLogo" class="logo" aria-label="Home" />
      <svg-icon :icon="AppLogoCondensed" class="logo-sm" aria-label="Home" />
    </a>
  </div>
</template>

<style lang="scss" scoped>
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
