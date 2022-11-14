<template>
  <div class="data-card-inner data-card-inner--purchasing-power data-card-inner--economy">
    <p class="data-card-inner__title">
      PURCHASING POWER<br>PER HOUSEHOLD INDEX (€)
    </p>
    <div class="data-card-inner__image">
      <inline-svg src="/images/data-cards/purchasing-power.svg" />
    </div>
    <div class="data-card-inner__statistic">
      <p class="data-card-inner__statistic__number">
        <AnimatedNumber
          v-if="isInViewport"
          :value="value"
          :format-value="formatToNumber"
          :duration="animationDuration"
          :round="100"
          :delay="0"
        />*
      </p>
    </div>
    <div class="data-card-inner__smallprint">
      <p>* 100 is European Average</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DataCardInnerEconomyPurchasingPower',
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
      apiDataProperty: 'purchasing_power_per_household'
    }
  },
  computed: {
    value () {
      const val = (this.cityData && this.cityData[this.apiDataProperty]) ? this.cityData[this.apiDataProperty] : 0
      return val
    }
  },
  methods: {
    formatToNumber (value) {
      return Intl.NumberFormat('en-GB').format(value)
    }
  }
}
</script>

<style lang="scss">
.data-card-inner--purchasing-power {

  .data-card-inner__image {
    width: 116px;
    height: 103px;
    margin-top: 40px;
    svg {
      width: 116px;
      height: 103px;
    }
  }

  .data-card-inner__statistic {
    position: absolute;
    top: 80px;
    right: 20px;
  }

  .data-card-inner__smallprint {
    margin-top: 7px;
  }
}
</style>
