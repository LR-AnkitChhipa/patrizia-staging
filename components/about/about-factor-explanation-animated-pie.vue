<template>
  <client-only>
  <intersect
    @enter="isInViewport = true"
    @leave="isInViewport = false"
  >
    <div
      :class="`about-pie-chart about-pie-chart--${this.clusterName} about-pie-chart--${this.isInViewport ? 'visible' : 'not-visible'}`"
      ref="pieChart">
      <div class="about-pie-chart__center"></div>

    </div>
  </intersect>
  </client-only>
</template>

<script>
import * as d3 from 'd3'

export default {
  name: "about-factor-explanation-animated-pie",
  props: {
    /**
     * The chart data in an array e.g. [53245, 28479, 19697, 24037, 40245]
     */
    data: {
      type: Array,
      default() {
        return []
      }
    },
    // The chart colours in an array. Same order as the chart data
    colours: {
      type: Array,
      default() {
        return []
      }
    },
    clusterName: {
      type: String,
      default() {
        return 'demographics'
      }
    }
  },
  data() {
    return {
      isInViewport: false
    }
  },
  methods: {
    /**
     * Remove the D3 Chart
     */
    unloadChart() {
      const pieChart = this.$refs.pieChart
      d3.select(pieChart).select('svg').remove()
    },
    /**
     * Load the D3 chart
     */
    loadChart() {
      const data = this.data

      const pieChart = this.$refs.pieChart
      d3.select(pieChart)
        .select('svg').remove()

      let width = 398,
        height = 398,
        radius

      const svg = d3.select(pieChart)
        .append('svg')
        .attr('class', 'about-pie-chart__chart')
        .attr('width', '100%')
        .attr("preserveAspectRatio", "xMinYMin meet")
        .attr("viewBox", "0 0 398 398")

      const g = svg.attr('height', height)
        .append('g')
        .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')')

      radius = Math.min(width, height) / 2

      const pie = d3.pie()
        .sort(null)

      const arc = d3.arc()
        .innerRadius(radius - 89)
        .outerRadius(radius)

      const vm = this

      const path = g.selectAll("path")
        .data(pie(data))
        .enter().append("path")
        .attr("fill", function (d, i) {
          return vm.colours[i]
        })
        .transition()
        .duration(500)
        .ease(d3.easeQuadIn)
        .delay(function (d, i) {
          return i * 10
        })
        .attrTween('d', function (d) {
          const i = d3.interpolate(d.startAngle, d.endAngle)
          return function (t) {
            d.endAngle = i(t)
            return arc(d)
          }
        })

    }
  },
  watch: {
    isInViewport(val) {
      if (val === true) {
        this.loadChart()
      } else {
        this.unloadChart()
      }
    }
  },
}
</script>

<style lang="scss">
.about-pie-chart {
  position: relative;

  &--visible {
    .about-pie-chart__center:after {
      opacity: 1;
    }
  }

  &__chart {
    position: relative;
    z-index: 1;
  }

  &__center {
    box-shadow: 1px 1px 20px rgba(34, 10, 18, 0.2);
    background-color: #FCFBFB;
    position: absolute;
    z-index: 20;
    width: 220px;
    height: 220px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 110px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    @include respond-below(md) {
      width: 350px;
      height: 350px;
      border-radius: 50%;
    }
    @include respond-below(sm) {
      width: 180px;
      height: 180px;
      background: #fff;
    }

    &:after {
      position: relative;
      content: '';
      width: 76px;
      height: 73px;
      opacity: 0;
      transition: opacity 0.3s ease-in-out 0.3s;
      background: {
        position: center;
        size: contain;
        repeat: no-repeat;
      };

      .about-pie-chart--demographics & {
        background-image: url("/images/demoraphics-icon.svg");
      }

      .about-pie-chart--innovation & {
        background-image: url('~@/assets/img/about/pie-innovation-icon.svg');
        width: 91px;
        height: 106px;
      }

      .about-pie-chart--connectivity & {
        background-image: url('~@/assets/img/about/pie-connectivity-icon.svg');
        width: 97px;
        height: 97px;
      }

      .about-pie-chart--economics & {
        background-image: url('~@/assets/img/about/pie-economics-icon.svg');
        width: 73px;
        height: 73px;
      }
    }


  }
}
</style>
