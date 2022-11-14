<template>
  <div class="city-index-trends-table">
    <h4 class="city-index-trends-table__title">
      {{ title }}
    </h4>
    <sorted-table
      v-if="trendsData"
      :values="trendsData"
      dir="asc"
      sort="attractiveness_score"
      class="city-index-trends-table__table"
    >
      <thead>
      <tr>
        <th scope="col" class="city-index-trends-table__table__col city-index-trends-table__table__col--name">
          <sort-link name="name" class="lead">
            City
          </sort-link>
        </th>
        <th scope="col" class="city-index-trends-table__table__col city-index-trends-table__table__col--data">
          <sort-link :name="pastScoreAttributeName" class="lead">
            {{ getLabel('trends_table_col_title_last_year') }}
          </sort-link>
        </th>
        <th scope="col" class="city-index-trends-table__table__col city-index-trends-table__table__col--data">
          <sort-link :name="nowScoreAttributeName" class="lead">
            {{ getLabel('trends_table_col_title_this_year') }}
          </sort-link>
        </th>
        <th scope="col">
          <sort-link name="movement" class="lead">
            &nbsp;
          </sort-link>
        </th>
      </tr>
      </thead>
      <tbody slot="body" slot-scope="sort">
      <tr v-for="city in sort.values" :key="city.id">
        <td :class="getCityNameColClass(city)" v-if="isCityLinked(city)">
          <nuxt-link :to="`/city/${city.slug}`" :title="`View ${city.name} information`">
            <span class="city-index-trends-table__table__col--name">{{ city.name }}</span>
            <span class="city-index-trends-table__table__col--name__country">{{ city.country_code }}</span>
          </nuxt-link>
        </td>
        <td :class="getCityNameColClass(city)" v-else>
          <span class="city-index-trends-table__table__col--name">{{ city.name }}</span>
          <span class="city-index-trends-table__table__col--name__country">{{ city.country_code }}</span>
        </td>
        <td class="city-index-trends-table__table__col city-index-trends-table__table__col--data">
          {{ city[pastScoreAttributeName] }}
        </td>
        <td class="city-index-trends-table__table__col city-index-trends-table__table__col--data">
          {{ city[nowScoreAttributeName] }}
        </td>
        <td
          :class="'city-index-trends-table__table__col city-index-trends-table__table__col--data ' + getMovementClass(city.movement)">
            <span v-if="arrow">
              <span v-if="city.movement === 0"> <img src="@/assets/img/case-neutral.svg" alt=""></span>
              <span v-if="city.movement > 0"> <img src="@/assets/img/case-up.svg" alt=""></span>
              <span v-if="city.movement < 0"> <img src="@/assets/img/case-down.svg" alt=""></span>
            </span>
          <span v-else>
              <span v-if="city.movement === 0"> {{ city.movement }}</span>
              <span v-if="city.movement > 0"> +{{ city.movement }}</span>
              <span v-if="city.movement < 0"> -{{ city.movement }}</span>
            </span>
        </td>
      </tr>
      </tbody>
    </sorted-table>
  </div>
</template>

<script>
import DataService from '@/services/data-service'
import AuthService from '@/services/auth-service'

export default {
  name: 'CityIndexTrendsTable',
  props: {
    title: {
      type: String,
      default() {
        return 'Top 10 markets by'
      }
    },
    /**
     * Specifies which cluster to get from the data API attractiveness or liquidity
     */
    clusterName: {
      type: String,
      default() {
        return 'attractiveness'
      }
    },
    /**
     * top or movers
     */
    trendType: {
      type: String,
      default() {
        return 'top'
      }
    },
    // lastvalue
    arrow: {
      type: Boolean,
      default() {
        return true
      }
    }
  },
  data() {
    return {
      trendsData: null
    }
  },
  computed: {
    pastScoreAttributeName() {
      const scoreAttribute = this.clusterName + '_score_2017'
      return scoreAttribute
    },
    nowScoreAttributeName() {
      const scoreAttribute = this.clusterName + '_score'
      return scoreAttribute
    }
  },
  async mounted() {
    try {
      const response = await DataService.getCityTrends(this.clusterName, this.trendType)
      this.trendsData = response.data
    } catch (e) {
    }
  },
  methods: {
    getCityNameColClass(city) {
      let cssClass = 'city-index-trends-table__table__col'

      if (
        this.isCityLinked(city)
      ) {
        cssClass += ' city-index-trends-table__table__col--is-linked'
      }
      return cssClass
    },
    /**
     * Should this city be linked to the city's page?
     * @param city
     * @returns {*|boolean}
     */
    isCityLinked(city) {
      return (city.is_featured_city
        ||
        AuthService.isUserLoggedin(this))
    },
    getMovementClass(movementValue) {
      let cssClass = 'city-index-trends-table__table__col__movement'
      if (movementValue === 0) {
        cssClass += '--neutral'
      } else if (movementValue < 0) {
        cssClass += '--down'
      } else {
        cssClass += '--up'
      }
      return cssClass
    }
  }
}
</script>

<style lang="scss">
.city-index-trends-table {
  padding-right: 76px;
  @include respond-below(sm) {
    padding: 0;
  }

  &__table {
    font-family: "Corporate S Pro";
    margin-bottom: 20px;

    thead {
      th {
        border-top: 0;
        border-bottom: 1px solid #B4A4A9;
        padding: 0 0 15px;
      }
    }

    td {
      padding: 17px 0 14px;
      border-bottom: 1px solid #F5F3F4;

      &:last-child {
        text-align: right;
        width: 80px;
        padding-right: 5px;
        @include respond-below(sm) {
          width: 50px;
        }
      }
    }

    &__col {
      &--is-linked {
        color: #802537;
        cursor: pointer;

        .city-index-trends-table__table__col--name {
          color: #802537;
        }
      }

      // width: 200px;
      &--name {
        color: #210A12;

        &__country {
          font-family: 'Corporate S Pro';
          font-weight: 400;
          color: #B4A4A9;
        }
      }

      &--data {
        text-align: center;
      }

      &__movement {
        span {
          color: #210A12;
        }

        &--up {
          span {
            color: #22AC58;
          }
        }

        &--down {
          span {
            color: #802537;
          }
        }
      }
    }

  }
}
</style>
