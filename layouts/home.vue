<script>
export default {
  beforeCreate() {
    if (!process.server) {
      this.$homepageRedirect()
    }
  },
}
</script>
<template>
  <div></div>
</template>
