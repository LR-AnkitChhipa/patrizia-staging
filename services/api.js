import axios from 'axios'
import AuthService from "@/services/auth-service";

export default (app) => {
  let authToken = null
  let headers = {Accept: 'application/json'}
  if(app) {
    authToken = AuthService.getApiToken(app)
    headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`
    }
  }

  return axios.create({
    baseURL: process.env.VUE_APP_API_ENDPOINT,
    withCredentials: authToken ? true : false,
    headers: headers
  })
}
