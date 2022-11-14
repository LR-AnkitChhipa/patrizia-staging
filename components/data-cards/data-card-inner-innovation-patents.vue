<template>
  <div :class="cssClass">
    <p class="data-card-inner__title">
      PATENT APPLICATIONS<br>
      PER YEAR
    </p>
    <div class="data-card-inner__image">
      <inline-svg src="/images/data-cards/patent-applications.svg" />
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
        />
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DataCardInnerInnovationPatents',
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
      apiDataProperty: 'patent_applications_per_city_per_year'
    }
  },
  computed: {
    value () {
      const val = (this.cityData && this.cityData[this.apiDataProperty]) ? this.cityData[this.apiDataProperty] : 0
      return val
    },
    cssClass () {
      let cssClass = 'data-card-inner data-card-inner--innovation data-card-inner--patents'
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
.data-card-inner--patents {

  .data-card-inner__title {
    margin-bottom: 0;
  }

  .data-card-inner__image {
    margin-left: 78px;
    position: absolute;
    top: 53px;
    width: 142px;
    height: 111px;
    svg {
      width: 100%;
      height: auto;
      g {
        .line {
          animation: flash 3s linear infinite;
        }
      }
    }
  }

  .data-card-inner__statistic {
    position: absolute;
    top: 168px;
  }
}

@keyframes flash {
  0% { opacity: 0 }
  1% { opacity: 1 }
  50% { opacity: 1 }
  51% { opacity: 0 }
  100% { opacity: 0 }
}
</style>
