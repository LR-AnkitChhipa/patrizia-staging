<template>
  <section class="chart chart-cities">
    <city-summary-modal v-if="isModalVisible" :city-id="modalCityId" @close="handleCloseModal()" />
    <div id="cities_tooltip" class="chart-tooltip chart-tooltip--cities">
      <div class="chart-tooltip__close" @click="closeTooltip"><svg xmlns="http://www.w3.org/2000/svg" width="12.021" height="12.021" viewBox="0 0 12.021 12.021">
        <g id="Group_5382" data-name="Group 5382" transform="translate(-79.549 -1795.698) rotate(45)">
          <line id="Line_625" data-name="Line 625" x2="16" transform="translate(1326.5 1213.5)" fill="none" stroke="#802537" stroke-width="1"/>
          <line id="Line_626" data-name="Line 626" x2="16" transform="translate(1334.5 1205.5) rotate(90)" fill="none" stroke="#802537" stroke-width="1"/>
        </g>
      </svg>
      </div>
      <div class="chart-tooltip__inner" @click="showCityInfo"></div>
    </div>

    <range-filter
      id="cities-filter"
      :available-filters="['investmentStrategyGoals', 'liquidity', 'attractiveness', 'strategyDimensions', 'countries']"
      :enabled-strategy-dimensions="['liquidity', 'attractiveness']"
      :minimum-allowed-strategy-dimensions="1"
      @attractiveness-range-updated="attractivenessRangeUpdated"
      @liquidity-range-updated="liquidityRangeUpdated"
      @toggleInvestmentStrategyGoals="toggleStrategyGoal($event.name, $event.value)"
      @toggleStrategyDimension="toggleRank($event.name, $event.value)"
      @selectedCountriesUpdated="selectedCountriesUpdated"
    />

    <div class="chart-cities__toggles"/>
    <div
      id="chart-area"
      :class="'chart-cities__chart' + (isChartAnimated ? '  chart-cities__chart--with-animation' : '')"
    />
    <div class="chart-cities__order">
      <p>Order by</p>
      <select-wrapper>
        <select
          v-model="selectedOrderByOption"
        >
          <option v-for="(option, i) in orderByOptions" :key="i" :value="option.value">
            {{ option.text }}
          </option>
        </select>
      </select-wrapper>
    </div>
  </section>
</template>

<script>
import * as d3 from 'd3'
import ChartService from '~/services/chart-service'
import ToggleButton from '@/components/inputs/toggle-button'
import RangeFilter from '@/components/inputs/range-filter'
import SelectWrapper from "@/components/inputs/select-wrapper";
import CitySummaryModal from "@/components/charts/city-summary-modal";

export default {
  name: 'CitiesChart',
  components: {CitySummaryModal, SelectWrapper, RangeFilter, ToggleButton},
  data() {
    return {
      isModalVisible: false,
      modalCityId: null,
      chartData: null,
      isChartAnimated: true,
      orderByOptions: [
        {
          text: 'Liquidity',
          value: 'liquidity'
        },
        {
          text: 'Attractiveness',
          value: 'attractiveness'
        }
      ],
      selectedOrderByOption: 'attractiveness',
      filteredChartData: null,
      liquidityFilters: null,
      selectedCountries: [],
      attractivenessFilters: null,
      visibleClusters: ['', 'powerful', 'affordable', 'liquid', 'innovative'], // The initially visible clusters
      visibleRanks: ['liquidity', 'attractiveness'], // The initially visible ranks
      svg: null
    }
  },
  watch: {
    selectedOrderByOption: {
      handler() {
        this.applyFilters()
      }
    }
  },
  mounted() {
    this.loadData()
  },
  methods: {
    /**
     * Close the city info modal
     */
    handleCloseModal () {
      this.modalCityId = null
      this.isModalVisible = false
    },
    /**
     * Show the city information in the relevant way
     */
    showCityInfo () {
      this.isModalVisible = true
    },
    closeTooltip() {
      const tooltipDiv = d3.select('#cities_tooltip')
      tooltipDiv.style('display', 'none')
    },
    getTooltipContent(city) {

      const html = `
<p class="chart-tooltip__city">${city.name}</p>
<p class="chart-tooltip__country">${city.country}</p>
<p class="chart-tooltip__axis-label">Attractiveness</p>
<p class="chart-tooltip__axis-value">#${city.attractiveness_score}</p>
<p class="chart-tooltip__axis-label">Liquidity</p>
<p class="chart-tooltip__axis-value">#${city.liquidity_score}</p>
<p class="chart-tooltip__axis-label">Investment strategy goal</p>
<p class="chart-tooltip__axis-value">#${city.cluster}</p>
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

      return html
    },
    attractivenessRangeUpdated(value) {
      this.attractivenessFilters = value
      if (process.client) {
        this.applyFilters()
      }
    },
    liquidityRangeUpdated(value) {
      this.liquidityFilters = value
      if (process.client) {
        this.applyFilters()
      }
    },
    selectedCountriesUpdated(value) {
      this.selectedCountries = value
      if (process.client) {
        this.applyFilters()
      }
    },
    toggleStrategyGoal(goalName, isEnabled) {
      this.isChartAnimated = false
      this.svg.selectAll('rect').attr('height', 0)
      // If false, remove from the visibleClusters data property
      if (!isEnabled) {
        this.visibleClusters.splice(this.visibleClusters.indexOf(goalName), 1)
      } else {
        this.visibleClusters.push(goalName)
      }
      this.applyFilters()
      setTimeout(() => {
        this.isChartAnimated = true
      }, 300)
    },
    toggleRank(name, isEnabled) {
      // If false, remove from the visibleRanks data property
      if (!isEnabled) {
        this.visibleRanks.splice(this.visibleRanks.indexOf(name), 1)
      } else if(!this.visibleRanks.includes(name)) {
        this.visibleRanks.push(name)
      }
      this.applyFilters()
    },
    // Apply all filters to the city data
    applyFilters(isFirstLoad = false) {
      const vm = this
      this.filteredChartData = null
      if (this.chartData && this.liquidityFilters && this.attractivenessFilters) {
        // filter out unselected things
        this.filteredChartData = this.chartData.filter(function (obj) {
          return (
            vm.visibleClusters.includes(obj.cluster.toLowerCase()) &&
            vm.liquidityFilters[obj.liquidity_rank] &&
            vm.attractivenessFilters[obj.attractiveness_rank] &&
            vm.selectedCountries.includes(obj.country)
          )
        })

        // sort by selectedOrderByOption
        if (this.selectedOrderByOption === 'attractiveness') {
          this.filteredChartData.sort(sortByAttractiveness)
        } else {
          this.filteredChartData.sort(sortByLiquidity)
        }
        this.drawChart(isFirstLoad)
      }

      function sortByAttractiveness(a, b) {
        if (a.attractiveness_score < b.attractiveness_score) {
          return -1
        }
        if (a.attractiveness_score > b.attractiveness_score) {
          return 1
        }
        return 0
      }

      function sortByLiquidity(a, b) {
        if (a.liquidity_score < b.liquidity_score) {
          return -1
        }
        if (a.liquidity_score > b.liquidity_score) {
          return 1
        }
        return 0
      }
    },
    async loadData() {
      const response = await ChartService.getCitiesData(this)
      this.chartData = response.data
      this.applyFilters(true)
    },

    drawChart(isFirstLoad = true) {
      const data = this.filteredChartData
      const containerWidth = 1100
      const containerHeight = 1100

      if (this.svg === null) {
        this.svg = d3.select('#chart-area').append('svg')
          .attr('width', containerWidth)
          .attr('height', containerHeight)
      }

      const bars = data.map(d => d.name)

      /**
       * The anonymous angle function the returns the angle at which whatever element should be rotated
       */
      const angle = d3.scaleBand()
        .domain(bars)
        .range([-90, 270])
        .paddingInner(0)
        .paddingOuter(0)

      const attractivenessCities = this.svg.selectAll('rect.attractiveness_score_plot_value').data(data)
      const liquidityCities = this.svg.selectAll('rect.liquidity_score_plot_value').data(data)
      const greyBarsAttractiveness = this.svg.selectAll('rect.grey_bars_attractiveness').data(data)
      const greyBarsLiquidity = this.svg.selectAll('rect.grey_bars_liquidity').data(data)
      // Draw the attractiveness lines
      const chartWidth = 800
      const centreCircleRadius = chartWidth * 0.065826331

      // this.svg.selectAll('rect.attractiveness_score_plot_value').attr('height', 0)
      // this.svg.selectAll('rect.liquidity_score_plot_value').attr('height', 0)
      this.svg.selectAll('rect').attr('height', 0)

      let lineLength = chartWidth / 2 - centreCircleRadius
      if (this.visibleRanks.includes('attractiveness')) {
        this.drawGreyBackgroundBars(data, centreCircleRadius, lineLength, greyBarsAttractiveness, 'grey_bars_attractiveness', angle, containerWidth, containerHeight, 3)
        // }
        const distanceFromCentre = (this.visibleRanks.includes('liquidity')) ? centreCircleRadius + (lineLength / 4) + 5 : centreCircleRadius
        this.drawRadialLineData(data, 'attractiveness_score_plot_value', distanceFromCentre, lineLength, attractivenessCities, angle, containerWidth, containerHeight, 3)
      }

      if (this.visibleRanks.length === 2) {
        const maskRadius = chartWidth / 4 - centreCircleRadius
        this.svg.select('circle.liquidity-mask').attr('r', maskRadius)
      } else {
        this.svg.select('circle.liquidity-mask').attr('r', 0)
      }
      // Draw the liquidity lines
      if (this.visibleRanks.includes('liquidity')) {
        // If we're not showing the attractiveness rank, set the chart size to full size
        if (this.visibleRanks.includes('attractiveness')) {
          lineLength = chartWidth / 4 - centreCircleRadius
        }

        if (this.visibleRanks.length === 2 && isFirstLoad) {
          this.drawWhiteCircle(containerWidth, containerHeight, lineLength, 'liquidity-mask')
        }

        this.drawGreyBackgroundBars(data, centreCircleRadius, lineLength, greyBarsLiquidity, 'grey_bars_liquidity', angle, containerWidth, containerHeight, 3)

        this.drawRadialLineData(data, 'liquidity_score_plot_value', centreCircleRadius + 1, lineLength, liquidityCities, angle, containerWidth, containerHeight, 3)
      }
      // Draw a white circle in the centre
      this.drawWhiteCircle(containerWidth, containerHeight, centreCircleRadius, 'centre-mask')

      const vm = this
      const tooltipDiv = d3.select('#cities_tooltip')
      /// //////////////////////////////////////////
      // Draw the dots //////////////////////////
      /// //////////////////////////////////////////
      this.svg.selectAll('circle.dot').remove()
      const dots = this.svg.selectAll('circle.dot').data(data)
      dots.enter().append('circle')
        .attr('cx', -centreCircleRadius / 2)
        .attr('cy', 0)
        .attr('r', 6)
        .attr('class', function (d, i) {
          return 'dot dot--' + (d.cluster.toLowerCase() ? d.cluster.toLowerCase() : 'no-cluster')
        })
        .style('transform', (d, i) => {
          const xBase = containerWidth / 2
          const yBase = containerHeight / 2

          const degrees = angle(d.name)
          let radians = (degrees + 90) / 360 * 2 * Math.PI
          radians -= 0.003
          const barHeight = chartWidth / 2 - chartWidth * 0.006
          const correctionDegrees = 270

          const yOffset = Math.sin(radians) * barHeight
          const xOffset = Math.cos(radians) * barHeight

          const textRotationAngle = angle(d.name) - correctionDegrees
          return `translate(${xBase + xOffset}px, ${yBase + yOffset}px) rotate(calc(${textRotationAngle}deg)`
        })
        .on('click', function (event, d) {
          vm.modalCityId = d.id
          vm.showCityInfo()
          // const chartRect = document.querySelector('.chart.chart-cities').getBoundingClientRect()
          // const dotPos = event.target.getBoundingClientRect()
          // tooltipDiv.select('.chart-tooltip__inner').html(vm.getTooltipContent(d))
          // tooltipDiv.transition()
          //   .duration(200)
          //   .style('opacity', 1)
          // tooltipDiv
          //   .style('display', 'block')
          //   .style('left', dotPos.left + 22 + 'px')
          //   .style('top', dotPos.top - 146 - chartRect.top + 'px')
        })

      /// //////////////////////////////////////////
      // Draw the city labels //////////////////////////
      /// //////////////////////////////////////////
      this.svg.selectAll('text.label').remove()
      const labels = this.svg.selectAll('text.label').data(data)
      labels.enter().append('text')
        .attr('x', -centreCircleRadius / 2)
        .attr('fill', '#863042')
        .attr('class', 'label')
        .attr('text-anchor', (d, i) => {
          const degrees = angle(d.name)
          // if(10 <= degrees && degrees <= 170) { return 'end'; }
          if (degrees <= 180 && degrees >= 0) {
            return 'end'
          }
          return 'start'
        })
        .style('transform', (d, i) => {
          const xBase = containerWidth / 2
          const yBase = containerHeight / 2

          const degrees = angle(d.name)
          let radians = (degrees + 90) / 360 * 2 * Math.PI
          // This is a little correction to nudge the label to the right place
          radians += 0.003
          let barHeight = chartWidth / 2 + chartWidth * 0.045
          let correctionDegrees = 270

          if (degrees <= 180 && degrees >= 0) {
            correctionDegrees = 90
            barHeight = chartWidth / 2 - chartWidth * 0.02
            radians -= 0.01
          }

          const yOffset = Math.sin(radians) * barHeight
          const xOffset = Math.cos(radians) * barHeight

          const textRotationAngle = angle(d.name) - correctionDegrees
          return `translate(${xBase + xOffset}px, ${yBase + yOffset}px) rotate(calc(${textRotationAngle}deg)`
        })
        .text((d, i) => (d.name))

      /// //////////////////////////////////////////
      // Draw the country labels //////////////////////////
      /// //////////////////////////////////////////
      this.svg.selectAll('text.label-country').remove()
      const countryLabels = this.svg.selectAll('text.label-country').data(data)
      countryLabels.enter().append('text')
        .attr('x', -centreCircleRadius / 2)
        .attr('fill', '#E4D0D4')
        .attr('class', 'label-country')
        .attr('text-anchor', (d, i) => {
          const degrees = angle(d.name)
          // if(10 <= degrees && degrees <= 170) { return 'end'; }
          if (degrees <= 180 && degrees >= 0) {
            return 'end'
          }
          return 'start'
        })
        .style('transform', (d, i) => {
          const xBase = containerWidth / 2
          const yBase = containerHeight / 2

          const degrees = angle(d.name)
          let radians = (degrees + 90) / 360 * 2 * Math.PI
          // This is a little correction to nudge the label to the right place
          radians += 0.003
          let barHeight = chartWidth / 2 + chartWidth * 0.015
          let correctionDegrees = 270

          if (degrees <= 180 && degrees >= 0) {
            correctionDegrees = 90
            barHeight = chartWidth / 2 - chartWidth * 0.05
            radians -= 0.01
          }

          const yOffset = Math.sin(radians) * barHeight
          const xOffset = Math.cos(radians) * barHeight

          const textRotationAngle = angle(d.name) - correctionDegrees
          return `translate(${xBase + xOffset}px, ${yBase + yOffset}px) rotate(calc(${textRotationAngle}deg)`
        })
        .text((d, i) => (d.country_code))
    },

    /**
     *
     * @param svg The d3 svg object for the chart
     * @param data the chart data
     * @param lineName The name of the data attribute to plot for this circle
     * @param distanceFromCentre How far away from the centre to start plotting the data
     * @param lineLength the length of the bar to plot
     * @param cities the d3 rect select (all cities in the chart) svg.selectAll('rect').data(data)
     * @param angle An anonymous angle function to plot the angle of each bar
     * @param containerWidth
     * @param containerHeight
     * @param lineWidth the width of the bar
     */
    drawRadialLineData(data, lineName, distanceFromCentre, lineLength, cities, angle, containerWidth, containerHeight, lineWidth) {
      const heightExtent = d3.extent(data, d => d[lineName])

      const y = d3.scaleLinear()
        .domain([0, heightExtent[1]])
        .range([distanceFromCentre, lineLength])

      // Add the liquidity bars
      cities.enter().append('rect')
        .merge(cities)
        .attr('x', 0)
        .attr('y', 0)
        .attr('width', lineWidth + 'px')
        .attr('height', (d, i) => y(d[lineName]))
        .style('transform', (d, i) =>
          `translate(${containerWidth / 2}px, ${containerHeight / 2}px) rotate(${angle(d.name)}deg)`)
        .attr('fill', (d, i) => 'black')
        .attr('class', lineName + ' city')
    },
    drawGreyBackgroundBars(data, distanceFromCentre, lineLength, cities, barClassName, angle, containerWidth, containerHeight, lineWidth) {
      const y = d3.scaleLinear()
        .domain([0, 100])
        .range([distanceFromCentre, lineLength])

      // Add the underlying gray bar
      cities.enter().append('rect')
        .merge(cities)
        .attr('x', 0)
        .attr('y', 0)
        .attr('width', lineWidth + 'px')
        .attr('class', barClassName)
        .attr('height', (d, i) => y(100))
        .style('transform', (d, i) =>
          `translate(${containerWidth / 2}px, ${containerHeight / 2}px) rotate(${angle(d.name)}deg)`)
        .attr('fill', (d, i) => '#CCCCCC')
    },
    drawWhiteCircle(containerWidth, containerHeight, circleRadius, className) {
      const circles = this.svg.selectAll('circle.' + className).attr('r', 0)
      this.svg.append('circle')
        .merge(circles)
        .attr('cx', containerWidth / 2)
        .attr('cy', containerHeight / 2)
        .attr('r', circleRadius)
        .attr('fill', 'white')
        .attr('class', 'white-circle ' + className)
        .attr('stroke', 'white')
        .attr('stroke', 'white')
    }
  }
}
</script>

<style lang="scss">
.chart-cities {
  position: relative;
  padding-top: 100px;

  &__toggles {
    position: absolute;
    top: 200px;
    left: 20px;
  }

  &__chart {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;

     @include respond-between(xs, md) {
      height: 100%;
      overflow: hidden;
       svg{
          width: 100%;
          margin: auto;
          transform: scale(0.65);
          overflow: overlay;
          left: -70px;
          position: relative;
          top: 130px;
       }
     }

     @include respond-below(sm) {
      display: block;
      overflow: auto;
     }

    .dot {
      cursor: pointer;
    }

    &--with-animation {
      rect {
        transition: height 0.3s ease-in-out;
      }

      circle {
        transition: r 0.3s ease-in-out;
      }
    }

    rect {
      &.attractiveness_score_plot_value {
        fill: #6AC6F1;
      }

      &.liquidity_score_plot_value {
        fill: #F29131;
      }

      &.grey_bars_attractiveness, &.grey_bars_liquidity {
        fill: #E5E2E3;
      }
    }

    .label, .label-country {
      font-family: "Corporate S Pro";
    }
  }

  &__order {
    position: absolute;
    top: 200px;
    right: 20px;

    @include respond-below(sm) {
      top: auto;
      bottom: 1rem;
      left: 1rem;
    }
  }
}

#cities-filter {
  top: 93px;
  left: 48px;
  z-index: 100;

  @include respond-below(sm) {
    top: 1rem;
    left: 1rem;
  }
}

.chart-tooltip--cities {
  height: 250px;
  width: 224px;
  padding-right: 0;
  top: -10000px;
  left: -10000px;

  &:after {
    border-width: 4px;
    margin-left: -4px;
  }
  &:before {
    border-width: 5px;
    margin-left: -5px;
  }

  .chart-tooltip__axis-value {
    margin-bottom: 8px;
  }
}

</style>
