<script>
import { mapState } from 'vuex'
import {
  formatDate,
  getDateOrdinal,
  getISODate,
  getDateLabel,
} from '@utils/format-date'

export default {
  name: 'ArtDate',
  computed: {
    ...mapState({
      currentDate: 'currentPage',
    }),
    dateLabel() {
      return getDateLabel(this.currentDate)
        ? `${getDateLabel(this.currentDate)},`
        : ''
    },
    todaysMonth() {
      return formatDate(this.currentDate, 'month')
    },
    todaysDay() {
      return formatDate(this.currentDate, 'day')
    },
    dateOrdinal() {
      return getDateOrdinal(Number.parseInt(this.todaysDay, 10))
    },
  },
  mounted() {
    // Loop through all the transition group elements when the component is
    // first mounted, and set their bounding box style properties so they will
    // transition out from/to the correct positions.
    this.$nextTick(function() {
      this.$children[0].$slots.default.forEach(item => {
        if (item.tag) {
          this.setBoundingBox(item.elm)
        }
      })
    })
  },
  methods: {
    setBoundingBox(el) {
      if (process.client) {
        el.style.left = `${el.offsetLeft}px`
        el.style.top = `${el.offsetTop}px`
      }
    },
  },
}
</script>

<template>
  <transition-group
    name="date"
    tag="div"
    class="artwork-date"
    type="transition"
    @enter="setBoundingBox"
    @after-enter="setBoundingBox"
  >
    <span v-if="dateLabel" :key="dateLabel" class="artwork-date__item"
      >{{ dateLabel }}&nbsp;</span
    >
    <span v-if="todaysMonth" :key="todaysMonth" class="artwork-date__item"
      >{{ todaysMonth }}&nbsp;</span
    >
    <span
      v-for="(char, index) in todaysDay"
      :key="char + index"
      class="artwork-date__item artwork-date__char"
      >{{ char }}</span
    >
    <sup :key="dateOrdinal" class="artwork-date__item artwork-date__ordinal">
      {{ dateOrdinal }}
    </sup>
  </transition-group>
</template>

<style lang="scss">
@import '@theme';
$duration: 0.5s;
$distance: 10px;

.artwork-date {
  display: block;
  font-family: $serif-font;
  font-size: $font-size-sm;
  line-height: 1;
  color: set-color(secondary);
  text-align: center;

  @include media('>xxs') {
    font-size: $font-size-md;
  }

  @include media('>sm') {
    font-size: $font-size-lg;
  }
}

.artwork-date__item {
  display: inline-block;
  transition: opacity $duration, transform $duration;
}

.date-enter-active {
  transition: opacity $duration / 2 ease-out, transform $duration / 2 ease-out;
  transition-delay: $duration / 2;
}

.date-leave-active {
  position: absolute;
  transition: opacity $duration ease-in, transform $duration ease-in;
}

.date-enter {
  opacity: 0;
  transform: translate3d(0, -#{$distance, 0});
}

.date-leave-to {
  opacity: 0;
  transform: translate3d(0, $distance, 0);
}

.date-move {
  transition: opacity $duration, transform $duration;
}
</style>
