<template>
  <b-container v-if="$store.state.insightsArticles" id="insightsArticles">
    <b-row class="image-boxes">
      <nuxt-link
        v-for="(article, articleIndex) in currentPageInsightsArticles"
        v-if="shouldShowArticle(article)"
        :key="article.data.title +'-'+ articleIndex"
        :to="getArticleUrl(article)"
        :class="getInsightCardClass(article)">
        <div class="image-box">
          <prismic-image
            v-if="article.data.thumbnail_image"
            :image="article.data.thumbnail_image"
            :is-video="article.data.article_type.toLowerCase() === 'video'"
            class="main-slide-image with-lily"
          />
          <p class="image-tag">
            {{ article.data.article_category }}
          </p>
        </div>
        <p class="datetag">
          {{ getNiceDate(article.data.published_date) }}
        </p>
        <h4>{{ article.data.title }}</h4>
      </nuxt-link>
      <b-col v-if="insightsArticles.length === 0" class="image-boxes__no-results">
        <p class="large-paragraph">Sorry, there are no Insights articles that match your selected filters.</p>
      </b-col>
    </b-row>

    <div class="paginationdiv" v-if="insightsArticles.length > 0">
      <b-pagination-nav
        v-model="currentPage"
        v-scroll-to="{el: '#insightsArticles', offset: -180, force: true}"
        limit="9"
        prev-text=""
        next-text=""
        prev-class="prev-arrow"
        next-class="next-arrow"
        :link-gen="linkGen"
        :number-of-pages="numPages"
        hide-goto-end-buttons
        hide-ellipsis
      />
    </div>
  </b-container>
</template>

<script>
import PrismicImage from '@/components/prismic-image'

export default {
  name: 'InsightsArticlesList',
  components: {PrismicImage},
  props: {
    hideFeaturedInsight: {
      type: Boolean,
      default() {
        return false
      }
    },
    categoryFilter: {
      type: String,
      default() {
        return null
      }
    },
    typeFilter: {
      type: String,
      default() {
        return null
      }
    }
  },
  data() {
    return {
      perPage: 9,
      currentPage: 1
    }
  },
  computed: {
    insightsArticles() {
      const items = this.$store.state.insightsArticles
      let filteredItems = items.filter((item) => {
        if (!this.categoryFilter && !this.typeFilter) {
          return item
        } else {
          let matchesCategoryFilter = (!this.categoryFilter || this.categoryFilter === item.data.article_category) ? true : false
          let matchesTypeFilter = (!this.typeFilter || this.typeFilter === item.data.article_type) ? true : false
          if (matchesCategoryFilter && matchesTypeFilter) {
            return item
          } else {
            return null
          }
        }
      })

      // If the user is logged out, dont show private articles
      const userLoggedIn = this.isUserLoggedIn
      filteredItems = filteredItems.filter((item) => {
          if(item.data.is_private && !userLoggedIn) {
            return  null
          }
          return item
      })

      return filteredItems
    },
    currentPageInsightsArticles() {
      return this.insightsArticles.slice(
        (this.currentPage - 1) * this.perPage,
        this.currentPage * this.perPage
      )
    },
    numPages() {
      return Math.ceil(this.insightsArticles.length / this.perPage)
    }
  },
  methods: {
    linkGen(pageNum) {
      return this.currentPage[pageNum - 1]
    },
    getArticleUrl(document) {
      return '/insights/' + document.uid
    }
  }
}
</script>

<style lang="scss">
.image-boxes {
  .image-boxes-link {
    transition: .2s ease-in-out;
    @include respond-between(md, xl) {
      max-width: 50%;
    }
    @include respond-below(sm) {
      margin-bottom: 1rem !important;
    }

    .image-box {
      position: relative;
      -webkit-box-shadow: 0px 20px 30px -2px rgba(34, 10, 18, 0.3);
      -moz-box-shadow: 0px 20px 30px -2px rgba(34, 10, 18, 0.3);
      box-shadow: 0px 20px 30px -2px rgba(34, 10, 18, 0.3);
      margin-bottom: 1.5rem;
      transition: .2s ease-in-out;
      width: 338px;
      height: 220px;
      @include respond-below(sm) {
        width: 100%;
      }

      .main-slide-image {
        width: 100%;
        height: 100%;

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }

      .image-tag {
        text-transform: uppercase;
        background: #802437;
        color: #fff;
        margin: 0;
        position: absolute;
        top: -8px;
        left: -8px;
        padding: 8px 10px;
        font-size: 12px;
        font-weight: bold;
        letter-spacing: 1px;
        line-height: 15px;
        z-index: 9;
      }
    }

    &:hover {
      .image-box {
        -webkit-box-shadow: 0px 20px 30px -2px rgba(164, 73, 147, 0.3);
        -moz-box-shadow: 0px 20px 30px -2px rgba(164, 73, 147, 0.3);
        box-shadow: 0px 20px 30px -2px rgba(164, 73, 147, 0.3);
      }

      h4 {
        color: #F29131;
      }
    }
  }

  .datetag {
    font-family: 'Corporate S Pro bold';
    font-size: 12px;
    letter-spacing: .5px;
    color: #B4A4A9;
    text-transform: uppercase;
  }

  h4 {
    color: #802437;
    font-size: 18px;
    padding-right: 25%;
    margin-bottom: 2rem;
    transition: .2s ease-in-out;
  }

  &__no-results {
    margin-bottom: 64px;
  }
}
</style>
