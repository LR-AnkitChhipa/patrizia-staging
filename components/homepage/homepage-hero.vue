<template>
  <div id="homepagehero" v-if="slice">
    <div class="navigation-wrapper">
      <div ref="slider" class="keen-slider">
        <div v-for="(slide, n) in slice.items" :key="n" class="keen-slider__slide" :class="'slide-' + n"
             :style="getSlideStyle(slide)">
          <div class="keen-slider__slide__overlay" />
          <div v-if="slide.slide_background_video && slide.slide_background_video.embed_url" class="keen-slider__slide__vimeo-wrapper">
            <client-only>
              <youtube
                v-if="slide.slide_background_video.provider_name === 'YouTube'"
                ref="youtube"
                :video-id="getId(slide.slide_background_video.embed_url)"
                :player-vars="{
                  autoplay: 1,
                  mute: 1,
                  loop: 1,
                  controls: 0,
                  vq: 'hd1080',
                  playsinline: 1,
                  playlist: getId(slide.slide_background_video.embed_url)
                }"
                @ready="playVideo()"
              />
              <iframe
                v-if="slide.slide_background_video.provider_name === 'Vimeo'"
                :src="getVimeoEmbedUrl(slide.slide_background_video)"
                frameborder="0"
                webkitallowfullscreen
                mozallowfullscreen
                allowfullscreen
              />
            </client-only>
          </div>
          <div class="container keen-slider__slide__container">
            <div class="keen-slider__slide__container__content">
              <p class="keen-slider__slide__container__content__subline subline" v-if="slide.slide_subline">
                {{ slide.slide_subline }}</p>
              <p class="h1" v-if="slide.slide_title">{{ slide.slide_title }}</p>
              <!-- <prismic-rich-text class="keen-slider__slide__container__content__pera" v-if="slide.slide_content" :field="slide.slide_content"/> -->
              <div v-if="slide.slide_content_desc" class="keen-slider__slide__container__content__pera">
                <p>{{ slide.slide_content_desc }}</p>
              </div>
              <div class="btns">
                <button-link button-size="large" button-style="primary primary--style1" :label="slide.slide_button_text"
                             v-if="slide.slide_button_link && slide.slide_button_text"
                             :prismic-link-object="slide.slide_button_link"/>
                <text-link v-if="slide.slide_text_link && slide.slide_text_link_text"
                           :prismic-link-object="slide.slide_text_link" :text="slide.slide_text_link_text"
                           link-style="white"/>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="slider && hasMultipleSliders()" class="navigation-wrapper__arrows">
        <a class="leftarrow" href="javascript:void(0)" @click="slider.prev()">
          <img src="@/assets/img/homepage-slider-arrow.svg" alt="">
        </a>
        <a class="rightarrow" href="javascript:void(0)" @click="slider.next()">
          <img src="@/assets/img/homepage-slider-arrow.svg" alt="">
        </a>
      </div>
      <div v-if="slider && hasMultipleSliders()" class="dots container navigation-wrapper__dots">
        <button v-for="(slide, idx) in dotHelper" :key="idx" :class="{ dot: true, active: current === idx }"
                @click="slider.moveToSlideRelative(idx)"/>
      </div>
    </div>
    <div class="container">
      <a v-scroll-to="'#homepagefeaturedcities'" href="#"
         class="tosection-arrow animate__animated animate__fadeInDown animate__slow animate__delay-2s animate__infinite">
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="13.328"
             height="26.667" viewBox="0 0 13.328 26.667">
          <defs>
            <clipPath id="clip-path">
              <path id="Path_189" data-name="Path 189" d="M97-8h24.209v2H97Z" fill="none" clip-rule="evenodd"/>
            </clipPath>
          </defs>
          <g id="Group_11552" data-name="Group 11552" transform="translate(2573.664 -1229.667) rotate(90)">
            <g id="Group_273" data-name="Group 273" transform="translate(1132.667 2574)" clip-path="url(#clip-path)">
              <path id="Path_188" data-name="Path 188" d="M92-1h33.893V-13H92Z" transform="translate(0.158)"
                    fill="#802437"/>
            </g>
            <g id="Group_274" class="arrow" data-name="Group 274" transform="translate(1249.664 2561)">
              <path id="Path_190" data-name="Path 190" d="M0,0,5.333,6,0,12" fill="none" stroke="#802437"
                    stroke-width="2"/>
            </g>
          </g>
        </svg>
      </a>
    </div>
  </div>
</template>

<script>
import KeenSlider from 'keen-slider'
import ButtonLink from '@/components/buttons/button-link'
import TextLink from '@/components/text-link'

export default {
  name: 'HomepageHero',
  components: { ButtonLink, TextLink },
  props: {
    slice: {
      type: Object,
      default () {
        return null
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
      return this.slider ? [...Array(this.slider.details().size).keys()] : []
    }
  },
  mounted () {
    if (this.hasMultipleSliders()) {
      this.slider = new KeenSlider(this.$refs.slider, {
        initial: this.current,
        loop: true,
        duration: 1000,
        slidesPerView: 1,
        slideChanged: (s) => {
          this.current = s.details().relativeSlide
        }
      })
    }
  },
  beforeDestroy () {
    if (this.slider) {
      this.slider.destroy()
    }
  },
  methods: {
    /**
     * Get YouTube video ID
     * @returns {boolean|*}
     */
    getId (url) {
      const videoId = /[^/]*$/.exec(url)[0]
      return videoId
    },
    // getId (url) {
    //   return this.$youtube.getIdFromUrl(url)
    // },
    playVideo () {
      this.$refs.youtube.forEach((item) => {
        // console.log(item)
        item.player.playVideo()
      })
    },
    /**
     * Get the style for a slide
     * @param slide
     * @returns {null|{backgroundImage: string}}
     */
    getSlideStyle (slide) {
      if (slide.slide_background_image) {
        if (slide.slide_background_image.url) {
          return { backgroundImage: `url(${slide.slide_background_image.url});` }
        } else if (slide.slide_background_video) {
          return { backgroundImage: `url(${slide.slide_background_video.thumbnail_url});` }
        }
        return null
      }
      return null
    },
    /**
     * Is there more than one featured insights?
     * @returns {boolean}
     */
    hasMultipleSliders () {
      try {
        if (this.slice.items.length > 1) {
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
.browser-is-not-safari #homepagehero .keen-slider__slide__vimeo-wrapper iframe {
  width: 100vw;
  height: 100vw; /* Given a 0.44 aspect ratio */
}

#homepagehero {

  .navigation-wrapper {
    position: relative;

    .keen-slider {
      width: 100%;
      min-height: 670px;
      height: 75vh;

      &__slide {
        width: 100%;
        flex: 0 0 100vw;
        min-height: 670px;
        height: 75vh;
        position: relative;
        background: white no-repeat top center scroll;
        background-size: cover;

        &__overlay {
          width: 100%;
          position: absolute;
          height: 30%;
          top: 0;
          z-index: 9;
          background: rgb(0, 0, 0);
          background: linear-gradient(0deg, rgba(0, 0, 0, 0) 0%, rgba(2, 0, 36, 0.9472163865546218) 100%);
        }

        &__vimeo-wrapper {
          z-index: 1;
          pointer-events: none;
          overflow: hidden;
          position: relative;
          padding-bottom: 56.25%; /* 16:9 */
          padding-top: 25px;
          height: 0;
          object-fit: cover;
          @include respond-below(md2) {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            padding: 0;
          }

          iframe {
            z-index: 1;
            position: absolute;
            min-height: 120vh;
            min-width: 226vh; /* 100 / 0.44 */
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            object-fit: cover;
            //@include respond-below(md2) {
            //  width: 100vw;
            //  height: 100vw; /* Given a 0.44 aspect ratio */
            //  min-height: 100vh;
            //  min-width: 226vh; /* 100 / 0.44 */
            //  top: 50%;
            //  left: 50%;
            //  transform: translate(-50%, -50%);
            //}
          }
        }

        &__mainimage {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          object-fit: cover;
          width: 100%;
          height: 100%;
        }

        &__container {
          position: absolute;
          bottom: 20%;
          left: 0;
          right: 0;
          width: 100%;
          z-index: 5;

          &__content {
            width: 600px;
            background: #220a12c7;
            padding: 30px;
            padding-right: 100px;

            &__subline {
              color: white;
              letter-spacing: 0.1rem;
              font-size: 16px;
              font-family: "Corporate S Pro Bold", Fallback, sans-serif;
              margin-bottom: 24px;
            }

            &__pera p {
              font-family: "Georgia Pro Semibold";
              font-size: 21px;
              line-height: 30px;

              @include respond-below(xl) {
                font-size: 18px;
                line-height: 25px;
              }
              color: #fff;
              margin-bottom: 25px;
            }

            .h1, .h3 {
              color: #fff;
              margin-bottom: 30px;
            }

            .btns {
              display: flex;
              align-items: center;
              flex-wrap: wrap;

              a.p-btn {
                margin-right: 30px;
                @include respond-below(sm) {
                  margin-right: 0;
                  margin-bottom: 20px;
                }
              }
            }

            div.perag {
              p {
                font-family: "Georgia Pro Semibold";
                font-size: 21px;
                line-height: 30px;

                @include respond-below(xl) {
                  font-size: 18px;
                  line-height: 25px;
                }
                color: #fff;
                margin-bottom: 30px;
              }
            }
          }
          @include respond-between(md, xl) {
            &__content{
              width: 85%;
            }
          }

          @include respond-below(xl) {
            top: 60%;
            transform: translateY(-50%);
            bottom: auto;
            width: 100%;
            &__content {
              width: 85%;
              margin: auto;
              padding: 30px;
            }
          }
          @include respond-below(sm) {
            &__content{
              padding: 20px;
            }
          }
        }
      }
    }

    &__arrows {
      position: absolute;
      top: 55%;
      transform: translateY(-50%);
      display: flex;
      justify-content: space-between;
      width: 92%;
      left: 0;
      right: 0;
      margin: auto;

      .leftarrow {
        img {
          transform: rotate(180deg);
        }
      }
    }

    &__dots {
      position: absolute;
      bottom: 10%;
      width: 100%;
      margin: auto;
      left: 50px;
      right: 0;

      .dot.active {
        background-color: #F29131;
        border-color: #F29131;
      }

      @include respond-below(xl) {
        left: 0;
        bottom: 5%;
      }
    }
  }

  .tosection-arrow {
    position: relative;
    bottom: -50px;
    display: inline-block;
    z-index: 1;
    width: 65px;
    text-align: center;
    transition: .2s ease-in-out;
  }
}

@media (pointer: coarse) and (hover: none) {
  // .keen-slider__slide {
  //   background: url('~@/assets/img/hompage-slider-image.jpg') white no-repeat center center scroll;
  // }
  // .keen-slider__slide__vimeo-wrapper{
  //   display: none;
  // }
}
</style>
