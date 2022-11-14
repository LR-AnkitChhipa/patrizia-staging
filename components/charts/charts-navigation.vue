<template>
  <nav class="charts-navigation">
    <ul class="charts-navigation__links">
      <li :class="getNavigationLinkClass('map')">
        <a href="#" title="View map" @click.prevent="setActiveChart('map')">Map</a>
      </li>
      <li v-if="!isFeaturedCities" :class="getNavigationLinkClass('cities')">
        <a href="#" title="View cities radial bar chart" @click.prevent="setActiveChart('cities')">Cities</a>
      </li>
      <li v-if="!isFeaturedCities" :class="getNavigationLinkClass('goals')">
        <a href="#" title="View city goals chart" @click.prevent="setActiveChart('goals')">City Clusters</a>
      </li>
      <li :class="getNavigationLinkClass('compare')">
        <a href="#" title="View city comparison chart" @click.prevent="setActiveChart('compare')">Compare</a>
      </li>
      <li :class="getNavigationLinkClass('table')">
        <a href="#" title="View cities list chart" @click.prevent="setActiveChart('table')">List</a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'ChartsNavigation',
  props: {
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
  mounted () {
    // if(this.isMobile()) {
    //   this.activeChart = 'table'
    // } else if(window.location.hash) {
    //   const locationHash = window.location.hash.replace('#', '')
    //   this.activeChart = locationHash
    // }
    if (window.location.hash) {
      const locationHash = window.location.hash.replace('#', '')
      this.activeChart = locationHash
    }
  },
  methods: {
    getNavigationLinkClass (chartName) {
      let className = 'charts-navigation__links__link'
      if (chartName === this.activeChart) {
        className += ' charts-navigation__links__link--active'
      }
      return className
    },
    setActiveChart (chartName) {
      this.activeChart = chartName
      this.$emit('navLinkSelected', chartName)
    }
  }
}
</script>

<style lang="scss">
.charts-navigation {
  //margin-top: 32px;

  @include respond-below(sm) {
    margin-top: 32px;
  }

  &__links {
    list-style: none;
    display: flex;
    margin: 0;
    padding: 0;

    &__link {
      margin-right: 30px;

      a {
        cursor: pointer;
        text-decoration: none;
        display: block;
        padding-bottom: 27px;
        border-bottom: 2px solid transparent;
        color: #B4A4A9;
        font-size: 14px;
        font-family: "Corporate S Pro Bold";
        line-height: 16px;
        letter-spacing: 0.072em;
        text-transform: uppercase;
      }

      @include respond-below(sm) {
        margin-right: 10px;
        a{
          padding-bottom: 0.8rem;
        }
      }

      &--active {
        a {
          border-bottom-color: #802437;
        }
      }
    }
  }

}
</style>
