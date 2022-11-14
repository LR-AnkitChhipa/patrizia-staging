<template>
  <city-index-charts :is-featured-cities="true" />
</template>

<script>
import MainChart from '@/components/main-chart'
import CityIndexCharts from '@/components/city-index/city-index-charts'
export default {
  name: 'FeaturedCitiesCharts',
  components: { CityIndexCharts, MainChart }
}
</script>

<style scoped>

</style>
