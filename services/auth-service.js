import axios from 'axios'

export default {

  isUserLoggedin (app) {
    const authToken = app.$cookies.get('lcauth')

    if (authToken) {
      return true
    } else {
      return false
    }
  },

  getApiToken (app) {
    const authToken = app.$cookies.get('lcauth')
    return (authToken) || null
  },

  logout (app) {
    app.$cookies.remove('lcauth')
  },

  async isUserApproved (app) {
    if (this.isUserLoggedin(app)) {
      const userDetails = await this.getUserDetails(app)
      return (userDetails.approval_status === 'approved') ? true : false
    } else {
      return false
    }
  },

  async getUserDetails (app) {
    const authToken = app.$cookies.get('lcauth')
    const response = await axios.get(process.env.VUE_APP_BACKEND_URL + process.env.VUE_APP_API_USER_DETAILS, {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`
      }
    })
    return response.data
  }
}
