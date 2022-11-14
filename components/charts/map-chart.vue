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
    <map-range-filter
      id="map-filter"
      @filters-updated="filtersUpdated"
    />
  </section>
</template>

<script>
import ToggleButton from '~/components/inputs/toggle-button'
import ChartService from '~/services/chart-service'
import MapService from '~/services/map-service'
import MapRangeFilter from "@/components/inputs/map-range-filter";
import CitySummaryModal from "@/components/charts/city-summary-modal";

export default {
  name: 'MapChart',
  components: {
    CitySummaryModal,
    MapRangeFilter,
    ToggleButton,
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
      filtersSelected: null,
      rangesSelected: null,
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
    filtersUpdated({filters, ranges}) {
      this.filtersSelected = filters
      this.rangesSelected = ranges
      this.applyFilters()
    },
    handleCloseModal () {
      this.modalCityId = null
      this.isModalVisible = false
    },
    /**
     * Show the city information in the relevant way
     */
    showCityInfo () {
        this.modalCityId = this.activeCity.id
        this.isModalVisible = true
    },
    getInfoWindowContent (city) {
      // const content = '<p class="chart--map__map__info-window__city-name">' + city.name +
      //   '</p><p class="chart--map__map__info-window__country">' +
      //   city.country +
      //   '</p><p class="chart--map__map__info-window__rank">' +
      //   'Overall Rank ' + city.attractiveness_score +
      //   '<hr/>Liquidity rank: ' + city.liquidity_rank + '<br/>' +
      //   'Attractiveness rank: ' + city.attractiveness_rank +
      //   '</p>'
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
</p>`
      return content
    },
    getPosition (marker) {
      return {
        lat: parseFloat(marker.lat),
        lng: parseFloat(marker.lng)
      }
    },
    toggleInfoWindow (marker, key) {
      this.activeCity = marker

      if(this.isFeaturedCities) {
        this.showCityInfo()
      } else {
        this.infoPosition = this.getPosition(marker)
        this.infoContent = this.getInfoWindowContent(marker)
        if (this.infoCurrentKey === key) {
          this.infoOpened = !this.infoOpened
        } else {
          this.infoOpened = true
          this.infoCurrentKey = key
        }
      }
    },
    async loadChartData () {
      const response = await ChartService.getMapData(this, this.isFeaturedCities)
      this.chartData = response.data
      this.filteredChartData = this.chartData
    },
    // Apply all filters to the city data
    applyFilters () {
      const vm = this
      this.filteredChartData = null
      if (this.chartData) {
        this.filteredChartData = this.chartData.filter(function (obj) {
          // Does this cities properties fall inside the range of the selected filters
          const demoRange = vm.rangesSelected.market_fundamentals
          const cityDemoScore = obj[vm.filtersSelected.market_fundamentals]

          const economicsRange = vm.rangesSelected.location_quality
          const cityEconomicsScore = obj[vm.filtersSelected.location_quality]

          const innovationRange = vm.rangesSelected.innovation
          const cityInnovationScore = obj[vm.filtersSelected.innovation]

          const connectivityRange = vm.rangesSelected.connectivity
          const cityConnectivityScore = obj[vm.filtersSelected.connectivity]

          if(
            (cityDemoScore >= demoRange[0] && cityDemoScore <= demoRange[1])
            &&
            (cityEconomicsScore >= economicsRange[0] && cityEconomicsScore <= economicsRange[1])
            &&
            (cityInnovationScore >= innovationRange[0] && cityInnovationScore <= innovationRange[1])
            &&
            (cityConnectivityScore >= connectivityRange[0] && cityConnectivityScore <= connectivityRange[1])
          ) {
            return obj;
          }
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
    //height: calc(100vh - 250px);
    height: 88vh;
    //min-height: 900px;
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
