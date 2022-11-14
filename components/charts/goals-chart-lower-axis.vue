<template>
  <section class="chart chart--goals">
    <div id="goals_chart2">
      <div id="goals_tooltip2" class="tooltip" />
    </div>
    <range-filter
      @attractiveness-range-updated="attractivenessRangeUpdated"
      @liquidity-range-updated="liquidityRangeUpdated"
    />
  </section>
</template>

<script>
import * as d3 from 'd3'
import ChartService from '~/services/chart-service'
import RangeFilter from '@/components/inputs/range-filter'

export default {
  name: 'GoalsChartLowerAxis',
  components: { RangeFilter },
  data () {
    return {
      chartData: null,
      clusteredChartData: null,
      filteredChartData: null,
      liquidityFilters: null,
      attractivenessFilters: null,
      visibleClusters: ['powerful', 'affordable', 'liquid', 'innovative'] // The initially visible clusters,
    }
  },
  async mounted () {
    await this.loadChartData()
    this.renderClusterChart()
    // this.renderScatterChart()
  },
  methods: {
    async loadChartData () {
      const response = await ChartService.getGoalsData(this)
      this.chartData = response.data
      this.filteredChartData = this.chartData
    },
    attractivenessRangeUpdated (value) {
      this.attractivenessFilters = value
      if (process.client) {
        this.applyFilters()
      }
    },
    liquidityRangeUpdated (value) {
      this.liquidityFilters = value
      if (process.client) {
        this.applyFilters()
      }
    },
    applyFilters () {
      const vm = this
      // this.filteredChartData = null
      if (this.chartData && this.liquidityFilters && this.attractivenessFilters) {
        this.filteredChartData = this.chartData.filter(function (obj) {
          if (vm.liquidityFilters[obj.liquidity_rank] && vm.attractivenessFilters[obj.attractiveness_rank]) {
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
    getTooltipContent (d) {
      const html = d.name +
        '<br>' +
        '<span class="tooltip__country">' + d.country + '</span>' +
        '<br>' +
        'Liquidity Rank ' + d.liquidity_score +
        '<br>' +
        'Liquidity score ' + d.liquidity_rank +
        '<br>' +
        'Attractiveness Rank ' + d.attractiveness_score +
        '<br>' +
        'Attractiveness score ' + d.attractiveness_rank
      return html
    },
    /**
     * Render the clusters
     */
    renderClusterChart () {
      // Cluster the data
      const clusteredData = this.getDataInClusters()

      // set the dimensions and margins of the graph
      const margin = 130
      const width = 1000 - margin * 2
      const height = 1000 - margin * 2

      // Clear any existing charts
      d3.selectAll('#goals_chart2 svg').remove()
      // append the svg object to the body of the page
      const svg = d3.select('#goals_chart2')
        .append('svg')
        .attr('width', width + margin * 2)
        .attr('height', height + margin * 2)
        .append('g')
        .attr('transform',
          'translate(' + margin + ',' + margin + ')')
      // Add the axis lines
      // X
      svg.append('line')
        .attr('x1', 0 - 50)
        .attr('y1', height / 2)
        .attr('x2', width + 50)
        .attr('y2', height / 2)
        .style('stroke', 'black')
      // Y
      svg.append('line')
        .attr('x1', width / 2)
        .attr('y1', -50)
        .attr('x2', width / 2)
        .attr('y2', height + 50)
        .style('stroke', 'black')
      // Add background circle
      svg.append('circle')
        .attr('cx', width / 2)
        .attr('cy', width / 2)
        .attr('r', (width / 2) + 30)
        .style('stroke', 'black')
        .style('fill', 'transparent')
      // Add axis labels
      svg.append('text')
        .attr('x', width / 2 + 20)
        .attr('y', 10)
        .text('Highly Liquid')
      svg.append('text')
        .attr('x', width / 2)
        .attr('y', height / 2)
        .text('No Liquidity')
      svg.append('text')
        .attr('x', width / 2 + 20)
        .attr('y', height)
        .text('Highly Liquidity')
      svg.append('text')
        .attr('x', width / 2)
        .attr('y', height / 2 + 30)
        .text('Average Attractiveness')
      svg.append('text')
        .attr('x', -120)
        .attr('y', height / 2 + 30)
        .text('Excellent Attractiveness')
      svg.append('text')
        .attr('x', width - 30)
        .attr('y', height / 2 + 30)
        .text('Excellent Attractiveness')

      this.renderClusterSegment(svg, clusteredData.powerful, 'top-right', 'Powerful', width, height, margin)
      this.renderClusterSegment(svg, clusteredData.innovative, 'bottom-right', 'Innovative', width, height, margin)
      this.renderClusterSegment(svg, clusteredData.liquid, 'bottom-left', 'Liquid', width, height, margin)
      this.renderClusterSegment(svg, clusteredData.affordable, 'top-left', 'Affordable', width, height, margin)
    },
    /**
     * Split the loaded data into clusters. Moved the data into an array
     * and returns a clustered data array
     */
    getDataInClusters () {
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
    renderClusterSegment (svg, data, chartPosition, segmentLabel, chartWidth, chartHeight, chartMargin) {
      const vm = this

      // We need to set up the chart ranges based on the segment position
      let chartXRange = []
      let chartYRange = []
      let labelPos = {}
      let labelRotate = 0
      switch (chartPosition) {
        case 'top-right':
          chartXRange = [chartWidth, (chartWidth / 2) + 20]
          chartYRange = [0, (chartHeight / 2) + 20]
          labelPos = {
            x: chartHeight,
            y: 0
          }
          labelRotate = 45
          break
        case 'bottom-right':
          chartXRange = [chartWidth, (chartWidth / 2) + 20]
          chartYRange = [chartHeight, (chartHeight / 2) + 20]
          labelPos = {
            x: chartHeight,
            y: chartWidth
          }
          labelRotate = -45
          break
        case 'bottom-left':
          chartXRange = [0, (chartWidth / 2) - 20]
          chartYRange = [chartHeight, (chartHeight / 2) - 20]
          labelPos = {
            x: 0,
            y: chartHeight
          }
          labelRotate = 45
          break
        case 'top-left':
          chartXRange = [0, (chartWidth / 2) - 20]
          chartYRange = [0, (chartHeight / 2) - 20]
          labelPos = {
            x: 0,
            y: 0
          }
          labelRotate = -45
          break
        default:
          break
      }

      // Set up the axis
      const xDomain = d3.extent(vm.chartData, function (d) {
        return d.attractiveness_score
      })
      const x = d3.scaleLinear()
        .domain(xDomain)
        .range(chartXRange)

      const yDomain = d3.extent(vm.chartData, function (d) {
        return d.liquidity_score
      })
      const y = d3.scaleLinear()
        .domain(yDomain)
        .range(chartYRange)

      const tooltipDiv = d3.select('#goals_tooltip2')
      // Add the segment label
      svg.append('text')
        .attr('x', labelPos.x)
        .attr('y', labelPos.y)
        .attr('text-anchor', 'middle')
        .attr('dominant-baseline', 'central')
        .attr('transform', 'rotate(' + labelRotate + ', ' + labelPos.x + ', ' + labelPos.y + ')')
        .text(segmentLabel)
        .style('font-size', '24px')
        .style('font-weight', 'bold')
      // .style('transform', 'rotate(45deg)')

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
        .attr('r', 7)
        .attr('class', function (d) {
          return 'dot dot--' + d.cluster.toLowerCase()
        })
        .on('click', function (event, d) {
          const dotPos = event.target.getBoundingClientRect()
          tooltipDiv.transition()
            .duration(200)
            .style('opacity', 1)
          tooltipDiv.html(vm.getTooltipContent(d))
            .style('left', dotPos.left + 'px')
            .style('top', dotPos.top + 'px')
        })
    }
  }
}
</script>

<style lang="scss">
#goals_chart2 {
  position: relative;
}
</style>
