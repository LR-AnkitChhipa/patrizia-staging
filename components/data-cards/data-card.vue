<template>
  <div :class="cardCssClass" v-if="cityData">
    <client-only>
    <intersect
      :root="intersectionObserverRootElement"
      :threshold="[0.9]"
      @enter="isInViewport = true"
      @leave="isInViewport = false"
    >
      <div class="data-card__inner">
        <header v-if="showCityInfo" class="data-card__header">
          <div class="data-card__header__text">
            <p class="data-card__header__text__country subline">
              {{ cityData.country }}
            </p>
            <p class="data-card__header__text__city">
              {{ cityData.name }}
            </p>
          </div>
          <div class="data-card__header__flag" :style="flagStyle" />
        </header>
        <b-alert v-if="errorMsg" show variant="error">
          {{ errorMsg }}
        </b-alert>
        <component :is="dataCardInnerComponent" v-if="dataCardInnerComponent" :city-data="cityData" :is-in-viewport="isInViewport" :animation-disabled="animationDisabled" />
        <footer v-if="showCityInfo" class="data-card__footer">
          <text-link text="View city data" :nuxt-url="'/city/' + cityData.slug" />
        </footer>
      </div>
    </intersect>
    </client-only>
  </div>
</template>

<script>
import DataCardInnerDemographicsPopulation from '@/components/data-cards/data-card-inner-demographics-population'
import DataCardInnerDemographicsPopulationForecast
  from '@/components/data-cards/data-card-inner-demographics-population-forecast'
import DataCardInnerDemographicsHouseholds from '@/components/data-cards/data-card-inner-demographics-households'
import DataCardInnerDemographicsUnemployment from '@/components/data-cards/data-card-inner-demographics-unemployment'

import Header from '@/components/header'
import TextLink from '@/components/text-link'
import DataCardInnerDemographicsCityCountrysideRatio
  from '@/components/data-cards/data-card-inner-demographics-city-countryside-ratio'
import DataCardInnerDemographicsOldAgeRatio from '@/components/data-cards/data-card-inner-demographics-old-age-ratio'
import DataCardInnerDemographicsPrivateHouseholds
  from '@/components/data-cards/data-card-inner-demographics-private-households'
import DataCardInnerDemographicsWorkingPopulation
  from '@/components/data-cards/data-card-inner-demographics-working-population'
import DataCardInnerEconomyWorkingPopulation from '@/components/data-cards/data-card-inner-economy-working-population'
import DataCardInnerEconomyUnemploymentRate from '@/components/data-cards/data-card-inner-economy-unemployment-rate'
import DataCardInnerEconomyPurchasingPower from '@/components/data-cards/data-card-inner-economy-purchasing-power'
import DataCardInnerEconomyHouseholdIncome from '@/components/data-cards/data-card-inner-economy-household-income'
import DataCardInnerEconomyGdp from '@/components/data-cards/data-card-inner-economy-gdp'
import DataCardInnerInnovationHeStudents from '@/components/data-cards/data-card-inner-innovation-he-students'
import DataCardInnerInnovationPatents from '@/components/data-cards/data-card-inner-innovation-patents'
import DataCardInnerInnovationYoung from '@/components/data-cards/data-card-inner-innovation-young'
import DataCardInnerConnectivityCommute from '@/components/data-cards/data-card-inner-connectivity-commute'
import DataCardInnerConnectivityCommuteTime from '@/components/data-cards/data-card-inner-connectivity-commute-time'
import DataCardInnerConnectivityDepartures from '@/components/data-cards/data-card-inner-connectivity-departures'
import DataCardInnerDemographicsBirthRate from '@/components/data-cards/data-card-inner-demographics-birth-rate'
import DataCardInnerConnectivityPublicTransportCommuters
  from '@/components/data-cards/data-card-inner-connectivity-public-transport-commuters'

export default {
  name: 'DataCard',
  components: {
    DataCardInnerConnectivityPublicTransportCommuters,
    DataCardInnerConnectivityDepartures,
    DataCardInnerConnectivityCommuteTime,
    DataCardInnerConnectivityCommute,
    DataCardInnerInnovationYoung,
    DataCardInnerInnovationPatents,
    DataCardInnerInnovationHeStudents,
    DataCardInnerEconomyGdp,
    DataCardInnerEconomyHouseholdIncome,
    DataCardInnerEconomyPurchasingPower,
    DataCardInnerEconomyUnemploymentRate,
    DataCardInnerEconomyWorkingPopulation,
    DataCardInnerDemographicsWorkingPopulation,
    DataCardInnerDemographicsPrivateHouseholds,
    DataCardInnerDemographicsOldAgeRatio,
    DataCardInnerDemographicsCityCountrysideRatio,
    DataCardInnerDemographicsUnemployment,
    TextLink,
    DataCardInnerDemographicsHouseholds,
    Header,
    DataCardInnerDemographicsPopulation,
    DataCardInnerDemographicsPopulationForecast,
    DataCardInnerDemographicsBirthRate,

  },
  props: {
    errorMsg: {
      type: String,
      default () {
        return ''
      }
    },
    animationDisabled: {
      type: Boolean,
      default () {
        return false
      }
    },
    /**
     * The card type, this is used to decide which child card is loaded
     */
    cardType: {
      type: String,
      default () {
        return ''
      }
    },
    /**
     * Data from the city data API endpoint
     */
    cityData: {
      type: Object,
      default () {
        return null
      }
    },
    /**
     * Show the city info header and footer?
     */
    showCityInfo: {
      type: Boolean,
      default () {
        return false
      }
    },
    clusterName: {
      type: String,
      default () {
        return 'demographics'
      }
    }
  },
  data () {
    return {
      isInViewport: false,
      intersectionObserverRootElement: null
    }
  },
  computed: {
    dataCardInnerComponent () {
      const componentName = 'DataCardInner' + this.cardType
      if (this.$options.components[componentName]) {
        return componentName
      } else {
        this.errorMsg = 'Unable to load "' + componentName + '"'
      }
    },
    cardCssClass () {
      return 'data-card' + ' data-card--cluster-' + this.clusterName + (this.showCityInfo ? ' data-card--with-city-info' : '')
    },
    /**
     * Get the style obj for the flag
     * @returns {{backgroundImage: string}}
     */
    flagStyle () {
      return {
        backgroundImage: "url('/images/flags/" + this.cityData.country_code.toLowerCase() + ".svg')"
      }
    }
  },
  mounted () {
    if (process.client && this.cityData) {
      this.intersectionObserverRootElement = this.$el.querySelector('.data-card__inner')
    }
  }
}
</script>

<style lang="scss">
$loading-color: #B4A4A9;
$color: #29B5BA;

.data-card {
  filter: drop-shadow(5px 20px 50px rgba(34, 10, 18, 0.15));

  &--with-city-info {
    .data-card__inner {
      height: 398px;
    }
  }

  &--cluster {
    &-demographics {
      .data-card__inner {
        border-top-color: #29B5BA;
      }
    }

    &-economy {
      .data-card__inner {
        border-top-color: #4D9CCE;
      }
    }

    &-innovation {
      .data-card__inner {
        border-top-color: #652B74;
      }
    }

    &-connectivity {
      .data-card__inner {
        border-top-color: #F29131;
      }
    }
  }

  &__header {
    height: 89px;
    margin: 0 24px;
    padding: 20px 0 14px;
    border-bottom: 1px solid #D8D0D3;
    display: flex;
    justify-content: space-between;
    align-items: center;

    &__text {

      &__city {
        font-size: 30px;
        font-family: "Georgia Pro Semibold";
        line-height: 36px;
        color: #802337;
        margin-bottom: 0;
      }

      &__country {
        margin-bottom: 2px;
      }
    }

    &__flag {
      flex: 0 0 42px;
      max-width: 42px;
      overflow: hidden;
      height: 42px;
      border-radius: 21px;
      background: {
        position: center;
        size: cover;
        repeat: no-repeat;
      };
    }
  }

  &__footer {
    margin: 0 24px;
    padding: 21px 0 22px;
    border-top: 1px solid #D8D0D3;
    display: flex;
    align-items: center;
  }

  &__inner {
    clip-path: polygon(100% 0, 100% calc(100% - 40px), calc(100% - 30px) 100%, 0 100%, 0 0);
    background-color: white;
    margin-bottom: 32px;
    color: $color;
    width: 338px;
    position: relative;
    z-index: 1;
    border-top: 8px solid #29B5BA;
  }
}
</style>
