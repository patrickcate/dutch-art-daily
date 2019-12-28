<script>
import TheLogo from '@components/the-logo'
import ArtDate from '@components/art-date'
import ShareList from '@components/share-list'
import ShareDropdown from '@components/share-dropdown'
import breakpoint from '@mixins/breakpoint'

export default {
  name: 'TheHeader',
  components: {
    TheLogo,
    ArtDate,
    ShareDropdown,
    ShareList,
  },
  mixins: [breakpoint],
}
</script>

<template>
  <header class="header" role="banner">
    <the-logo class="header__branding" />
    <h1 class="header__date"><art-date /></h1>
    <share-list v-show="breakpoint && breakpoint.md" class="header__share" />
    <share-dropdown
      v-show="breakpoint && !breakpoint.md"
      class="header__share"
    />
  </header>
</template>

<style lang="scss">
@import '@theme';

.header {
  position: relative;
  z-index: z-index(fixed);
  display: grid;
  grid-template-columns: 50px 2fr 50px;

  @include media('>sm') {
    grid-template-columns: 1fr 2fr 1fr;
  }
}

.header__share {
  margin-left: auto;
}

.header__date {
  padding-top: $quarter-spacing;
}
</style>
