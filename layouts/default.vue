<template>
  <div :class="layoutClass">
    <transition name="fade">
      <nuxt/>
    </transition>
  </div>
</template>

<script>
import AuthService from "@/services/auth-service";
import axios from "axios";

export default {
  data() {
    return {
      layoutClass: null
    }
  },
  mounted() {
    this.layoutClass = `browser-is-${this.browserName} ${!this.isBrowserSafari() ? 'browser-is-not-safari' : ''}`
  },
  async middleware({store, $prismic, app, route}) {

    if(!store.state.menus) {
      await store.dispatch('fetchAllMenus', $prismic)
    }
    if(!store.state.nextStepsBlock) {
      await store.dispatch('fetchNextStepsBlock', $prismic)
    }
    // Fetch latest insights
    if(!store.state.featuredInsightsArticles && !store.state.insightsArticles) {
      await store.dispatch('fetchLatestInsights', {prismic: $prismic})
    }
    // Fetch Investor Newsletter Block
    if(!store.state.investorNewsletter) {
      await store.dispatch('fetchInvestorNewsletter', {prismic: $prismic})
    }
    if(!store.state.footerDownloadCta) {
      await store.dispatch('fetchFooterDownloadCta', {prismic: $prismic})
    }
    // Global content
    if(!store.state.globalContent) {
      await store.dispatch('fetchGlobalContent', {prismic: $prismic})
    }
    if (!store.state.prismicDocs) {
      await store.dispatch('fetchDeepLinkedDocuments', { prismic: $prismic })
    }

    // Get logged in user details
    const apiToken = AuthService.getApiToken(app)
    if(apiToken && !store.state.userdata) {
      const vm = app
      // Get the user data
      await axios.get(process.env.VUE_APP_BACKEND_URL + '/api/user/details', {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${apiToken}`
        }
      })
        .then(function (response) {
          vm.httpResponse = response
          vm.userData = response
          const userData = response.data
          store.commit('USER_DATA', userData)
        })
        .catch(function (error) {
          vm.httpResponse = error
        })
    }
  },
  methods: {
    // async getUserDetails () {
    //
    // }
  }
}
</script>
