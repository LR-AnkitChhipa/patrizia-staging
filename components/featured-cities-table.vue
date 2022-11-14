<template>
  <city-index-trends :is-featured-cities-mode="true" :slice="slice" :slice-index="sliceIndex" />
</template>

<script>
import CityIndexTrends from '@/components/city-index/city-index-trends'
export default {
  name: 'FeaturedCitiesTable',
  components: { CityIndexTrends },
  props: {
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
}
</script>

<style scoped>

</style>
