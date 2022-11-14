<template>
  <div>
    <article-aside-sections />
    <article-aside-contact />
    <article-aside-share />
  </div>
</template>

<script>
import ArticleAsideSections from '~/components/article/article-aside-sections'
import ArticleAsideContact from '~/components/article/article-aside-contact'
import ArticleAsideShare from '~/components/article/article-aside-share'

export default {
  name: 'Sidebar',
  components: {
    ArticleAsideShare,
    ArticleAsideContact,
    ArticleAsideSections
  }

}
</script>
