<template>
  <section
    :class="`chart chart--goals ${isZoomed ? 'chart--goals--zoomed' : ''} ${zoomedSector ? 'chart--goals--zoomed-' + zoomedSector : ''}` ">
    <city-summary-modal v-if="isModalVisible" :city-id="modalCityId" @close="handleCloseModal()" />
    <div id="goals_tooltip" class="chart-tooltip chart-tooltip--goals" @click="closeTooltip">
      <div class="chart-tooltip__close"><svg xmlns="http://www.w3.org/2000/svg" width="12.021" height="12.021" viewBox="0 0 12.021 12.021">
        <g id="Group_5382" data-name="Group 5382" transform="translate(-79.549 -1795.698) rotate(45)">
          <line id="Line_625" data-name="Line 625" x2="16" transform="translate(1326.5 1213.5)" fill="none" stroke="#802537" stroke-width="1"/>
          <line id="Line_626" data-name="Line 626" x2="16" transform="translate(1334.5 1205.5) rotate(90)" fill="none" stroke="#802537" stroke-width="1"/>
        </g>
      </svg>
      </div>
      <div class="chart-tooltip__inner" @click="showCityInfo"></div>
    </div>

    <div id="goals_chart">
      <div
        :class="`chart--goals__zoom chart--goals__zoom__sector-bg chart--goals__zoom__sector chart--goals__zoom__sector--${sector} ${(highlightedZoomSector === sector) ? 'highlighted' : ''}`"
        v-if="!isZoomed"
        v-for="sector in zoomSectors"
      ></div>
      <div
        :class="`chart--goals__zoom chart--goals__zoom__sector-top chart--goals__zoom__sector chart--goals__zoom__sector--${sector} ${(highlightedZoomSector === sector) ? 'highlighted' : ''}`"
        v-if="!isZoomed"
        @click="toggleZoom(sector)"
        @mouseover="toggleZoomHighlight(sector)"
        @mouseout="toggleZoomHighlight(sector)"
        v-for="sector in zoomSectors"
      >
        <img src="/images/icon-goals-chart-zoom.png" alt=""/>
      </div>
      <div class="chart--goals__zoom chart--goals__zoom--out" v-if="isZoomed" @click="toggleZoom">
        <img src="/images/icon-goals-chart-zoom-out.png" alt="">
        <img src="/images/goals-chart-zoom-out-back-link.svg" alt="">
      </div>
    </div>
    <range-filter
      id="goals-filter"
      @attractiveness-range-updated="attractivenessRangeUpdated"
      @liquidity-range-updated="liquidityRangeUpdated"
      @selectedCountriesUpdated="selectedCountriesUpdated"
      :available-filters="[
        'liquidity',
        'countries',
        'attractiveness'
      ]"
    />
  </section>
</template>

<script>
import * as d3 from 'd3'
import ChartService from '~/services/chart-service'
import RangeFilter from '@/components/inputs/range-filter'
import CitySummaryModal from "@/components/charts/city-summary-modal";

export default {
  name: 'GoalsChart',
  components: {CitySummaryModal, RangeFilter},
  data() {
    return {
      isModalVisible: false,
      modalCityId: null,
      chartData: null,
      clusteredChartData: null,
      filteredChartData: null,
      liquidityFilters: null,
      attractivenessFilters: null,
      selectedCountries: [],
      visibleClusters: ['powerful', 'affordable', 'liquid', 'innovative'], // The initially visible clusters,
      isZoomed: false,
      zoomSectors: ['tl', 'tr', 'bl', 'br'],
      zoomedSector: null,
      highlightedZoomSector: null
    }
  },
  async mounted() {
    await this.loadChartData()
    this.renderClusterChart()
    // this.renderScatterChart()
  },
  methods: {
    /**
     * Handle modal close
     *
     */
    handleCloseModal () {
      this.modalCityId = null
      this.isModalVisible = false
    },/**
     * Show the city information in the relevant way
     */
    showCityInfo () {
      this.isModalVisible = true
    },
    async loadChartData() {
      const response = await ChartService.getGoalsData(this)
      this.chartData = response.data
      this.filteredChartData = this.chartData
    },
    /**
     * Add axis labels to the chart
     */
    addAxisLabels(svg, chartWidth, chartHeight) {
      // Draw the polygons
      this.addAxisShape(svg, chartWidth, chartHeight, 0, '#F29131')
      this.addAxisShape(svg, chartWidth, chartHeight, 90, '#6AC6F1')

      svg.append('text')
        .attr('x', chartWidth / 2)
        .attr('y', -50)
        .attr('text-anchor', 'middle')
        .text('Liquidity')
        .attr('fill', '#F29131')
        .attr('font-size', '20px')
        .attr('class', 'hide-when-zoomed')

      svg.append('text')
        .attr('x', chartWidth / 2)
        .attr('y', chartHeight + 60)
        .attr('text-anchor', 'middle')
        .text('Liquidity')
        .attr('fill', '#F29131')
        .attr('font-size', '20px')
        .attr('class', 'hide-when-zoomed')


      svg.append('text')
        .attr('x', -45)
        .attr('y', chartHeight / 2 + 5)
        .text('Attractiveness')
        .attr('text-anchor', 'end')
        .attr('fill', '#6AC6F1')
        .attr('font-size', '20px')
        .attr('class', 'hide-when-zoomed')


      svg.append('text')
        .attr('x', chartWidth + 50)
        .attr('y', chartHeight / 2 + 5)
        .text('Attractiveness')
        .attr('fill', '#6AC6F1')
        .attr('font-size', '20px')
        .attr('class', 'hide-when-zoomed')

    },
    /**
     * Add the axis shapes to the chart
     */
    addAxisShape(svg, chartWidth, chartHeight, rotation, fillColour) {
      const polygonOverlap = 30 // The amount the polygon should overlap the chart
      const poly = [{x: 0.0, y: 25.0},
        {x: 0, y: 0},
        {x: 20, y: 0},
        {x: 10, y: chartHeight / 2 + polygonOverlap},
        {x: 20, y: chartHeight + polygonOverlap * 2},
        {x: 0, y: chartHeight + polygonOverlap * 2},
        {x: 10, y: chartHeight / 2 + polygonOverlap}
      ]

      // Unzoomed axis
      const g = svg.append('g')
        .attr('transform',
          'translate(' + (chartWidth / 2 - 10) + ', ' + (0 - polygonOverlap) + '), rotate(' + rotation + ', 10, ' + (chartWidth / 2 + polygonOverlap) + ')')
      g.selectAll('polygon')
        .data([poly])
        .enter().append('polygon')
        .attr('points', function (d) {
          return d.map(function (d) {
            return [d.x, d.y].join(',')
          }).join(' ')
        })
        .attr('fill', fillColour)
        .attr('stroke-width', 0)
        .attr('class', 'hide-when-zoomed')

      // Add the plus signs
      g
        .append('text')
        .text('+')
        .style('text-anchor', 'middle')
        .attr('x', 10)
        .attr('y', 20)
        .attr('fill', 'white')
        .attr('font-size', '20px')
        .attr('class', 'hide-when-zoomed')

      g
        .append('text')
        .text('+')
        .style('text-anchor', 'middle')
        .attr('x', 10)
        .attr('y', chartHeight + polygonOverlap * 2 - 5)
        .attr('fill', 'white')
        .attr('font-size', '20px')
        .attr('class', 'hide-when-zoomed')

    },
    /**
     * Add the axis shapes to the chart
     */
    addZoomedAxisShape(svg, chartWidth, chartHeight, rotation, fillColour) {
      const polygonOverlap = 30 // The amount the polygon should overlap the chart
      // Poly for zoomed axis
      const thinPoly = [{x: 0.0, y: 25.0},
        {x: 0, y: 0},
        {x: 10, y: 0},
        {x: 5, y: chartHeight / 2 + polygonOverlap},
        {x: 10, y: chartHeight + polygonOverlap * 2},
        {x: 0, y: chartHeight + polygonOverlap * 2},
        {x: 5, y: chartHeight / 2 + polygonOverlap}
      ]
      // Zoomed axis
      const zoomedG = svg.append('g')
        .attr('transform',
          'translate(' + (chartWidth / 2 - 5) + ', -25), rotate(' + rotation + ', 10, ' + (chartWidth / 2 + polygonOverlap) + ')')
      zoomedG.selectAll('polygon')
        .data([thinPoly])
        .enter().append('polygon')
        .attr('points', function (d) {
          return d.map(function (d) {
            return [d.x, d.y].join(',')
          }).join(' ')
        })
        .attr('fill', fillColour)
        .attr('stroke-width', 0)
        .attr('class', 'show-when-zoomed')

      // Add the plus signs
      zoomedG
        .append('text')
        .text('+')
        .style('text-anchor', 'middle')
        .attr('x', 5)
        .attr('y', 10)
        .attr('fill', 'white')
        .attr('font-size', '10px')
        .attr('class', 'show-when-zoomed')

      zoomedG
        .append('text')
        .text('+')
        .style('text-anchor', 'middle')
        .attr('x', 5)
        .attr('y', chartHeight + polygonOverlap * 2 - 5)
        .attr('fill', 'white')
        .attr('font-size', '10px')
        .attr('class', 'show-when-zoomed')
    },
    addZoomedAxisMasks(svg, chartWidth, chartHeight) {
      const g = svg.append('g')
      g
        .append('rect')
        .attr('x', chartWidth / 2 - 10)
        .attr('y', -100)
        .attr('width', 20)
        .attr('height', chartHeight / 2 + 100)
        .attr('fill', '#FCFBFB')
        .attr('class', 'show-when-zoomed axis-mask-top')
      g
        .append('rect')
        .attr('x', chartWidth / 2 - 10)
        .attr('y', chartHeight / 2)
        .attr('width', 20)
        .attr('height', chartHeight / 2 + 100)
        .attr('fill', '#FCFBFB')
        .attr('class', 'show-when-zoomed axis-mask-bottom')

      g
        .append('rect')
        .attr('x', -100)
        .attr('y', chartHeight / 2 - 10)
        .attr('width', chartWidth / 2 + 100)
        .attr('height', 20)
        .attr('fill', '#FCFBFB')
        .attr('class', 'show-when-zoomed axis-mask-left')

      g
        .append('rect')
        .attr('x', chartWidth / 2)
        .attr('y', chartHeight / 2 - 10)
        .attr('height', 20)
        .attr('width', chartWidth / 2 + 100)
        .attr('fill', '#FCFBFB')
        .attr('class', 'show-when-zoomed axis-mask-right')


    },
    /**
     * Add the sector masks to be shown when zoomed in
     */
    drawSectorMasks(svg, margin, width, height) {
      const sectorPositions = [
        {x: 0, y: 0, name: 'tl'},
        {x: (width / 2), y: 0, name: 'tr'},
        {x: (width / 2), y: (height / 2), name: 'br'},
        {x: 0, y: (height / 2), name: 'bl'}
      ]

      sectorPositions.forEach((sector) => {
        svg.append('rect')
          .attr('fill', '#FCFBFB')
          .attr('class', `show-when-zoomed show-when-zoomed--${sector.name}`)
          .attr('x', sector.x)
          .attr('y', sector.y)
          .attr('width', width / 2)
          .attr('height', height / 2)
      })
    },
    closeTooltip() {
      const tooltipDiv = d3.select('#goals_tooltip')
      tooltipDiv.style('display', 'none')
    },
    /**
     * Draw a series of circles at defined spaces on the chart
     **/
    drawBgCircles(svg, marginSize, centreX, centreY, radius, circleDistance) {
      for (let i = circleDistance; i < (radius + 200); i += circleDistance) {
        svg.append('circle')
          .attr('cx', centreX)
          .attr('cy', centreY)
          .attr('r', i)
          .style('stroke', '#F0ECED')
          .style('fill', 'transparent')
      }
      // Now let's mask the sides of the circles with 4 nice rectangles
      const maskSize = marginSize
      // Top
      this.drawMaskingRect(svg, 0 - marginSize, 0 - marginSize, radius * 2 + marginSize * 2, maskSize)
      // Left
      this.drawMaskingRect(svg, 0 - marginSize, 0 - marginSize, maskSize, radius * 2 + marginSize * 2)
      // Right
      this.drawMaskingRect(svg, (radius * 2) - (maskSize - marginSize), 0 - marginSize, maskSize, radius * 2 + marginSize * 2)
      // Bottom
      this.drawMaskingRect(svg, 0 - marginSize, (radius * 2) - (maskSize - marginSize), radius * 2 + marginSize * 2, maskSize)
    },

    /**
     * Draws a white masking rectangle. Used to hide the radial circles
     **/
    drawMaskingRect(svg, x, y, width, height) {
      svg.append('rect')
        .attr('x', x)
        .attr('y', y)
        .attr('width', width)
        .attr('height', height)
        .style('stroke', 'transparent')
        .style('fill', '#FCFBFB')
    },
    attractivenessRangeUpdated(value) {
      this.attractivenessFilters = value
      if (process.client) {
        this.applyFilters()
      }
      // Zoom back in
      if (this.zoomedSector) {
        this.isZoomed = false
        this.toggleZoom(this.zoomedSector)
      }
    },
    liquidityRangeUpdated(value) {
      this.liquidityFilters = value
      if (process.client) {
        this.applyFilters()
      }
      // Zoom back in
      if (this.zoomedSector) {
        this.isZoomed = false
        this.toggleZoom(this.zoomedSector)
      }
    },
    selectedCountriesUpdated(value) {
      this.selectedCountries = value
      if (process.client) {
        this.applyFilters()
      }
      // Zoom back in
      if (this.zoomedSector) {
        this.isZoomed = false
        this.toggleZoom(this.zoomedSector)
      }
    },
    applyFilters() {
      const vm = this
      // this.filteredChartData = null
      if (this.chartData && this.liquidityFilters && this.attractivenessFilters) {
        this.filteredChartData = this.chartData.filter(function (obj) {
          if (
            vm.liquidityFilters[obj.liquidity_rank] &&
            vm.attractivenessFilters[obj.attractiveness_rank] &&
            vm.selectedCountries.includes(obj.country)
          ) {
            return true
          } else {
            return false
          }
          // return true
        })
      }
      // this.filteredChartData = this.chartData
      if (this.filteredChartData) {
        this.renderClusterChart()
      }
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
    // Define Zoom Function Event Listener
    toggleZoom(sector) {
      this.closeTooltip()
      const margin = 200
      const width = 1100 - margin * 2
      const height = 1100 - margin * 2

      let translateX = 0
      let translateY = 0
      let translateScale = 1

      // zoom out
      if (this.isZoomed) {
        this.isZoomed = false
        this.zoomedSector = null
      }
      // Zoom in
      else {
        this.isZoomed = true
        this.zoomedSector = sector
        translateScale = 2

        switch (sector) {
          case "br":
            translateX = 0 - width / 2
            translateY = 0 - height / 2
            break
          case "bl":
            translateX = width / 2
            translateY = 0 - height / 2
            break
          case "tr":
            translateX = 0 - width / 2
            translateY = height / 2
            break
          case "tl":
            translateX = width / 2
            translateY = height / 2
            break
        }
      }
      d3.select("#goals_chart svg")
        .attr("transform", `translate(${translateX}, ${translateY}) scale(${translateScale})`);
    },
    toggleZoomHighlight(sector) {
      if (this.highlightedZoomSector === sector) {
        this.highlightedZoomSector = null
      }
      this.highlightedZoomSector = sector
    },
    /**
     * Render the clusters
     */
    renderClusterChart() {
      // Cluster the data
      const clusteredData = this.getDataInClusters()

      // set the dimensions and margins of the graph
      const margin = 200
      const width = 1100 - margin * 2
      const height = 1100 - margin * 2

      // Clear any existing charts
      d3.selectAll('#goals_chart svg').remove()
      // append the svg object to the body of the page
      const svg = d3.select('#goals_chart')
        .append('svg')
        .attr('width', width + margin * 2)
        .attr('height', height + margin * 2)
        .append('g')
        .attr('transform',
          'translate(' + margin + ',' + margin + ')')
      // // Add the axis lines
      // // X
      // svg.append('line')
      //   .attr('x1', 0 - 50)
      //   .attr('y1', height / 2)
      //   .attr('x2', width + 50)
      //   .attr('y2', height / 2)
      //   .style('stroke', 'black')
      // // Y
      // svg.append('line')
      //   .attr('x1', width / 2)
      //   .attr('y1', -50)
      //   .attr('x2', width / 2)
      //   .attr('y2', height + 50)
      //   .style('stroke', 'black')
      // Add background circles
      this.drawBgCircles(svg, margin, width / 2, width / 2, width / 2, 28)

      this.renderClusterSegmentBackground(svg, clusteredData.powerful, 'tr', 'Powerful', width, height, margin)
      this.renderClusterSegmentBackground(svg, clusteredData.innovative, 'br', 'Innovative', width, height, margin)
      this.renderClusterSegmentBackground(svg, clusteredData.liquid, 'bl', 'Liquid', width, height, margin)
      this.renderClusterSegmentBackground(svg, clusteredData.affordable, 'tl', 'Aspirational', width, height, margin)

      // Add zoomed in sector masks
      this.drawSectorMasks(svg, margin, width, height)

      // Add axis labels
      this.addAxisLabels(svg, width, height)
      // Add zoomed axis labels
      this.addZoomedAxisShape(svg, width, height, 0, '#F29131')
      this.addZoomedAxisShape(svg, width, height, 90, '#6AC6F1')

      this.renderClusterSegmentCityData(svg, clusteredData.powerful, 'tr', 'Powerful', width, height, margin)
      this.renderClusterSegmentCityData(svg, clusteredData.innovative, 'br', 'Innovative', width, height, margin)
      this.renderClusterSegmentCityData(svg, clusteredData.liquid, 'bl', 'Liquid', width, height, margin)
      this.renderClusterSegmentCityData(svg, clusteredData.affordable, 'tl', 'Affordable', width, height, margin)

      this.addZoomedAxisMasks(svg, width, height)
    },
    /**
     * Split the loaded data into clusters. Moved the data into an array
     * and returns a clustered data array
     */
    getDataInClusters() {
      const clusters = [
        'powerful',
        'liquid',
        'innovative',
        'affordable'
      ]
      const clusteredData = []
      clusters.forEach((cluster) => {
        const clusterData = this.filteredChartData.filter(function (el) {
          return el.cluster.toLowerCase() === cluster
        })
        clusteredData[cluster] = clusterData
      })
      // We store this in the Vue data so that we can get an unfiltered range for displaying filtered
      // data on the charts
      const unfilteredClusteredData = []
      clusters.forEach((cluster) => {
        const unfilteredClusterData = this.chartData.filter(function (el) {
          return el.cluster.toLowerCase() === cluster
        })
        unfilteredClusteredData[cluster] = unfilteredClusterData
      })
      this.clusteredChartData = unfilteredClusteredData

      return clusteredData
    },
    /**
     *
     * @param svg The d3 svg object to render inside of
     * @param data
     * @param chartPosition
     * @param segmentLabel
     * @param chartWidth
     * @param chartHeight
     * @param chartMargin
     */
    renderClusterSegmentCityData(svg, data, chartPosition, segmentLabel, chartWidth, chartHeight, chartMargin) {
      const vm = this

      // We need to set up the chart ranges based on the segment position
      let chartXRange = []
      let chartYRange = []

      switch (chartPosition) {
        case 'tr':
          chartXRange = [chartWidth, (chartWidth / 2) + 20]
          chartYRange = [0, (chartHeight / 2) - 20]
          break
        case 'br':
          chartXRange = [chartWidth, (chartWidth / 2) + 20]
          chartYRange = [chartHeight, (chartHeight / 2) + 20]
          break
        case 'bl':
          chartXRange = [0, (chartWidth / 2) - 20]
          chartYRange = [chartHeight, (chartHeight / 2) + 20]
          break
        case 'tl':
          chartXRange = [0, (chartWidth / 2) - 20]
          chartYRange = [0, (chartHeight / 2) - 20]
          break
        default:
          break
      }

      // Set up the axis
      const xDomain = d3.extent(vm.clusteredChartData[segmentLabel.toLowerCase()], function (d) {
        return d.attractiveness_score
      })
      const x = d3.scaleLinear()
        .domain(xDomain)
        .range(chartXRange) // we divide by 2 to get the segment size

      const yDomain = d3.extent(vm.clusteredChartData[segmentLabel.toLowerCase()], function (d) {
        return d.liquidity_score
      })
      const y = d3.scaleLinear()
        .domain(yDomain)
        .range(chartYRange) // we divide by 2 to get the segment size

      const tooltipDiv = d3.select('#goals_tooltip')

      // Render dots
      svg.append('g')
        .selectAll('dot')
        .data(data)
        .enter()
        .append('circle')
        .attr('cx', function (d) {
          return x(d.attractiveness_score)
        })
        .attr('cy', function (d) {
          return y(d.liquidity_score)
        })
        .attr('r', 5)
        .attr('class', function (d) {
          return `dot dot--${d.cluster.toLowerCase()} dot--${chartPosition}`
        })
        .on('click', function (event, d) {
          vm.modalCityId = d.id
          vm.showCityInfo();
          // const eleRect = event.target.getBoundingClientRect();
          // const targetRect = document.querySelector('.chart--goals').getBoundingClientRect();
          //
          // const dotPosY = eleRect.top - targetRect.top;
          // const dotPosX = eleRect.left - targetRect.left;
          //
          // tooltipDiv.transition()
          //   .duration(200)
          //   .style('display', 'block')
          //   .style('opacity', 1)
          // tooltipDiv
          //   .style('left', dotPosX + 27 + 'px')
          //   .style('top', dotPosY - 156 + 'px')
          //
          // tooltipDiv.select('.chart-tooltip__inner')
          //   .html(vm.getTooltipContent(d))
        })

      // Add dot city names
      svg.append('g')
        .selectAll('dot-label')
        .data(data)
        .enter()
        .append('text')
        .text(function (d) {
          return d.name
        })
        .attr('fill', '#B4A4A9')
        .attr('x', function (d) {
          return x(d.attractiveness_score) + 8 + (d.label ? d.label.position_x : 0)
        })
        .attr('y', function (d) {
          return y(d.liquidity_score) + 2 + (d.label ? d.label.position_y : 0)
        })
        .attr('class', function (d) {
          return `dot-label show-when-zoomed dot-label--${d.cluster.toLowerCase()} dot-label--${chartPosition}`
        })
    },
    /**
     * Render the chart background
     * @param svg
     * @param data
     * @param chartPosition
     * @param segmentLabel
     * @param chartWidth
     * @param chartHeight
     * @param chartMargin
     */
    renderClusterSegmentBackground(svg, data, chartPosition, segmentLabel, chartWidth, chartHeight, chartMargin) {
      const vm = this

      // We need to set up the chart ranges based on the segment position
      let textArcCurve = 'M -80,400 A 450,450 0 0,1 400,-80'
      let textArcCurveId = ''
      let zoomedLabelPos = {}
      let labelRotate = 0

      switch (chartPosition) {
        case 'tr':
          zoomedLabelPos = {
            x: chartWidth * .75,
            y: -20
          }
          labelRotate = 45
          textArcCurve = 'M 400,-150 A 525,525 0 0,1 950,400'
          textArcCurveId = 'arctr'
          break
        case 'br':
          zoomedLabelPos = {
            x: chartWidth * .75,
            y: chartHeight / 2 - 40
          }
          labelRotate = -45
          textArcCurve = 'M 950, 400 A 525,525 0 0,1 400, 950'
          textArcCurveId = 'arcbr'
          break
        case 'bl':
          zoomedLabelPos = {
            x: chartWidth * .25,
            y: chartHeight / 2 - 40
          }
          labelRotate = 45
          textArcCurve = 'M 400, 950 A 525,525 0 0,1 -150, 400'
          textArcCurveId = 'arcbl'
          break
        case 'tl':
          zoomedLabelPos = {
            x: chartWidth * .25,
            y: -20
          }
          labelRotate = -45
          textArcCurve = 'M -150,400 A 525,525 0 0,1 400,-150'
          textArcCurveId = 'arctl'
          break
        default:
          break
      }

      svg.append('path')
        .attr('id', textArcCurveId) // Unique id of the path
        .attr('d', textArcCurve) // SVG path
        .style('fill', 'none')

      // Create an SVG text element and append a textPath element
      svg.append('text')
        .append('textPath') // append a textPath to the text element
        .attr('xlink:href', '#' + textArcCurveId) // place the ID of the path here
        .style('text-anchor', 'middle') // place the text halfway on the arc
        .attr('startOffset', '50%')
        .text(segmentLabel)
        .attr('fill', '#802537')
        .style('font-size', '24px')
        .style('font-weight', 'bold')
        .style('text-transform', 'uppercase')
        .style('letter-spacing', '3px')
        .attr('class', 'hide-when-zoomed')

      svg.append('text')
        .style('text-anchor', 'middle') // place the text halfway on the arc
        .attr('x', zoomedLabelPos.x)
        .attr('y', zoomedLabelPos.y)
        .text(segmentLabel)
        .attr('fill', '#802537')
        .style('font-family', 'Corporate S Pro Light')
        .style('font-size', '24px')
        .style('text-transform', 'uppercase')
        .style('letter-spacing', '3px')
        .attr('class', 'show-when-zoomed sector-label sector-label--' + chartPosition)
    }
  }
}
</script>

<style lang="scss">
.chart--goals {
  display: flex;
  justify-content: space-around;
  background-color: #FCFBFB;
  position: relative;
  overflow: hidden;

  .dot {
    cursor: pointer;
  }

  .show-when-zoomed {
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
  }

  .hide-when-zoomed {
    opacity: 1;
    transition: opacity 0.3s ease-in-out;
  }

  &--zoomed {

    .chart--goals__zoom__sector-top {
      display: none;
    }

    .hide-when-zoomed {
      opacity: 0;
    }

    .show-when-zoomed {
      opacity: 1;
    }

    .sector-label {
      opacity: 0;
    }

    &-tl {
      .show-when-zoomed--tl {
        display: none;
      }

      .sector-label--tl {
        opacity: 1;
      }

      .axis-mask {
        &-left, &-top {
          display: none;
          opacity: 0;
        }
      }

      .dot, .dot-label {
        display: none;

        &--tl {
          display: block;
        }
      }

    }

    &-tr {
      .show-when-zoomed--tr {
        display: none;
      }

      .sector-label--tr {
        opacity: 1;
      }

      .axis-mask {
        &-right, &-top {
          display: none;
          opacity: 0;
        }
      }

      .dot, .dot-label {
        display: none;

        &--tr {
          display: block;
        }
      }
    }

    &-bl {
      .show-when-zoomed--bl {
        display: none;
      }

      .sector-label--bl {
        opacity: 1;
      }

      .axis-mask {
        &-bottom, &-left {
          display: none;
          opacity: 0;
        }
      }

      .dot, .dot-label {
        display: none;

        &--bl {
          display: block;
        }
      }
    }

    &-br {
      .show-when-zoomed--br {
        display: none;
      }

      .sector-label--br {
        opacity: 1;
      }

      .axis-mask {
        &-bottom, &-right {
          display: none;
          opacity: 0;
        }
      }

      .dot, .dot-label {
        display: none;

        &--br {
          display: block;
        }
      }
    }
  }

  svg {
    position: relative;
    z-index: 2;
  }

  &__zoom {
    position: absolute;
    top: 20px;
    left: 20px;
    z-index: 10;

    &--out {
      top: 577px;
      cursor: pointer;
      display: flex;
      flex-direction: column;
      align-items: center;

      img {
        display: block;

        &:last-child {
          margin-top: -10px;
        }
      }
    }

    &__sector {
      position: absolute;
      width: 500px;
      height: 500px;

      &--tl {
        top: 50px;
        left: 50px;

        // The zoom icon
        img {
          bottom: 140px;
          right: 150px;
        }
      }

      &--tr {
        top: 50px;
        left: 550px;

        // The zoom icon
        img {
          bottom: 140px;
          left: 150px;
        }
      }

      &--bl {
        top: 550px;
        left: 50px;

        // The zoom icon
        img {
          top: 140px;
          right: 130px;
        }
      }

      &--br {
        top: 550px;
        left: 550px;

        // The zoom icon
        img {
          top: 140px;
          left: 150px;
        }
      }
    }

    &__sector-top {
      z-index: 3;
      cursor: zoom-in;

      img {
        display: none;
        position: absolute;
      }

      &.highlighted {
        img {
          display: block;
        }
      }
    }

    &__sector-bg {
      z-index: 1;

      &.highlighted {
        background: #F0F0F0;
      }
    }
  }

  .dot-label {
    font-family: "Corporate S Pro";
    font-size: 6px;
  }
}

#goals-filter {
  top: 93px;
  left: 48px;
  z-index: 100;

  @include respond-below(sm) {
    top: 1rem;
    left: 1rem;
  }
}

.chart-tooltip--goals {
  height: 250px;
  width: 224px;
  padding-right: 0;
  top: 500px;

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

#goals_chart {
  position: relative;
  font-family: "Corporate S Pro";

  @include respond-below(sm) {
    overflow: auto;
  }

  svg {
    transition: transform 0.3s ease-in-out;
  }

  @include respond-between(xs, md) {
    svg{
      transform: scale(0.7);
      position: relative;
      top: 100px;
    }

  }
}
</style>
