<script>
import SvgIcon from '@components/svg-icon.vue'
import IconFacebook from '@icons/icon-facebook.svg'
import IconTwitter from '@icons/icon-twitter.svg'
import IconPinterest from '@icons/icon-pinterest.svg'
import IconGithub from '@icons/icon-github.svg'

export default {
  name: 'ShareList',
  components: {
    SvgIcon,
  },
  props: {
    direction: {
      type: String,
      default: 'horizontal',
    },
  },
  data() {
    return {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=https%3A//www.dutchartdaily.com/${this.$store.state.currentPage}`,
      twitter: `https://twitter.com/home?status=https%3A//www.dutchartdaily.com/${this.$store.state.currentPage}`,
      pinterest: `https://pinterest.com/pin/create/button/?url=&media=https%3A//www.dutchartdaily.com/${this.$store.state.currentPage}`,
      github: 'https://github.com/patrickcate/dutch-art-daily',
      iconFacebook: IconFacebook,
      iconTwitter: IconTwitter,
      iconPinterest: IconPinterest,
      iconGithub: IconGithub,
    }
  },
}
</script>

<template>
  <ul class="share-list" :class="`share-list--${direction}`">
    <li class="share-list__item share-list__item--facebook">
      <a :href="facebook" class="share-list__item-link">
        <span class="u-sr-only">Share on Facebook</span>
        <svg-icon
          :icon="iconFacebook"
          class="share-list__icon"
          role="presentation"
        />
      </a>
    </li>
    <li class="share-list__item share-list__item--twitter">
      <a :href="twitter" class="share-list__item-link">
        <span class="u-sr-only">Share on Twitter</span>
        <svg-icon
          :icon="iconTwitter"
          class="share-list__icon"
          role="presentation"
        />
      </a>
    </li>
    <li class="share-list__item share-list__item--pinterest">
      <a :href="pinterest" class="share-list__item-link">
        <span class="u-sr-only">Share on Pinterest</span>
        <svg-icon
          :icon="iconPinterest"
          class="share-list__icon"
          role="presentation"
        />
      </a>
    </li>
    <li class="share-list__item share-list__item--github">
      <a :href="github" class="share-list__item-link">
        <span class="u-sr-only">Star on GitHub</span>
        <svg-icon
          :icon="iconGithub"
          class="share-list__icon"
          role="presentation"
        />
      </a>
    </li>
  </ul>
</template>

<style lang="scss">
@import '@theme';

.share-list {
  display: flex;
  padding: 0;
  margin-top: $half-spacing;
  list-style: none;
}

.share-list__item-link {
  display: block;
}

.share-list--vertical {
  flex-direction: column;
  padding: $quarter-spacing;
  padding-top: 0;
  margin-top: 0;

  .share-list__item {
    position: absolute;
    top: 0;
    right: 0;
    transition: transform $speed-medium $base-easing,
      opacity $speed-medium $base-easing, z-index $speed-medium $base-easing;
    transform: translate(0, 0);
  }

  // .share-list__item--facebook {
  //   transform: translate(-#{$spacing * 3.75}, -#{$half-spacing});
  // }

  // .share-list__item--twitter {
  //   transform: translate(-#{$spacing * 2.75}, $spacing + $quarter-spacing);
  // }

  // .share-list__item--pinterest {
  //   transform: translate(-#{$spacing * 1.25}, $spacing * 2.75);
  // }

  // .share-list__item--github {
  //   transform: translate($quarter-spacing, $spacing * 4);
  // }

  .share-list__icon {
    width: $font-size-xl;
    height: $font-size-xl;
  }
}

.share-list--horizontal {
  .share-list__item {
    &:not(:last-child) {
      margin-right: $half-spacing;
    }
  }

  // .share-list__item-link {
  //   padding: $half-spacing 0 0 0;
  // }

  // .share-list__item {
  //   &:first-child {
  //     .share-list__item-link {
  //       padding-left: 0;
  //     }
  //   }

  //   &:last-child {
  //     .share-list__item-link {
  //       padding-right: 0;
  //     }
  //   }
  // }
}

.share-list__icon {
  width: $font-size-lg;
  height: $font-size-lg;
}
</style>
