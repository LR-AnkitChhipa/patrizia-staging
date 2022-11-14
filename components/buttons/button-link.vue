<template>
  <prismic-link v-if="prismicLinkObject" :link="prismicLinkObject" :title="label" :class="buttonClass">
    <svg class="left" xmlns="http://www.w3.org/2000/svg" width="12" height="36" viewBox="0 0 12 36">
      <path id="Path_128" data-name="Path 128" d="M12-24.045,0-6,0-42Z" transform="translate(0 42)" fill="#f29131" />
    </svg>
    <span class="text">{{ label }}</span>
    <svg class="right" xmlns="http://www.w3.org/2000/svg" width="5.043" height="9.664" viewBox="0 0 5.043 9.664">
      <path
        id="Path_127"
        data-name="Path 127"
        d="M0,0,4,4.5,0,9"
        transform="translate(0.374 0.332)"
        fill="none"
        stroke="#fff"
        stroke-width="1"
      />
    </svg>
  </prismic-link>
  <nuxt-link v-else :to="url" :title="label" :class="buttonClass">
    <svg class="left" xmlns="http://www.w3.org/2000/svg" width="12" height="36" viewBox="0 0 12 36">
      <path id="Path_128" data-name="Path 128" d="M12-24.045,0-6,0-42Z" transform="translate(0 42)" fill="#f29131" />
    </svg>
    <span class="text">{{ label }}</span>
    <svg class="right" xmlns="http://www.w3.org/2000/svg" width="5.043" height="9.664" viewBox="0 0 5.043 9.664">
      <path
        id="Path_127"
        data-name="Path 127"
        d="M0,0,4,4.5,0,9"
        transform="translate(0.374 0.332)"
        fill="none"
        stroke="#fff"
        stroke-width="1"
      />
    </svg>
  </nuxt-link>
  <!-- <prismic-link v-if="prismicLinkObject" :link="prismicLinkObject" :title="label" :class="buttonClass">
    <svg class="left" xmlns="http://www.w3.org/2000/svg" width="12" height="36" viewBox="0 0 12 36">
      <path
        id="Path_128"
        data-name="Path 128"
        d="M12-24.045,0-6,0-42Z"
        transform="translate(0 42)"
        fill="#802537"
      />
    </svg>
    {{ label }}
    <svg
      class="right"
      xmlns="http://www.w3.org/2000/svg"
      width="5.044"
      height="9.567"
      viewBox="0 0 5.044 9.567"
    >
      <path
        id="Path_2589"
        data-name="Path 2589"
        d="M0,0,4,4.449,0,8.9"
        transform="translate(0.372 0.334)"
        fill="none"
        stroke="#7f2336"
        stroke-width="1"
      />
    </svg>
  </prismic-link>
  <nuxt-link v-else :to="url" :title="label" :class="buttonClass">
    <svg class="left" xmlns="http://www.w3.org/2000/svg" width="12" height="36" viewBox="0 0 12 36">
      <path
        id="Path_128"
        data-name="Path 128"
        d="M12-24.045,0-6,0-42Z"
        transform="translate(0 42)"
        fill="#802537"
      />
    </svg>
    {{ label }}
    <svg
      class="right"
      xmlns="http://www.w3.org/2000/svg"
      width="5.044"
      height="9.567"
      viewBox="0 0 5.044 9.567"
    >
      <path
        id="Path_2589"
        data-name="Path 2589"
        d="M0,0,4,4.449,0,8.9"
        transform="translate(0.372 0.334)"
        fill="none"
        stroke="#7f2336"
        stroke-width="1"
      />
    </svg>
  </nuxt-link> -->
</template>

<script>
import PrismicLink from '@/components/prismic-link'

export default {
  name: 'ButtonLink',
  components: { PrismicLink },
  props: {
    prismicLinkObject: {
      type: Object,
      default () {
        return null
      }
    },
    label: {
      type: String,
      default () {
        return ''
      }
    },
    buttonStyle: {
      type: String,
      default () {
        return 'primary primary--style1'
        // return 'primary primary--style2'
        // return 'secondary secondary--style1'
        // return 'secondary secondary--style2'
      }
    },
    url: {
      type: String,
      default () {
        return '#'
      }
    },
    buttonSize: {
      type: String,
      default () {
        return 'regular'
      }
    }
  },
  computed: {
    buttonClass () {
      const cssClass = 'p-btn ' + (this.buttonStyle ?? 'primary primary--style1') + ' ' + this.buttonSize
      return cssClass
    }
  }
}
</script>

<style scoped>

</style>
