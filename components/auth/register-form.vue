<template>
  <div class="login">
    <p>
      Email address<br>
      <input v-model="formData.email" type="email">
    </p>
    <p>
      Title<br>
      <input v-model="formData.title" type="text">
    </p>
    <p>
      First name<br>
      <input v-model="formData.first_name" type="text">
    </p>
    <p>
      Last name<br>
      <input v-model="formData.last_name" type="text">
    </p>
    <p>
      Company name<br>
      <input v-model="formData.company" type="text">
    </p>
    <p>
      Password (<small>Min 8 chars)</small><br>
      <input v-model="formData.password" type="text">
    </p>
    <p>
      Password confirmation<br>
      <input v-model="formData.password_confirmation" type="text">
    </p>

    <p>
      <button @click="register">
        Register
      </button>
    </p>
    <hr>
    The formData data object:
    <pre>
      {{ formData }}
    </pre>
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
  name: 'RegisterForm',
  data () {
    return {
      formData: {
        name: 'Patrizia User',
        email: 'test@example.com',
        gender: 'Male',
        agreed_terms: true,
        password: 'asdasdasd',
        password_confirmation: 'asdasdasd',
        title: 'Mr.',
        first_name: 'Patrizia',
        last_name: 'User',
        company: 'Patrizia SE'
      },
      httpResponse: null
    }
  },
  methods: {
    /**
     * register
     */
    register () {
      // First get an XSRF token
      const vm = this
      axios.get(process.env.VUE_APP_BACKEND_URL + process.env.VUE_APP_SANCTUM_ENDPOINT + '/csrf-cookie', { withCredentials: true }).then((response) => {
        // Then post the registration data
        axios.post(process.env.VUE_APP_BACKEND_URL + process.env.VUE_APP_AUTH_REGISTER_URL, this.formData, { withCredentials: true })
          .then(function (response) {
            vm.httpResponse = response
          })
          .catch(function (error) {
            vm.httpResponse = error
          })
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
