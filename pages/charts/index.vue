<template>
  <div>
    <city-index-charts />
  </div>
</template>

<script>
import CityIndexCharts from '@/components/city-index/city-index-charts'

export default {
  name: 'Charts',
  components: { CityIndexCharts },
  data () {
    return {
      heading: { text: 'Charts', subline: null }
    }
  }
}
</script>

<style scoped lang="scss">
.main-chart-container {
  position: relative;
  width: 90vw;
  min-height: 100%;
  margin: 40px auto 0;
}
</style>
