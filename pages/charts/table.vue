<template>
  <div class="main-chart-container">
    <table-chart/>
  </div>
</template>

<script>

import TableChart from "@/components/charts/table-chart";
export default {
  name: 'Cities',
  components: {TableChart},
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
