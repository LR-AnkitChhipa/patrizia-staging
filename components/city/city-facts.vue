<template>
  <section id="city-facts" class="city-facts">
    <b-container>
      <b-row>
        <b-col cols="12">
          <p v-if="slice.primary.facts_subline" class="subline subline--with-dash">
            {{ slice.primary.facts_subline }}
          </p>
          <h2>{{ slice.primary.facts_heading }}</h2>
        </b-col>
      </b-row>
    </b-container>
    <b-container fluid class="container-breakout">
      <b-row>
        <div
          id="fact-cards"
          ref="slider"
          class="city-facts__cards keen-slider"
          :class="{'svg-cursor': slider}"
        >
          <div
            v-for="(card, index) in cards"
            :key="card.fact_title +' '+ index"
            class="keen-slider__slide"
          >
            <div class="city-facts__cards__card depth50">
              <div class="city-facts__cards__card__image">
                <prismic-image :image="card.fact_icon" />
              </div>
              <div class="content">
                <p class="city-facts__cards__card__subheading">
                  {{ card.fact_title }}
                </p>
                <prismic-rich-text :field="card.fact_description" class="city-facts__cards__card__details" />
              </div>
            </div>
          </div>
        </div>
        <!-- <div v-if="slider && hasMultipleSliders()" class="navigation-wrapper__arrows">
          <a class="leftarrow" href="javascript:void(0)" @click="slider.prev()">
            <img src="@/assets/img/homepage-slider-arrow.svg" alt="">
          </a>
          <a class="rightarrow" href="javascript:void(0)" @click="slider.next()">
            <img src="@/assets/img/homepage-slider-arrow.svg" alt="">
          </a>
        </div> -->
        <div v-if="slider" class="dots with-arrow">
          <a class="arrow arrow--left" :class="{ arrow: true, 'arrow--left': true, 'arrow--disabled': current === 0, }" href="javascript:void(0)" @click="slider.prev()">
            <inline-svg width="10" height="20" :src="require('@/assets/img/homepage-slider-arrow.svg')" />
          </a>
          <button
            v-for="(slideNumber, idx) in dotHelper"
            :key="idx"
            :class="{ dot: true, active: current === slideNumber }"
            @click="slider.moveToSlideRelative(slideNumber)"
          />
          <a class="arrow arrow--right" :class="{ arrow: true, 'arrow--right': true, 'arrow--disabled': current === slider.details().size - 1, }" href="javascript:void(0)" @click="slider.next()">
            <inline-svg width="10" height="20" :src="require('@/assets/img/homepage-slider-arrow.svg')" />
          </a>
        </div>
      </b-row>
    </b-container>
    <b-container>
      <b-row>
        <b-col>
          <div class="city-facts__button">
            <button-link
              v-if="slice.primary.facts_button_link && slice.primary.facts_button_text"
              button-size="regular"
              button-style="primary primary--style1"
              :label="slice.primary.facts_button_text"
              :prismic-link-object="slice.primary.facts_button_link"
            />
          </div>
        </b-col>
      </b-row>
    </b-container>
  </section>
</template>

<script>
import KeenSlider from 'keen-slider'
import PrismicImage from '@/components/prismic-image'
import ButtonLink from '@/components/buttons/button-link'

export default {
  name: 'CityFacts',
  components: { ButtonLink, PrismicImage },
  props: {
    slice: {
      type: Object,
      default () {
        return {}
      }
    },
    sliceIndex: {
      type: Number,
      default () {
        return 0
      }
    }
  },
  data () {
    return {
      current: 0,
      slider: null
    }
  },
  computed: {
    dotHelper () {
      if (this.slider && this.isTab() === true) {
        return this.slider ? [...Array(this.slider.details().size).keys()] : []
      } else if (this.slider) {
        const slides = [...Array(this.slider.details().size).keys()]
        const everyNth = slides.filter((item, i) => {
          if (i % 2 === 0) {
            return true
          } else {
            return false
          }
        })
        return everyNth
      }
      return []
    },
    cards () {
      const items = this.slice.items
      return items
    }
  },
  mounted () {
    if (this.hasMultipleSliders()) {
      this.slider = new KeenSlider('#fact-cards', {
        slidesPerView: 3.5,
        spacing: 0,
        loop: true,
        initial: this.current,
        breakpoints: {
          // eslint-disable-next-line no-dupe-keys
          '(max-width: 1200px)': {
            slidesPerView: 3
          },
          // eslint-disable-next-line no-dupe-keys
          '(max-width: 900px)': {
            slidesPerView: 2
          },
          // eslint-disable-next-line no-dupe-keys
          '(max-width: 767px)': {
            slidesPerView: 1
          }
        },
        slideChanged: (s) => {
          this.current = s.details().relativeSlide
        }
      })
    } else if (this.isTab() === true) {
      this.slider = new KeenSlider(this.$refs.slider, {
        slidesPerView: 3,
        spacing: 0,
        loop: true,
        initial: this.current,
        breakpoints: {
          // eslint-disable-next-line no-dupe-keys
          '(max-width: 1200px)': {
            slidesPerView: 2
          },
          // eslint-disable-next-line no-dupe-keys
          '(max-width: 767px)': {
            slidesPerView: 1
          }
        },
        slideChanged: (s) => {
          this.current = s.details().relativeSlide
        }
      })
    }
  },
  methods: {
    /**
    * Is there more than one featured insights?
    * @returns {boolean}
    */
    hasMultipleSliders () {
      try {
        if (this.cards.length > 3) {
          return true
        }
      } catch (e) {
        return false
      }
      return false
    }
  }
}
</script>

<style lang="scss">
.city-facts {
  background: rgb(240, 240, 240);
  background: linear-gradient(0deg, rgba(240, 240, 240, 1) 0%, rgba(240, 240, 240, 0) 100%);
  padding-bottom: 250px;

  &__cards {

    .keen-slider__slide {
      //&:first-child {
        .city-facts__cards__card {
          margin-left: 40px;
        }
      //}
    }

    &__card {
      margin-top: 4rem;
      position: relative;
      margin-right: 30px;
      margin-bottom: 100px;
      text-align: center;
      background: #fff;
      padding: 0;
      padding-bottom: 30px;
      padding-top: 75px;
      min-height: 300px;
      position: relative;
      @include respond-above(lg) {
        min-height: 260px;
      }

      &:hover, &:focus {
        .city-facts__cards__card__image {
          svg {
            transform: scale(1.1);
          }
        }
      }

      &:nth-child(even) {
        margin-right: 0;
      }

      &:nth-last-child(-n+2) {
        margin-bottom: 60px;
      }

      .content{
        overflow: hidden;
        position: relative;
        width: 100%;
        height: 100%;
        padding: 0 30px;
        padding-top: 0;
      }

      &__image {
        width: 100px;
        height: 100px;
        position: absolute;
        top: -50px;
        left: 50%;
        transform: translateX(-50%);
        -webkit-box-shadow: 1px 1px 20px 0px rgba(34, 10, 18, 0.1);
        -moz-box-shadow: 1px 1px 20px 0px rgba(34, 10, 18, 0.1);
        box-shadow: 1px 1px 20px 0px rgba(34, 10, 18, 0.1);
        background: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        overflow: hidden;
        object-fit: cover;
        padding: 1rem;
        svg {
          transition: transform 0.4s ease-in-out;
        }
      }

      &__subheading {
        font-family: "Georgia Pro Semibold";
        font-size: 18px;
        line-height: 26px;
        color: #802437;
        margin-bottom: 28px;
      }

      &__heading {
        color: #29B5BA;
        font-size: 46px;
        line-height: 21px;
        margin-bottom: 35px;
        font-family: 'Georgia Pro Regular';
        @include respond-below(xl) {
          line-height: 50px;
        }
      }

      &__details {
        margin: 0;
        font-family: "Corporate S Pro";
        line-height: 21px;

        p{
          margin-bottom: 6px;
          &:last-child{
            margin-bottom: 0;
          }
        }

        strong {
          font-family: "Corporate S Pro Bold";
        }
      }
      @include respond-below(md) {
        height: auto;
      }

      @include respond-below(sm) {
        flex-basis: 100%;
        margin-bottom: 60px;
        min-height: auto;
      }
    }
  }

  &__list {
    ul {
      li {
        position: relative;
        padding-left: 20px;
        border-bottom: 2px solid #F5F3F4;
        line-height: 2.5;
        margin-bottom: 7px;
        font-family: 'Corporate S Pro';
        color: #210A12;

        &::before {
          content: '';
          position: absolute;
          left: 0;
          top: 40%;
          background: #802437;
          width: 5px;
          height: 5px;
          border-radius: 50%;
        }

        &.active {
          color: #802437;
        }
      }
    }
  }

  #Filterbox.container {
    .image-boxes {
      div.col {
        padding: 0;

        nav {
          ul.pagination {
            li.page-item {
              .page-link {
                background: transparent;
              }
            }
          }
        }
      }
    }
  }

  &__button {
    margin-top: 50px;
  }
}

.pagination {
  margin-bottom: 3rem;

  .page-item {
    position: relative;

    &:first-child {
      .page-link {
        margin-left: 0;
      }
    }

    .page-link {
      border-radius: 0;
      height: 40px;
      font-size: 14px;
      border-color: #D2C8CB;
      color: #D2C8CB;
      width: 40px;
      text-align: center;
      margin-left: 10px;
      line-height: 1.8;
      background: none;
    }

    &:hover {
      .page-link {
        box-shadow: none;
        background: none;
        border-color: #802437;
      }
    }

    &:focus {
      .page-link {
        box-shadow: none;
        outline: none;
        background: none;
      }
    }

    &.active {
      .page-link {
        border-color: #802437;
        border-color: #802437;
        color: #802437;
      }
    }

    &.prev-arrow {
      position: relative;
      z-index: 0;

      .page-link {
        transform: rotate(180deg);

        &::before {
          content: url("data:image/svg+xml,%0A%3Csvg xmlns='http://www.w3.org/2000/svg' width='7.418' height='13.329' viewBox='0 0 7.418 13.329'%3E%3Cg id='Group_271' data-name='Group 271' transform='translate(8.08 -0.336) rotate(180)'%3E%3Cg id='Group_269' data-name='Group 269' transform='translate(7.333 -13) rotate(180)'%3E%3Cpath id='Path_187' data-name='Path 187' d='M0,0,5.333-6,0-12' fill='none' stroke='%23d1c7ca' stroke-width='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E%0A");
          display: block;
          position: absolute;
          position: absolute;
          z-index: 1;
          top: 55%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
      }

      &:hover {
        .page-link {
          &::before {
            content: url("data:image/svg+xml,%0A%3Csvg xmlns='http://www.w3.org/2000/svg' width='7.418' height='13.329' viewBox='0 0 7.418 13.329'%3E%3Cg id='Group_271' data-name='Group 271' transform='translate(8.08 -0.336) rotate(180)'%3E%3Cg id='Group_269' data-name='Group 269' transform='translate(7.333 -13) rotate(180)'%3E%3Cpath id='Path_187' data-name='Path 187' d='M0,0,5.333-6,0-12' fill='none' stroke='%23802437' stroke-width='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E%0A");
          }
        }
      }
    }

    &.next-arrow {
      position: relative;
      z-index: 0;

      .page-link {
        &::before {
          content: url("data:image/svg+xml,%0A%3Csvg xmlns='http://www.w3.org/2000/svg' width='7.418' height='13.329' viewBox='0 0 7.418 13.329'%3E%3Cg id='Group_271' data-name='Group 271' transform='translate(8.08 -0.336) rotate(180)'%3E%3Cg id='Group_269' data-name='Group 269' transform='translate(7.333 -13) rotate(180)'%3E%3Cpath id='Path_187' data-name='Path 187' d='M0,0,5.333-6,0-12' fill='none' stroke='%23d1c7ca' stroke-width='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E%0A");
          display: block;
          position: absolute;
          position: absolute;
          z-index: 1;
          top: 55%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
      }

      &:hover {
        .page-link {
          &::before {
            content: url("data:image/svg+xml,%0A%3Csvg xmlns='http://www.w3.org/2000/svg' width='7.418' height='13.329' viewBox='0 0 7.418 13.329'%3E%3Cg id='Group_271' data-name='Group 271' transform='translate(8.08 -0.336) rotate(180)'%3E%3Cg id='Group_269' data-name='Group 269' transform='translate(7.333 -13) rotate(180)'%3E%3Cpath id='Path_187' data-name='Path 187' d='M0,0,5.333-6,0-12' fill='none' stroke='%23802437' stroke-width='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E%0A");
          }
        }
      }
    }
  }
}

</style>
