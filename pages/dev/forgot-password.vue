<template>
<div>
  <form @submit.prevent="submit">
    Email address
    <input v-model="emailAddress" />
    <input type="submit" value="Submit"/>
  </form>
  <hr>
  <pre>{{httpResponse}}</pre>
</div>
</template>

<script>
import axios from "axios";

export default {
  name: "forgot-password",
  data() {
    return {
      emailAddress: null,
      httpResponse: {}
    }
  },
  methods: {
    submit() {
      const vm = this
      // vm.busy = true
      axios.get(process.env.VUE_APP_BACKEND_URL + process.env.VUE_APP_SANCTUM_ENDPOINT + '/csrf-cookie', {withCredentials: true}).then((response) => {
        // Then post the registration data
        axios.post(process.env.VUE_APP_BACKEND_URL + '/forgot-password', {email: this.emailAddress}, {withCredentials: true})
          .then(function (response) {
            vm.httpResponse = response

            // Success msg
            // vm.sucess()
            // Form Reset function
            // vm.resetForm()
          })
          .catch(function (error) {
            vm.httpResponse = error.response
            // vm.busy = false
            // vm.errorAlert(error.response.data)
            // vm.resetForm()
          })
      })
    }
  }
}
</script>

<style scoped>

</style>
