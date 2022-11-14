<template>
  <b-container id="homepagefeaturedcities" fluid class="featuredcities p-0">
    <div class="overlay"/>
    <b-container>
      <b-row>
        <b-col lg="4" md="12" class="mb-sm-5 mb-50">
          <div class="mt-100">
            <h2 class="mb-4" v-if="slice.primary.featured_cities_title">
              {{ slice.primary.featured_cities_title }}
            </h2>
            <prismic-rich-text :field="slice.primary.featured_cities_content" class="mb-5"
                               v-if="slice.primary.featured_cities_content"/>
            <button-link button-size="regular" button-style="primary primary--style1" :label="slice.primary.featured_cities_button_text" :prismic-link-object="slice.primary.featured_cities_button_link" />
          </div>
        </b-col>
      </b-row>

      <div class="vertical-slider vertical-slider--left" v-if="featuredCitiesData && featuredCitiesData.cards_left">
        <div class="vertical-slider__slider" ref="left-slider">
          <div class="vertical-slider__slider__inner">
            <div v-for="(card, index) in featuredCitiesData.cards_left" :key="index" class="vertical-slider__slider__slide">
              <data-card
                v-if="getCityDataByCityId(card.city_id)"
                :card-type="getCardComponentNameFromProperty(card.property)"
                :city-data="getCityDataByCityId(card.city_id)"
                :show-city-info="true"
                :animation-disabled="true"
              />
            </div>
          </div>
        </div>
      </div>

      <div class="vertical-slider vertical-slider--right" v-if="featuredCitiesData && featuredCitiesData.cards_right">
        <div class="vertical-slider__slider" ref="right-slider">
          <div class="vertical-slider__slider__inner">
            <div v-for="(card, index) in featuredCitiesData.cards_right" :key="index" class="vertical-slider__slider__slide">
              <data-card
                v-if="getCityDataByCityId(card.city_id)"
                :card-type="getCardComponentNameFromProperty(card.property)"
                :city-data="getCityDataByCityId(card.city_id)"
                :show-city-info="true"
                :animation-disabled="true"
              />
            </div>
          </div>
        </div>
      </div>
    </b-container>
  </b-container>
</template>

<script>
import KeenSlider from 'keen-slider'
import ButtonLink from '@/components/buttons/button-link'
import DataService from '@/services/data-service'
import DataCard from '@/components/data-cards/data-card'

export default {
  name: 'HomepageFeaturedCities',
  components: {DataCard, ButtonLink},
  props: {
    slice: {
      type: Object,
      default() {
        return null
      }
    },
    sliceIndex: {
      type: Number,
      default() {
        return 0
      }
    }
  },
  data() {
    return (
      {
        slideSpeed: 15000,
        featuredCitiesData: null
      }
    )
  },
  async mounted() {
    try {
      const response = await DataService.getHomepageFeaturedCityData()
      this.featuredCitiesData = response.data
      setTimeout(() => {
        this.slideUp('left-slider')
        this.slideDown('right-slider')
      }, 100)
    } catch (ex) {
      console.error(ex)
    }
  },
  methods: {
    slideUp(sliderRef) {
      try {
        const perSlideSpeed = this.slideSpeed
        const sliderInner = this.$refs[sliderRef].querySelector('.vertical-slider__slider__inner')
        // Get height of first slide in list
        const nextSlide = sliderInner.querySelector('.vertical-slider__slider__slide')
        const firstSlideHeight = nextSlide.clientHeight

        // Set transition and transform
        sliderInner.style.transition = `transform ${perSlideSpeed / 1000}s linear`
        sliderInner.style.transform = `translateY(-${firstSlideHeight}px)`
        setTimeout(() => {
          nextSlide.remove()
          sliderInner.style.transitionDuration = `0s`
          sliderInner.style.transform = `translateY(0px)`
          // Add the slide to the end
          sliderInner.append(nextSlide)
          this.slideUp(sliderRef)
        }, perSlideSpeed)
      } catch (ex) {}
    },
    slideDown(sliderRef) {
      try {
        const perSlideSpeed = this.slideSpeed
        const sliderInner = this.$refs[sliderRef].querySelector('.vertical-slider__slider__inner')
        // Get height of first slide in list
        const allSlides = sliderInner.querySelectorAll('.vertical-slider__slider__slide')
        const nextSlide = allSlides[allSlides.length - 1]
        const nextSlideHeight = nextSlide.clientHeight

        // Put the last slide at the start
        nextSlide.remove()
        sliderInner.prepend(nextSlide)

        // Set transition and transform
        sliderInner.style.transition = `transform 0 linear`
        sliderInner.style.transform = `translateY(-${nextSlideHeight}px)`

        setTimeout(() => {
          sliderInner.style.transition = `transform ${(perSlideSpeed / 1000) - 0.05}s linear`
          sliderInner.style.transform = `translateY(0)`
        }, 50)


        setTimeout(() => {
          sliderInner.style.transitionDuration = `0s`
          sliderInner.style.transform = `translateY(-${nextSlideHeight}px)`
          // Add the slide to the end
          this.slideDown(sliderRef)
        }, perSlideSpeed - 50)
      } catch (ex) {}
    },
    /**
     * Get the name of a component using the property name
     * @param propertyName
     * @returns {string}
     */
    getCardComponentNameFromProperty(propertyName) {
      return DataService.getCardVariantFromProperty(propertyName)
    },
    /**
     * Get city data from the featuredCitiesData.data object by a city ID
     * @param cityId
     * @returns {null|*}
     */
    getCityDataByCityId(cityId) {
      cityId = parseInt(cityId)
      if (this.featuredCitiesData.data) {
        const city = this.featuredCitiesData.data.filter((item) => {
          if (item.id === cityId) {
            return true
          }
          return false
        })
        return city[0]
      } else {
        return null
      }
    }
  }
}
</script>

<style lang="scss">
* {
  outline: none !important;
}

@include respond-below(xs) {
  .mb-50 {
    margin-bottom: 3rem;
  }
}

.featuredcities {
  background: url('~@/assets/img/featured-image.jpg') no-repeat;
  background-size: cover;
  background-position: bottom center;
  position: relative;
  height: 800px;
  overflow: hidden;

  @include respond-below(md) {
    height: auto;
  }

  .mt-100 {
    margin-top: 100px;
    @include respond-below(sm) {
      margin-top: 0;
    }
  }

  .overlay {
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgb(255, 255, 255);
    background: linear-gradient(0deg, rgba(255, 255, 255, 0) 9%, rgba(255, 255, 255, 0.8099614845938375) 100%);
  }
}

.vertical-slider {
  display: flex;
  justify-content: space-between;
  position: absolute;
  z-index: 10;

  @include respond-below(md) {
    display: none;
  }

  &--left {
    top: 0;
    left: calc(100% / 2 - 219px);

    @include respond-below(lg) {
      left: calc(100% / 2 - 259px);
    }
  }

  &--right {
    top: 0;
    left: calc(100% / 2 + 147px);

    @include respond-below(lg) {
      left: calc(100% / 2 + 107px);
    }
  }

  &__slider {
    height: 100%;
    overflow: hidden;

    &__slide {
      height: 430px;
      overflow: hidden;
      padding: 0 100px;
    }
  }
}
</style>
