<template>
  <page />
</template>

<script>
import MetaDataService from '~/services/meta-data-service'
import Page from '~/components/page'
import TrackingService from "@/services/tracking-service";
import AuthService from "@/services/auth-service";

export default {
  components: { Page },
  async middleware ({ store, $prismic, params,  redirect, error, app, route }) {
    try {
      // Get the page data
      if (params.uid) {
        await store.dispatch('fetchPrismicDocByUid', { prismic: $prismic, type: 'article', uid: params.uid })
      } else {
        await store.dispatch('fetchPrismicDocByUid', { prismic: $prismic, type: 'page', uid: 'insights' })
      }
      // Check if the this is visible to public??
      const isLoggedIn = AuthService.isUserLoggedin(app)
      let isPrivatePage = false
      try {
        isPrivatePage = store.state.prismicDoc.data.is_private
      } catch (ex){
      }
      if(isPrivatePage && !isLoggedIn) {
        try {
          return redirect('/login')
        }catch (ex) {
          console.error('redirect', ex)
        }
      }

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
