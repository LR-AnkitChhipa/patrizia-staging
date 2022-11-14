<template>
<div>
  <city-summary-modal :city-id="65"/>
</div>
</template>

<script>
import CitySummaryModal from "@/components/charts/city-summary-modal";
export default {
  name: "city-summary",
  components: {CitySummaryModal}
}
</script>

<style scoped>

</style>
