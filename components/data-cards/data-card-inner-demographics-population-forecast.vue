<template>
  <div :class="cssClass">
    <div class="data-card-inner--population-forecast__header">
      <p class="data-card-inner__title">
        Population Forecast 2020-2030
      </p>
      <div class="data-card-inner__statistic">
        <p class="data-card-inner__statistic__number">
          +<AnimatedNumber
            v-if="isInViewport && !animationDisabled"
            :value="value"
            :duration="animationDuration"
            :round="100"
            :delay="0"
          /><span v-if="animationDisabled">{{ value }}</span>%
        </p>
      </div>
    </div>
    <div class="data-card-inner__image">
      <inline-svg src="/images/data-cards/population-forecast.svg" @loaded="animate($event)" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'DataCardInnerDemographicsPopulationForecast',
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
      apiDataProperty: 'population_forecast_2020_2030',
      isSvgLoaded: false
    }
  },
  computed: {
    value () {
      const val = (this.cityData && this.cityData[this.apiDataProperty]) ? this.cityData[this.apiDataProperty] : 0
      return val
    },
    cssClass () {
      let cssClass = 'data-card-inner data-card-inner--population-forecast data-card-inner--demographics'
      cssClass += (this.isInViewport ? ' data-card-inner--in-viewport' : '')
      cssClass += (this.animationDisabled ? ' data-card-inner--animation-disabled' : '')

      return cssClass
    }
  },
  watch: {
    isInViewport (val) {
      if (val && process.client && this.isSvgLoaded) {
        this.animate()
      }
    },
    isSvgLoaded (val) {
      if (val && process.client && this.isInViewport) {
        this.animate()
      }
    }
  },
  methods: {
    animate () {
      if (!this.animationDisabled) {
        // get the svg groups with child class
        const childGroups = this.$el.querySelectorAll('svg g.child')
        if (childGroups.length > 0) {
          const nextLoadDelay = this.animationDuration / childGroups.length
          showChild(0, nextLoadDelay)
        }

        function showChild (number, nextLoadDelay) {
          if (childGroups.length >= number) {
            childGroups[number].classList.add('child--show')
            if (number + 1 < childGroups.length) {
              setTimeout(() => {
                showChild(number + 1, nextLoadDelay)
              }, nextLoadDelay)
            }
          }
        }
      }
    }
  }
}
</script>

<style lang="scss">

.data-card-inner--population-forecast {

  &__header {
    display: flex;
    justify-content: space-between;
    height: 96px;

    .data-card-inner__title {
      position: absolute;
      top: 21px;
    }

    .data-card-inner__statistic {
      position: absolute;
      top: 54px;
    }
  }

  .data-card-inner__image {
    height: 107px;
    width: 319px;
    margin-left: -24px;

    svg {
      height: 100%;
      width: auto;

      .child {
        opacity: 0;
        transition: opacity 0.3s ease;

        &--show {
          opacity: 1;
        }
      }
    }
  }
}

@keyframes dash {
  to {
    stroke-dashoffset: 0;
  }
}
</style>
