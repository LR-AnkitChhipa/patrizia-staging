<template>
  <prismic-link v-if="prismicLinkObject" :link="prismicLinkObject" :title="text" :class="theLinkStyle">
    <svg class="right" xmlns="http://www.w3.org/2000/svg" width="5.044" height="9.567" viewBox="0 0 5.044 9.567">
      <path
        id="Path_2589"
        data-name="Path 2589"
        d="M0,0,4,4.449,0,8.9"
        transform="translate(0.372 0.334)"
        fill="none"
        stroke="#7f2336"
        stroke-width="1"
      /> </svg>
    {{text}}
  </prismic-link>
  <nuxt-link v-else-if="nuxtUrl" :to="nuxtUrl" :title="text" :class="theLinkStyle">
    <svg class="right" xmlns="http://www.w3.org/2000/svg" width="5.044" height="9.567" viewBox="0 0 5.044 9.567">
      <path
        id="Path_2589"
        data-name="Path 2589"
        d="M0,0,4,4.449,0,8.9"
        transform="translate(0.372 0.334)"
        fill="none"
        stroke="#7f2336"
        stroke-width="1"
      /> </svg>
    {{ text }}
  </nuxt-link>
  <a v-else :href="url" :title="text" :class="theLinkStyle" :target="target">
    <svg class="right" xmlns="http://www.w3.org/2000/svg" width="5.044" height="9.567" viewBox="0 0 5.044 9.567">
      <path
        id="Path_2589"
        data-name="Path 2589"
        d="M0,0,4,4.449,0,8.9"
        transform="translate(0.372 0.334)"
        fill="none"
        stroke="#7f2336"
        stroke-width="1"
      /> </svg>
    {{ text }} </a>
</template>

<script>

import PrismicLink from "@/components/prismic-link";
export default {
  name: 'TextLink',
  components: {PrismicLink},
  props: {
    prismicLinkObject: {
      type: Object,
      default () {
        return null
      }
    },
    nuxtUrl: {
      type: String,
      default () {
        return null
      }
    },
    url: {
      type: String,
      default () {
        return '#'
      }
    },
    target: {
      type: String,
      default () {
        return '_self'
      }
    },
    text: {
      type: String,
      default () {
        return ''
      }
    },
    linkStyle: {
      type: String,
      default () {
        return 'primary'
      }
    }
  },
  computed: {
    theLinkStyle () {
      return this.linkStyle + ' link textlink'
    }
  }
}
</script>

<style scoped>

</style>
