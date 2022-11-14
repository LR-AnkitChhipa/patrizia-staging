<template>
  <article>
    <city-index-charts v-if="isUserApproved" />
  </article>
</template>

<script>
import CityIndexCharts from '@/components/city-index/city-index-charts'
import CityIndexTrends from '@/components/city-index/city-index-trends'
import CityIndexAccessRequired from '@/components/city-index/city-index-access-required'
import TwoColumn from '@/components/TwoColumn'
import AuthService from '@/services/auth-service'

export default {
  components: { TwoColumn, CityIndexAccessRequired, CityIndexTrends, CityIndexCharts },
  data () {
    return {
      twoColContent: {
        primary: {
          two_column_subline: 'SUbline to be defined',
          two_column_title: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr',
          two_column_content: [{ text: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et' }],
          two_column_layout: 'content first',
          two_column_display_dots: true,
          two_column_image_has_shadow: true
        }
      },
      isUserApproved: false
    }
  },
  async mounted () {
    this.isUserApproved = await AuthService.isUserApproved(this)
  }
}
</script>

<style lang="scss">

</style>
