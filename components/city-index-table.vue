<template>
  <city-index-trends :is-featured-cities-mode="false" v-if="isUserApproved" :slice="slice" :slice-index="sliceIndex" />
</template>

<script>
import CityIndexTrends from '@/components/city-index/city-index-trends'
import AuthService from "@/services/auth-service";
export default {
  name: 'CityIndexTable',
  components: { CityIndexTrends },
  props: {
    slice: {
      type: Object,
      default() {
        return {
          primary: {}
        }
      }
    },
    sliceIndex: {
      type: Number,
      default() {
        return 0
      }
    }
  },
  data () {
    return {
      isUserApproved: false
    }
  },
  async mounted () {
    this.isUserApproved = await AuthService.isUserApproved(this)
  }
}
</script>

<style scoped>

</style>
