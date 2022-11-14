<template>
  <page />

</template>

<script>
import Page from '@/components/page'
import MetaDataService from '@/services/meta-data-service'
import TrackingService from '~/services/tracking-service'

export default {
  components: { Page },
  async middleware ({ store, $prismic, params, error, app, route }) {
    try {
      if (params.uid) {
        await store.dispatch('fetchPrismicCityDocByUid', { prismic: $prismic, type: 'city', uid: params.uid })

        // Now we have the prismic data, we can get the relevant API data using the city ID defined
        // in the city integration field :)
        const prismicData = (store.state.prismicDoc && store.state.prismicDoc.data) ? store.state.prismicDoc.data : null

        if (prismicData && prismicData.data_api_data && prismicData.data_api_data.id) {
          const cityApiId = prismicData.data_api_data.id
          console.log('cityApiId', cityApiId)
          // await store.dispatch('fetchApiDataForCityById', cityApiId)
          await store.dispatch('fetchApiDataForCityById', params.uid)
        } else {
          // Get the data by URL slug for non CMSed cities
          await store.dispatch('fetchApiDataForCityById', params.uid)
        }
        // tracking
        await TrackingService.trackPageView(app, route, store)
      }
    } catch (e) {
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.positionUserCentricsPreferenceButton(94)
    })
  },
  head () {
    const meta = MetaDataService.getPageMetaTags(this.$store.state.prismicDoc, this, this.$route)
    if(meta) {
      return meta
    }
  }
}
</script>

<style scoped>

</style>
