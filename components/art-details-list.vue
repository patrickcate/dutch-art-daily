<script>
import SvgIcon from '@components/svg-icon'
import IconDate from '@icons/icon-date.svg'
import IconMedium from '@icons/icon-medium.svg'
import IconSize from '@icons/icon-size.svg'
import IconLocation from '@icons/icon-location.svg'
import IconLink from '@icons/icon-link.svg'

export default {
  name: 'ArtDetailsList',
  components: {
    SvgIcon,
  },
  props: {
    art: {
      type: Object,
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
    artDate() {
      return this.art.art_date.replace('-', String.fromCharCode(0x2013))
    },
  },
}
</script>

<template>
  <ul v-if="art" class="list art-details__list">
    <li v-if="artDate" class="art-details__list-item">
      <svg-icon
        :icon="iconDate"
        class="art-details__icon"
        role="presentation"
      />
      <span><span class="u-sr-only">Date:</span> {{ artDate }}</span>
    </li>
    <li v-if="art.art_medium" class="art-details__list-item">
      <svg-icon
        :icon="iconMedium"
        class="art-details__icon"
        role="presentation"
      />
      <span
        ><span class="u-sr-only">Medium:</span> {{ art.art_medium
        }}<span v-if="art.art_surface"> on {{ art.art_surface }}</span></span
      >
    </li>
    <li v-if="art.art_height || art.art_width" class="art-details__list-item">
      <svg-icon
        :icon="iconSize"
        class="art-details__icon"
        role="presentation"
      />
      <span>
        <span class="u-sr-only">Size:</span> {{ art.art_height }}
        <abbr title="centimeters">cm</abbr>
        <span aria-hidden="true">&times;</span>
        <span class="u-sr-only">by</span> {{ art.art_width }}
        <abbr title="centimeters">cm</abbr>
      </span>
    </li>
    <li v-if="art.art_location" class="art-details__list-item">
      <svg-icon
        :icon="iconLocation"
        class="art-details__icon"
        role="presentation"
      />
      <span>
        <span class="u-sr-only">Location:</span> {{ art.art_location }}
      </span>
    </li>
    <li v-if="art.cite_url" class="art-details__list-item">
      <svg-icon
        :icon="iconLink"
        class="art-details__icon"
        role="presentation"
      />
      <span>
        <span class="u-sr-only">Source:</span> {{ art.cite_author }}:
        <a
          :href="art.cite_url"
          target="_blank"
          rel="noopener noreferrer external"
        >
          {{ art.title }}
        </a>
      </span>
    </li>
  </ul>
</template>

<style lang="scss">
@import '@theme';

.art-details__list {
  padding: 0;
  list-style: none;
}

.art-details__list-item {
  display: flex;
  margin-bottom: $quarter-spacing;
}

.art-details__icon {
  margin-top: $quarter-spacing - $quarter-spacing / 3;
  margin-right: $quarter-spacing;
}
</style>
