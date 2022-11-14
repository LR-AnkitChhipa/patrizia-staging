<template>
  <div :class="cssClass">
    <p class="data-card-inner__title">
      GDP – NUTS 3<br>
      (€ MILLION)
    </p>
    <div class="data-card-inner__image">
      <inline-svg src="/images/data-cards/gdp.svg" />
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
  name: 'DataCardInnerEconomyGdp',
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
      apiDataProperty: 'gdp_nuts3_million_euro'
    }
  },
  computed: {
    value () {
      const val = (this.cityData && this.cityData[this.apiDataProperty]) ? this.cityData[this.apiDataProperty] : 0
      return val
    },
    cssClass () {
      let cssClass = 'data-card-inner data-card-inner--economy data-card-inner--economy-gdp'
      cssClass += (this.isInViewport ? ' data-card-inner--in-viewport' : '')
      return cssClass
    }
  },
  watch: {
    isInViewport (val) {
      if (val && process.client) {
        // Add in viewport method calls here...
      }
    },
    formatToNumber (value) {
      return Intl.NumberFormat('en-GB').format(value)
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
.data-card-inner--economy-gdp {

  &.data-card-inner--in-viewport {
    .data-card-inner__image {
      svg {
        .ship {

        }

        .building {
          .smoke-1, .smoke-2 {
            transform: translate(0, 0);
            opacity: 1;
          }
        }

        .plane {
          transform: translate(0, 0);
          opacity: 1;
        }
      }
    }
  }

  .data-card-inner__image {
    position: absolute;
    top: 24px;

    svg {
      .ship {
        transform: translateX(-10px);
        transition: transform 1s ease-in-out;
      }

      .building {
        .smoke-1, .smoke-2 {
          transition: transform 1s ease-in-out;
        }

        .smoke-1 {
          transform: translateY(10px);
          opacity: 0;
        }

        .smoke-2 {
          transform: translate(10px, 10px);
          opacity: 0;
        }
      }

      .lorry {
        animation: updown 1.5s ease infinite;
        transition: opacity 0.5s ease;
      }

      .plane {
        transform: translate(-110px, 30px);
        opacity: 0;
        transition: transform 0.5s ease, opacity 0.1s ease;
      }

      .ship {
        animation: updownship 5s ease infinite;
        transform-origin: 2020px 1472px;
      }
    }
  }

  .data-card-inner__statistic {
    position: absolute;
    top: 171px;
  }
}

@keyframes updown {
  0% { transform: translateY(-1px) }
  50% { transform: translateY(0px) }
  100% { transform: translateY(-1px) }
}

@keyframes updownship {
  0% { transform: rotate(1deg) }
  50% { transform: rotate(-1deg) }
  100% { transform: rotate(1deg) }
}
</style>
