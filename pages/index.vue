<template>
  <page />
</template>

<script>
import MetaDataService from '~/services/meta-data-service'
import Page from '~/components/page'
import TrackingService from "@/services/tracking-service";

export default {
  components: { Page },
  async middleware ({ store, $prismic, error, app, route }) {
    try {
      await store.dispatch('fetchPrismicSingle', { prismic: $prismic, type: 'homepage' })
      // tracking
      await TrackingService.trackPageView(app, route, store)
    } catch (e) {
      error({ statusCode: 404, message: 'Page not found' })
    }
  },
  head () {
    return MetaDataService.getPageMetaTags(this.$store.state.prismicDoc, null, this.$route)
  }
}
</script>

<style scoped lang="scss">

</style>
