<script>
import ShareList from '@components/share-list.vue'
import IconShare from '@icons/icon-share.svg'

export default {
  name: 'ShareDropdown',
  components: {
    ShareList,
  },
  data() {
    return {
      iconShare: IconShare,
      expanded: false,
    }
  },
  computed: {
    toggleClass() {
      return this.expanded ? 'share-dropdown--is-expanded' : null
    },
  },
  methods: {
    toggleDropdown() {
      this.expanded = !this.expanded
    },
  },
}
</script>

<template>
  <div class="share-dropdown" :class="toggleClass">
    <button
      id="js-share-dropdown__button"
      type="button"
      class="share-dropdown__button"
      aria-haspopup="true"
      :aria-expanded="expanded"
      @click="toggleDropdown"
    >
      <base-icon :icon="iconShare" class="icon" role="presentation" />
      <span class="u-sr-only">Share</span>
    </button>
    <share-list
      class="share-dropdown__list"
      :aria-hidden="!expanded"
      aria-labelledby="js-share-dropdown__button"
      direction="vertical"
    />
  </div>
</template>

<style lang="scss">
@import '@theme';

$size: 300px;

.share-dropdown {
  position: relative;

  &::before {
    position: absolute;
    top: -#{$size / 2};
    right: -#{$size / 2};
    z-index: -1;
    width: $size;
    height: $size;
    content: '';
    background-color: $black;
    filter: blur($spacing);
    border-radius: $size;
    opacity: 1;
    transition: transform $speed-medium $base-easing,
      opacity $speed-medium $base-easing, z-index $speed-medium $base-easing;
    transform: translate(50%, calc(-50% - #{$half-spacing}));
  }

  &.share-dropdown--is-expanded {
    &::before {
      z-index: z-index(base);
      opacity: 0.65;
      transform: translate(0, $half-spacing);
    }
  }
}

.share-dropdown__button {
  position: relative;
  z-index: z-index(jump);
  padding: $quarter-spacing;
  margin-right: -#{$quarter-spacing};
  font-size: $font-size-lg;
  background: none;
}

.share-dropdown__list {
  position: absolute;
  top: $half-spacing + $quarter-spacing;
  right: 0;
  z-index: -1;
  display: flex;
  align-items: center;
  margin-right: 0;
  opacity: 0;
  transition: transform $speed-slow $base-easing,
    opacity $speed-slow $base-easing, z-index $speed-slow $base-easing;
}

.share-dropdown--is-expanded {
  .share-dropdown__list {
    z-index: z-index(step);
    opacity: 1;
    transform: translateY(0);

    .share-list__item--facebook {
      transform: translate(-#{$spacing * 3.75}, -#{$half-spacing});
    }

    .share-list__item--twitter {
      transform: translate(-#{$spacing * 2.75}, $spacing + $quarter-spacing);
    }

    .share-list__item--pinterest {
      transform: translate(-#{$spacing * 1.25}, $spacing * 2.75);
    }

    .share-list__item--github {
      transform: translate($quarter-spacing, $spacing * 4);
    }
  }
}
</style>
