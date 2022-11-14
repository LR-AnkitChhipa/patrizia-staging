<template>
  <client-only>
    <intersect @enter="drawRadial()" @leave="removeRadial()">
      <div class="modal-radial">
        <div class="modal-radial__chart" ref="modal-radial"></div>
        <div class="modal-radial__score">
          <p class="modal-radial__score__inner">
            <span class="modal-radial__score__rank">{{ this.overallRank }}</span>
            <span class="modal-radial__score__out-of">out of</span>
            <span class="modal-radial__score__total">{{ this.minScore }}</span>
          </p>
        </div>
      </div>
    </intersect>
  </client-only>
</template>

<script>
import * as d3 from 'd3'

export default {
  name: "modal-radial",
  data() {
    return {
      minScore: 142,
      chartData: [
        {
          name: 'Attractiveness',
          value: this.getFactorScore(this.attractivenessRank)
        },
        {
          name: 'Fundamentals',
          value: this.getFactorScore(this.marketRank)
        },
        {
          name: 'Economics',
          value: this.getFactorScore(this.economicsRank)
        },
        {
          name: 'Connectivity',
          value: this.getFactorScore(this.connectivityRank)
        },
        {
          name: 'Innovation',
          value: this.getFactorScore(this.innovationRank)
        }
      ]
    }
  },
  props: [
    'overallRank',
    'attractivenessRank',
    'marketRank',
    'economicsRank',
    'connectivityRank',
    'innovationRank',
  ],
  mounted() {
    // this.drawRadial()
  },
  methods: {
    removeRadial() {
      d3.select(this.$refs['modal-radial']).select('svg').remove()
    },
    drawRadial() {
      const width = 338,
        height = 338,
        chartRadius = height / 2;

      const color = d3.scaleOrdinal(d3.schemeCategory10);

      // We clear up any existing SVGs first
      d3.select(this.$refs['modal-radial']).select('svg').remove()
      let svg = d3.select(this.$refs['modal-radial']).append('svg')
        .attr('width', width)
        .attr('height', height)
        .append('g')
        .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');

      const PI = Math.PI,
        arcMinRadius = 62,
        arcPadding = 0;

      const data = this.chartData

      let scale = d3.scaleLinear()
        .domain([0, 142])
        .range([0, 2 * PI]);


      let keys = data.map((d, i) => d.name);
      //number of arcs
      const numArcs = keys.length;
      const arcWidth = 21;
      const centreCircleRadius = 62

      let arc = d3.arc()
        .innerRadius((d, i) => getInnerRadius(i))
        .outerRadius((d, i) => getOuterRadius(i))
        .startAngle(0)
        .endAngle((d, i) => scale(d))

      //data arcs
      let arcs = svg.append('g')
        .attr('class', 'data')
        .selectAll('path')
        .data(data)
        .enter().append('path')
        .attr('class', (d, i) => `arc modal-radial__arc--${d.name.toLowerCase()}`)

      arcs.transition()
        .delay((d, i) => i * 200)
        .duration(1000)
        .attrTween('d', arcTween);

      svg.append('circle')
        .attr('cx', 0)
        .attr('cy', 0)
        .attr('r', centreCircleRadius)
        .attr('fill', '#F0ECED')


      function arcTween(d, i) {
        let interpolate = d3.interpolate(0, d.value);
        return t => arc(interpolate(t), i);
      }

      function getInnerRadius(index) {
        return arcMinRadius + (numArcs - (index + 1)) * (arcWidth + arcPadding);
      }

      function getOuterRadius(index) {
        return getInnerRadius(index) + arcWidth;
      }
    },
    /**
     * Get the factor score for displaying on the chart (e.g. a rank of 1 should display full on the chart
     * @param factorRank
     * @returns {number}
     */
    getFactorScore(factorRank) {
      const rank = (142 - factorRank)
      // console.log(rank)
      return rank;
    }
  }
}
</script>

<style lang="scss">
.modal-radial {
  position: relative;

  &__chart {
    position: relative;
    z-index: 1;

    @include respond-below(sm) {
      transform: scale(0.89);
    }
  }

  &__score {
    position: absolute;
    z-index: 2;
    top: 107px;
    left: 107px;
    width: 125px;
    height: 125px;
    display: flex;
    justify-content: space-around;
    align-items: center;

    &__rank {
      margin: 9px 0 0 0;
      display: block;
      font-family: "Corporate S Pro light";
      font-size: 40px;
      line-height: 48px;
      color: #210A12;
      text-align: center;
    }

    &__out-of {
      display: block;
      font-family: "Corporate S Pro Bold";
      font-size: 14px;
      line-height: 16px;
      text-transform: uppercase;
      letter-spacing: 0.071rem;
      color: #B4A4A9;
      text-align: center;
      margin: 0;
    }

    &__total {
      display: block;
      font-family: "Corporate S Pro light";
      font-size: 40px;
      line-height: 48px;
      color: #210A12;
      text-align: center;
      margin: 0;
    }

    &__inner {
    }
  }

  &__arc {
    &--attractiveness {
      fill: #802537;
    }

    &--fundamentals {
      fill: #29B5BA;
    }

    &--economics {
      fill: #6AC6F1;
    }

    &--connectivity {
      fill: #F29131;
    }

    &--innovation {
      fill: #A44993;
    }
  }
}
</style>
