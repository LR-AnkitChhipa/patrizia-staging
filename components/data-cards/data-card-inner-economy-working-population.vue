<template>
  <div class="data-card-inner data-card-inner--population data-card-inner--economy">
    <p class="data-card-inner__title">
      Working Population
    </p>
    <div class="data-card-inner__image">
      <inline-svg src="/images/data-cards/population.svg" @loaded="isSvgLoaded = true" />
    </div>
    <div class="data-card-inner__statistic">
      <p class="data-card-inner__statistic__number">
        <AnimatedNumber
          v-if="isInViewport"
          :value="value"
          :duration="animationDuration"
          :format-value="formatToNumber"
          :round="1"
          :delay="0"
        />
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DataCardInnerEconomyWorkingPopulation',
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
      apiDataProperty: 'working_population',
      isSvgLoaded: false
    }
  },
  computed: {
    value () {
      const val = (this.cityData && this.cityData[this.apiDataProperty]) ? this.cityData[this.apiDataProperty] : 0
      return val
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
    animate (event) {
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
</style>
