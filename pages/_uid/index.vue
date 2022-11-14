<template>
  <page />
</template>

<script>
import MetaDataService from '~/services/meta-data-service'
import TrackingService from '~/services/tracking-service'

import Page from '~/components/page'

export default {
  components: { Page },
  async middleware ({ store, $prismic, params, error, route, app }) {
    try {
      if (params.uid) {
        await store.dispatch('fetchPrismicDocByUid', { prismic: $prismic, type: 'page', uid: params.uid })
        // tracking
        await TrackingService.trackPageView(app, route, store)
      }
    } catch (e) {
    }
  },
  head () {
    const meta = MetaDataService.getPageMetaTags(this.$store.state.prismicDoc, null, this.$route)
    return meta
  }
}
</script>

<style scoped lang="scss">

</style>
