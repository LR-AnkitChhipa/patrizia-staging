<template>
  <section
    :class="`city-index-charts ${isFeaturedCities ? 'city-index-charts--featured-cities' : ''}`"
  >
    <client-only placeholder="Loading...">
      <b-container>
        <b-row>
          <b-col>
            <charts-navigation :is-featured-cities="isFeaturedCities" @navLinkSelected="setActiveChart" />
          </b-col>
        </b-row>
      </b-container>
      <b-container fluid>
        <button-link
          v-if="isFeaturedCities && !userLoggedIn"
          class="city-index-charts__cta"
          button-size="normal"
          label="LOGIN/REGISTER TO VIEW ALL 119 CITIES"
          url="/login"
        />
        <b-row>
          <b-col id="charts" class="city-index-charts__charts">
            <map-chart
              v-show="activeChart === 'map'"
              v-if="isFeaturedCities"
              class="city-index-charts__charts__chart city-index-charts__charts__chart--without-top-margin"
              :is-featured-cities="isFeaturedCities"
            />
            <map-chart-city-index
              v-show="activeChart === 'map'"
              v-if="!isFeaturedCities"
              class="city-index-charts__charts__chart city-index-charts__charts__chart--without-top-margin"
              :is-featured-cities="isFeaturedCities"
            />
            <cities-chart
              v-show="activeChart === 'cities'"
              class="city-index-charts__charts__chart"
            />
            <goals-chart
              v-show="activeChart === 'goals'"
              class="city-index-charts__charts__chart"
            />
            <compare-chart
              v-show="activeChart === 'compare'"
              class="city-index-charts__charts__chart"
              :is-featured-cities="isFeaturedCities"
            />
            <table-chart
              v-show="activeChart === 'table'"
              class="city-index-charts__charts__chart"
              :is-featured-cities-chart="isFeaturedCities"
            />
          </b-col>
        </b-row>
      </b-container>
    </client-only>
  </section>
</template>

<script>
import GoalsChartLowerAxis from '@/components/charts/goals-chart-lower-axis'
import TableChart from '@/components/charts/table-chart'
import CompareChart from '@/components/charts/compare-chart'
import GoalsChart from '@/components/charts/goals-chart'
import CitiesChart from '@/components/charts/cities-chart'
import MapChart from '@/components/charts/map-chart'
import ChartsNavigation from '@/components/charts/charts-navigation'
import MapChartCityIndex from '@/components/charts/map-chart-city-index'
import ButtonLink from '@/components/buttons/button-link'
import AuthService from '@/services/auth-service'

const VueScrollTo = require('vue-scrollto')

export default {
  name: 'CityIndexCharts',
  components: {
    ButtonLink,
    MapChartCityIndex,
    ChartsNavigation,
    GoalsChartLowerAxis,
    TableChart,
    CompareChart,
    GoalsChart,
    CitiesChart,
    MapChart
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
    },
    isFeaturedCities: {
      type: Boolean,
      default () {
        return false
      }
    }
  },
  data () {
    return {
      activeChart: 'map'
    }
  },
  middleware: 'auth',
  computed: {
    userLoggedIn () {
      return AuthService.isUserLoggedin(this)
    }
  },
  mounted () {
    // if (this.isMobile()) {
    //   this.activeChart = 'table'
    // } else if (window.location.hash) {
    //   const locationHash = window.location.hash.replace('#', '')
    //   this.activeChart = locationHash
    //   const scrollOptions = {
    //     duration: 500,
    //     easing: 'linear',
    //     offset: -190,
    //     force: true,
    //     cancelable: true,
    //     x: false,
    //     y: true
    //   }
    if (window.location.hash) {
      const locationHash = window.location.hash.replace('#', '')
      this.activeChart = locationHash
      const scrollOptions = {
        duration: 500,
        easing: 'linear',
        offset: -190,
        force: true,
        cancelable: true,
        x: false,
        y: true
      }
      // Dont scroll until the DOM has been updated
      this.$nextTick(function () {
        VueScrollTo.scrollTo('#charts', 500, scrollOptions)
      })
    }
  },
  methods: {
    setActiveChart (chartName) {
      this.activeChart = chartName
    }
  }
}
</script>

<style lang="scss">
.city-index-charts {
  margin-bottom: 87px;
  position: relative;

  &__cta {
    position: absolute;
    top: 100px;
    left: 40px;
    z-index: 10;

    @include respond-below(sm) {
      left: 1rem;
    }
  }

  &__charts {
    padding: 0;
    border-top: 2px solid #F5F3F4;
    box-shadow: 5px 20px 40px rgba(34, 10, 18, 0.1);

    &__chart {
      height: 100%;

      @include respond-between(xs, md) {
        min-height: 100vh;
        overflow: hidden;
      }
    }
  }

  #compare-filter{
    @include respond-between(xs, md) {
      top: auto;
      bottom: 40px;
    }

    @include respond-below(sm) {
      top: 1rem;
      left: 1rem;
      z-index: 5;
    }
  }
}
</style>
