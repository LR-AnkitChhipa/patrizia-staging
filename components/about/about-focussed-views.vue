<template>
  <section class="about-focussed-views">
    <b-container>
      <b-row>
        <b-col class="about-focussed-views__header">
          <p
            v-if="slice.primary.focussed_views_subline"
            class="subline subline--with-dash"
            v-html="slice.primary.focussed_views_subline"
          />
          <prismic-rich-text
            v-if="slice.primary.focussed_views_content"
            :field="slice.primary.focussed_views_content"
          />
        </b-col>
      </b-row>
      <b-row>
        <b-col class="about-focussed-views__chart-list navigation-wrapper">
          <ul ref="slider" class="keen-slider" :class="{'svg-cursor': slider}">
            <li
              v-for="(chart, chartIndex) in slice.items"
              :key="chartIndex"
              class="about-focussed-views__chart-list__chart keen-slider__slide"
            >
              <nuxt-link :to="getChartLink(chart)">
                <img :src="chart.focussed_view_image.url" alt="">
                <prismic-rich-text :field="chart.focussed_view_description"/>
              </nuxt-link>
            </li>
          </ul>
          <div v-if="slider" class="dots with-arrow">
            <a class="arrow arrow--left"
               :class="{ arrow: true, 'arrow--left': true, 'arrow--disabled': current === 0, }"
               href="javascript:void(0)" @click="slider.prev()">
              <inline-svg width="10" height="20" :src="require('@/assets/img/homepage-slider-arrow.svg')"/>
            </a>
            <button
              v-for="(slideNumber, idx) in dotHelper"
              :key="idx"
              :class="{dot: true, active: current === slideNumber}"
              @click="slider.moveToSlideRelative(slideNumber)"
            />
            <a class="arrow arrow--right"
               :class="{ arrow: true, 'arrow--right': true, 'arrow--disabled': current === slider.details().size - 1, }"
               href="javascript:void(0)" @click="slider.next()">
              <inline-svg width="10" height="20" :src="require('@/assets/img/homepage-slider-arrow.svg')"/>
            </a>
          </div>
        </b-col>
      </b-row>
      <b-row>
        <b-col class="about-focussed-views__cta">
          <button-link :url="getPrismicLink(slice.primary.city_index_link)"
                       :label="slice.primary.city_index_button_text"/>
        </b-col>
      </b-row>
    </b-container>
  </section>
</template>

<script>
import KeenSlider from 'keen-slider'
import PrismicImage from '@/components/prismic-image'
import ButtonLink from '@/components/buttons/button-link'

export default {
  name: 'AboutFocussedViews',
  components: {ButtonLink, PrismicImage},
  props: {
    slice: {
      type: Object,
      default() {
        return {}
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
    return {
      current: 0,
      slider: null
    }
  },
  computed: {
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
  },
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
  },
  methods: {
    /**
     * Get the link for a chart
     */
    getChartLink(chart) {
      let link = `/featured-cities${chart.link_hash}`

      if (this.isUserLoggedIn) {
        link = `/city-index${chart.link_hash}`
      }
      // For some charts, non-logged in users get sent to the registration page
      const linkHash = chart.link_hash.replace('#', '')
      if (
        !this.isUserLoggedIn
        &&
        (
          linkHash === 'clusters'
          ||
          linkHash === 'cities'
        )
      ) {
        link = '/login'
      }

      return link
    },
    /**
     * Is there more than one featured insights?
     * @returns {boolean}
     */
    hasMultipleSliders() {
      try {
        if (this.slice.items.length > 3) {
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

<style lang="scss">
.about-focussed-views {
  padding: 97px 0 100px;

  .container {
    max-width: 82%;
    margin-left: auto;
    margin-right: 0;
    //margin-right: 0;
    //padding-right: 0;
    @include respond-below(xl) {
      width: 100%;
      margin-right: auto;
    }
    @include respond-below(sm) {
      max-width: 100%;
      padding: 0 32px;
    }
  }

  &__header {
    padding-left: 52px;
    @include respond-below(xl) {
      padding: 0;
    }

    h2 {
      margin-bottom: 30px;
    }
  }

  &__chart-list {
    overflow: hidden;
    padding-right: 0;
    margin-bottom: 30px;
    @include respond-below(xl) {
      padding: 0 20px;
    }
    @include respond-below(sm) {
      padding: 0;
    }

    h4 {
      margin-bottom: 20px;
    }

    ul {
      display: flex;
      overflow: hidden;
      padding-top: 50px;
      margin-bottom: 30px;
      @include respond-below(xl) {
        height: auto;
        margin-bottom: 0;
        padding-top: 20px;
      }

      li {
        padding-left: 30px;
        @include respond-below(ipro) {
          padding: 0 20px;
        }
      }
    }

    &__chart {
      min-width: 338px;
      overflow: visible;
      @include respond-below(xl) {
        height: auto;
      }

      img {
        margin-bottom: 20px;
        max-width: 100%;
        width: 100%;
        height: auto;
        box-shadow: 5px 20px 40px rgba(34, 10, 18, 0.15);
        @include respond-below(ipro) {
          box-shadow: 5px 20px 20px rgba(34, 10, 18, 0.10);
        }
      }
    }

    .dots {
      padding-left: 30px;
    }

    @include respond-below(sm) {
      .dots {
        padding-left: 20px;
      }
    }
  }

  &__cta {
    margin-left: 30px;
    @include respond-below(xl) {
      margin: 0;
    }
    @include respond-below(sm) {
      padding: 0;
    }
  }

  @include respond-below(md) {
    padding: 50px 0 50px;
  }
}
</style>
