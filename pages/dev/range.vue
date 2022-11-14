<template>
  <div>
    <range-slider :min="0" :max="100" v-model="value"/>
  </div>
</template>

<script>
import RangeSlider from "@/components/inputs/range-slider";
export default {
  name: "range",
  components: {RangeSlider},
  data() {
    return {
      value: [10, 90]
    }
  },
  created() {
    this.min = 0
    this.max = 250
    this.bgStyle = {
      backgroundColor: '#fff',
      boxShadow: 'inset 0.5px 0.5px 3px 1px rgba(0,0,0,.36)'
    }
    this.tooltipStyle = {
      backgroundColor: '#666',
      borderColor: '#666'
    }
    this.processStyle = {
      backgroundColor: '#999'
    }
  }
}
</script>

<style scoped>

</style>
