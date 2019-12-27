<script>
export default {
  layout: 'home',
  head() {
    return {
      title: 'Dutch Art Daily',
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        {
          hid: 'description',
          name: 'description',
          content: 'A new Dutch Golden Age artwork delivered every day!',
        },
      ],
    }
  },
  render() {
    return null
  },
}
</script>
