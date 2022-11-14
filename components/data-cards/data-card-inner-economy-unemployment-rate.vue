<template>
  <div class="data-card-inner data-card-inner--economy-unemployment data-card-inner--economy">
    <p class="data-card-inner__title">
      UNEMPLOYMENT RATE (%)
    </p>
    <div class="data-card-inner__statistic">
      <p class="data-card-inner__statistic__number">
        <AnimatedNumber
          v-if="isInViewport"
          :value="value"
          :duration="animationDuration"
          :round="10"
          :delay="0"
        />
      </p>
    </div>
    <div class="data-card-inner__image">
      <div class="data-card-inner__speedo">
        <div class="data-card-inner__speedo__inner" :style="{transform: 'rotate(' + this.speedoAngle + 'deg)'}" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DataCardInnerEconomyUnemploymentRate',
  props: {
    cityData: {
      type: Object,
      default () {
        return null
      }
    },
    isInViewport: {
      type: Boolean,
      default () {
        return false
      }
    }
  },
  data () {
    return {
      animationDuration: 1000,
      // the property name to use from the API
      apiDataProperty: 'unemployment_rate',
      speedoAngle: {
        type: String,
        default () {
          return 180
        }
      }
    }
  },
  computed: {
    value () {
      const val = (this.cityData && this.cityData[this.apiDataProperty]) ? this.cityData[this.apiDataProperty] : 0
      return val
    }
  },
  mounted () {
    setTimeout(() => {
      // Calc the speedo angle to use
      this.speedoAngle = (this.value / 100) * 180
    }, 100)
  },
  methods: {
    animate (event) {

    }
  }
}
</script>

<style lang="scss">
.data-card-inner--economy-unemployment {

  .data-card-inner__statistic {
    text-align: center;
  }

  .data-card-inner__image {
  }
}
</style>
