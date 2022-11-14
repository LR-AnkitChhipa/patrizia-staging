<template>
  <div class="main-chart-container">
    <map-chart/>
  </div>
</template>

<script>
import MapChart from "@/components/charts/map-chart";

export default {
  name: 'Map',
  components: {MapChart }
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
