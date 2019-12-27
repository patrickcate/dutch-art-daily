<script>
import {
  dateId,
  dateShort,
  getISODate,
  getDateLabel,
  dateArray,
} from '@utils/format-date'
import breakpoint from '@mixins/breakpoint'

export default {
  name: 'TimelineNavItem',
  mixins: [breakpoint],
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  computed: {
    date() {
      return dateArray(this.id)
    },
    dateLabel() {
      return getDateLabel(this.id)
    },
    isoDate() {
      return getISODate(this.id)
    },
  },
  methods: {
    toSlide() {
      if (this.$store.state.currentPage !== this.id) {
        this.$root.swipers.carousel.slideTo(
          this.$store.getters.getSlideIndexById(this.id)
        )
      }
    },
  },
}
</script>

<template>
  <li class="timeline-nav__list-item">
    <button type="button" class="line-segment" @click="toSlide()">
      <div class="line-segment__accent"></div>
      <div class="line-segment__point"></div>
      <div class="line-segment__label">
        <span class="u-sr-only">Go to </span>
        <span v-if="dateLabel && breakpoint.md" class="line-segment__prefix">{{
          dateLabel
        }}</span>
        <span v-else>{{ date[0] }}/{{ date[1] }}</span>
        <span class="u-sr-only"> slide</span>
      </div>
    </button>
  </li>
</template>

<style lang="scss" scoped>
@import '@theme';
$segment-width: 4px;

.line-segment {
  z-index: z-index(nudge);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: stretch;
  height: 100%;
  margin: 0 auto;
  font-style: normal;
  text-decoration: none;
  transition: color $speed-slow ease, transform $speed-slow ease;

  &:hover {
    .line-segment__accent {
      transform: scaleY(0.5);
    }
  }
}

.line-segment__label {
  margin-bottom: $quarter-spacing;
}

.line-segment__point {
  width: $half-spacing + $eighth-spacing;
  height: $half-spacing + $eighth-spacing;
  border: $segment-width solid $white;
  border-radius: $spacing * 5;
  transition: border-color $speed-slow ease;
}

.line-segment__accent {
  width: $segment-width;
  height: $spacing;
  background-color: $white;
  transition: background-color $speed-slow ease, transform $speed-slow ease;
  transform: scaleY(0);
  transform-origin: bottom center;
}

.swiper-slide-active {
  .line-segment {
    color: set-color(secondary);
    transform: translateY(0);
  }

  .line-segment__point {
    border-color: set-color(secondary);
  }

  .line-segment__accent {
    background-color: set-color(secondary);
    transform: scaleY(1);
  }

  &:hover {
    .line-segment__accent {
      transform: scaleY(1);
    }
  }
}

.line-segment__accent--is-active {
  flex: 1;
  background-color: set-color(secondary);
}
</style>
