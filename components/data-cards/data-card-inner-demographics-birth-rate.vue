<template>
  <div :class="cssClass">
    <p class="data-card-inner__title">
      CITY BIRTH RATE VS COUNTRY* (%)
    </p>
    <div class="data-card-inner__image">
      <inline-svg src="/images/data-cards/birth-rate.svg" />
    </div>
    <div class="data-card-inner__statistic">
      <p class="data-card-inner__statistic__number">
        <AnimatedNumber
          v-if="isInViewport && !animationDisabled"
          :value="value"
          :duration="animationDuration"
          :round="10"
          :delay="0"
        /><span v-if="animationDisabled">{{ parseFloat(value).toFixed(1) }}</span>%
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DataCardInnerDemographicsBirthRate',
  props: {
    animationDisabled: {
      type: Boolean,
      default () {
        return false
      }
    },
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
      apiDataProperty: 'excess_birth_rate_vs_country'
    }
  },
  computed: {
    value () {
      const val = (this.cityData && this.cityData[this.apiDataProperty]) ? this.cityData[this.apiDataProperty] : 0
      return val * 100
    },
    cssClass () {
      let cssClass = 'data-card-inner data-card-inner--birth-rate data-card-inner--demographics'
      cssClass += (this.isInViewport ? ' data-card-inner--in-viewport' : '')
      cssClass += (this.animationDisabled ? ' data-card-inner--animation-disabled' : '')

      return cssClass
    }
  }
}
</script>

<style lang="scss">
.data-card-inner--birth-rate {
  position: relative;
  padding-right: 10px;

  &.data-card-inner--in-viewport {
    .data-card-inner__image {
      svg {
        .child {
          &.mountains {
            opacity: 1;
          }

          &.building {
            opacity: 1;
          }
        }
      }
    }
  }

  .data-card-inner__image {
    width: 177px;
    height: 142px;

    svg {
      height: 100%;
      width: auto;

      .child {
        opacity: 0;

        .data-card-inner--animation-disabled & {
          opacity: 1;
        }

        &.building {
          transition: opacity 0.5s ease 0.5s;

          .data-card-inner--animation-disabled & {
            transition: none;
          }
        }

        &.mountains {
          transition: opacity 0.5s ease;

          .data-card-inner--animation-disabled & {
            transition: none;
          }
        }
      }
    }
  }

  .data-card-inner__statistic {
    position: absolute;
    top: 112px;
    left: 167px;

    @include respond-below(sm) {
      top: 99px;
      left: 184px;
    }
  }
}
</style>
