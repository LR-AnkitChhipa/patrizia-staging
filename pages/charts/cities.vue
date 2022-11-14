<template>
  <div class="main-chart-container">
    <cities-chart />
  </div>
</template>

<script>
import CitiesChart from '@/components/charts/cities-chart'

export default {
  name: 'Cities',
  components: { CitiesChart }
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
