<template>
  <div class="city-topbar-section">
    <div class="box">
      <!-- selct box  -->
      <div class="box__item item--one" v-if="isFeaturedCity">
        <select-wrapper>
          <select id="scrollto" v-model="selected" class="form-control" @change="onChange(selected)">
            <option value="" selected disabled>
              Select here
            </option>
            <option v-if="cityHasSlice('city-introduction').length" value="city-introduction">
              City Overview
            </option>
            <option v-if="cityHasSlice('city_datatabs').length" value="city-data-tabs">
              Ranking Data
            </option>
            <option v-if="cityHasSlice('city_facts').length" value="city-facts">
              Interesting City Facts
            </option>
            <option v-if="cityHasSlice('banner_with_caption').length" value="city-infographic-cta">
              Infographic
            </option>
          </select>
        </select-wrapper>
      </div>
      <!-- select box  -->
      <div class="box__item item--two h-115">
        <p class="box__item__headline">
          INDEX RANK
        </p>
        <h3>#{{ apiData.attractiveness_score.toFixed(0) }}</h3>
      </div>
      <div class="box__item item--three h-115">
        <p class="box__item__headline">
          INVESTMENT CLUSTER
        </p>
        <h3 v-if="apiData.cluster === 'Affordable'">Aspiring</h3>
        <h3 v-else>{{ apiData.cluster }} <b-button v-if="apiData.cluster === 'Not in focus'" v-b-tooltip.hover class="helpText" title="In an European context, not in focus cities are key regional urban centres that we (PATRIZIA) continue to watch as part of our strategy." /></h3>
      </div>
      <div class="box__item item--four h-115">
        <p class="box__item__headline">
          LOCAL TIME
        </p>
        <h3>{{ apiData.local_time }}</h3>
      </div>
      <div class="box__item item--five h-115">
        <p class="box__item__headline">
          WEATHER
        </p>
        <h3>
          <img
            v-if="weatherIcon"
            :src="weatherIcon"
            :title="currentWeather.description"
            style="width: 31px;height: auto"
          >
          {{temperature}}
        </h3>
      </div>
      <div class="box__item item--six">
        <p class="box__item__headline">
          LOCATION
        </p>
        <a :href="mapLink" title="View city on a map" target="_blank" rel="noopener">
          <h3>View map</h3>
        </a>
      </div>
      <!-- <div class="box__item item--six">
        <p class="box__item__headline">
          SHARE
        </p>
        <ul class="d-flex">
          <li>
            <a href="">
              <font-awesome-icon :icon="['fab', 'linkedin']" />
            </a>
          </li>
          <li>
            <a href="">
              <font-awesome-icon :icon="['fab', 'facebook-square']" />
            </a>
          </li>
          <li>
            <a href="">
              <font-awesome-icon :icon="['fab', 'twitter']" />
            </a>
          </li>
          <li>
            <a href="">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                width="29.272"
                height="21.084"
                viewBox="0 0 29.272 21.084"
              >
                <defs>
                  <clipPath id="clip-path">
                    <path
                      id="Path_197"
                      data-name="Path 197"
                      d="M1.989-10.943V6.527H27.647v-17.47Zm-.3-1.807h26.26a1.506,1.506,0,0,1,1.506,1.506V6.828a1.506,1.506,0,0,1-1.506,1.506H1.688A1.506,1.506,0,0,1,.182,6.828V-11.244A1.506,1.506,0,0,1,1.688-12.75Z"
                      transform="translate(-0.182 12.75)"
                      fill="#c3b6ba"
                    />
                  </clipPath>
                  <clipPath id="clip-path-2">
                    <path
                      id="Path_199"
                      data-name="Path 199"
                      d="M14.45-1.267,1.809-12.334.627-10.952l13.8,12.081L28.785-10.94l-1.154-1.406Z"
                      transform="translate(-0.627 12.346)"
                      fill="#c3b6ba"
                    />
                  </clipPath>
                </defs>
                <g id="Group_372" data-name="Group 372" transform="translate(-0.182 12.75)">
                  <g
                    id="Group_291"
                    data-name="Group 291"
                    transform="translate(0.182 -12.75)"
                    clip-path="url(#clip-path)"
                  >
                    <path
                      id="Path_196"
                      data-name="Path 196"
                      d="M-4.818,23.415H44.534V-17.75H-4.818Z"
                      transform="translate(-5.222 7.71)"
                      fill="#c3b6ba"
                    />
                  </g>
                  <g
                    id="Group_292"
                    data-name="Group 292"
                    transform="translate(1.085 -11.93)"
                    clip-path="url(#clip-path-2)"
                  >
                    <path
                      id="Path_198"
                      data-name="Path 198"
                      d="M-4.373,16.434h48.23v-33.78H-4.373Z"
                      transform="translate(-5.662 7.193)"
                      fill="#c3b6ba"
                    />
                  </g>
                </g>
              </svg>
            </a>
          </li>
        </ul>
      </div> -->
    </div>
  </div>
</template>

<script>
// Font awesome added
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faFontAwesome, faFacebookSquare, faLinkedin, faYoutube, faTwitter } from '@fortawesome/free-brands-svg-icons'
import axios from 'axios'
import SelectWrapper from '@/components/inputs/select-wrapper'

library.add(faFontAwesome, faFacebookSquare, faLinkedin, faYoutube, faTwitter)

const VueScrollTo = require('vue-scrollto')

export default {
  name: 'CityTopbarSection',
  components: {
    SelectWrapper,
    FontAwesomeIcon
  },
  props: {
    isFeaturedCity: {
      type: Boolean,
      default () {
        return true
      }
    },
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
      apiData: this.$store.state.cityApiData,
      weatherData: null,
      selected: '',
      options: {
        duration: 500,
        easing: 'linear',
        offset: -150,
        force: true,
        cancelable: true,
        x: false,
        y: true
      }
    }
  },
  computed: {
    mapLink () {
      let url = 'https://www.google.com/maps/place/'
      try {
        url += this.apiData.name + ',' + this.apiData.country
      } catch (e) {

      }
      return url
    },
    currentWeather () {
      if (this.weatherData && this.weatherData.weather[0].icon) {
        return this.weatherData.weather[0]
      } else {
        return null
      }
    },
    weatherIcon () {
      if (this.currentWeather) {
        return `/images/weather_icons/${this.currentWeather.icon}.svg`
        // return `http://openweathermap.org/img/wn/${this.currentWeather.icon}@2x.png`
      } else {
        return null
      }
    },
    temperature() {
      if (this.currentWeather) {
        try {
          const temp = Math.round(parseFloat(this.weatherData.main.temp) - 273)
          return `${temp}°C`
          return temp
        }catch (ex) {

        }
      }
      return null
    }
  },
  mounted () {
    this.getWeatherData()
  },
  methods: {
    /**
     * Does the prismic doc for this city have a slice with the slice_type
     * @param sliceName
     * @returns {boolean}
     */
    cityHasSlice (sliceName) {
      if (this.$store.state.prismicDoc) {
        try {
          return this.$store.state.prismicDoc.data.body.filter((slice) => {
            if (slice.slice_type === sliceName) {
              return true
            }
            return false
          })
        } catch (e) {
          return false
        }
      } else {
        this.sliceName = 'city-introduction'
        return this.sliceName
      }
    },
    getWeatherData () {
      const vm = this
      const weatherApiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + this.apiData.name + ',' + this.apiData.country_code + '&appid=' + process.env.VUE_APP_OPENWEATHER_API_KEY
      axios.post(weatherApiUrl)
        .then(function (response) {
          vm.weatherData = response.data
        })
        .catch(function (error) {
        })
    },
    onChange (input) {
      VueScrollTo.scrollTo(`#${input}`, 500, this.options)
      return true
    }
  }
}
</script>

<style lang="scss">
.city-topbar-section {
  width: 100%;
  background: #fff;
  margin-top: 40px;
  margin-bottom: -130px;
  -webkit-box-shadow: 5px 20px 40px 0px rgba(34, 10, 18, 0.2);
  -moz-box-shadow: 5px 20px 40px 0px rgba(34, 10, 18, 0.2);
  box-shadow: 5px 20px 40px 0px rgba(34, 10, 18, 0.2);
  @include respond-below(sm) {
    margin-bottom: -220px;
  }

  .box {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    overflow: hidden;
    justify-content: space-between;
    text-align: left;

    &__item {
      padding: 30px;
      border-right: 1px solid #E5E0E1;
      flex: 1 1 auto;

      &__headline {
        font-size: 14px;
        font-family: 'Corporate S Pro Bold';
        margin-bottom: 5px;
        color: #B4A4A9;
        letter-spacing: .7px;
      }

      h3 {
        margin: 0;

        .helpText{
          background-color: transparent;
          border: 1px solid #E1DBDD;
          width: 20px;
          height: 20px;
          border-radius: 10.5px;
          padding: 0;
          display: inline-flex;
          align-items: center;
          justify-content: space-around;
          margin-left: 5px;
          box-shadow: none !important;

          &:after {
            content: '?';
            color: #9C8A8F;
            font-family: "Corporate S Pro";
            font-size: 12px;
          }
        }
      }

      &:first-child, &:last-child {
        border-right: none;
      }

      &.item--one {
        padding-right: 0;

        @include respond-below(xs) {
          padding-right: 15px;
        }

      }

      &.item--two {
        h3 {
          color: #F29131;
        }
      }

      &.item--four {
        h3 {
          color: #29B5BA;
        }
      }

      &.item--five {
        h3 {
          color: #A44993;
        }
      }

      &.item--six{
        a{
          h3{
            color: #802437;
            transition: .2s ease-in;
          }
          &:hover{
            h3{
              color: #F29131;
            }
          }
        }
      }
      @include respond-below(sm) {
        &.h-115{
          min-height: 115px;
        }
      }

      // &.item--six {
      //   ul {
      //     li {
      //       margin-right: 22px;

      //       svg {
      //         color: #C3B6BA;
      //         fill: #C3B6BA;
      //         width: 23px;
      //         height: 23px;
      //         transition: .2s ease-in-out;
      //       }

      //       &:last-child {
      //         margin-right: 0;
      //       }

      //       &:hover {
      //         a {
      //           svg {
      //             transform: scale(1.1);
      //           }
      //         }
      //       }

      //       @include respond-below(xl) {
      //         margin-right: 12px;
      //       }
      //     }
      //   }
      // }
    }

    @include respond-below(xl) {
      &__item {
        padding: 20px;

        &:first-child {
          .box-select {
            select {
              width: 200px;
            }
          }
        }
      }
    }
    @include respond-below(md) {
      &__item {
        flex-basis: 30%;
      }
    }
    @include respond-below(sm) {
      justify-content: center;
      &__item {
        flex-basis: 45%;
        text-align: center;
        border: none;

        &:nth-child(even) {
          border-right: 1px solid #E5E0E1;
        }

        &:nth-child(2) {
          border-bottom: 1px solid #E5E0E1;
        }

        &:nth-child(3) {
          border-bottom: 1px solid #E5E0E1;
        }

        &:first-child {
          flex-basis: 100%;

          .box-select {
            width: 100%;

            select {
              width: 100%;
            }
          }
        }

        &:last-child {
          border: none;

          ul {
            align-items: center;
            justify-content: center;
          }
        }
      }
    }
  }
}
</style>
