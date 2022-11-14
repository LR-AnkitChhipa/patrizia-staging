<template>
  <div>
    <Breadcrumb v-if="pageTitle" :breadcrumbitems="{items}"/>
    <template v-for="(slice, slideIndex) in $store.state.prismicDoc.data.body">
      <article-content
        v-if="slice.slice_type === 'article_content'"
        :key="slideIndex"
        :slice="slice"
        :slice-index="slideIndex"
      />
      <article-blockquote
        v-else-if="slice.slice_type === 'article_blockquote'"
        :key="slideIndex"
        :slice="slice"
        :slice-index="slideIndex"
      />
      <article-video
        v-else-if="slice.slice_type === 'article_video'"
        :key="slideIndex"
        :slice="slice"
        :slice-index="slideIndex"
      />
      <article-accordion
        v-else-if="slice.slice_type === 'article_accordion'"
        :key="slideIndex"
        :slice="slice"
        :slice-index="slideIndex"
      />
      <article-carousel
        v-else-if="slice.slice_type === 'article_image_carousel'"
        :key="slideIndex"
        :slice="slice"
        :slice-index="slideIndex"
      />

      <article-typography
        v-else-if="slice.slice_type === 'article_tyepography'"
        :key="slideIndex"
        :slice="slice"
        :slice-index="slideIndex"
      />

      <article-download
        v-else-if="slice.slice_type === 'article_download'"
        :key="slideIndex"
        :slice="slice"
        :slice-index="slideIndex"
      />

      <article-data-cards
        v-else-if="slice.slice_type === 'city_data_cards'"
        :key="slideIndex"
        :slice="slice"
        :slice-index="slideIndex"
      />

      <article-button
        v-else-if="slice.slice_type === 'button_link'"
        :key="slideIndex"
        :slice="slice"
        :slice-index="slideIndex"
      />
      <!--      <div v-else>No component found for this slice with the slice_type {{ slice.slice_type }}</div>-->
    </template>
  </div>
</template>

<script>
import Breadcrumb from '~/components/breadcrumb'
import ArticleAccordion from '~/components/article/article-accordion'
import ArticleContent from '~/components/article/article-content'
import ArticleBlockquote from '~/components/article/article-blockquote'
import ArticleVideo from '~/components/article/article-video'
import ArticleCarousel from '~/components/article/article-carousel'
import ArticleDownload from '~/components/article/article-download'
import ArticleTypography from '~/components/article/article-typography'
import ArticleDataCards from '@/components/article/article-data-cards'
import ArticleButton from '@/components/article/article-button'

export default {
  name: 'ArticleSlices',
  components: {
    ArticleDataCards,
    ArticleDownload,
    ArticleCarousel,
    ArticleVideo,
    ArticleBlockquote,
    ArticleTypography,
    ArticleContent,
    ArticleAccordion,
    Breadcrumb,
    ArticleButton
  },
  data() {
    return {
      items: [],
      uidslug: null
    }
  },
  mounted() {
    this.items = [
      {text: 'European City Pulse', to: '/'},
      {text: 'Insights', to: '/insights'},
      {
        text: this.$store.state.prismicDoc ? this.pageTitle : this.$route.params.uid,
        to: {name: this.$route.params.uid},
        active: true
      }
    ]
  },
  computed: {
    pageTitle() {
      try {
        if (this.$store.state.prismicDoc) {
          return this.$store.state.prismicDoc.data.title
        } else {
          return this.$route.params.uid
        }
      } catch (ex) {
        return null
      }
    }
  }
}
</script>

<style scoped lang="scss">

</style>
