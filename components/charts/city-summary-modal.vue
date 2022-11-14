<template>
  <div v-if="cityId" class="map-chart-modal">
    <div class="map-chart-modal__inner">
      <div v-if="!cityData" class="map-chart-modal__content__loading">
        Loading...
      </div>
      <p class="map-chart-modal__close" @click="close">
        Close
      </p>
      <div v-if="cityData !== null" class="map-chart-modal__content">
        <div class="map-chart-modal__header">
          <h2 class="map-chart-modal__header__title">
            {{ cityData.name }}
          </h2>
          <p class="map-chart-modal__header__country">
            {{ cityData.country }}
          </p>
        </div>
        <div class="map-chart-modal__content__stats">
          <b-row>
            <b-col md="6">
              <p class="subline">
                Population
              </p>
              <p class="map-chart-modal__content__stats__number">
                {{
                  Intl.NumberFormat('en-GB').format(cityData.population)
                }}
              </p>
            </b-col>
            <b-col md="6">
              <p class="subline">
                Unemployment rate
              </p>
              <p class="map-chart-modal__content__stats__number">
                {{ Intl.NumberFormat('en-GB').format(cityData.unemployment_rate) }}%
              </p>
            </b-col>
            <b-col md="6">
              <p class="subline">
                GDP (€ MILLIONS)
              </p>
              <p class="map-chart-modal__content__stats__number">
                {{ Intl.NumberFormat('en-GB').format(cityData.gdp_nuts3_million_euro) }}
              </p>
            </b-col>
            <b-col md="6">
              <p class="subline">
                Patent applications (per year)
              </p>
              <p class="map-chart-modal__content__stats__number">
                {{ Intl.NumberFormat('en-GB').format(cityData.patent_applications_per_city_per_year) }}
              </p>
            </b-col>
          </b-row>
        </div>
        <div class="map-chart-modal__content__description">
          <h3>{{ cityData.summary_title }}</h3>
          <div v-html="cityData.summary"></div>
        </div>
        <button-link label="Full city insights" :url="`/city/${cityData.slug}`" title="Full city insights" />
      </div>
      <div v-if="cityData" class="map-chart-modal__chart">
        <div class="map-chart-modal__chart__inner">
          <div class="map-chart-modal__chart__bar-chart">
            <modal-radial
              :overall-rank="cityData.overall_rank"
              :attractiveness-rank="formatNumber(cityData.attractiveness_score)"
              :market-rank="formatNumber(cityData.market_fundamentals_rank)"
              :economics-rank="formatNumber(cityData.economy_rank)"
              :connectivity-rank="formatNumber(cityData.connectivity_rank)"
              :innovation-rank="formatNumber(cityData.innovation_rank)"
            />
          </div>
          <table class="map-chart-modal__chart__table">
            <tr class="map-chart-modal__chart__table__row map-chart-modal__chart__table__row--attractiveness">
              <td class="map-chart-modal__chart__table__row__icon" />
              <td>Attractiveness</td>
              <td>#{{ formatNumber(cityData.overall_rank) }}</td>
            </tr>
            <tr class="map-chart-modal__chart__table__row map-chart-modal__chart__table__row--fundamentals">
              <td class="map-chart-modal__chart__table__row__icon" />
              <td>Market Fundamentals</td>
              <td>#{{ formatNumber(cityData.market_fundamentals_rank) }}</td>
            </tr>
            <tr class="map-chart-modal__chart__table__row map-chart-modal__chart__table__row--economics">
              <td class="map-chart-modal__chart__table__row__icon" />
              <td>Location Quality</td>
              <td>#{{ formatNumber(cityData.economy_rank) }}</td>
            </tr>
            <tr class="map-chart-modal__chart__table__row map-chart-modal__chart__table__row--connectivity">
              <td class="map-chart-modal__chart__table__row__icon" />
              <td>Connectivity</td>
              <td>#{{ formatNumber(cityData.connectivity_rank) }}</td>
            </tr>
            <tr class="map-chart-modal__chart__table__row map-chart-modal__chart__table__row--innovation">
              <td class="map-chart-modal__chart__table__row__icon" />
              <td>Innovation</td>
              <td>#{{ formatNumber(cityData.innovation_rank) }}</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DataService from '@/services/data-service'
import ButtonLink from '@/components/buttons/button-link'
import ModalRadial from "@/components/charts/modal-radial";

export default {
  name: 'CitySummaryModal',
  components: {ModalRadial, ButtonLink },
  props: {
    cityId: {
      type: Number,
      default () {
        return null
      }
    }
  },
  data () {
    return {
      cityData: null
    }
  },
  watch: {
    cityId (oldVal, newVal) {
      this.loadCityData()
    }
  },
  mounted () {
    this.loadCityData()
  },
  methods: {
    async loadCityData () {
      try {
        const response = await DataService.getCityData(this.cityId)
        this.cityData = response.data
      } catch (e) {
      }
    },
    /**
     * Close the modal
     */
    close () {
      this.cityData = null
      this.$emit('close')
    },
    formatNumber (val) {
      const formattedNumber = Math.ceil(val)
      return formattedNumber
    }
  }
}
</script>

<style lang="scss">
.map-chart-modal {
  font-family: "Corporate S Pro";
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1000;
  background-color: rgba(180, 164, 169, 0.4);
  display: flex;
  align-items: center;
  justify-content: space-around;

  &__close {
    position: absolute;
    top: 20px;
    right: 20px;
    width: 29px;
    height: 29px;
    text-indent: -10000px;
    cursor: pointer;
    background: {
      image: url("/images/icons/modal-close.svg");
      position: center;
      size: contain;
    };

  }

  &__inner {
    position: relative;
    background-color: white;
    box-shadow: 5px 20px 50px rgba(34, 10, 18, 0.15);
    width: 950px;
    display: flex;

    @include respond-below(sm) {
      width: 100%;
      flex-direction: column;
    }
  }

  &__header {

    &__title {
      margin-bottom: 0;
    }

    &__country {
      font-size: 16px;
      color: #B4A4A9;
    }
  }

  &__content {
    padding: 50px 0 50px 50px;
    @include respond-below(md){
      width: 100%;
    }
    @include respond-below(sm) {
      padding: 20px;
    }

    &__stats {
      margin-top: 48px;
      .row{
        @include respond-below(md){
          flex-direction: column;
          width: 100%;
        }
      }

      .subline {
        margin-bottom: 0;
      }

      &__number {
        font-size: 40px;
        line-height: 65px;
        letter-spacing: 0.04rem;
        font-family: "Corporate S Pro light";
        margin-bottom: 21px;
      }

    }

    &__description {
      margin-top: 11px;
      margin-bottom: 32px;
      margin-right: 32px;
    }
  }

  &__chart {
    flex: 0 0 398px;
    background-color: #F0ECED;
    padding: 50px 0;
    @include respond-below(sm) {
      padding: 20px;
      flex: 1;
      overflow: hidden;
    }

    &__bar-chart {
      width: 338px;
      height: 338px;
      margin: 0 auto;
      background-color: rgba(255,255,255,0.6);
      border-radius: calc(338px / 2);
      display: flex;
      align-items: center;
      justify-content: space-around;
      @include respond-below(sm) {
        width: 290px;
        height: 290px;
        border-radius: calc(290px / 2);
        overflow: hidden;
      }
    }

    &__table {
      width: 246px;
      margin: 23px auto 0;
      padding: 0;

      tr, td {
        padding: 0;
      }

      td {
        padding-bottom: 17px;

        &:nth-child(3) {
          text-align: right;
        }
      }

      &__row {

        &--attractiveness {
          border-bottom: 2px solid #E1DADC;

          td {
            padding-bottom: 21px;
          }

          .map-chart-modal__chart__table__row__icon:after {
            background-color: #802537;
          }
        }

        &--fundamentals {
          td {
            padding-top: 21px;
          }

          .map-chart-modal__chart__table__row__icon:after {
            background-color: #29B5BA;
          }
        }

        &--demographics {
          td {
            padding-top: 21px;
          }

          .map-chart-modal__chart__table__row__icon:after {
            background-color: #29B5BA;
          }
        }

        &--economics {
          .map-chart-modal__chart__table__row__icon:after {
            background-color: #6AC6F1;
          }
        }

        &--connectivity {
          .map-chart-modal__chart__table__row__icon:after {
            background-color: #F29131;
          }
        }

        &--innovation {
          .map-chart-modal__chart__table__row__icon:after {
            background-color: #A44993;
          }
        }

        &__icon {
          &:after {
            content: '';
            display: block;
            width: 10px;
            height: 10px;
            background-color: #7d7d7d;
            border-radius: 5px;
          }
        }
      }
    }
  }
}
</style>
