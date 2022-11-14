<template>
  <div v-if="!isSvg">
    <div v-if="isVideo" class="image-video-icon"/>
    <img
      :src="image.url"
      :alt="image.alt"
      :class="mainImageClass"
      v-if="this.size === null"
    >
    <img
      :src="image[size].url"
      :alt="image[size].alt"
      :class="mainImageClass"
      v-else-if="image[size]"
    >
    <img
      v-if="image.mobile"
      :src="image.mobile.url"
      :alt="image.mobile.alt"
      :class="mobileImageClass"
    >
  </div>
  <div v-else>
    <inline-svg :src="image.url" />
  </div>
</template>

<script>
export default {
  name: 'PrismicImage',
  props: {
    /**
     * The image prop is a prismic image object passed directly from prismic
     */
    image: {
      type: Object,
      default () {
        return {
          dimensions: { width: 0, height: 0 },
          alt: null,
          copyright: null,
          url: null
        }
      }
    },
    isVideo: {
      type: Boolean,
      default () {
        return false
      }
    },
    /**
     * The image size to render (e.g. featured)
     */
    size: {
      type: String,
      default() {
        return null;
      }
    }
  },
  computed: {
    mainImageClass () {
      // We only want to hide this on non-mobile if we have a mobile subsitute
      if (this.image.mobile) {
        return 'd-none d-md-block'
      }
      return ''
    },
    mobileImageClass () {
      return 'd-block d-md-none'
    },
    isSvg () {
      if (this.image.url && this.image.url.indexOf('.svg') >= 0) {
        return true
      } else {
        return false
      }
    }
  }
}
</script>

<style scoped>

</style>
