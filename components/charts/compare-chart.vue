<template>
  <section :class="`chart chart-compare ${isFeaturedCities ? 'chart--featured-city' : ''}`">
    <city-summary-modal v-if="isModalVisible" :city-id="modalCityId" @close="handleCloseModal()"/>

    <div class="radarChart chart-compare__chart">
      <div id="compare_tooltip" class="chart-tooltip chart-tooltip--compare">
        <div class="chart-tooltip__close" @click="closeTooltip">
          <svg xmlns="http://www.w3.org/2000/svg" width="12.021" height="12.021" viewBox="0 0 12.021 12.021">
            <g id="Group_5382" data-name="Group 5382" transform="translate(-79.549 -1795.698) rotate(45)">
              <line id="Line_625" data-name="Line 625" x2="16" transform="translate(1326.5 1213.5)" fill="none"
                    stroke="#802537" stroke-width="1"></line>
              <line id="Line_626" data-name="Line 626" x2="16" transform="translate(1334.5 1205.5) rotate(90)"
                    fill="none" stroke="#802537" stroke-width="1"></line>
            </g>
          </svg>
        </div>
        <div class="chart-tooltip__inner" @click="showCityInfo"></div>
      </div>
    </div>

    <range-filter
      id="compare-filter"
      :available-filters="isFeaturedCities ? ['cities'] : [
        'strategyDimensions',
        'cities'
      ]"
      :available-cities="cities"
      :line-colours="lineColours"
      :minimum-allowed-strategy-dimensions="3"
      :enabled-strategy-dimensions="[
        'attractiveness',
        'liquidity',
        'market_fundamentals',
        'economy',
        'connectivity',
        'innovation',
      ]"
      @toggleInvestmentStrategyGoals="toggleAxis($event.name, $event.value)"
      @toggleStrategyDimension="toggleAxis($event.name, $event.value)"
      @selectedCitiesUpdated="updateSelectedCities"
    />
  </section>
</template>

<script>
import * as d3 from 'd3'
import ChartService from '~/services/chart-service'
import ToggleButton from '~/components/inputs/toggle-button'
import RangeFilter from '@/components/inputs/range-filter'
import SelectWrapper from "@/components/inputs/select-wrapper";
import CitySummaryModal from "@/components/charts/city-summary-modal";

export default {
  name: 'CompareChart',
  components: {CitySummaryModal, SelectWrapper, RangeFilter, ToggleButton},
  props: {
    isFeaturedCities: {
      type: Boolean,
      default() {
        return false
      }
    }
  },
  data() {
    return {
      dotHoverSelectedCityIndex: null,
      activeCityId: null,
      isModalVisible: false,
      modalCityId: null,
      chartData: null,
      filteredChartData: null,
      lineColours: [
        '#802537',
        '#6BC6F1',
        '#F29131',
        '#B66EA9'
      ],
      cities: [
        'London'
      ],
      selectedCities: [
        'København',
        'Amsterdam',
        'Berlin',
        'München'
      ],
      availableAxes: [
        'liquidity_score',
        'market_fundamentals_score',
        'attractiveness_score',
        'connectivity_score',
        'innovation_score',
        'economy_score'
      ]
    }
  },
  watch: {
    selectedCities: {
      deep: true,
      handler() {
        this.updateChart()
      }
    }
  },
  async mounted() {
    this.selectedAxes = this.availableAxes
    await this.loadChartData()
    this.drawUi()
    this.updateChart()
  },
  methods: {
    getRadarStrokeClass(lineIndex) {
      return `radarStroke radarStroke-${this.dotHoverSelectedCityIndex}`
    },
    /**
     * Close the city info modal
     */
    handleCloseModal() {
      this.modalCityId = null
      this.isModalVisible = false
    },
    /**
     * Show the city information in the relevant way
     */
    showCityInfo() {
      this.modalCityId = this.activeCityId
      this.isModalVisible = true
    },
    /**
     * Close the tooltop
     */
    closeTooltip() {
      const tooltipDiv = d3.select('#compare_tooltip')
      tooltipDiv.style('display', 'none')
    },
    /**
     * Update the chart
     */
    updateChart() {
      this.filterChartData()
      this.drawChart()
    },
    updateSelectedCities(value) {
      this.selectedCities = value
    },
    /**
     * Handle the toggling of an axis visiblity
     **/
    toggleAxis (axisName, enabled) {
      // Here we map the toggle name onto an axis name
      switch (axisName) {
        case 'Location Quality':
          axisName = 'economy_score'
          break
        default:
          axisName = axisName + '_score'
      }

      // If false, remove from the availableAxes data property
      if (!enabled) {
        this.availableAxes.splice(this.availableAxes.indexOf(axisName), 1)
      } else if (this.availableAxes.indexOf(axisName) < 0) { // If it isn't already in the available axis list
        this.availableAxes.push(axisName)
      }
      this.updateChart()
    },
    filterChartData() {
      // Filter the data by selected cities
      const filteredData = this.selectedCities.map((selectedCityName) => {
        console.log('Looking for', selectedCityName)
        const matchedCity = this.chartData.filter(chartDataItem => {
          if(chartDataItem.name === selectedCityName) {
            console.log('Got', chartDataItem.name)
            console.log('data', chartDataItem)
          }
          return (chartDataItem.name === selectedCityName)
        })
        return matchedCity[0]
      })

      console.log('filteredData', filteredData)
      this.filteredChartData = filteredData
    },
    /**
     * Draw the UI elements
     */
    drawUi() {
      // Cities drop down elements
      const cities = []
      this.chartData.filter((city) => {
        cities.push({
          value: city.id,
          text: city.name
        })
      })
      this.cities = cities

      // visible metrics
    },
    /**
     * Get the axis label
     * @param axisSlug
     * @returns {*}
     */
    getAxisLabel(axisSlug) {
      console.log('getAxisLabel', axisSlug)
      switch (axisSlug) {
        case 'attractiveness_score':
          return 'Attractiveness'
        case 'market_fundamentals_score':
          return 'Market Fundamentals'
        case 'liquidity_score':
          return 'Liquidity'
        // case 'demographic_rank':
        //   return 'Demographics'
        case 'economy_score':
          return 'Location Quality'
        case 'connectivity_score':
          return 'Connectivity'
        case 'innovation_score':
          return 'Innovation'
        default:
          return 'No label'
      }
    },
    getTooltipContent(d) {
      let city = this.chartData.filter((city) => {
        if (city.id === d.city_id) {
          return city
        }
      })

      city = city[0]

      const html = `
<p class="chart-tooltip__city">${city.name}</p>
<p class="chart-tooltip__country">${city.country}</p>
<p class="chart-tooltip__axis-label">${this.getAxisLabel(d.axis)}</p>
<p class="chart-tooltip__axis-value">#${d.value}</p>
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
    /**
     * Draw the chart
     */
    drawChart() {
      /* Radar chart design created by Nadieh Bremer - VisualCinnamon.com */

      /// ///////////////////////////////////////////////////////////
      /// ///////////////////// Set-Up //////////////////////////////
      /// ///////////////////////////////////////////////////////////

      const margin = {
        top: 100,
        right: 100,
        bottom: 100,
        left: 100
      }
      const width = Math.min(1000, window.innerWidth - 10) - margin.left - margin.right
      const height = Math.min(width, window.innerHeight - margin.top - margin.bottom - 20)

      const data = this.filteredChartData

      if (data.length > 0) {
        /// ///////////////////////////////////////////////////////////
        /// ///////////////// Draw the Chart //////////////////////////
        /// ///////////////////////////////////////////////////////////
        const color = d3.scaleOrdinal(d3.schemeCategory10)

        const radarChartOptions = {
          w: width,
          h: height,
          margin,
          maxValue: 0.5,
          levels: 5,
          roundStrokes: true,
          color
        }
        // Call function to draw the Radar chart
        this.RadarChart('.radarChart', data, radarChartOptions)
      }
    },
    async loadChartData() {
      const response = await ChartService.getCompareData(this, this.isFeaturedCities)
      this.chartData = response.data
      this.filteredChartData = this.chartData
    },
    RadarChart(id, data, options) {
      const vm = this

      const cfg = {
        w: 1000,				// Width of the circle
        h: 1000,				// Height of the circle
        margin: {
          top: 20,
          right: 20,
          bottom: 20,
          left: 20
        }, // The margins of the SVG
        levels: 3,				// How many levels or inner circles should there be drawn
        maxValue: 0, 			// What is the value that the biggest circle will represent
        labelFactor: 1.15, 	// How much farther than the radius of the outer circle should the labels be placed
        opacityArea: 0.35, 	// The opacity of the area of the blob
        dotRadius: 4, 			// The size of the colored circles of each blog
        opacityCircles: 0.1, 	// The opacity of the circles of each blob
        strokeWidth: 2, 		// The width of the stroke around each blob
        roundStrokes: false,	// If true the area and stroke will follow a round path (cardinal-closed)
        color: d3.schemeCategory10	// Color function
      }

      // Put all of the options into a variable called cfg
      if (typeof options !== 'undefined') {
        for (const i in options) {
          if (typeof options[i] !== 'undefined') {
            cfg[i] = options[i]
          }
        }// for i
      }// if

      // If the supplied maxValue is smaller than the actual one, replace by the max in the data
      const maxValue = Math.max(cfg.maxValue, d3.max(data, function (i) {
        return d3.max(i.axes.map(function (d) {
          return d.plotValue
        }))
      }))

      const total = this.availableAxes.length					// The number of different axes
      const radius = Math.min(cfg.w / 2, cfg.h / 2) 	// Radius of the outermost circle
      const Format = d3.format('%')			 	// Percentage formatting
      const angleSlice = Math.PI * 2 / total		// The width in radians of each "slice"

      // Scale for the radius
      const rScale = d3.scaleLinear()
        .range([0, radius])
        .domain([0, maxValue])

      /// //////////////////////////////////////////////////////
      /// ///////// Create the container SVG and g /////////////
      /// //////////////////////////////////////////////////////

      // Remove whatever chart with the same id/class was present before
      d3.select(id).select('svg.radar').remove()
      // TODO: This is deliberately here twice, there's a bug somewhere...
      d3.select(id).select('svg.radar').remove()

      // Initiate the radar chart SVG
      const svg = d3.select(id).append('svg')
        .attr('width', cfg.w + cfg.margin.left + cfg.margin.right)
        .attr('height', cfg.h + cfg.margin.top + cfg.margin.bottom)
        .attr('class', 'radar')
        .attr('id', 'compare-radar')
      // Append a g element
      const g = svg.append('g')
        .attr('transform', 'translate(' + (cfg.w / 2 + cfg.margin.left) + ',' + (cfg.h / 2 + cfg.margin.top) + ')')

      /// //////////////////////////////////////////////////////
      /// /////// Glow filter for some extra pizzazz ///////////
      /// //////////////////////////////////////////////////////

      // Filter for the outside glow
      const filter = g.append('defs').append('filter').attr('id', 'glow')
      const feGaussianBlur = filter.append('feGaussianBlur').attr('stdDeviation', '2.5').attr('result', 'coloredBlur')
      const feMerge = filter.append('feMerge')
      const feMergeNode_2 = feMerge.append('feMergeNode').attr('in', 'SourceGraphic')

      /// //////////////////////////////////////////////////////
      /// //////////// Draw the Circular grid //////////////////
      /// //////////////////////////////////////////////////////

      // Wrapper for the grid & axes
      const axisGrid = g.append('g').attr('class', 'axisWrapper')

      /// //////////////////////////////////////////////////////
      /// ///////////////// Draw the axes //////////////////////
      /// //////////////////////////////////////////////////////

      // Create the bg circle
      g.append('circle')
        .attr('cx', 0)
        .attr('cy', 0)
        .attr('r', cfg.w / 2.5)
        .style('stroke', '#E1DADC')
        .style('fill', 'transparent')


      // Create the straight lines radiating outward from the center
      const axis = axisGrid.selectAll('.axis')
        .data(this.availableAxes)
        .enter()
        .append('g')
        .attr('class', 'axis')
      // Append the lines
      axis.append('line')
        .attr('x1', 0)
        .attr('y1', 0)
        .attr('x2', function (d, i) {
          return rScale(maxValue * 1.1) * Math.cos(angleSlice * i - Math.PI / 2)
        })
        .attr('y2', function (d, i) {
          return rScale(maxValue * 1.1) * Math.sin(angleSlice * i - Math.PI / 2)
        })
        .attr('class', 'line')
        .style('stroke', '#E1DADC')
        .style('stroke-width', '1px')

      // Append the labels at each axis

      // let textArcCurve = 'M 0,400 A 450,450 0 0,1 400,0'
      // let textArcCurveId = 'XXXX'
      // axis.append('path')
      //   .attr('id', textArcCurveId) // Unique id of the path
      //   .attr('d', textArcCurve) // SVG path
      //   .style('fill', 'black')

      axis.append('text')
        .attr('class', 'legend')
        .style('font-size', '22px')

        // .append('textPath') // append a textPath to the text element
        // .attr('xlink:href', '#' + textArcCurveId) // place the ID of the path here

        .style('color', '#802537')
        .style('text-transform', 'uppercase')
        .attr('dominant-baseline', 'central')
        .attr('transform', function (d, i) {
          let x = (rScale(maxValue * cfg.labelFactor) * Math.cos(angleSlice * i - Math.PI / 2))
          let y = (rScale(maxValue * cfg.labelFactor) * Math.sin(angleSlice * i - Math.PI / 2))
          let rotate = (360 / vm.availableAxes.length) * i

          if (rotate > 90 && rotate < 270) {
            rotate = rotate + 180
          }
          return `rotate(${rotate}, ${x}, ${y})`
        })
        .attr('text-anchor', 'middle')
        .attr('dy', '0')
        .attr('x', function (d, i) {
          return rScale(maxValue * cfg.labelFactor) * Math.cos(angleSlice * i - Math.PI / 2)
        })
        .attr('y', function (d, i) {
          return rScale(maxValue * cfg.labelFactor) * Math.sin(angleSlice * i - Math.PI / 2)
        })
        .text(function (d) {
          const axisLabel = vm.getAxisLabel(d)
          return axisLabel
        })

      /// //////////////////////////////////////////////////////
      /// ////////// Draw the radar chart blobs ////////////////
      /// //////////////////////////////////////////////////////

      // The radial line function
      const radarLine = d3.radialLine()
        // .interpolate('linear-closed')
        .curve(d3.curveBasis)
        .radius(function (d) {
          return rScale(d.plotValue)
        })
        .angle(function (d, i) {
          return i * angleSlice
        })

      if (cfg.roundStrokes) {
        radarLine.curve(d3.curveCardinalClosed)
      }

      // Create a wrapper for the blobs
      const blobWrapper = g.selectAll('.radarWrapper')
        .data(data)
        .enter().append('g')
        .attr('class', 'radarWrapper')

      // Create the outlines
      blobWrapper.append('path')
        .attr('class', function (d, i) {
          return vm.getRadarStrokeClass(i)
        })
        .attr('d', function (d, i) {
          const cityAxes = d.axes.filter((axis) => {
            if (vm.availableAxes.includes(axis.axis)) {
              return axis
            } else {
              return false
            }
          })
          return radarLine(cityAxes)
        })
        .style('stroke-width', cfg.strokeWidth + 'px')
        .style('stroke', function (d, i) {
          return vm.lineColours[i]
        })
        .style('fill', 'none')
        .style('filter', 'url(#glow)')

      // Append the dots
      blobWrapper.selectAll('.radarCircle')
        .data(function (d, i) {
          const cityAxes = d.axes.filter((axis) => {
            if (vm.availableAxes.indexOf(axis.axis) >= 0) {
              return axis
            } else {
              return false
            }
          })
          const cityAxesWithCityNumber = cityAxes.map((item) => {
            item.selectedCityNumber = i
            return item
          })
          return cityAxesWithCityNumber
        })
        .enter().append('circle')
        .attr('class', 'radarCircle')
        .attr('r', cfg.dotRadius)
        .attr('cx', function (d, i) {
          return rScale(d.plotValue) * Math.cos(angleSlice * i - Math.PI / 2)
        })
        .attr('cy', function (d, i) {
          return rScale(d.plotValue) * Math.sin(angleSlice * i - Math.PI / 2)
        })
        .style('stroke', function (d, i) {
          return vm.lineColours[d.selectedCityNumber]
        })
        .style('stroke-width', 2)
        .style('fill', 'white')
        .style('fill-opacity', 1)

      /// //////////////////////////////////////////////////////
      /// ///// Append invisible circles for tooltip ///////////
      /// //////////////////////////////////////////////////////

      // Wrapper for the invisible circles on top


      const blobCircleWrapper = g.selectAll('.radarCircleWrapper')
        .data(data)
        .enter().append('g')
        .attr('class', 'radarCircleWrapper')

      // Append a set of invisible circles on top for the mouseover pop-up
      blobCircleWrapper.selectAll('.radarInvisibleCircle')
        .data(function (d, i) {
          const cityAxes = d.axes.filter((axis) => {
            if (vm.availableAxes.indexOf(axis.axis) >= 0) {
              return axis
            } else {
              return false
            }
          })
          const cityAxesWithCityNumber = cityAxes.map((item) => {
            item.selectedCityNumber = i
            return item
          })
          return cityAxesWithCityNumber
        })
        .enter().append('circle')
        .attr('class', function (d, i) {
          return `radarInvisibleCircle radarInvisibleCircle--${d.selectedCityNumber} `
        })
        .attr('r', cfg.dotRadius * 1.75)
        .attr('cx', function (d, i) {
          return rScale(d.plotValue) * Math.cos(angleSlice * i - Math.PI / 2)
        })
        .attr('cy', function (d, i) {
          return rScale(d.plotValue) * Math.sin(angleSlice * i - Math.PI / 2)
        })
        .style('fill', 'none')
        .style('pointer-events', 'all')
        .on('mouseover', function (d, i) {
          vm.dotHoverSelectedCityIndex = i.selectedCityNumber
        })
        .on('mouseout', function (d, i) {
          vm.dotHoverSelectedCityIndex = null
        })
        .on('click', function (i, d) {
          const pointerCoordinates = d3.pointer(event);
          const x = pointerCoordinates[0];
          const y = pointerCoordinates[1];


          // Calc position of the tooltip
          const svgRect = document.getElementById('compare-radar').getBoundingClientRect()
          const leftPos = svgRect.left + (svgRect.width / 2) + x + 52
          const topPos = (svgRect.height / 2) + y - 90

          vm.activeCityId = d.city_id
          vm.showCityInfo()

          // tooltipDiv.transition()
          //   .duration(200)
          //   .style('opacity', 1)
          // tooltipDiv.select('.chart-tooltip__inner').html(vm.getTooltipContent(d))
          // tooltipDiv
          //   .style('display', 'block')
          //   .style('left', leftPos + 'px')
          //   .style('top', topPos + 'px')
        })
      // .on('mouseout', function () {
      //   tooltipDiv.transition()
      //     .duration(200)
      //     .style('opacity', 0)
      // })

      const tooltipDiv = d3.select('#compare_tooltip')

      /// //////////////////////////////////////////////////////
      /// //////////////// Helper Function /////////////////////
      /// //////////////////////////////////////////////////////

      // Taken from http://bl.ocks.org/mbostock/7555321
      // Wraps SVG text
      function wrap(text, width) {
        text.each(function () {
          const text = d3.select(this)
          const words = text.text().split(/\s+/).reverse()
          let word
          let line = []
          let lineNumber = 0
          const lineHeight = 1.4 // ems
          const y = text.attr('y')
          const x = text.attr('x')
          const dy = parseFloat(text.attr('dy'))
          let tspan = text.text(null).append('tspan').attr('x', x).attr('y', y).attr('dy', dy + 'em')

          while (word = words.pop()) {
            line.push(word)
            tspan.text(line.join(' '))
            if (tspan.node().getComputedTextLength() > width) {
              line.pop()
              tspan.text(line.join(' '))
              line = [word]
              tspan = text.append('tspan').attr('x', x).attr('y', y).attr('dy', ++lineNumber * lineHeight + dy + 'em').text(word)
            }
          }
        })
      }// wrap
    }
  }
}
</script>

<style lang="scss">
.chart-compare {

  &.chart--featured-city {
    .chart-compare__city-select {
      padding-top: 106px;
    }
  }

  &__chart {
    position: relative;

    #compare_tooltip{
      @include respond-below(sm) {
        display: none;
      }
    }
  }

  svg.radar {
    margin: 0 auto;
    width: 1000px;
    height: 1000px;
    display: block;
    @include respond-below(sm) {
      width: 100%;
      height: 100%;
    }
  }

  &__city-select {
    padding: 45px 0 0 45px;
    width: 370px;
    position: absolute;
    z-index: 10;

    @include respond-below(sm) {
      width: 100%;
      position: relative;
    }

    &__title {

    }

    form {
      fieldset {
        display: flex;
        flex-wrap: wrap;
        border: 0;
        padding: 0;
      }
    }

    &__input {
      display: flex;
      align-items: center;
      margin-bottom: 11px;

      .box-select select {
        width: 202px;

        @include respond-below(md) {
          width: 167px;
        }
      }

      &__legend {
        width: 44px;
        height: 2px;
        margin-right: 20px;
        position: relative;

        svg {
          position: absolute;
          top: -6px;
          left: 15px;
        }
      }
    }
  }

  &__metrics-toggle {
    flex: 0 0 20%;
  }

  .radarInvisibleCircle {
    cursor: pointer;

    &:hover, &:focus {
      stroke-width: 4px;
      fill: white !important;

      &.radarInvisibleCircle {
        &--0 {
          stroke: #802537;
        }

        &--1 {
          stroke: #6BC6F1;
        }

        &--2 {
          stroke: #F29131;
        }

        &--3 {
          stroke: #B66EA9;
        }
      }
    }

  }
}

.legend {
  font-family: "Corporate S Pro";
  fill: #802537;
}

#compare-filter {
  top: 175px;
  left: 48px;
  z-index: 100;

  .chart--featured-city & {
    top: 119px;
  }

  @include respond-below(sm) {
    top: 1rem;
    left: 1rem;
  }
}
</style>
