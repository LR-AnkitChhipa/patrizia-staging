<template>
  <div :class="cssClass">
    <p class="data-card-inner__title">
      Population
    </p>
    <div class="data-card-inner__image">
      <inline-svg src="/images/data-cards/population.svg" />
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
        />
      </p>
      <p class="data-card-inner__statistic__text">
        million
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DataCardInnerDemographicsPopulation',
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
      apiDataProperty: 'population'
    }
  },
  computed: {
    value () {
      const val = (this.cityData && this.cityData[this.apiDataProperty]) ? this.cityData[this.apiDataProperty] : 0
      return val
    },
    cssClass () {
      let cssClass = 'data-card-inner data-card-inner--innovation data-card-inner--household-income'
      cssClass += (this.isInViewport ? ' data-card-inner--in-viewport' : '')
      return cssClass
    }
  },
  watch: {
    isInViewport (val) {
      if (val && process.client) {
        // Add in viewport method calls here...
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
.data-card-inner--population {

  .data-card-inner__image {
  }
}
</style>
