<template>
  <div class="container">
    <radar-curved-chart />
  </div>
</template>

<script>

import RadarCurvedChart from '@/_archived/radar-curved-chart'
export default {
  name: 'Charts',
  components: { RadarCurvedChart }
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
