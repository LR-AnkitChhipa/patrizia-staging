<template>
  <div :class="cssClass">
    <p class="data-card-inner__title">
      NUMBER OF COMMUTERS ON<br>
      PUBLIC TRANSPORT (%)
    </p>
    <div class="data-card-inner__image">
      <inline-svg src="/images/data-cards/public-transport.svg" />
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
    </div>
  </div>
</template>

<script>
export default {
  name: 'DataCardInnerConnectivityPublicTransportCommuters',
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
      apiDataProperty: 'share_of_public_transportation'
    }
  },
  computed: {
    value () {
      const val = (this.cityData && this.cityData[this.apiDataProperty]) ? this.cityData[this.apiDataProperty] : 0
      return val
    },
    cssClass () {
      let cssClass = 'data-card-inner data-card-inner--connectivity data-card-inner--public-transport-commuters'
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
.data-card-inner--public-transport-commuters {

  &.data-card-inner--in-viewport {
    .data-card-inner__image {
      svg {
        .bus, .train {
          transform: translate(0);
          opacity: 1;
        }
      }
    }
  }

  .data-card-inner__image {
    position: absolute;
    top: 83px;
    left: 0;
    width: 338px;
    height: 72px;

    svg {
      width: 338px;
      height: 72px;

      .bus, .train {
        transition: transform 1s ease-in-out, opacity 0.3s ease-in-out;
        opacity: 0;
      }

      .bus {
        transform: translateX(-220px);
      }

      .train {
        transform: translateX(-180px);
      }
    }
  }

  .data-card-inner__statistic {
    position: absolute;
    top: 163px;
    left: 20px;
  }
}
</style>
