<template>
  <section id="city-data-tabs" class="city-data-tabs" :class="{'pb-0' : activeTab === 'Local Expert'}"
           :style="tabsStyle">
    <b-container v-if="hasCmsContent">
      <b-row class="city-data-tabs__tabs">
        <b-col>
          <ul class="nav nav-tabs">
            <li v-for="title in slice.items" :key="title.tab_titles" class="nav-item">
              <a
                href="#"
                :class="'nav-link' + (activeTab === title.tab_titles ? ' active' : '')"
                @click.prevent="activeTab = title.tab_titles"
              >{{ title.tab_titles }}</a>
            </li>
          </ul>
        </b-col>
      </b-row>
    </b-container>
    <b-container v-else>
      <b-row class="city-data-tabs__tabs">
        <b-col>
          <ul class="nav nav-tabs">
            <li v-for="title in titles" :key="title" class="nav-item">
              <a
                href="#"
                :class="'nav-link' + (activeTab === title ? ' active' : '')"
                @click.prevent="activeTab = title"
              >{{ title }}</a>
            </li>
          </ul>
        </b-col>
      </b-row>
    </b-container>
    <div v-if="hasCmsContent && $store.state.cityApiData">
      <template v-for="title in slice.items">
        <div
          v-if="title.tab_titles !== 'Local Expert' && activeTab === title.tab_titles"
          :key="title.tab_titles"
          class="city-data-tabs__tabs__tab__content"
        >
          <b-container>
            <b-row class="pad-44">
              <b-col
                cols="12"
                lg="4"
                class="city-data-tabs__tabs__tab__content__rank"
                :style="{color: getGroupColour(title.tab_titles)}"
              >
                <client-only>
                  <vue-ellipse-progress
                    v-if="getEllipseProgress(title.tab_titles)"
                    :progress="getEllipseProgress(title.tab_titles)"
                    :color="getGroupColour(title.tab_titles)"
                    empty-color="#F0EDEE"
                    line="square"
                    line-mode="normal 0"
                    :size="338"
                    :thickness="25"
                    :empty-thickness="24"
                    :legend-value="$store.state.cityApiData[getApiProperty(title.tab_titles)]"
                  >
                    <template v-slot:legend-value>
                      <span slot="legend-value" class="ep-legend--value--total">/142</span>
                    </template>
                    <template v-slot:legend-caption>
                      <p slot="legend-caption" class="ep-legend--caption">
                        <inline-svg v-if="title.tab_titles === 'Market Fundamentals'"
                                    :src="require('@/static/images/demoraphics-icon.svg')"/>
                        <inline-svg v-if="title.tab_titles === 'Location Quality'"
                                    :src="require('@/static/images/economics-icon.svg')"/>
                        <inline-svg v-if="title.tab_titles === 'Innovation'"
                                    :src="require('@/static/images/innovation-icon.svg')"/>
                        <inline-svg v-if="title.tab_titles === 'Connectivity'"
                                    :src="require('@/static/images/connectivity-icon.svg')"/>
                      </p>
                    </template>
                  </vue-ellipse-progress>
                </client-only>
              </b-col>
              <b-col cols="12" lg="8" class="pr-100">
                <p class="subline">
                  {{ title.subline_text }}
                </p>
                <h2>
                  {{ title.heading_text }}
                </h2>
                <prismic-rich-text :field="title.description_pera"/>
              </b-col>
            </b-row>
            <city-data-cards :api-data="cityDataPoints" :group="title.tab_titles.toLowerCase()"
                             :cluster="title.tab_titles.toLowerCase()"/>
          </b-container>
        </div>
        <div
          v-else-if="title.tab_titles === 'Local Expert' && activeTab === 'Local Expert'"
          class="city-data-tabs__tabs__tab__content city-data-tabs__tabs__tab__content--expert"
        >
          <city-local-expert v-if="title" :slice="slice"/>
        </div>
      </template>
    </div>
    <div v-else>
      <template v-for="title in titles">
        <div
          v-if="title !== 'Local Expert' && activeTab === title"
          :key="title"
          class="city-data-tabs__tabs__tab__content"
        >
          <b-container>
            <b-row class="pad-44">
              <b-col cols="12" lg="4" class="city-data-tabs__tabs__tab__content__rank"
                     :style="{color: getGroupColour(title)}">
                <client-only>
                  <vue-ellipse-progress
                    :progress="getEllipseProgress(title)"
                    :color="getGroupColour(title)"
                    empty-color="#F0EDEE"
                    line="square"
                    line-mode="normal 0"
                    :size="338"
                    :thickness="25"
                    :empty-thickness="24"
                    :legend-value="$store.state.cityApiData[getApiProperty(title)]"
                  >
                    <template v-slot:legend-value>
                      <span slot="legend-value" class="ep-legend--value--total">/142</span>
                    </template>
                    <template v-slot:legend-caption>
                      <p slot="legend-caption" class="ep-legend--caption">
                        <inline-svg v-if="title === 'Market Fundamentals'"
                                    :src="require('@/static/images/demoraphics-icon.svg')"/>
                        <inline-svg v-if="title === 'Location Quality'" :src="require('@/static/images/economics-icon.svg')"/>
                        <inline-svg v-if="title === 'Innovation'"
                                    :src="require('@/static/images/innovation-icon.svg')"/>
                        <inline-svg v-if="title === 'Connectivity'"
                                    :src="require('@/static/images/connectivity-icon.svg')"/>
                      </p>
                    </template>
                  </vue-ellipse-progress>
                </client-only>
              </b-col>
              <b-col cols="12" lg="8" class="pr-100">
                <!--                <p class="subline">-->
                <!--                  Subline to be defined-->
                <!--                </p>-->
                <h2>
                  {{ cityDataPoints.name }}’s {{ title }} Ranking
                </h2>
                <prismic-rich-text :field="getNonFeaturedCityTabContent(title)"/>
              </b-col>
            </b-row>
            <city-data-cards :api-data="cityDataPoints" :group="title.toLowerCase()" :cluster="title.toLowerCase()"/>
          </b-container>
        </div>
        <div
          v-else-if="title === 'Local Expert' && activeTab === 'Local Expert'"
          class="city-data-tabs__tabs__tab__content city-data-tabs__tabs__tab__content--expert"
        >
          <city-local-expert/>
        </div>
      </template>
    </div>
  </section>
</template>

<script>
const VueScrollTo = require('vue-scrollto')
import Datacard from '@/components/data-cards/data-card'
import CityLocalExpert from '@/components/city/city-local-expert'
import DataService from '@/services/data-service'
import CityDataCards from '@/components/city/city-data-cards'
import api from '@/services/api'

export default {
  name: 'CityDataTabs',
  components: {CityDataCards, Datacard, CityLocalExpert},
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
    return {
      titles: [
        'Market Fundamentals', 'Location Quality', 'Innovation', 'Connectivity'
      ],
      cityDataPoints: {},
      activeTab: 'Market Fundamentals',
      // activeTab: 'Demographics',
      colors: {
        'Market Fundamentals': '#29B5BA',
        'Location Quality': '#4D9CCE ',
        Demographics: '#29B5BA',
        Economy: '#4D9CCE ',
        Innovation: '#652B74',
        Connectivity: '#F29131'
      }
    }
  },
  computed: {
    /**
     * Get the component type object
     **/
    tabsStyle() {
      try {
        if (this.slice.primary.background_image.url) {
          return {
            backgroundImage: `url('${this.slice.primary.background_image.url}')`
          }
        }
      } catch (ex) {
      }
      return null
    },
    /**
     * Does the component have content from the CMS?
     */
    hasCmsContent() {
      if (this.slice) {
        return true
      } else {
        return false
      }
    }
  },
  async mounted() {
    try {
      const citySlug = this.$route.params.uid
      const apiResponse = await DataService.getCityData(citySlug)
      this.cityDataPoints = apiResponse.data ? apiResponse.data : {}
    } catch (e) {
    }
    this.$nextTick(() => {
      const hash = location.hash.replace('#', '')
      if (hash && hash === 'expert') {
        this.activeTab = 'Local Expert'

        setTimeout(() => {
          VueScrollTo.scrollTo(
            `#city-data-tabs`,
            500,
            {
              duration: 500,
              easing: 'linear',
              offset: -180,
              force: true,
              cancelable: true,
              x: false,
              y: true
            }
          )
        }, 500)
      }
    })
  },
  methods: {
    /**
     * Get nonfeatured city content from the global content doc in the CMS
     */
    getNonFeaturedCityTabContent(tabTitle) {
      switch (tabTitle.toLowerCase()) {
        case 'market fundamentals':
          return this.$store.state.globalContent.city_data_tab_content_demographics
          break;
        case 'location quality':
          return this.$store.state.globalContent.city_data_tab_content_economy
          break;
        case 'innovation':
          return this.$store.state.globalContent.city_data_tab_content_innovation
          break;
        case 'connectivity':
          return this.$store.state.globalContent.city_data_tab_content_connectivity
          break;
        default:
          return null
      }
    },
    /**
     * Get the API property name for a group e.g. "demographics" return "economy_score"
     */
    getApiProperty(title) {
      let apiPropertyName = ''
      switch (title.toLowerCase()) {
        case 'market fundamentals':
          apiPropertyName = 'market_fundamentals_rank'
          break
        case 'demographics':
          apiPropertyName = 'market_fundamentals_rank'
          break
        case 'location quality':
          apiPropertyName = 'attractiveness_score'
          break
        case 'economy':
          apiPropertyName = 'economy_rank'
          break
        default:
          apiPropertyName = `${title.toLowerCase()}_rank`
      }
      return apiPropertyName
    },
    /**
     * Get a percentage fill for the animated bar chart
     * @param apiProperty e.g. economy_score
     */
    getEllipseProgress(groupName) {
      const apiProperty = this.getApiProperty(groupName)
      const totalCities = 142
      let progress = 0
      if (this.$store.state.cityApiData) {
        progress = (((totalCities + 1) - this.$store.state.cityApiData[apiProperty]) / totalCities) * 100
      }
      console.log(apiProperty + " value", this.$store.state.cityApiData[apiProperty])
      console.log(apiProperty + " progress", progress)
      return parseInt(progress)
    },
    /**
     * Get the relevant colour for the group
     * @param groupName e.g. Demographics
     * @returns {string} Hex Colour
     */
    getGroupColour(groupName) {
      console.log('groupName', groupName)
      return this.colors[groupName]
    }
  }
}
</script>

<style lang="scss">
.city-data-tabs {
  background: #FCFBFB url('~@/assets/img/citytab-bg.png') no-repeat;
  background-position: top center;
  background-size: cover;
  position: relative;
  border-top: 2px solid #F5F3F4;
  padding-bottom: 120px;
  -webkit-box-shadow: 0px 30px 40px 0px rgba(34, 10, 18, 0.1);
  -moz-box-shadow: 0px 30px 40px 0px rgba(34, 10, 18, 0.1);
  box-shadow: 0px 30px 40px 0px rgba(34, 10, 18, 0.1);
  margin-bottom: 100px;
  margin-top: 100px;
  @include respond-below(sm) {
    margin-bottom: 50px;
    padding-bottom: 30px;
  }

  &__tabs {
    ul.nav-tabs {
      position: absolute;
      top: -47px;
      border: none;
      @include respond-below(sm) {
        top: -73px;
      }

      li.nav-item {
        border: none;

        a.nav-link {
          font-family: 'Corporate S Pro bold';
          font-size: 14px;
          line-height: 45px;
          text-transform: uppercase;
          letter-spacing: .7px;
          background: none;
          border: none;
          color: #B4A4A9;
          border-bottom: 2px solid transparent;
          padding: 0;
          margin-right: 2rem;
          @include respond-below(sm) {
            line-height: 35px;
            letter-spacing: .5px;
            margin-right: 1rem;
          }

          &.active {
            color: #802437;
            border-color: #802437;
          }
        }

        &:last-child {
          a.nav-link {
            margin-right: 0;
          }
        }
      }
    }

    .tab-content {
      margin-top: 40px;
    }

    &__tab {

      &__content {
        align-items: center;

        .row.pad-44 {
          padding: 45px 0;
        }

        &__rank {
          .ep-container {
            display: block;
            margin: auto;
          }
        }

        @include respond-below(sm) {
          text-align: left;
        }

        &--expert {
          padding-top: 0;

          section.city-local-expert {
            .container {
              padding-bottom: 0;
            }

            @include respond-below(sm) {
              background: none !important;
            }
          }
        }

        &__rank {
          // Style the vue ellipse progress
          .ep-legend {
            &--container {
              display: flex;
              flex-direction: column;
            }

            &--caption {
              order: 1;

              svg {
                height: 92px;
                max-height: 92px;
                width: auto;
              }
            }

            &--value {
              order: 2;
              font-size: 64px;
              font-family: "Corporate S Pro light";

              &:before {
                content: '#'
              }

              &--total {
                font-size: 30px;
                color: #B4A4A9;
                vertical-align: super;
                margin-left: 10px;
              }
            }
          }
        }

        p.subline {
          margin-bottom: 25px;
        }

        h2 {
          margin-bottom: 30px;
        }

        div.row {
          .data-card {
            &__inner {
              width: 100%;
            }
          }
        }
      }
    }

    .pr-100 {
      padding-right: 100px;
      @include respond-below(sm) {
        padding-right: 16px;
      }
    }
  }
}
</style>
