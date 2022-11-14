<template>
  <div class="data-card-inner data-card-inner--unemployment data-card-inner--demographics">
    <p class="data-card-inner__title">
      WORKING POPULATION RATIO (%)
    </p>
    <div
      class="data-card-inner__image"
      :style="{backgroundImage: 'url(\'/images/data-cards/working-population.svg\')'}"
    >
      <vue-ellipse-progress
        v-if="isInViewport"
        :progress="value"
        :legend="true"
        legend-class="data-card-inner__progress__legend"
        color="#29B5BA"
        empty-color="#A8EAED"
        line="square"
        line-mode="normal 0"
        :size="170"
        :thickness="20"
        :empty-thickness="20"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'DataCardInnerDemographicsWorkingPopulation',
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
      apiDataProperty: 'working_population_ratio'
    }
  },
  computed: {
    value () {
      const val = (this.cityData && this.cityData[this.apiDataProperty]) ? this.cityData[this.apiDataProperty] : 0
      return val
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
    background: {
      position: center;
      size: 270px;
      repeat: no-repeat;
    };
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
