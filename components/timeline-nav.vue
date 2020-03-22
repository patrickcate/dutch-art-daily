<script>
import { mapState } from 'vuex'
import TimelineNavItem from '@components/timeline-nav-item.vue'

export default {
  name: 'TimelineNav',
  components: {
    TimelineNavItem,
  },
  computed: {
    ...mapState(['slides', 'paginationNumber']),
  },
  beforeMount() {
    this.$store.dispatch('updatePaginationNumber')
  },
}
</script>

<template>
  <div class="timeline-nav">
    <base-carousel
      class="timeline-wrapper"
      name="timeline"
      :slide-number="paginationNumber"
    >
      <timeline-nav-item
        v-for="slide in slides"
        :id="slide.id"
        :key="slide.id"
        class="timeline-nav__list-item"
      />
    </base-carousel>
  </div>
</template>

<style lang="scss">
@import '@theme';

$segment-width: 4px;

.timeline-nav {
  width: calc(100% - 88px);

  @include media('>xs') {
     width: calc(100% - 96px);
  }

  @include media('>max-width') {
    max-width: $max-width;
  }
}

.timeline-nav__list {
  display: flex;
  align-items: center;
  justify-content: stretch;
  max-width: 100%;
}

.timeline-nav__list-item {

  &::after {
    position: absolute;
    display: block;
    align-self: flex-end;
    width: calc(100% - #{$half-spacing + $quarter-spacing});
    height: $segment-width;
    content: '';
    background-color: $white;
    transform: translate(
      -50%,
      -#{px($spacing * 1.75))}
    );
  }

  &:first-of-type {
    &::after {
      content: none;
    }
  }

  &.swiper-slide-active {
    &::after {
      background-image: linear-gradient(
        to left,
        set-color(secondary) 0%,
        set-color(secondary) 50%,
        $white
      );
    }

    &:not(:last-of-type) {
      + .timeline-nav__list-item {
        &::after {
          background-image: linear-gradient(
            to right,
            set-color(secondary) 0%,
            set-color(secondary) 50%,
            $white
          );
        }
      }
    }
  }

}
</style>
