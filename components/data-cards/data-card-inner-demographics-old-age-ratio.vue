<template>
  <div :class="cssClass">
    <p class="data-card-inner__title">
      OLD AGE DEPENDENCY RATIO
    </p>
    <div class="data-card-inner__image">
      <div class="data-card-inner__bar-chart">
        <div class="data-card-inner__bar-chart__inner" :style="{width: barWidth}" />
      </div>
    </div>
    <div class="data-card-inner__statistic">
      <p class="data-card-inner__statistic__number">
        <AnimatedNumber
          v-if="isInViewport && !animationDisabled"
          :value="value"
          :duration="animationDuration"
          :round="10"
          :delay="0"
        /><span v-if="animationDisabled">{{ parseFloat(value).toFixed(1) }}</span>*
      </p>
      <p class="data-card-inner__smallprint">
        * Per 100 15–64 year olds
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DataCardInnerDemographicsOldAgeRatio',
  props: {
    animationDisabled: {
      type: Boolean,
      default () {
        return false
      }
    },
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
      apiDataProperty: 'old_age_ratio',
      barWidth: '0%'
    }
  },
  computed: {
    cssClass () {
      let cssClass = 'data-card-inner data-card-inner--old-age-ration data-card-inner--demographics'
      cssClass += (this.isInViewport ? ' data-card-inner--in-viewport' : '')
      cssClass += (this.animationDisabled ? ' data-card-inner--animation-disabled' : '')

      return cssClass
    },
    value () {
      const val = (this.cityData && this.cityData[this.apiDataProperty]) ? this.cityData[this.apiDataProperty] : 0
      return val
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
  }
}
</script>

<style lang="scss">
.data-card-inner--old-age-ration {

  .data-card-inner__image {
  }

  .data-card-inner__statistic {
    margin-top: 8px;
  }
}
</style>
