<template>
  <span>
    <nuxt-link v-if="link.link.link_type === 'Document'" :title="linkText" :to="url" :class="css_class">{{
        linkText
      }}</nuxt-link>
    <a
      v-else
      :href="url"
      :target="linkTarget"
      :title="linkText"
      rel="noopener"
      :class="css_class"
    >{{ linkText }}</a>
  </span>
</template>

<script>
import prismicDOM from 'prismic-dom'
import linkResolver from '../plugins/link-resolver'

export default {
  name: 'PrismicMenuLink',
  props: {
    link: {
      type: Object,
      default() {
        return {}
      }
    },
    target: {
      type: String,
      default() {
        return null
      }
    },
    cssClass: {
      type: String,
      default() {
        return null
      }
    }
  },
  // props: ['link', 'target', 'cssClass'],
  computed: {
    url() {
      return prismicDOM.Link.url(this.link.link, linkResolver)
    },
    css_class() {
      return (this.link.css_class && this.link.css_class.length > 0) ? this.link.css_class[0].text : null
    },
    linkText() {
      return this.link.label[0].text
    },
    linkTarget() {
      try {
        return this.target ? this.target : this.link.link.target
      } catch (e) {
        return null
      }
    }
  },
  mounted() {

  }
}
</script>
