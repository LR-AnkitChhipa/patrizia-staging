<template>
  <div :class="cssClass">
    <p class="data-card-inner__title">
      YOUNGER THAN 14 YEARS (%)
    </p>
    <div class="data-card-inner__image">
      <inline-svg src="/images/data-cards/young.svg" @loaded="isSvgLoaded = true" />
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
  name: 'DataCardInnerInnovationYoung',
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
      apiDataProperty: 'youth_ratio',
      isSvgLoaded: false
    }
  },
  computed: {
    value () {
      const val = (this.cityData && this.cityData[this.apiDataProperty]) ? this.cityData[this.apiDataProperty] : 0
      return val
    },
    cssClass () {
      let cssClass = 'data-card-inner data-card-inner--innovation data-card-inner--young'
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
.data-card-inner--young {

  .data-card-inner__image {
    position: absolute;
    top: 45px;

    svg {
      width: 118px;
      height: 180px;

      .child {
        opacity: 0;
        transition: opacity 0.3s ease;

        &--show {
          opacity: 1;
        }
      }
    }
  }

  .data-card-inner__statistic__number {
    position: absolute;
    top: 87px;
    left: 190px;
  }
}
</style>
