<template>
  <div class="login">
    <h1>Update user password</h1>
    <ol>
      <li>
        Go to <nuxt-link to="/auth/login-token">
          Login
        </nuxt-link>
      </li>
      <li>Copy the api token into the api token input below</li>
      <li>Enter a new password</li>
      <li>Click the update password button</li>
    </ol>

    <p>
      API Token<br>
      <input v-model="apiToken" type="text" required>
    </p>

    <p>
      Password<br>
      <input v-model="password" type="email">
    </p>

    <p>
      <button @click="updatePassword">
        Update
      </button>
    </p>
    <hr>
    The HTTP response:
    <pre>
      {{ httpResponse }}
    </pre>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'UpdatePasswordForm',
  data () {
    return {
      password: null,
      httpResponse: null,
      apiToken: null
    }
  },
  methods: {
    updatePassword () {
      const vm = this
      // post the user data
      axios.post(process.env.VUE_APP_BACKEND_URL + '/api/user/update/password', { password: this.password }, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${vm.apiToken}`
        }
      })
        .then(function (response) {
          vm.httpResponse = response
          vm.userData = response.data
        })
        .catch(function (error) {
          vm.httpResponse = error
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
