<template>
<div>
  <modal-radial
  :overall-rank="1"
  :attractiveness-rank="1"
  :demographics-rank="1"
  :economics-rank="1"
  :connectivity-rank="3"
  :innovation-rank="2"
  />
</div>
</template>

<script>
import ModalRadial from "@/components/charts/modal-radial";
export default {
name: "modal-radial-chart",
  components: {ModalRadial}
}
</script>

<style scoped>

</style>
