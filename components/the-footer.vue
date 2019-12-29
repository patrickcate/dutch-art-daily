<script>
export default {
  name: 'TheFooter',
}
</script>

<template>
  <footer class="l-footer" role="contentinfo">
    <small class="l-footer__copyright"
      >All artwork on this site is public domain and freely distributable. All
      uncited code and content is distributed under the MIT license. Feel free
      to
      <a
        href="https://github.com/patrickcate/dutch-art-daily"
        rel="noopener noreferrer external"
        target="_blank"
      >
        view the code</a
      >.
    </small>
  </footer>
</template>

<style lang="scss">
@import '@theme';

.l-footer {
  margin-top: auto;
  text-align: center;
}

.l-footer__copyright {
  font-size: $font-size-xxs;
}
</style>
