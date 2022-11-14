<template>
  <section class="article-data-cards">
    <div class="article-data-cards__header">
      <p class="subline--with-dash subline">{{ slice.primary.city_data_cards_subline }}</p>
      <h2>{{ slice.primary.city_data_cards_title }}</h2>
    </div>
    <div class="article-data-cards__cards">
      <VueSlickCarousel v-bind="slickOptions">
        <div class="article-data-cards__cards__card" v-for="(city) in slice.items">
          <div class="article-data-cards__cards__card__inner">
            <data-card
              :card-type="city.data_card"
              :cluster-name="getDataCardCluster(city.data_card)"
              :city-data="getCityData(city.city.id)" :show-city-info="true"
              :animation-disabled="true"/>
          </div>
        </div>
      </VueSlickCarousel>
    </div>
  </section>
</template>

<script>
import DataService from '~/services/data-service'
import DataCard from "@/components/data-cards/data-card";
import KeenSlider from 'keen-slider'


export default {
  name: "article-data-cards",
  components: {DataCard},
  props: {
    slice: {
      type: Object,
      default() {
        return {}
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
      cityIds: [],
      citiesData: [],
      slickOptions: {
        mobileFirst: true,
        infinite: false,
        slidesToShow: 2.5,
        slidesToScroll: 3,
        dots: true,
        arrows: false
      },
      responsive: [
        {
          breakpoint: 992,
          settings: {
            unslick: true
          }
        }
      ]
    }
  },
  async mounted() {
    this.getCityIds()
    await this.getCitiesData()
  },
  methods: {
    /**
     * Get a cluster name from the card class name
     *
     */
    getDataCardCluster(cardClassName) {
      let cardClassLc = cardClassName.toLowerCase()
      if(cardClassLc.indexOf('demographics') > -1) {
        return 'demographics';
      }
      else if(cardClassLc.indexOf('economy') > -1) {
        return 'economy';
      }
      else if(cardClassLc.indexOf('innovation') > -1) {
        return 'innovation';
      }
      else if(cardClassLc.indexOf('connectivity') > -1) {
        return 'connectivity';
      }
    },
    /**
     * Get unique city ids
     * @returns {any[]} a list of unique city ids
     */
    getCityIds() {
      const uniqueCityIds = [...new Set(this.slice.items.map((item) => {
        return item.city.id
      }))];
      this.cityIds = uniqueCityIds
    },
    async getCitiesData() {
      for (const cityId of this.cityIds) {
        const response = await DataService.getCityData(cityId)
        this.citiesData.push(response.data)
      }
    },
    /**
     * Get city data from the data property by a city ID
     * @param cityId
     * @returns {*[]}
     */
    getCityData(cityId) {
      const cityData = this.citiesData.filter((item) => {
        if (item.id === cityId) {
          return item
        }
      })
      return cityData[0]
    }
  }
}
</script>

<style lang="scss">
.article-data-cards {
  margin: 64px 0;
  position: relative;
  height: 557px;

  @include respond-below(sm) {
    margin: 32px 0;
  }

  &__cards {
    width: calc(828px + (50vw - 1140px / 2));
    position: absolute;
    right: calc(0px - (50vw - 1140px / 2 + 8px));

    @include respond-below(xl) {
      width: initial;
      right: initial;
      position: relative;
      margin-left: -90px;
      //margin-right: -27px;
    }

    &__card {
      &__inner {
        //padding-left: 30px;
        padding-bottom: 90px;
      }

      &:first-child {
        .article-data-cards__cards__card__inner {
          padding-left: 90px;

          @include respond-below(xl) {
            //padding-left: 0;
          }
        }
      }
    }
  }

}
</style>
