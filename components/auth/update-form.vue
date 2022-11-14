<template>
  <div class="login">
    <h1>Update user details</h1>
    <ol>
      <li>Go login</li>
      <li>Copy the api token into the api token input below</li>
      <li>Click the get data button</li>
      <li>Update the user data</li>
      <li>Click the change details button</li>
    </ol>

    <p>
      API Token<br>
      <input v-model="apiToken" type="text" required>
    </p>

    <p>
      <button @click="getDetails">
        Get user details
      </button>
    </p>

    <p>
      Email address<br>
      <input v-model="userData.email" type="email">
    </p>
    <p>
      Title<br>
      <input v-model="userData.title" type="text">
    </p>
    <p>
      First name<br>
      <input v-model="userData.first_name" type="text">
    </p>
    <p>
      Last name<br>
      <input v-model="userData.last_name" type="text">
    </p>
    <p>
      Company name<br>
      <input v-model="userData.company" type="text">
    </p>
    <p>
      <button @click="update">
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
  name: 'UpdateForm',
  data () {
    return {
      userData: {},
      httpResponse: null,
      apiToken: null
    }
  },
  methods: {
    /**
     * register
     */
    getDetails () {
      const vm = this
      // Get the user data
      axios.get(process.env.VUE_APP_BACKEND_URL + '/api/user/details', {
        withCredentials: true,
        headers: {
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
    },
    update () {
      const vm = this
      // post the user data
      axios.post(process.env.VUE_APP_BACKEND_URL + '/api/user/update', this.userData, {
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
