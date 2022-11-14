<template>
  <section class="about-city-ranking">
    <div class="about-city-ranking__bg-image" :style="bgImageStyle" />
    <div class="about-city-ranking__bg-circle" />
    <b-container>
      <b-row class="about-city-ranking__header">
        <b-col cols="12" md="6">
          <prismic-rich-text :field="slice.primary.about_city_ranking_header_content" />
        </b-col>
        <b-col cols="12" md="6" class="about-city-ranking__mobile-slide about-city-ranking__mobile-slide--venn">
          <prismic-image :image="slice.primary.about_city_ranking_header_image" />
        </b-col>
      </b-row>
      <b-row class="about-city-ranking__chart">
        <b-col>
          <prismic-image :image="slice.primary.about_city_ranking_chart_image" />
        </b-col>
      </b-row>
      <b-row class="about-city-ranking__examples">
        <b-col md="6">
          <p
            v-if="slice.primary.about_city_ranking_city_examples_title"
            class="about-city-ranking__examples__title"
          >
            {{ slice.primary.about_city_ranking_city_examples_title }}
          </p>
          <div
            class="about-city-ranking__examples__accordion accordion"
          >
            <div
              v-for="(city, cityIndex) in slice.items"
              :key="cityIndex"
            >
              <b-button
                v-b-toggle="'accordion-item-' + cityIndex"
                :class="'about-city-ranking__examples__accordion__item-title about-city-ranking__examples__accordion__item-title--' + city.city_cluster.toLowerCase()"
              >
                <span>{{ city.example_city_name }}</span>
              </b-button>
              <b-collapse
                :id="'accordion-item-' + cityIndex"
                :visible="(cityIndex === 0)"
                accordion="aboutblock"
                class="about-city-ranking__examples__accordion__item-content"
              >
                <prismic-rich-text :field="city.example_city_description" />
              </b-collapse>
            </div>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </section>
</template>

<script>
import PrismicImage from '@/components/prismic-image'

export default {
  name: 'AboutCityRanking',
  components: { PrismicImage },
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
  computed: {
    bgImageStyle () {
      if (this.slice.primary.about_city_ranking_background_image) {
        return {
          backgroundImage: 'url(' + this.slice.primary.about_city_ranking_background_image.url + ')'
        }
      } else {
        return null
      }
    }
  }
}
</script>

<style lang="scss">
.about-city-ranking {
  background: linear-gradient(rgba(240, 236, 237, 0.5), rgba(240, 236, 237, 0.3));
  padding: 90px 0 88px;
  overflow: hidden;
  position: relative;
  @include respond-below(sm){
    padding: 40px 0 40px;
  }

  &__mobile-slide {
    @include respond-below(sm) {
      margin-right: 0;
      padding-right: 0;
      width: calc(100vw - 16px);
      overflow: auto;
      position: relative;
      height: 300px;

      &--venn {
        height: 200px;
      }

      &--chart {
        height: 300px;
      }

      img, svg {
        height: 100% !important;
        width: auto !important;
      }
    }
  }

  &__bg-circle {
    background: radial-gradient(rgba(225, 243, 252, 1), rgba(255, 255, 255, 0));
    width: 3750px;
    height: 3750px;
    position: absolute;
    top: -260px;
    left: -260px;
    border: 1px solid red;
  }

  &__bg-image {
    position: absolute;
    bottom: 0;
    right: 0;
    width: 746px;
    height: 680px;
    z-index: 1;
    background: {
      position: bottom right;
      size: contain;
      repeat: no-repeat;
    };
    @include respond-below(md){
      display: none;
    }
  }

  &__header {
    position: relative;
    z-index: 2;
    div{
      svg{
        width: 100%;
        height: auto;
      }
    }
  }

  &__chart {
    margin-top: 50px;
    position: relative;
    z-index: 2;
    div{
      svg{
        width: 100%;
        height: auto;
      }
    }
  }

  &__examples {
    margin-top: 48px;
    position: relative;
    z-index: 2;

    &__title {
      color: #9C3F57;
      font-size: 16px;
      line-height: 21px;
      font-family: "Corporate S Pro Bold";
      margin-bottom: 11px;
    }

    &__accordion {
      &__item-title {

        span {
          display: flex;

          &:before {
            display: block;
            margin-right: 10px;
            margin-top: 2px;
            content: '';
            width: 10px;
            height: 10px;
            border-radius: 5px;
          }
        }

        &--innovative {
          span:before {
            background-color: #A44993;
          }
        }

        &--powerful {
          span:before {
            background-color: #B4A4A9;
          }
        }

        &--affordable {
          span:before {
            background-color: #A8EAED;
          }
        }

        &--liquid {
          span:before {
            background-color: #B4A4A9;
          }
        }
      }

      &__item-content {

        max-width: 460px;
        div{
          padding-top: 31px;
        }
      }
    }
  }
}
</style>
