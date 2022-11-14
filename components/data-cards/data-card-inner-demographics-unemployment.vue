<template>
  <div class="data-card-inner data-card-inner--unemployment data-card-inner--demographics">
    <p class="data-card-inner__title">
      UNEMPLOYMENT (%)
    </p>
    <div v-if="isInViewport" class="data-card-inner__image">
      <vue-ellipse-progress
        color="#89D1F4"
        :progress="value"
        legend-class="data-card-inner__progress__legend"
        :legend-formatter="({currentValue}) => currentValue"
        empty-color="#E1F1FB"
        line="square"
        line-mode="normal 0"
        :size="170"
        :thickness="20"
        :empty-thickness="20"
        :angle="progressAngle"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'DataCardInnerDemographicsUnemployment',
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
      apiDataProperty: 'unemployment_rate'
    }
  },
  computed: {
    value () {
      const val = (this.cityData && this.cityData[this.apiDataProperty]) ? this.cityData[this.apiDataProperty] : 0
      return val
    },
    /**
     * Get the starting angle for the progress bat
     * @returns {number}
     */
    progressAngle () {
      return 0 - ((360 * (this.value / 100)) / 2)
    }
  }
}
</script>

<style lang="scss">
.data-card-inner--unemployment {
  position: relative;

  > div {
    position: absolute;
    width: 100%;
    height: 170px;
    top: 50px;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: space-around;
  }

  .data-card-inner__image {
    z-index: 1;
  }

  .data-card-inner__statistic {
    z-index: 2;

    &__number {
      &__suffix {
        font-size: 32px;
        line-height: 38px;
      }
    }
  }
}
</style>
