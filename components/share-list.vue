<script>
import { mapState, mapGetters } from 'vuex'
import IconFacebook from '@icons/icon-facebook.svg'
import IconTwitter from '@icons/icon-twitter.svg'
import IconPinterest from '@icons/icon-pinterest.svg'
import IconGithub from '@icons/icon-github.svg'

export default {
  name: 'ShareList',
  props: {
    direction: {
      type: String,
      default: 'horizontal',
    },
  },
  data() {
    return {
      github: 'https://github.com/patrickcate/dutch-art-daily',
      iconFacebook: IconFacebook,
      iconTwitter: IconTwitter,
      iconPinterest: IconPinterest,
      iconGithub: IconGithub,
    }
  },
  computed: {
    ...mapState(['activeId']),
    ...mapGetters(['getArtworkById']),
    artwork() {
      return this.getArtworkById(this.activeId)
    },
    shareDescription() {
      return encodeURI(`${this.artwork.title} by ${this.artwork.artist}`)
    },
    shareImage() {
      return `https%3A//www.dutchartdaily.com/photos/${this.artwork.id}/${this.artwork.id}--xs3-${this.artwork.hash}.jpg`
    },
    facebook() {
      return `https://www.facebook.com/sharer/sharer.php?u=https%3A//www.dutchartdaily.com/${this.artwork.id}`
    },
    twitter() {
      return `https://twitter.com/intent/tweet?url=https%3A//www.dutchartdaily.com/${this.artwork.id}&text=${this.shareDescription}`
    },
    pinterest() {
      return `https://pinterest.com/pin/create/link/?url=https%3A//www.dutchartdaily.com/${this.artwork.id}&media=${this.shareImage}&description=${this.shareDescription}`
    },
  },
}
</script>

<template>
  <ul v-if="artwork" class="share-list" :class="`share-list--${direction}`">
    <li class="share-list__item share-list__item--facebook">
      <a :href="facebook" class="share-list__item-link">
        <span class="u-sr-only">Share on Facebook</span>
        <base-icon
          :icon="iconFacebook"
          class="share-list__icon"
          role="presentation"
        />
      </a>
    </li>
    <li class="share-list__item share-list__item--twitter">
      <a :href="twitter" class="share-list__item-link">
        <span class="u-sr-only">Share on Twitter</span>
        <base-icon
          :icon="iconTwitter"
          class="share-list__icon"
          role="presentation"
        />
      </a>
    </li>
    <li class="share-list__item share-list__item--pinterest">
      <a :href="pinterest" class="share-list__item-link">
        <span class="u-sr-only">Share on Pinterest</span>
        <base-icon
          :icon="iconPinterest"
          class="share-list__icon"
          role="presentation"
        />
      </a>
    </li>
    <li class="share-list__item share-list__item--github">
      <a :href="github" class="share-list__item-link">
        <span class="u-sr-only">Star on GitHub</span>
        <base-icon
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
}

.share-list__icon {
  width: $font-size-lg;
  height: $font-size-lg;
}
</style>
