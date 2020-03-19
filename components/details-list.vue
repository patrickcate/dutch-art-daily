<script>
import { mapGetters } from 'vuex'
import SvgIcon from '@components/svg-icon.vue'
import IconDate from '@icons/icon-date.svg'
import IconMedium from '@icons/icon-medium.svg'
import IconSize from '@icons/icon-size.svg'
import IconLocation from '@icons/icon-location.svg'
import IconLink from '@icons/icon-link.svg'

export default {
  name: 'DetailsList',
  components: {
    SvgIcon,
  },
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      iconDate: IconDate,
      iconMedium: IconMedium,
      iconSize: IconSize,
      iconLocation: IconLocation,
      iconLink: IconLink,
    }
  },
  computed: {
    ...mapGetters(['getArtworkById']),
    artwork() {
      return this.getArtworkById(this.id)
    },
    artDate() {
      return this.artwork.art_date.replace('-', String.fromCharCode(0x2013))
    },
  },
}
</script>

<template>
  <ul v-if="artwork" class="details-list">
    <li v-if="artDate" class="details-list__item">
      <svg-icon
        :icon="iconDate"
        class="details-list__icon"
        role="presentation"
      />
      <span><span class="u-sr-only">Date:</span> {{ artDate }}</span>
    </li>
    <li v-if="artwork.art_medium" class="details-list__item">
      <svg-icon
        :icon="iconMedium"
        class="details-list__icon"
        role="presentation"
      />
      <span
        ><span class="u-sr-only">Medium:</span> {{ artwork.art_medium
        }}<span v-if="artwork.art_surface">
          on {{ artwork.art_surface }}</span
        ></span
      >
    </li>
    <li
      v-if="artwork.art_height || artwork.art_width"
      class="details-list__item"
    >
      <svg-icon
        :icon="iconSize"
        class="details-list__icon"
        role="presentation"
      />
      <span>
        <span class="u-sr-only">Size:</span> {{ artwork.art_height }}
        <abbr title="centimeters">cm</abbr>
        <span aria-hidden="true">&times;</span>
        <span class="u-sr-only">by</span> {{ artwork.art_width }}
        <abbr title="centimeters">cm</abbr>
      </span>
    </li>
    <li v-if="artwork.art_location" class="details-list__item">
      <svg-icon
        :icon="iconLocation"
        class="details-list__icon"
        role="presentation"
      />
      <span>
        <span class="u-sr-only">Location:</span> {{ artwork.art_location }}
      </span>
    </li>
    <li v-if="artwork.cite_url" class="details-list__item">
      <svg-icon
        :icon="iconLink"
        class="details-list__icon"
        role="presentation"
      />
      <span>
        <span class="u-sr-only">Source:</span> {{ artwork.cite_author }}:
        <a
          :href="artwork.cite_url"
          target="_blank"
          rel="noopener noreferrer external"
        >
          {{ artwork.title }}
        </a>
      </span>
    </li>
  </ul>
</template>

<style lang="scss">
@import '@theme';

.details-list {
  padding: 0;
  list-style: none;
}

.details-list__item {
  display: flex;
  margin-bottom: $quarter-spacing;
}

.details-list__icon {
  margin-top: $quarter-spacing - $quarter-spacing / 3;
  margin-right: $quarter-spacing;
}
</style>
