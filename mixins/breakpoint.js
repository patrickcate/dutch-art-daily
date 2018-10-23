export default {
  computed: {
    breakpoint() {
      if (process.client) {
        return this.$screen
      }
      return false
    },
  },
}
