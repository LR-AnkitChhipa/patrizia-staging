<template>
  <nuxt-link v-if="!isWebLink" :title="title" :to="url">
    <slot/>
  </nuxt-link>
  <a
    v-else
    :href="url"
    :target="(linkTarget)"
    :title="title"
    rel="noopener"
  >
    <slot/>
  </a>
</template>

<script>
import prismicDOM from 'prismic-dom'
import linkResolver from '../plugins/link-resolver'

export default {
  name: 'PrismicLink',
  props: {
    link: {
      type: Object,
      default() {
        return {}
      }
    },
    title: {
      type: String,
      default() {
        return null
      }
    },
    target: {
      type: String,
      default() {
        return null
      }
    }
  },
  computed: {
    isWebLink() {
      return this.link.link_type === 'Web'
    },
    url() {
      return prismicDOM.Link.url(this.link, linkResolver)
    },
    linkTarget() {
      if(this.link && this.link.target) {
        return this.link.target
      }
      if(this.target) {
        return this.target
      }
    }
  }
}
</script>


<style scoped>
span {
  color: white;
}
</style>
