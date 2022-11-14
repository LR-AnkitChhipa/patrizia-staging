<template>
  <b-container id="Insightslider">
    <div class="navigation-wrapper">
      <div ref="slider" class="keen-slider">
        <div
          v-for="(article, articleIndex) in featuredInsights"
          :key="articleIndex"
          class="keen-slider__slide"
        >
          <b-row>
            <b-col cols="12" md="6" class="lft order-md-1 order-2">
              <div class="date-text subline with-dash">
                {{ getNiceDate(article.data.published_date) }}
              </div>
              <nuxt-link :to="getArticleUrl(article)">
                <h3>{{ article.data.title }}</h3>
              </nuxt-link>
              <prismic-rich-text v-if="article.data.excerpt" :field="article.data.excerpt"/>
              <text-link text="Read more" :nuxtUrl="getArticleUrl(article)" link-style="primary"/>
            </b-col>
            <b-col cols="12" md="6" class="rgt order-md-2 order-1">
              <nuxt-link :to="getArticleUrl(article)">
                <div class="box">
                  <div class="with-lily">
                    <div v-if="article.data.article_type.toLowerCase() === 'video'" class="image-video-icon"/>
                    <img
                      v-if="article.data.thumbnail_image.Featured"
                      :src="article.data.thumbnail_image.Featured.url"
                      alt=""
                      class="main-slide-image img-fluid"
                    >
                  </div>
                  <img class="pattern" src="~@/assets/img/insights/image-pattern.png" alt="">
                  <p class="image-tag">
                    {{ article.data.article_category }}
                  </p>
                </div>
              </nuxt-link>
            </b-col>
          </b-row>
        </div>
      </div>

      <svg
        v-if="hasMultipleFeaturedInsights()"
        class="arrow-left"
        xmlns="http://www.w3.org/2000/svg"
        width="21.255"
        height="40.674"
        viewBox="0 0 21.255 40.674"
        @click="slider.prev()"
      >
        <g id="Group_4969" data-name="Group 4969" transform="translate(119.79 0.337)">
          <g id="Group_269" data-name="Group 269" transform="translate(-100.022 39) rotate(180)">
            <path
              id="Path_187"
              data-name="Path 187"
              d="M0,38,17.079,19,0,0"
              fill="none"
              stroke="#802437"
              stroke-width="4"
            />
          </g>
        </g>
      </svg>

      <svg
        v-if="hasMultipleFeaturedInsights()"
        class="arrow-right"
        xmlns="http://www.w3.org/2000/svg"
        width="21.255"
        height="40.674"
        viewBox="0 0 21.255 40.674"
        @click="slider.next()"
      >
        <g id="Group_4970" data-name="Group 4970" transform="translate(-98.535 40.337) rotate(180)">
          <g id="Group_269" data-name="Group 269" transform="translate(-100.022 39) rotate(180)">
            <path
              id="Path_187"
              data-name="Path 187"
              d="M0,38,17.079,19,0,0"
              fill="none"
              stroke="#802437"
              stroke-width="4"
            />
          </g>
        </g>
      </svg>
    </div>
    <div v-if="slider && hasMultipleFeaturedInsights()" class="dots">
      <button
        v-for="(slide, idx) in dotHelper"
        :key="idx"
        :class="{dot: true, active: current === idx}"
        @click="slider.moveToSlideRelative(idx)"
      />
    </div>
  </b-container>
</template>

<script>
import KeenSlider from 'keen-slider'
import TextLink from '@/components/text-link'

export default {
  name: 'Insightslider',
  components: {TextLink},
  data() {
    return {
      current: 0,
      slider: null
    }
  },

  computed: {
    featuredInsights() {
      const insights = this.$store.state.featuredInsightsArticles
      // If the user is logged out, dont show private articles
      const userLoggedIn = this.isUserLoggedIn
      const visibleInsights = insights.filter((item) => {
        if (item.data.is_private && !userLoggedIn) {
          return null
        }
        return item
      })
      return visibleInsights
    },
    dotHelper() {
      return this.slider ? [...Array(this.slider.details().size).keys()] : []
    }
  },
  mounted() {
    if (this.hasMultipleFeaturedInsights()) {
      this.slider = new KeenSlider(this.$refs.slider, {
        initial: this.current,
        loop: true,
        centered: true,
        slidesPerView: 1,
        slideChanged: (s) => {
          this.current = s.details().relativeSlide
        }
      })
    }
  },

  beforeDestroy() {
    if (this.slider) {
      this.slider.destroy()
    }
  },
  methods: {
    getArticleUrl(document) {
      return '/insights/' + document.uid
    },
    /**
     * Is there more than one featured insights?
     * @returns {boolean}
     */
    hasMultipleFeaturedInsights() {
      try {
        if (this.featuredInsights.length > 1) {
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
#Insightslider {
  margin-top: 3rem;
  margin-bottom: 64px;
  // Phase 2
  //margin-bottom: 1rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid #F0EDEE;

  .navigation-wrapper {
    position: relative;

    .keen-slider {
      .keen-slider__slide {
        padding: 60px 0;
        @include respond-below(xl) {
          padding: 20px calc(1vw + 1%) 60px 20px;
        }
        @include respond-below(sm) {
          padding: 60px 20px;
        }

        .row {
          div {
            &.lft {
              .date-text {
                margin-top: 35px;
                margin-bottom: 1.3rem;
                position: relative;
                left: 30px;
                @include respond-below(ipro) {
                  margin-top: 0;
                }
                @include respond-below(sm) {
                  margin-top: 25px;
                }

                &::after {
                  content: "";
                  position: absolute;
                  bottom: 8px;
                  left: -30px;
                  width: 20px;
                  background: #B4A4A9;
                  height: 2px;
                }

                @include respond-below(sm) {
                  left: 30px;
                }
              }

              h3 {
                color: #802437;
                font-size: 30px;
                margin-bottom: 1.8rem;
                line-height: 42px;
                max-height: 85px;
                overflow: hidden;
                transition: .2s ease-in;
                @include respond-below(sm) {
                  word-break: break-all;
                }

                &:hover {
                  color: #F29131;
                }
              }

              p {
                font-family: "Corporate S Pro";
                margin-bottom: 1.8rem;
                color: #210A12;
                @include respond-below(sm) {
                  word-break: break-all;
                }
              }
            }

            &.rgt {
              .box {
                position: relative;

                img {
                  -webkit-box-shadow: 0px 20px 30px -2px rgba(34, 10, 18, 0.3);
                  -moz-box-shadow: 0px 20px 30px -2px rgba(34, 10, 18, 0.3);
                  box-shadow: 0px 20px 30px -2px rgba(34, 10, 18, 0.3);
                  position: relative;
                  z-index: 8;

                  &::before {
                    content: "";
                    background: url("../assets/img/insights/image-pattern.png");
                  }
                }

                img.pattern {
                  position: absolute;
                  top: -40px;
                  z-index: 5;
                  box-shadow: none;
                  left: -56px;
                  width: 300px;
                }

                p.image-tag {
                  text-transform: uppercase;
                  background: #802437;
                  color: #fff;
                  margin: 0;
                  position: absolute;
                  top: -10px;
                  left: -8px;
                  padding: 8px 10px;
                  font-size: 12px;
                  font-weight: bold;
                  letter-spacing: 1px;
                  line-height: 15px;
                  z-index: 9;
                }
              }
            }

            @include respond-below(sm) {
              .lft {
                order: 2;
              }
              .absrgt {
                order: 1;
              }
            }
          }

          @include respond-below(md) {
            align-items: center;
          }
        }
      }
    }

    svg {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      cursor: pointer;

      &.arrow-left {
        left: -10%;
      }

      &.arrow-right {
        right: -10%;
      }

      @include respond-below(md2) {
        &.arrow-left {
          left: -5%;
        }
        &.arrow-right {
          right: -5%;
        }
      }
      @include respond-below(xl) {
        &.arrow-left {
          left: -3%;
        }
        &.arrow-right {
          right: -3%;
        }
      }
      @include respond-below(md) {
        display: none;
      }
    }
  }

  .dots {
    text-align: center;
    margin: auto;
  }
}
</style>
