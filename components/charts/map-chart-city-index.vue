<template>
  <section class="chart chart--map">
    <city-summary-modal v-if="isModalVisible" :city-id="modalCityId" @close="handleCloseModal()" />

    <GmapMap
      :center="center"
      :map-type-id="mapTypeId"
      :zoom="4"
      :options="{
        styles: mapStyle,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false,
        zoomControlOptions: {
          position: 8
        },
      }"
      class="chart--map__map"
    >
      <GmapInfoWindow
        :options="infoOptions"
        :position="infoPosition"
        :opened="infoOpened"
        @closeclick="infoOpened=false"
      >
        <div
          class="chart--map__map__info-window"
          @click="showCityInfo"
          v-html="infoContent"
        />
      </GmapInfoWindow>
      <GmapMarker
        v-for="(city, index) in filteredChartData"
        :key="index"
        :position="{lat: city.lat, lng: city.lng}"
        :icon="getIconMarker(city)"
        @click="toggleInfoWindow(city, index)"
      >
        <p />
      </GmapMarker>
    </GmapMap>
    <range-filter
      id="map-filter"
      :available-filters="['investmentStrategyGoals', 'liquidity', 'attractiveness']"
      @toggleInvestmentStrategyGoals="toggleCluster($event.name, $event.value)"
      @attractiveness-range-updated="attractivenessRangeUpdated"
      @liquidity-range-updated="liquidityRangeUpdated"
    />
  </section>
</template>

<script>
import RangeFilter from '~/components/inputs/range-filter'
import ToggleButton from '~/components/inputs/toggle-button'
import ChartService from '~/services/chart-service'
import MapService from '~/services/map-service'
import CitySummaryModal from '@/components/charts/city-summary-modal'

export default {
  name: 'MapChartCityIndex',
  components: {
    CitySummaryModal,
    ToggleButton,
    RangeFilter
  },
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
      infoPosition: null,
      infoContent: null,
      activeCity: null,
      isModalVisible: false,
      modalCityId: null,
      infoOpened: false,
      infoCurrentKey: null,
      infoOptions: {
        pixelOffset: {
          width: 0,
          height: -16
        }
      },
      liquidityFilters: null,
      attractivenessFilters: null,
      visibleClusters: ['powerful', 'affordable', 'liquid', 'innovative'], // The initially visible clusters
      chartData: null,
      filteredChartData: null,
      center: {
        lat: 48.327475,
        lng: 4.167950
      },
      mapTypeId: 'roadmap',

      mapStyle: MapService.getMapStyle()
    }
  },
  mounted () {
    this.loadChartData()
  },
  methods: {
    handleCloseModal () {
      this.modalCityId = null
      this.isModalVisible = false
    },
    attractivenessRangeUpdated (value) {
      this.attractivenessFilters = value
      if (process.client) {
        this.applyFilters()
      }
    },
    /**
     * Show the city information in the relevant way
     */
    showCityInfo () {
      this.modalCityId = this.activeCity.id
      this.isModalVisible = true
    },
    liquidityRangeUpdated (value) {
      this.liquidityFilters = value
      if (process.client) {
        this.applyFilters()
      }
    },
    getInfoWindowContent (city) {
      const content = `<p class="chart-tooltip__city">${city.name}</p>
<p class="chart-tooltip__country">${city.country}</p>
<p class="chart-tooltip__axis-label">Attractiveness</p>
<p class="chart-tooltip__axis-value">#${city.attractiveness_score}</p>
<p class="chart-tooltip__axis-label">Liquidity</p>
<p class="chart-tooltip__axis-value">#${city.liquidity_score}</p>
<p class="chart-tooltip__more">
<span class="primarylink textlink">
<svg class="right" xmlns="http://www.w3.org/2000/svg" width="5.044" height="9.567" viewBox="0 0 5.044 9.567">
      <path
        id="Path_2589"
        data-name="Path 2589"
        d="M0,0,4,4.449,0,8.9"
        transform="translate(0.372 0.334)"
        fill="none"
        stroke="#7f2336"
        stroke-width="1"
      /> </svg>
      Learn more</span>
</span>`
      return content
    },
    getPosition (marker) {
      return {
        lat: parseFloat(marker.lat),
        lng: parseFloat(marker.lng)
      }
    },
    toggleInfoWindow (marker, key) {
      // Just show the modal
      this.activeCity = marker
      this.infoContent = this.getInfoWindowContent(marker)
      this.showCityInfo()
      // this.infoPosition = this.getPosition(marker)
      // this.infoContent = this.getInfoWindowContent(marker)
      // if (this.infoCurrentKey === key) {
      //   this.infoOpened = !this.infoOpened
      // } else {
      //   this.infoOpened = true
      //   this.infoCurrentKey = key
      // }
    },
    async loadChartData () {
      const response = await ChartService.getMapData(this, this.isFeaturedCities)
      this.chartData = response.data
      this.filteredChartData = this.chartData
    },
    toggleCluster (name, enabled) {
      // If false, remove from the visibleClusters data property
      if (!enabled) {
        this.visibleClusters.splice(this.visibleClusters.indexOf(name), 1)
      } else {
        this.visibleClusters.push(name)
      }
      this.applyFilters()
    },
    // Apply all filters to the city data
    applyFilters () {
      const vm = this
      this.filteredChartData = null
      if (this.chartData && this.liquidityFilters && this.attractivenessFilters) {
        this.filteredChartData = this.chartData.filter(function (obj) {
          return !!((
            vm.visibleClusters.includes(obj.cluster.toLowerCase()) &&
            vm.liquidityFilters[obj.liquidity_rank] &&
            vm.attractivenessFilters[obj.attractiveness_rank]
          ))
        })
      }
    },
    getIconMarker (city) {
      let markerUrl = ''
      // if (
      //   this.activeOffice !== null &&
      //   city.cluster === this.activeOffice.office_name
      // ) {
      //   markerUrl = "/app/themes/redbeemedia/images/map-marker-active.svg";
      // } else {
      markerUrl = '/images/map-markers/' + city.cluster.toLowerCase() + '.svg'
      // }

      const marker = {
        url: markerUrl,
        scaledSize: {
          width: 16,
          height: 16
        },
        size: {
          width: 16,
          height: 16
        },
        // labelOrigin: { x: 8, y: 8 },
        anchor: {
          x: 8,
          y: 8
        }
      }
      return marker
    }
  }
}
</script>

<style lang="scss">
.gm-style-iw {
  //background-color: black !important;
  //color: white;

}

.city-index-charts__charts__chart {
  &.chart--map {
    //height: 1314px;
  }
}
.chart--map {

  &__toggles {
    position: absolute;
    left: 0;
    z-index: 10;
    background-color: white;
    top: 50%;
    transform: translateY(-50%);
    padding: 30px;
  }

  &__map {
    height: 100%;

    &__info-window {
      width: 200px;
      text-align: left;

      &__city-name {
        font-size: medium;
      }

      &__country {
        font-size: small;
      }

      &__rank {
        font-size: medium;
      }
    }
  }
}

#map-filter {
  top: 113px;
  left: 40px;

  @include respond-below(sm) {
    top: 1rem;
    left: 1rem;
  }
}
</style>
