<template>
  <section class="city-index-trends">
    <b-container>
      <b-row>
        <b-col>
          <p class="subline--with-dash subline">
            {{ slice.primary.trends_table_subline }}
          </p>
          <h2 class="city-index-trends__title">
            {{ slice.primary.trends_table_title }}
          </h2>
        </b-col>
      </b-row>
      <b-row>
        <b-col md="6">
          <city-index-trends-table
            cluster-name="attractiveness"
            trend-type="top"
            title="Top 10 markets by attractiveness"
          />
        </b-col>
        <b-col v-if="!isFeaturedCitiesMode" md="6">
          <city-index-trends-table
            cluster-name="liquidity"
            trend-type="top"
            title="Top 10 markets by liquidity"
          />
        </b-col>
        <b-col md="6">
          <city-index-trends-table
            cluster-name="attractiveness"
            trend-type="movers"
            title="Top 5 attractiveness movers"
            :arrow="textValue"
          />
        </b-col>
        <b-col v-if="!isFeaturedCitiesMode" md="6">
          <city-index-trends-table
            cluster-name="liquidity"
            trend-type="movers"
            title="Top 5 liquidity movers"
            :arrow="textValue"
          />
        </b-col>
      </b-row>
    </b-container>
  </section>
</template>

<script>
import CityIndexTrendsTable from '@/components/city-index/city-index-trends-table'

export default {
  name: 'CityIndexTrends',
  components: {CityIndexTrendsTable},
  props: {
    isFeaturedCitiesMode: {
      type: Boolean,
      default() {
        return false
      }
    },
    slice: {
      type: Object,
      default() {
        return {
          primary: {}
        }
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
      textValue: false
    }
  }
}
</script>

<style lang="scss">
.city-index-trends {
  margin-bottom: 93px;

  &__title {
    margin-bottom: 50px;
  }
}
</style>
