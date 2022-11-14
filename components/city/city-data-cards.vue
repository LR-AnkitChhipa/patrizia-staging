<template>
  <b-row>
    <b-col v-for="(card, cardIndex) in currentGroupMetrics" :key="cardIndex" cols="12" md="6" lg="4">
      <data-card
        v-if="apiData"
        :card-type="card"
        :city-data="apiData"
        :show-city-info="false"
        :cluster-name="cluster"
      />
    </b-col>
  </b-row>
</template>

<script>
import DataCard from '@/components/data-cards/data-card'
export default {
  name: 'CityDataCards',
  components: { DataCard },
  props: {
    /**
     * market fundamentals|location quality|innovation|connectivity
     */
    group: {
      type: String,
      default () {
        return 'market fundamentals'
      }
    },
    cluster: {
      type: String,
      default () {
        return 'market fundamentals'
      }
    },
    /**
     * The city data from the API
     */
    apiData: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
      cards: {
        'market fundamentals': [
          'DemographicsCityCountrysideRatio',
          'DemographicsPopulationForecast',
          'DemographicsOldAgeRatio',
          'DemographicsPrivateHouseholds',
          'DemographicsWorkingPopulation',
          // 'DemographicsBirthRate',

          // 'DemographicsHouseholds',
          // 'DemographicsUnemployment',
        ],
        'location quality': [
          // 'DemographicsPopulation',
          'EconomyWorkingPopulation',
          'EconomyUnemploymentRate',
          'EconomyPurchasingPower',
          'EconomyHouseholdIncome',
          'EconomyGdp',
        ],
        'innovation': [
          'InnovationHeStudents',
          'InnovationPatents',
          'InnovationYoung',
        ],
        'connectivity': [
          'ConnectivityCommute',
          'ConnectivityCommuteTime',
          'ConnectivityDepartures',
          'ConnectivityPublicTransportCommuters',
        ]
      }


    }
  },
  computed: {
    currentGroupMetrics () {
      return this.cards[this.group]
    }
  }
}
</script>

<style lang="scss">

</style>
