import AuthService from '@/services/auth-service'
import MetaDataService from '@/services/meta-data-service'
import Api from '@/services/api'
import axios from "axios";

export default {
  async trackPageView(app, route, store) {
    const isLoggedIn = AuthService.isUserLoggedin(app)
    const apiToken = AuthService.getApiToken(app)

    if (isLoggedIn && apiToken) {
      const fullPath = route.fullPath
      let pageTitle = ""
      if (store.state.prismicDoc) {
        pageTitle = MetaDataService.getPageTitle(store.state.prismicDoc)
      } else {
        MetaDataService.getPageTitleFromCityData(app)
      }
      const trackData = {
        'type': 'Page view',
        'title': pageTitle,
        'url': fullPath
      }
      // Send the tracking post to the API
      axios.post(process.env.VUE_APP_BACKEND_URL + process.env.VUE_APP_TRACKING_ENDPOINT, trackData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiToken}`
        }
      })
        .then(function (response) {
        })
        .catch(function (error) {
          console.error(error)
        })

    }
  }
}
