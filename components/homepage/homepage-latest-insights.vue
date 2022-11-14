<template>
  <b-container fluid class="homepage-latest-insights" v-if="slice">
    <b-container>
      <h2 class="homepage-latest-insights__heading" v-if="slice.primary.latest_insights_title">
        {{ slice.primary.latest_insights_title }}
      </h2>
      <prismic-rich-text
        v-if="slice.primary.latest_insights_content"
        class="homepage-latest-insights__sub-heading"
        :field="slice.primary.latest_insights_content"
      />
      <b-row class="contentrow contentrow--one" v-if="featuredInsight">
        <b-col cols="12" md="8" class="mb-sm-4">
          <prismic-link class="image-link" :link="featuredInsight">
            <div class="imagewithtag">
              <prismic-image
                :image="featuredInsight.data.thumbnail_image"
                size="Featured"
                class="main-slide-image with-lily"/>
              <p class="image-tag">
                {{ featuredInsightTag }}
              </p>
            </div>
          </prismic-link>
        </b-col>
        <b-col cols="12" md="4" class="mb-sm-4">
          <div class="contentrow__content">
            <p class="datemonth" v-if="featuredInsight.data.published_date">
              {{ getNiceDate(featuredInsight.data.published_date) }}
            </p>
            <prismic-link class="content-link" :link="featuredInsight">
              <h3 v-if="featuredInsight.data.title">
                {{ featuredInsight.data.title }}
              </h3>
            </prismic-link>
            <prismic-rich-text :field="featuredInsight.data.excerpt" v-if="featuredInsight.data.excerpt"/>
            <text-link :prismic-link-object="featuredInsight" text="Read more" link-style="primary"/>
          </div>
        </b-col>
      </b-row>

      <b-row class="image-boxes">
        <nuxt-link
          v-for="(article, articleIndex) in featuredInsights"
          v-if="shouldShowArticle(article)"
          :key="article.insight.data.title +'-'+ articleIndex"
          :to="getArticleUrl(article.insight)"
          class="col-sm-12 col-md-6 col-lg-4 mb-5 image-boxes-link"
        >
          <div class="image-box">
            <prismic-image
              v-if="article.insight.data.thumbnail_image"
              :is-video="article.insight.data.article_type.toLowerCase() === 'video'"
              :image="article.insight.data.thumbnail_image"
              class="main-slide-image with-lily"
            />
            <p class="image-tag">
              {{ article.insight.data.article_category }}
            </p>
          </div>
          <p class="datetag">
            {{ getNiceDate(article.insight.data.published_date) }}
          </p>
          <h4>{{ article.insight.data.title }}</h4>
        </nuxt-link>
      </b-row>

      <div class="homepage-latest-insights__viewbtn">
        <button-link button-size="regular" button-style="primary primary--style1" label="VIEW ALL INSIGHTS"
                     url="/insights"/>
      </div>
    </b-container>
  </b-container>
</template>

<script>
import ButtonLink from '@/components/buttons/button-link'
import TextLink from '@/components/text-link'
import InsightsArticlesList from "@/components/insights-articles-list";
import PrismicImage from "@/components/prismic-image";
import PrismicLink from "@/components/prismic-link";

export default {
  name: 'HomepageLatestInsights',
  components: {PrismicLink, PrismicImage, InsightsArticlesList, ButtonLink, TextLink},
  props: {
    slice: {
      type: Object,
      default() {
        return null
      }
    },
    sliceIndex: {
      type: Number,
      default() {
        return 0
      }
    }
  },
  data() {
    return ({
      dateTag: 'MM/YYYY',
      title: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr',
      content: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur'
    })
  },
  methods: {
    getArticleUrl(document) {
      return '/insights/' + document.uid
    }
  },
  computed: {
    featuredInsight() {
      try {
        const insight = this.$store.state.globalContent.featured_insight

        if(insight.data.is_private && !this.isUserLoggedIn) {
          return null
        } else {
           return insight
        }
      } catch (ex) {
        return null
      }
    },
    featuredInsights() {
      try {
        return this.$store.state.globalContent.homepage_featured_insights
      } catch (ex) {
        return null
      }
    },
    featuredInsightTag() {
      try {
        return this.featuredInsight.data.article_category
      } catch (ex) {
        return null
      }
    }
  }
}
</script>

<style lang="scss">
.homepage-latest-insights {
  padding: 100px 0;
  background: #F8F6F7;
  @include respond-below(sm) {
    padding: 50px 0;
  }

  &__heading {
    text-align: center;
    margin-bottom: 20px;
  }

  &__sub-heading {
    text-align: center;
    padding-bottom: 50px;
    width: 45%;
    margin: auto;

    .left-align {
      text-align: left;
      display: block;
    }

    @include respond-below(md) {
      width: 100%;
    }
  }

  .contentrow {
    &__content {
      margin-top: 30px;

      p.datemonth {
        font-family: 'Corporate S Pro bold';
        font-size: 12px;
        letter-spacing: .5px;
        color: #B4A4A9;
        text-transform: uppercase;
      }

      h4, h3 {
        padding-right: 10%;
        transition: .2s ease-in-out;
      }

      a.content-link {
        &:hover {
          h4, h3 {
            // color: #F29131;
          }
        }
      }
    }

    &.contentrow--one {
      margin-bottom: 60px;

      .contentrow__content {
        margin-top: 0;
        @include respond-below(sm) {
          margin-top: 20px;
        }
      }
    }

    a.image-link {
      transition: .2s ease-in-out;

      .imagewithtag {
        img {
          transition: .2s ease-in-out;
          -webkit-box-shadow: 5px 20px 40px 0px rgba(34, 10, 18, 0.15);
          -moz-box-shadow: 5px 20px 40px 0px rgba(34, 10, 18, 0.15);
          box-shadow: 5px 20px 40px 0px rgba(34, 10, 18, 0.15);
        }
      }

      &:hover {
        .imagewithtag {
          img {
            -webkit-box-shadow: 5px 20px 40px 0px rgba(164, 73, 147, 0.15);
            -moz-box-shadow: 5px 20px 40px 0px rgba(164, 73, 147, 0.15);
            box-shadow: 5px 20px 40px 0px rgba(164, 73, 147, 0.15);
          }
        }
      }
    }
  }

  &__viewbtn {
    text-align: center;
    margin-top: 30px;
    @include respond-below(sm) {
      margin-top: 0;
    }
  }
}
</style>
