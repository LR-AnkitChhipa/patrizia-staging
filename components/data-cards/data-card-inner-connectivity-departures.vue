<template>
  <div :class="cssClass">
    <p class="data-card-inner__title">
      PASSENGER VOLUME<br>
      DEPARTURES FROM AIRPORT
    </p>
    <div class="data-card-inner__image">
      <inline-svg src="/images/data-cards/departures.svg" @loaded="isSvgLoaded = true" />
    </div>
    <div class="data-card-inner__statistic">
      <p class="data-card-inner__statistic__number">
        <AnimatedNumber
          v-if="isInViewport"
          :value="value"
          :format-value="formatToNumber"
          :duration="animationDuration"
          :round="1"
          :delay="0"
        />
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DataCardInnerConnectivityDepartures',
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
      apiDataProperty: 'airport_passenger_volume',
      isSvgLoaded: false
    }
  },
  computed: {
    value () {
      const val = (this.cityData && this.cityData[this.apiDataProperty]) ? this.cityData[this.apiDataProperty] : 0
      return val
    },
    cssClass () {
      let cssClass = 'data-card-inner data-card-inner--connectivity data-card-inner--departures'
      cssClass += (this.isInViewport ? ' data-card-inner--in-viewport' : '')
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
      // get the svg groups with child class
      const childGroups = this.$el.querySelectorAll('svg .child')
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
.data-card-inner--departures {

  &.data-card-inner--in-viewport {
   svg .plane {
     transform: translate(0, 0) !important;
   }
  }

  .data-card-inner__statistic {
    position: absolute;
    top: 156px;
    left: 20px;
  }

  .data-card-inner__image {
    position: absolute;
    top: 70px;
    left: 94px;

    svg {
      .plane {
        transform: translate(-50px, 5px);
        transition: transform 1s linear;
      }

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
