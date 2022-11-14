<template>
  <div>
    <Islider />
    <filter-article @typeFilterUpdated="typeFilterUpdated" @categoryFilterUpdated="categoryFilterUpdated" />
    <insights-articles-list :type-filter="typeFilter" :category-filter="categoryFilter" />
    <!--<call-to-action class="mb-5" />-->
  </div>
</template>

<script>
import Islider from '~/components/slider'
import FilterArticle from '~/components/filter-article'
import Pagination from '~/components/pagination'
import CallToAction from '~/components/call-to-action'
import InsightsArticlesList from '~/components/insights-articles-list'

export default {
  name: 'InsightsListing',
  components: {
    InsightsArticlesList,
    CallToAction,
    Pagination,
    Islider,
    FilterArticle
  },
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
  data() {
    return {
      categoryFilter: null,
      typeFilter: null
    }
  },
  methods: {
    typeFilterUpdated(value) {
      this.typeFilter = value
    },
    categoryFilterUpdated(value) {
      this.categoryFilter = value
    }
  }
}
</script>

<style scoped>

</style>
