<template>
  <div class="vertical-slider">
    <div class="vertical-slider__slider" ref="left-slider">
      <div class="vertical-slider__slider__inner">
        <div class="vertical-slider__slider__slide" v-for="i in [0,1,2,3,4,5,6]" :key="i">{{ i }}</div>
      </div>
    </div>

    <div class="vertical-slider__slider" ref="right-slider">
      <div class="vertical-slider__slider__inner">
        <div class="vertical-slider__slider__slide" v-for="i in [0,1,2,3,4,5,6]" :key="i">{{ i }}</div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: "homepage-featured-cities-v2",
  mounted() {
    this.slideUp('left-slider')
    this.slideDown('right-slider')

  },
  methods: {
    slideUp(sliderRef) {
      const perSlideSpeed = 3000
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
    },
    slideDown(sliderRef) {
      const perSlideSpeed = 3000
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
    }
  }
}
</script>

<style lang="scss" scoped>
.vertical-slider {
  height: 80vh;
  display: flex;
  justify-content: space-between;
  margin-top: 10vh;

  &__slider {
    border: 1px solid red;
    height: 100%;
    overflow: hidden;

    &__slide {
      //height: 300px;
      //background-color: lightblue;
      //border-bottom: 1px solid white;
      //width: 300px;
      //display: flex;
      //align-items: center;
      //justify-content: space-around;
    }
  }
}
</style>
