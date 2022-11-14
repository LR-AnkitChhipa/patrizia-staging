<template>
  <section class="main-chart">
    <client-only placeholder="Loading...">
      <charts-navigation @navLinkSelected="setActiveChart" />
      <div class="main-chart__charts">
        <map-chart v-show="activeChart === 'map'" class="main-chart__charts__chart main-chart__charts__chart--without-top-margin" />
        <cities-chart v-show="activeChart === 'cities'" class="main-chart__charts__chart" />
        <goals-chart v-show="activeChart === 'goals'" class="main-chart__charts__chart" />
        <compare-chart v-show="activeChart === 'compare'" class="main-chart__charts__chart" />
        <table-chart v-show="activeChart === 'table'" class="main-chart__charts__chart" />
      </div>
    </client-only>
  </section>
</template>

<script>
import MapChart from '~/components/charts/map-chart'
import CitiesChart from '~/components/charts/cities-chart'
import GoalsChart from '~/components/charts/goals-chart'
import CompareChart from '~/components/charts/compare-chart'
import TableChart from '~/components/charts/table-chart'
import GoalsChartLowerAxis from '@/components/charts/goals-chart-lower-axis'
import ChartsNavigation from '@/components/charts/charts-navigation'

export default {
  name: 'MainChart',
  components: {
    ChartsNavigation,
    GoalsChartLowerAxis,
    TableChart,
    CompareChart,
    GoalsChart,
    CitiesChart,
    MapChart
  },
  data () {
    return {
      activeChart: 'map'
    }
  },
  methods: {
    getNavigationLinkClass (chartName) {
      let className = 'main-chart__navigation__links__link'
      if (chartName === this.activeChart) {
        className += ' main-chart__navigation__links__link--active'
      }
      return className
    },
    setActiveChart (chartName) {
      this.activeChart = chartName
    }
  }
}
</script>

<style scoped lang="scss">
.main-chart {
  position: relative;
  height: 1400px;
  overflow: hidden;

  &__navigation {
    position: absolute;
    margin-left: 50%;
    transform: translateX(-50%);
    margin-top: 40px;
    z-index: 100;
    height: 42px;

    &__links {
      list-style: none;
      display: flex;
      margin: 0;
      padding: 0;
      border: 1px solid black;
      border-radius: 25px;
      background-color: white;

      &__link {

        &--active {

          a {
            color: white !important;
            background-color: #7d7d7d;
          }
        }

        a {
          cursor: pointer;
          text-decoration: none;
          color: black;
          display: flex;
          align-items: center;
          margin: 0;
          height: 40px;
          padding: 0 15px;
          border-radius: 23px;
        }
      }
    }

  }

  &__charts {
    height: 100%;

    &__chart {
      margin-top: 100px;
      height: calc(100% - 100px);

      &--without-top-margin {
        margin-top: 0;
        height: 100%;
      }
    }
  }
}
</style>
