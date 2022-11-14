<template>
  <div class="nameupdate">
    <div class="nameupdate__content">
      <div class="nameupdate__content__form-details">
        <span v-if="showErrorMsg">
          <div class="error-box">
            <img src="@/assets/img/error-icon-form.png" alt="">
            <p>Your new passwords do not match</p>
          </div>
        </span>
<!--        <p class="mb-5">-->
<!--          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum-->
<!--        </p>-->
        <div class="nameupdate__content__form-details__form">
          <div class="box__text">
            <ValidationObserver ref="nameUpdate">
              <form @submit.prevent="onUpdate">
                <div class="form-row flex-wrap">
                  <div class="item col item mb-3">
                    <ValidationProvider v-slot="{ classes }" :bails="false" name="password" rules="required|min:8|confirmed:confirmation">
                      <label :class="classes" for="password">NEW PASSWORD</label>
                      <input
                        id="password"
                        v-model.trim="password"
                        name="password"
                        type="text"
                        class="form-control"
                        :class="classes"
                        placeholder=".........."
                      >
                    </ValidationProvider>
                  </div>
                  <div class="item col item mb-3">
                    <ValidationProvider v-slot="{ classes }" :bails="false" rules="required|min:8" vid="confirmation">
                      <label :class="classes" for="email">RE-ENTER NEW PASSWORD</label>
                      <input
                        id="password_confirmation"
                        v-model.trim="password_confirmation"
                        name="password_confirmation"
                        type="text"
                        :class="classes"
                        class="form-control"
                        placeholder=".........."
                      >
                    </ValidationProvider>
                  </div>
                </div>
                <div class="box__button">
                  <span @click="onCancel">
                    <text-link @click.stop.prevent text="Cancel" link-style="primary" />
                  </span>
                  <b-overlay :show="busy" roundedopacity="0.6" spinner-smallspinner-variant="primary" class="d-inline-block">
                    <form-button @click.stop.prevent btntype="submit" button-size="regular" button-style="primary primary--style1" label="UPDATE" />
                  </b-overlay>
                </div>
              </form>
            </validationobserver>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { ValidationProvider, extend, ValidationObserver, configure } from 'vee-validate'
import { required, min, confirmed } from 'vee-validate/dist/rules'
import FormButton from '@/components/buttons/form-button'
import TextLink from '@/components/text-link'
import AuthService from '@/services/auth-service'

extend('required', {
  ...required,
  message: 'Your new passwords do not match'
})

extend('min', {
  ...min,
  message: 'Min 8 characters required'
})

extend('confirmed', {
  ...confirmed,
  message: 'Your new passwords do not match'
})

configure({
  classes: {
    valid: 'is-valid',
    invalid: ['is-invalid', 'errorborder', 'errortext']
  }
})

export default {
  name: 'Emailupdate',
  components: { FormButton, TextLink, ValidationProvider, ValidationObserver },
  data () {
    return {
      password: '',
      password_confirmation: '',
      apiToken: AuthService.getApiToken(this),
      error: false,
      busy: false,
      showErrorMsg: false
    }
  },
  methods: {
    resetForm () {
      const self = this
      Object.keys(this.formData).forEach(function (key, index) {
        self.formData[key] = ''
      })
    },
    onUpdate () {
      this.$refs.nameUpdate.validate().then((success) => {
        if (!success) {
          this.showErrorMsg = true
          return
        }
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
        // Resetting Values
        // vm.resetForm()
        this.showErrorMsg = false
        vm.$emit('updateButtonClicked')

        // Wait until the models are updated in the UI
        vm.$nextTick(() => {
          vm.$refs.nameUpdate.reset()
          this.$router.push('/user-account')
        })
      })
    },
    onCancel () {
      const vm = this
      vm.$emit('cancelButton')
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
