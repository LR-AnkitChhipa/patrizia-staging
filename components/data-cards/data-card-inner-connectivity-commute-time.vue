<template>
  <div :class="cssClass">
    <p class="data-card-inner__title">
      AVERAGE COMMUTE TIME<br>
      TO WORK (MINUTES)
    </p>
    <div class="data-card-inner__image">
      <inline-svg src="/images/data-cards/commute-time.svg" @loaded="isSvgLoaded = true" />
    </div>
    <inline-svg class="data-card-inner__clock__minute-hand" src="/images/data-cards/commute-time-minute-hand.svg" />
    <inline-svg class="data-card-inner__clock__hour-hand" src="/images/data-cards/commute-time-hour-hand.svg" />
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
  name: 'DataCardInnerConnectivityCommuteTime',
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
      apiDataProperty: 'average_travel_time_to_work',
      isSvgLoaded: false
    }
  },
  computed: {
    value () {
      const val = (this.cityData && this.cityData[this.apiDataProperty]) ? this.cityData[this.apiDataProperty] : 0
      return val
    },
    cssClass () {
      let cssClass = 'data-card-inner data-card-inner--connectivity data-card-inner--commute-time'
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
.data-card-inner--commute-time {

  &.data-card-inner--in-viewport {
    .data-card-inner__clock__minute-hand {
      transform: rotate(2565deg);
    }

    .data-card-inner__clock__hour-hand {
      transform: rotate(315deg);
    }
  }

  .data-card-inner {
    &__clock {
      &__hour-hand, &__minute-hand {
        transition: transform 1s linear;
      }

      &__minute-hand {
        position: absolute;
        top: 93px;
        left: 168px;
        transform-origin: 0% 100%;
      }

      &__hour-hand {
        position: absolute;
        top: 111px;
        left: 168px;
        transform-origin: 50% 85%;
      }
    }
  }

  .data-card-inner__image {
    position: absolute;
    top: 76px;
    left: 34px;

    svg {
      width: 100%;
      height: 100%;

      .child {
        opacity: 0;
        transition: opacity 0.3s ease;

        &--show {
          opacity: 1;
        }
      }
    }
  }

  .data-card-inner__statistic {
    position: absolute;
    top: 67px;
    left: 42px;
  }
}
</style>
