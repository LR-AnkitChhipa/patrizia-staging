<template>
  <b-container v-if="insightsArticles" class="latest-insights">
    <div class="navigation-wrapper">
      <div class="heading mb-5">
        <p class="subline--with-dash">
          {{ $store.state.globalContent.latest_insights_subline }}
        </p>
        <div class="d-flex justify-content-between align-items-end">
          <h2 class="m-0">
            {{ $store.state.globalContent.latest_insights_title }}
          </h2>
          <a href="/insights" class="link view primarylink">
            View All
            <img src="@/assets/img/view-arrow-primary.svg" alt="">
          </a>
        </div>
      </div>
      <div ref="slider" class="keen-slider image-boxes" :class="{'svg-cursor': slider}">
        <div
          v-for="(article, articleIndex) in insightsArticles"
          v-if="article.data && shouldShowArticle(article)"
          :key="article.uid + articleIndex"
          class="keen-slider__slide image-box">
          <template v-if="articleIndex <= 11">
            <nuxt-link :to="getArticleUrl(article)" class="box-link">
              <prismic-image v-if="article.data.thumbnail_image" :image="article.data.thumbnail_image"
                             class="main-slide-image with-lily"/>
              <p class="image-tag">
                {{ article.data.article_category }}
              </p>
              <p class="datetag">
                {{ getNiceDate(article.data.published_date) }}
              </p>
              <h4> {{ article.data.title }} </h4>
            </nuxt-link>
          </template>
        </div>
      </div>
      <div v-if="slider" class="dots with-arrow">
        <a class="arrow arrow--left" :class="{ arrow: true, 'arrow--left': true, 'arrow--disabled': current === 0, }"
           href="javascript:void(0)" @click="slider.prev()">
          <inline-svg width="10" height="20" :src="require('@/assets/img/homepage-slider-arrow.svg')"/>
        </a>
        <button
          v-for="(slideNumber, idx) in dotHelper"
          :key="idx"
          :class="{ dot: true, active: current === slideNumber }"
          @click="slider.moveToSlideRelative(slideNumber)"
        />
        <a class="arrow arrow--right"
           :class="{ arrow: true, 'arrow--right': true, 'arrow--disabled': current === slider.details().size - 1, }"
           href="javascript:void(0)" @click="slider.next()">
          <inline-svg width="10" height="20" :src="require('@/assets/img/homepage-slider-arrow.svg')"/>
        </a>
      </div>
    </div>
  </b-container>
</template>

<script>
import KeenSlider from 'keen-slider'
import PrismicImage from '@/components/prismic-image'

export default {
  name: 'LatestInsights',
  components: {PrismicImage},
  data() {
    return {
      current: 0,
      slider: null
    }
  },
  computed: {
    /**
     * Is this on a nonfeatured city page?
     */
    isNonFeaturedCity() {
      if (!this.$store.state.prismicDoc && this.$route.fullPath.includes('city')) {
        return true
      }
      return false
    },
    insightsArticles() {
      let insights = null
      try {
        if (this.$store.state.prismicDoc && this.$store.state.prismicDoc.data && this.$store.state.prismicDoc.data.featured_insights) {
          insights = this.$store.state.prismicDoc.data.featured_insights.filter((item) => {
            // Show only private articles to users on non-featured cities
            if(this.isNonFeaturedCity) {
              return item.insight.data.is_private ? true : false
            }
            // Dont show to non logged in users if private
            else if (!this.isUserLoggedIn && item.insight.data.is_private) {
              return false
            } else {
              return true
            }
          })
          // NOw we have a filtered list, map the results so we can access everything without going via .insight
          insights = insights.map((item) => {
            return item.insight
          })
        } else if (this.$store.state.insightsArticles) {
          insights = this.$store.state.insightsArticles.filter((item) => {
            // Show only private articles to users on non-featured cities
            if(this.isNonFeaturedCity) {
              return item.data.is_private ? true : false
            }
            // Dont show to non logged in users if private
            else if (!this.isUserLoggedIn && item.data.is_private) {
              return false
            } else {
              return true
            }
          })
        }
      } catch (e) {
        insights = this.$store.state.insightsArticles
      }
      if(this.isNonFeaturedCity) {
        this.shuffleArray(insights)
      }
      return insights
    },
    dotHelper() {
      if (this.slider && this.isTab() === true) {
        return this.slider ? [...Array(this.slider.details().size).keys()] : []
      } else if (this.slider) {
        const slides = [...Array(this.slider.details().size).keys()]
        const everyNth = slides.filter((item, i) => {
          if (i % 3 === 0) {
            return true
          } else {
            return false
          }
        })
        return everyNth
      }
      return []
    }
  }
  ,
  mounted() {
    if (this.hasMultipleSliders()) {
      this.slider = new KeenSlider(this.$refs.slider, {
        slidesPerView: 3.5,
        spacing: 0,
        loop: false,
        initial: this.current,
        breakpoints: {
          // eslint-disable-next-line no-dupe-keys
          '(max-width: 1200px)': {
            slidesPerView: 3
          },
          // eslint-disable-next-line no-dupe-keys
          '(max-width: 900px)': {
            slidesPerView: 2
          },
          // eslint-disable-next-line no-dupe-keys
          '(max-width: 767px)': {
            slidesPerView: 1
          }
        },
        slideChanged: (s) => {
          this.current = s.details().relativeSlide
        }
      })
    } else if (this.isTab() === true) {
      this.slider = new KeenSlider(this.$refs.slider, {
        slidesPerView: 2,
        spacing: 0,
        loop: true,
        initial: this.current,
        breakpoints: {
          // eslint-disable-next-line no-dupe-keys
          '(max-width: 767px)': {
            slidesPerView: 1
          }
        },
        slideChanged: (s) => {
          this.current = s.details().relativeSlide
        }
      })
    }
  }
  ,
  methods: {
    getArticleUrl(document) {
      return '/insights/' + document.uid
    }
    ,
    /**
     * Is there more than one featured insights?
     * @returns {boolean}
     */
    hasMultipleSliders() {
      try {
        if (this.insightsArticles.length > 3) {
          return true
        }
      } catch (e) {
        return false
      }
      return false
    }
  }
}
</script>

<style lang="scss" scoped>
.heading {
  width: 83%;
  padding-left: 30px;
  @include respond-below(xl) {
    width: 100%;
    margin: auto;
    padding-left: 0;
  }

  p {
    font-family: 'Corporate S Pro Bold';
    position: relative;
    color: #B4A4A9;
    text-transform: uppercase;
    letter-spacing: .5px;
    font-size: 14px;
    margin-bottom: 20px;
  }
}

.container {
  // margin-left: calc((100vw - 1140px - 16px) / 2);
  // max-width: none;
  // width: calc(1140px + ((100vw - 1140px - 18px) / 2));
  max-width: 80%;
  width: 100%;
  margin-right: 0;
  margin-top: 100px;
  margin-bottom: 100px;
  @include respond-below(xl) {
    max-width: 100%;
    padding: 0 16px;
    width: 100%;
    margin: 50px auto;
  }
}

.navigation-wrapper {

  .dots {
    padding-left: 30px;
    @include respond-below(md) {
      padding-left: 20px;
    }
  }

  @media screen and (max-width: 1500px) {

  }
}

.image-boxes {
  .image-box {
    position: relative;
    overflow: visible;
    padding: 30px 0 0 30px;
    max-width: 346px;

    @include respond-below(md) {
      padding: 20px;
    }

    .image-tag {
      background: #802437;
      color: #fff;
      margin: 0;
      position: absolute;
      top: 15px;
      left: 20px;
      padding: 8px 10px;
      font-size: 12px;
      font-weight: bold;
      letter-spacing: 1px;
      line-height: 15px;
      z-index: 9;
      text-transform: uppercase;
      @include respond-below(md) {
        top: 5px;
        left: 10px;
      }
    }
  }

  .datetag {
    color: #b4a4a9;
    letter-spacing: 1px;
    font-size: 12px;
    font-family: "Corporate S Pro";
  }

  h4 {
    color: #802437;
    font-size: 18px;
    padding-right: 25%;
    margin-bottom: 2rem;
    transition: .2s ease-in-out;
  }
}
</style>
