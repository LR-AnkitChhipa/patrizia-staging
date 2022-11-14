<template>
  <div class="article-content typography" :id="slugify(slice.primary.navigation_title)">
    <prismic-rich-text :field="slice.primary.article_content" />
  </div>
</template>

<script>
export default {
  name: 'ArticleContent',
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
  }

}
</script>

<style lang="scss">
.article-content {

}
</style>
