<script>
export default {
  name: 'SvgIcon',
  props: {
    icon: {
      type: [Object, String],
      required: true,
    },
    width: {
      type: String,
      default: '1em',
    },
    height: {
      type: String,
      default: '1em',
    },
  },
}
</script>

<template>
  <svg :viewBox="icon.viewBox" :width="width" :height="height" class="svg-icon">
    <use :xlink:href="icon.url" />
  </svg>
</template>

<style lang="scss">
@import '@theme';

.svg-icon {
  fill: currentColor;
  transition: fill $speed-fastest $base-easing;
}
</style>
