<template>
  <compare-chart />
</template>

<script>
import CompareChart from '@/components/charts/compare-chart'

export default {
  name: 'Charts',
  components: { CompareChart }
}
</script>

<style scoped lang="scss">
.main-chart-container {
  border: 1px solid black;
  width: 90vw;
  height: calc(95vh - 40px);
  margin: 40px auto 0;
}
</style>
