<template>
  <div :class="cssClass">
    <p class="data-card-inner__title">
      Population
    </p>
    <div class="data-card-inner__image">
      <inline-svg src="/images/data-cards/population.svg" @loaded="isSvgLoaded = true" />
    </div>
    <div class="data-card-inner__statistic">
      <p class="data-card-inner__statistic__number">
        <AnimatedNumber
          v-if="isInViewport && !animationDisabled"
          :value="value"
          :duration="animationDuration"
          :round="10"
          :delay="0"
        />
        <span v-if="animationDisabled">{{ parseFloat(value).toFixed(2) }}</span>
      </p><p class="data-card-inner__statistic__text">
        million
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DataCardInnerDemographicsPopulation',
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
      apiDataProperty: 'population',
      isSvgLoaded: false
    }
  },
  computed: {
    value () {
      const val = (this.cityData && this.cityData[this.apiDataProperty]) ? this.cityData[this.apiDataProperty] : 0
      return val / 1000000
    },
    cssClass () {
      let cssClass = 'data-card-inner data-card-inner--population data-card-inner--demographics'
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
</script>

<style lang="scss">
.data-card-inner--population {

  .data-card-inner__image {
    height: 71px;

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
