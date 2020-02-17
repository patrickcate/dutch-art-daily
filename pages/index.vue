<script>
export default {
  name: 'HomePage',
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
        {
          hid: 'og:title',
          name: 'og:title',
          content: 'Dutch Art Daily',
        },
        {
          hid: 'og:description',
          name: 'og:description',
          content: 'A new Dutch Golden Age artwork delivered every day!',
        },
        {
          hid: 'og:site_name',
          name: 'og:site_name',
          content: 'Dutch Art Daily',
        },
        {
          hid: 'og:url',
          name: 'og:url',
          content: 'https://dutchartdaily.com',
        },
        {
          hid: 'twitter:site',
          name: 'twitter:site',
          content: 'Dutch Art Daily',
        },
        {
          hid: 'twitter:title',
          name: 'twitter:title',
          content: 'Dutch Art Daily',
        },
        {
          hid: 'twitter:url',
          name: 'twitter:url',
          content: 'https://dutchartdaily.com',
        },
      ],
      link: [
        this.$icon ? { rel: 'apple-touch-icon', href: this.$icon(192) } : null,
      ],
    }
  },
  beforeCreate() {
    if (!process.server) {
      this.$homepageRedirect()
    }
  },
  render() {
    return null
  },
}
</script>
