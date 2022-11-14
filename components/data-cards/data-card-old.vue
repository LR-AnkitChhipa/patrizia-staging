<template>
  <div class="data-card data-card--population data-card--animation--load-children">
    <div class="data-card__inner">
      <h4 class="data-card__title">
        {{ title }}
      </h4>
      <div class="data-card__image">
        <inline-svg src="/images/data-cards/population.svg" @loaded="animateImage($event)" />
      </div>
      <div class="data-card__statistic">
        <p class="data-card__statistic__number">
          <AnimatedNumber
            :value="value"
            :duration="animationDuration"
            :round="10"
            :delay="0"
          />
        </p>
        <p class="data-card__statistic__text">
          <!--          million-->
        </p>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'DataCardOld',
  props: {
    imageAnimationType: {
      type: String,
      default () {
        return null
      }
    },
    value: {
      type: Number,
      default () {
        return 0
      }
    },
    title: {
      type: String,
      default () {
        return ''
      }
    }
  },
  data () {
    return {
      animationDuration: 1000
    }
  },
  methods: {
    animateImage (event) {
      if (this.imageAnimationType === 'load-children') {
        this.animateLoadChildren(event)
      }
    },
    /**
     * Animate the image
     */
    animateLoadChildren (event) {
      // get the svg groups with child class
      const childGroups = this.$el.querySelectorAll('svg g.child')
      const nextLoadDelay = this.animationDuration / childGroups.length
      showChild(0, nextLoadDelay)

      function showChild (number, nextLoadDelay) {
        childGroups[number].classList.add('child--show')
        if (number + 1 < childGroups.length) {
          setTimeout(() => {
            showChild(number + 1, nextLoadDelay)
          }, nextLoadDelay)
        }
      }
    }
  }
}
</script>

<style lang="scss">
$loading-color: #B4A4A9;
$color: #29B5BA;

.data-card {
  filter: drop-shadow(5px 20px 50px rgba(34, 10, 18, 0.15));

  &__inner {
    clip-path: polygon(100% 0, 100% calc(100% - 40px), calc(100% - 30px) 100%, 0 100%, 0 0);
    border-top: 8px solid $color;
    background-color: white;
    margin-bottom: 32px;
    padding: 27px 20px 37px;
    color: $color;
    width: 338px;
    position: relative;
    z-index: 1;
  }

  &__title {
    font-family: "Corporate S Pro bold";
    font-size: 16px;
    line-height: 19px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    margin-bottom: 10px;
  }

  &__image {
    margin-bottom: 14px;

    svg {
      g {
        stroke: $color;
      }
    }
  }

  &__statistic {

    &__number {
      font-family: "Corporate S Pro light";
      font-size: 64px;
      line-height: 48px;
      margin-bottom: 0;
    }

    &__text {
      font-family: "Corporate S Pro light";
      font-size: 32px;
      line-height: 38px;
      margin-bottom: 0;
    }
  }

  &--population {
    .data-card {
      &__statistic {
        &__number {

        }
      }

      &__image {
        height: 71px;

        svg {
          height: 100%;
          width: auto;

          path, circle {
            //stroke-dasharray: 100;
            //stroke-dashoffset: 100;
            //animation: dash 1s linear forwards;
          }
        }
      }
    }
  }

  &--animation {
    &--load-children {
      .data-card__image {
        svg {
          .child {
            opacity: 0;
            transition: opacity 0.3s ease;

            &--show {
              opacity: 1;
            }
          }
        }
      }
    }
  }

  @keyframes dash {
    to {
      stroke-dashoffset: 0;
    }
  }
}
</style>
