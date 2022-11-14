<template>
  <div class="main-chart-container">
    <goals-chart />
  </div>
</template>

<script>
import GoalsChart from '@/components/charts/goals-chart'

export default {
  name: 'Goals',
  components: { GoalsChart }
}
</script>

<style scoped lang="scss">
.main-chart-container {
  width: 100vw;
  height: 100vh;
}
</style>
