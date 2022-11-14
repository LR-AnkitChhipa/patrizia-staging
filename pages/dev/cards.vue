<template>
  <homepage-featured-cities />
</template>

<script>
import HomepageFeaturedCities from '@/components/homepage/homepage-featured-cities'
import ChartService from '@/services/chart-service'

export default {
  name: 'Index',
  components: { HomepageFeaturedCities }
}
</script>

<style scoped>

</style>
