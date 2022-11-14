<template>
  <div :class="cssClass">
    <p class="data-card-inner__title">
      HOW MANY PEOPLE COMMUTE<br>
      TO WORK BY CAR (%)
    </p>
    <div class="data-card-inner__bar-chart">
      <div class="data-card-inner__bar-chart__inner" :style="{width: barWidth}" />
    </div>
    <div class="data-card-inner__image">
      <inline-svg src="/images/data-cards/commute.svg" />
    </div>
    <div class="data-card-inner__statistic">
      <p class="data-card-inner__statistic__number">
        <AnimatedNumber
          v-if="isInViewport"
          :value="value"
          :format-value="formatToNumber"
          :duration="animationDuration"
          :round="10"
          :delay="0"
        />*
      </p>
    </div>
    <p class="data-card-inner__smallprint">
      * Per 100 people
    </p>
  </div>
</template>

<script>
export default {
  name: 'DataCardInnerConnectivityCommute',
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
      apiDataProperty: 'car_to_work_ratio',
      barWidth: '0%'
    }
  },
  computed: {
    value () {
      const val = (this.cityData && this.cityData[this.apiDataProperty]) ? this.cityData[this.apiDataProperty] : 0
      return val
    },
    cssClass () {
      let cssClass = 'data-card-inner data-card-inner--connectivity data-card-inner--commute'
      cssClass += (this.isInViewport ? ' data-card-inner--in-viewport' : '')
      return cssClass
    }
  },
  watch: {
    isInViewport (val) {
      const vm = this
      if (val && process.client) {
        setTimeout(() => {
          this.barWidth = vm.value + '%'
        }, 100)
      }
    }
  },
  methods: {
    animate (event) {

    },
    formatToNumber (value) {
      return Intl.NumberFormat('en-GB').format(value)
    }
  }
}
</script>

<style lang="scss">
.data-card-inner--commute {

  .data-card-inner__statistic {
    position: absolute;
    top: 145px;
    left: 22px;
  }

  .data-card-inner__smallprint {
    position: absolute;
    top: 212px;
    left: 22px;
  }

  .data-card-inner__bar-chart {
    height: 57px;

    &__inner {
      height: 57px;
    }
  }

  .data-card-inner__statistic {
    position: absolute;
    top: 157px;
    left: 20px;
  }

  .data-card-inner__image {
    position: absolute;
    top: 157px;
    left: 171px;
  }

  .data-card-inner__smallprint {
    position: absolute;
    top: 300px;
    left: 20px;
  }
}
</style>
