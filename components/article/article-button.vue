<template>
  <div :id="slugify(slice.primary.button_text)" class="articlebutton">
    <button-link :button-size="slice.primary.select_size.toLowerCase()" :button-style="btnstyle()" :prismic-link-object="slice.primary.button_link" :label="slice.primary.button_text" />
  </div>
</template>

<script>
import ButtonLink from '@/components/buttons/button-link'

export default {
  name: 'ArticleButton',
  components: { ButtonLink },
  props: {
    slice: {
      type: Object,
      default () {
        return {}
      }
    },
    sliceIndex: {
      type: Number,
      default () {
        return 0
      }
    }
  },
  methods: {
    btnstyle () {
      if (this.slice.primary.select_variant === 'Secondary') {
        return 'primary primary--style2'
      } else if (this.slice.primary.select_variant === 'Primary') {
        return 'primary primary--style1'
      } else {
        return 'primary primary--style1'
      }
    }
  }
}
</script>

<style lang="scss">
.articlebutton{
    margin: 50px auto;
}
</style>
