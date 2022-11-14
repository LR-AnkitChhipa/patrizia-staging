<template>
  <div class="article-blockquote" :id="slugify(slice.primary.navigation_title)">
    <blockquote class="article-blockquote__quote">
      <prismic-rich-text :field="slice.primary.article_blockquote_quote" />
    </blockquote>
    <p class="article-blockquote__quotee">
      {{ slice.primary.article_blockquote_quotee }}
    </p>
  </div>
</template>

<script>
export default {
  name: 'ArticleBlockquote',
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

<style lang="scss" >
.article-blockquote {
  margin-bottom: 55px;
  padding: 20px 0 13px 30px;
  border-left: 1px solid #29B5BA;

  &__quote {
    p {
      font-family: "Georgia Pro Semibold", Fallback, sans-serif;
      color: #29B5BA;
      font-size: 18px;
      line-height: 26px;
      margin-bottom: 28px;
    }
  }

  &__quotee {
    color: #29B5BA;
    margin: 0;
  }
}
</style>
