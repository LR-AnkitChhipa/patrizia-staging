<template>
  <section class="data-cards">
    <b-container>
      <b-row>
        <b-col>
          <p>
            <text-link nuxt-url="/data-cards/" text="Back to cities list" />
          </p>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <b-nav>
            <b-nav-item @click="visibleSection = 'demographics'">
              Demographics cards
            </b-nav-item>
            <b-nav-item @click="visibleSection = 'economy'">
              Economy cards
            </b-nav-item>
            <b-nav-item @click="visibleSection = 'innovation'">
              Innovation cards
            </b-nav-item>
            <b-nav-item @click="visibleSection = 'connectivity'">
              Connectivity cards
            </b-nav-item>
          </b-nav>
        </b-col>
      </b-row>
      <b-row v-if="visibleSection === 'demographics'">
        <b-col>
          <h1>Demographics</h1>
        </b-col>
      </b-row>
      <b-row v-if="visibleSection === 'demographics'">
        <b-col lg="4">
          <data-card card-type="DemographicsPopulation" :city-data="cityData" :show-city-info="true" :animation-disabled="animationsDisabled" />
        </b-col>
        <b-col lg="4">
          <data-card card-type="DemographicsPopulationForecast" :city-data="cityData" :show-city-info="true" :animation-disabled="animationsDisabled" />
        </b-col>
        <b-col lg="4">
          <data-card card-type="DemographicsHouseholds" :city-data="cityData" :show-city-info="true" :animation-disabled="animationsDisabled" />
        </b-col>
        <b-col lg="4">
          <data-card card-type="DemographicsCityCountrysideRatio" :city-data="cityData" :show-city-info="true" :animation-disabled="animationsDisabled" />
        </b-col>
        <b-col lg="4">
          <data-card card-type="DemographicsUnemployment" :city-data="cityData" :show-city-info="true" :animation-disabled="animationsDisabled" />
        </b-col>
        <b-col lg="4">
          <data-card card-type="DemographicsOldAgeRatio" :city-data="cityData" :show-city-info="true" :animation-disabled="animationsDisabled" />
        </b-col>
        <b-col lg="4">
          <data-card card-type="DemographicsPrivateHouseholds" :city-data="cityData" :show-city-info="true" :animation-disabled="animationsDisabled" />
        </b-col>
        <b-col lg="4">
          <data-card card-type="DemographicsWorkingPopulation" :city-data="cityData" :show-city-info="true" :animation-disabled="animationsDisabled" />
        </b-col>
        <b-col lg="4">
          <data-card card-type="DemographicsBirthRate" :city-data="cityData" :show-city-info="true" :animation-disabled="animationsDisabled" />
        </b-col>
      </b-row>
      <b-row v-if="visibleSection === 'economy'">
        <b-col>
          <h1>Economy</h1>
        </b-col>
      </b-row>
      <b-row v-if="visibleSection === 'economy'">
        <b-col lg="4">
          <data-card
            card-type="EconomyWorkingPopulation"
            :city-data="cityData"
            :show-city-info="true"
            cluster-name="economy"
          />
        </b-col>
        <b-col lg="4">
          <data-card
            card-type="EconomyUnemploymentRate"
            :city-data="cityData"
            :show-city-info="true"
            cluster-name="economy"
          />
        </b-col>
        <b-col lg="4">
          <data-card
            card-type="EconomyPurchasingPower"
            :city-data="cityData"
            :show-city-info="true"
            cluster-name="economy"
          />
        </b-col>
        <b-col lg="4">
          <data-card
            card-type="EconomyHouseholdIncome"
            :city-data="cityData"
            :show-city-info="true"
            cluster-name="economy"
          />
        </b-col>
        <b-col lg="4">
          <data-card
            card-type="EconomyGdp"
            :city-data="cityData"
            :show-city-info="true"
            cluster-name="economy"
          />
        </b-col>
      </b-row>
      <b-row v-if="visibleSection === 'innovation'">
        <b-col>
          <h1>Innovation</h1>
        </b-col>
      </b-row>
      <b-row v-if="visibleSection === 'innovation'">
        <b-col lg="4">
          <data-card
            card-type="InnovationHeStudents"
            :city-data="cityData"
            :show-city-info="true"
            cluster-name="innovation"
          />
        </b-col>
        <b-col lg="4">
          <data-card
            card-type="InnovationPatents"
            :city-data="cityData"
            :show-city-info="true"
            cluster-name="innovation"
          />
        </b-col>
        <b-col lg="4">
          <data-card
            card-type="InnovationYoung"
            :city-data="cityData"
            :show-city-info="true"
            cluster-name="innovation"
          />
        </b-col>
      </b-row>
      <b-row v-if="visibleSection === 'connectivity'">
        <b-col>
          <h1>Connectivity</h1>
        </b-col>
      </b-row>
      <b-row v-if="visibleSection === 'connectivity'">
        <b-col lg="4">
          <data-card
            card-type="ConnectivityCommute"
            :city-data="cityData"
            :show-city-info="true"
            cluster-name="connectivity"
          />
        </b-col>
        <b-col lg="4">
          <data-card
            card-type="ConnectivityCommuteTime"
            :city-data="cityData"
            :show-city-info="true"
            cluster-name="connectivity"
          />
        </b-col>
        <b-col lg="4">
          <data-card
            card-type="ConnectivityDepartures"
            :city-data="cityData"
            :show-city-info="true"
            cluster-name="connectivity"
          />
        </b-col>
        <b-col lg="4">
          <data-card
            card-type="ConnectivityPublicTransportCommuters"
            :city-data="cityData"
            :show-city-info="true"
            cluster-name="connectivity"
          />
        </b-col>
      </b-row>
    </b-container>
  </section>
</template>

<script>
import DataCard from '@/components/data-cards/data-card'
import DataService from '@/services/data-service'
import TextLink from '@/components/text-link'

export default {
  name: 'DataCards',
  components: { TextLink, DataCard },
  async asyncData ({ params, error }) {
    const response = await DataService.getCityData(params.cityid ?? 66)
    return {
      cityData: response.data
    }
  },
  data () {
    return {
      visibleSection: 'demographics',
      animationsDisabled: true
    }
  }
}
</script>

<style scoped>
.data-cards {
  background-color: #EFEFF0;
  padding-top: 28px;
  display: flex;
  flex-wrap: wrap;
}
</style>
