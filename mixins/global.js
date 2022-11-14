export default {
  mounted() {
    this.activatePrismicNuxtLinks()
  },
  methods: {
    activatePrismicNuxtLinks() {
      const prismicNuxtLinks = document.getElementsByClassName('prismicLink')
      prismicNuxtLinks.forEach((item) => {
        // Prevent default and do a route push
        item.addEventListener('click', event => {
          event.preventDefault()
          this.$router.push(event.target.pathname)
        })

      })
    }
  }
}
