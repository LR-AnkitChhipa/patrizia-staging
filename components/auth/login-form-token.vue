<template>
  <div class="login">
    <h1>Login and get an API token</h1>
    <p>
      Email address<br>
      <input v-model="formData.email" type="email">
    </p>
    <p>
      Password<br>
      <input v-model="formData.password" type="password">
    </p>
    <p>
      Device name<br>
      <input v-model="formData.device_name" type="device_name" readonly>
    </p>
    <p>
      <button @click="login">
        Login
      </button>
    </p>
    <h3>Send a test response with the token in the Authorization header as a Bearer token</h3>
    <p>Make sure to log in above first!</p>
    <button @click="testApi">
      Send test API response
    </button>
    <hr>
    The User token has value:
    <input v-model="apiToken" type="text">
    <hr>
    The response data object:
    <pre>
      {{ loginResponse }}
    </pre>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'LoginFormToken',
  data () {
    return {
      formData: {
        email: null,
        password: null,
        device_name: 'vue_app'
      },
      loginResponse: null,
      apiToken: null
    }
  },
  methods: {
    /**
     * Log in?
     */
    login () {
      const vm = this
      axios.post(process.env.VUE_APP_BACKEND_URL + process.env.VUE_APP_AUTH_LOGIN_URL_TOKEN, this.formData, { withCredentials: true })
        .then(function (response) {
          vm.loginResponse = response
          vm.apiToken = response.data
        })
        .catch(function (error) {
          vm.loginResponse = error
        })
    },
    testApi () {
      const vm = this
      axios.get(process.env.VUE_APP_BACKEND_URL + process.env.VUE_APP_TEST_AUTH_TOKEN, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${vm.apiToken}`
        }
      })
        .then(function (response) {
          vm.loginResponse = response
        })
        .catch(function (error) {
          vm.loginResponse = error
        })
    }
  }
}
</script>

<style scoped>
.login {
  margin: 20px;
}
</style>
