<template>
  <section class="city-analysis-cards" v-if="slice">
    <b-container>
      <b-row v-if="slice.items" class="city-analysis-cards__cards">
        <div
          v-for="card in slice.items"
          :key="card.id"
          class="col-md-4 col-xs-12 city-analysis-cards__cards__card"
        >
          <div class="city-analysis-cards__cards__card__inner" :style="getCardStyle(card)">
            <div class="city-analysis-cards__cards__card__header" :style="getHeaderStyle(card)">
              <div class="city-analysis-cards__cards__card__header__inner">
                <prismic-image
                  v-if="card.city_analysis_card_header_icon"
                  :image="card.city_analysis_card_header_icon"
                  class="city-analysis-cards__cards__card__header__icon"
                />
                <h2 class="city-analysis-cards__cards__card__header__title" v-if="card.city_analysis_card_title">
                  {{ card.city_analysis_card_title }}</h2>
              </div>
            </div>
            <div class="city-analysis-cards__cards__card__body" v-if="card.city_analysis_card_title">
              <prismic-rich-text :field="card.city_analysis_card_content"/>
              <div class="city-analysis-cards__cards__card__body__button">
                <login-to-view-button>
                  <button-link
                    v-if="card.city_analysis_card_button_link && card.city_analysis_card_button_text"
                    button-size="regular"
                    button-style="primary primary--style1"
                    :label="card.city_analysis_card_button_text"
                    :prismic-link-object="card.city_analysis_card_button_link"/>
                </login-to-view-button>
              </div>
            </div>
          </div>
        </div>
      </b-row>
    </b-container>
  </section>
</template>

<script>
import ButtonLink from '@/components/buttons/button-link'
import TextLink from '@/components/text-link'
import PrismicImage from "@/components/prismic-image";
import LoginToViewButton from "@/components/login-to-view-button";

export default {
  name: 'CityAnalysisCards',
  components: {LoginToViewButton, ButtonLink, PrismicImage},
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
  methods: {
    getCardStyle(card) {
      if (card.city_analysis_card_highlight_colour) {
        const rgb = this.hexToRgb(card.city_analysis_card_highlight_colour)
        return {
          boxShadow: `0 30px 50px rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.3)`
        }
      }
      return null
    },
    /**
     * Get the card header style
     * @param card
     * @returns {null|{backgroundImage: string}}
     */
    getHeaderStyle(card) {
      if (card.city_analysis_card_header_image) {
        return {
          backgroundImage: `url('${card.city_analysis_card_header_image.url}')`
        }
      }
      return null
    },
    hexToRgb(hex) {
      let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      } : null;
    }
  }
}
</script>

<style lang="scss">
.city-analysis-cards {
  padding: 64px 0 100px;

  &__cards {
    align-items: stretch;

    &__card {
      margin-bottom: 30px;
      &__inner {
        height: 100%;
        width: 100%;
        position: relative;
        padding-bottom: 90px;
      }

      &__header {
        width: 100%;
        height: 220px;
        display: flex;
        align-items: center;
        justify-content: space-around;
        background: {
          size: cover;
          position: center;
          repeat: no-repeat;
        };
        color: white;

        &__title {
          font-size: 18px;
          font-family: "Georgia Pro Semibold";
          color: white;
          margin-bottom: 0;
        }

        &__icon {
          margin-bottom: 16px;
          width: auto;
          height: 33px;
        }

        &__inner {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-around;
        }
      }

      &__body {
        padding: 20px;

        p {
          strong {
            color: #802437;
            font-family: "Georgia Pro Semibold";
            line-height: 26px;
          }

          &:last-child {
            margin-bottom: 0;
          }
        }

        &__button{
          position: absolute;
          bottom: 20px;
        }

      }
    }
  }
  @include respond-below(sm) {
    padding: 30px 0 0;
  }
}
</style>
