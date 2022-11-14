<template>
  <div :class="cssClass">
    <p class="data-card-inner__title">
      AVERAGE HOUSEHOLD<br>
      INCOME (€)
    </p>
    <div class="data-card-inner__image">
      <inline-svg src="/images/data-cards/household-income.svg" />
    </div>
    <div class="data-card-inner__statistic">
      <p class="data-card-inner__statistic__number">
        <AnimatedNumber
          v-if="isInViewport"
          :format-value="formatToNumber"
          :value="value"
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
  name: 'DataCardInnerEconomyHouseholdIncome',
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
      apiDataProperty: 'average_household_income_eur'
    }
  },
  computed: {
    value () {
      const val = (this.cityData && this.cityData[this.apiDataProperty]) ? this.cityData[this.apiDataProperty] : 0
      return val
    },
    cssClass () {
      let cssClass = 'data-card-inner data-card-inner--economy data-card-inner--household-income'
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
.data-card-inner--household-income {

  .data-card-inner__image {
    .coin-symbol {
      transform: translate(50px, 50px);
      opacity: 0;
      transition: all 1s ease-in-out;
    }
  }

  .data-card-inner__statistic {
    position: absolute;
    left: 130px;
    top: 66px;
  }
}

.data-card-inner--in-viewport {
  &.data-card-inner--household-income {
    .data-card-inner__image {
      .coin-symbol {
        transform: translate(0px, 0px);
        opacity: 1;
      }
    }
  }
}
</style>
