<template>
  <section class="chart chart--goals">
    <div id="goals_chart" />
    <pre>
      {{ chartData }}
    </pre>
  </section>
</template>

<script>
import * as d3 from 'd3'
import ChartService from '~/services/chart-service'

export default {
  name: 'GoalsOldChart',
  data () {
    return {
      chartData: null
    }
  },
  mounted () {
    // this.loadChartData()
    this.renderScatterChart()
  },
  methods: {
    async loadChartData () {
      const response = await ChartService.getGoalsData(this)
      this.chartData = response.data
    },
    getTooltipContent (d) {
      const html = d.name +
        '<br>' +
        '<span class="tooltip__country">' + d.country + '</span>' +
        '<br>' +
        'Liquidity Rank ' + d.liquidity_score +
        '<br>' +
        'Attractiveness Rank ' + d.attractiveness_score
      return html
    },
    renderScatterChart () {
      const vm = this
      const div = d3.select('body').append('div')
        .attr('class', 'tooltip')
        .style('opacity', 0)

      // set the dimensions and margins of the graph
      const margin = {
        top: 130,
        right: 130,
        bottom: 130,
        left: 130
      }
      const width = 1000 - margin.left - margin.right
      const height = 1000 - margin.top - margin.bottom

      // append the svg object to the body of the page
      const svg = d3.select('#goals_chart')
        .append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform',
          'translate(' + margin.left + ',' + margin.top + ')')

      // Read the data
      d3.json(process.env.VUE_APP_API_ENDPOINT + '/chart/goals').then((data) => {
        // Add X axis
        let xDomain = d3.extent(data, function (d) {
          return d.attractiveness_score
        })
        xDomain = [xDomain[0] - 20, xDomain[1] + 20]
        const x = d3.scaleLinear()
          .domain(xDomain)
          .range([0, width])
        svg.append('g')
          .attr('transform', 'translate(0,' + height / 2 + ')')
          .call(d3.axisBottom(x).ticks(0))

        // Add Y axis
        let yDomain = d3.extent(data, function (d) {
          return d.liquidity_score
        })
        yDomain = [yDomain[0] - 20, yDomain[1] + 20]
        const y = d3.scaleLinear()
          .domain(yDomain)
          .range([height, 0])
        svg.append('g')
          .attr('transform', 'translate(' + width / 2 + ')', 0)
          .call(d3.axisLeft(y).ticks(0))

        // Add background circle
        svg.append('circle')
          .attr('cx', width / 2)
          .attr('cy', width / 2)
          .attr('r', (width / 2) - 20)
          .style('stroke', 'black')
          .style('fill', 'transparent')

        // Add dots
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
          .attr('r', 8)
          .attr('class', function (d) {
            return 'dot dot--' + d.cluster.toLowerCase()
          })
          .on('click', function (event, d) {
            div.transition()
              .duration(200)
              .style('opacity', 1)
            div.html(vm.getTooltipContent(d))
              .style('left', (event.pageX - 100) + 'px')
              .style('top', (event.pageY - 120) + 'px')
          })
        // Add axis labels
        svg.append('text')
          .attr('x', width / 2 + 20)
          .attr('y', 10)
          .text('Highly Liquid')
        svg.append('text')
          .attr('x', width / 2 + 20)
          .attr('y', height)
          .text('No Liquidity')
        svg.append('text')
          .attr('x', -120)
          .attr('y', height / 2 + 30)
          .text('Average Attractiveness')
        svg.append('text')
          .attr('x', width - 30)
          .attr('y', height / 2 + 30)
          .text('Excellent Attractiveness')
      })
    }
  }
}
</script>

<style lang="scss">
.chart--goals {
  display: flex;
  align-items: center;
  justify-content: space-around;
}

.dot {
  stroke: black;
  fill: red;
  stroke-width: 1.5px;

  &--affordable {
    fill: white;
    border: 1px solid red;
  }

  &--powerful {
    fill: black;
  }

  &--liquid {
    fill: #777;
    stroke: #777;
  }

  &--innovative {
    fill: #c6c4c5;
  }
}

.tooltip {
  position: absolute;
  z-index: 100;
  background-color: black;
  color: white;
  padding: 10px;
  border-radius: 5px;
  width: 200px;
  height: 100px;

  &__country {
    font-size: small;
    color: #c0c0c0;
  }
}
</style>
