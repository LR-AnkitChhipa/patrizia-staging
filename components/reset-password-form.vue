<template>
  <div class="divmargin">
    <b-container>
      <b-row>
        <b-col cols="12" md="8" lg="6">
          <div id="register" class="password-reset-form">
            <div>
              <p class="subline subline--with-dash" v-if="slice.primary.reset_password_form_subline">
                {{ slice.primary.reset_password_form_subline }}
              </p>
              <h2 v-if="slice.primary.reset_password_form_title" class="register__title">{{ slice.primary.reset_password_form_title }}</h2>
              <prismic-rich-text :field="slice.primary.reset_password_form_content" />
            </div>
            <b-alert :show="(alert.msg ? true : false)" :variant="alert.variant" v-html="alert.msg"/>

            <div class="formdiv formdiv--noborder formdiv--nopad">
              <ValidationObserver ref="form">
                <form @submit.prevent="onSubmit">
                  <div class="form-row flex-wrap">
                    <div class="item col item--two mb-3">
                      <ValidationProvider v-slot="{ errors }" name="email" rules="required|email">
                        <label for="email">Email address</label>
                        <input
                          id="email"
                          v-model="formData.email"
                          name="email"
                          type="email"
                          class="form-control"
                          placeholder="Email address"
                          readonly
                        >
                        <label class="text-danger error">{{ errors[0] }}</label>
                      </ValidationProvider>
                    </div>
                  </div>
                  <div class="form-row divider-down">
                    <div class="col-md-6 mb-3">
                      <ValidationProvider v-slot="{ errors }" name="password" rules="min:8|confirmed:@password_confirmation">
                        <label for="password">Password*</label>
                        <input
                          v-model.trim="formData.password"
                          id="password"
                          name="password"
                          type="password"
                          placeholder="Password"
                          class="form-control"
                        >
                        <label class="text-danger error">{{ errors[0] }}</label>
                      </ValidationProvider>
                    </div>
                    <div class="col-md-6 mb-3">
                      <ValidationProvider vid="password_confirmation" v-slot="{ errors }" name="password_confirmation" rules="min:8">
                        <label for="password_confirmation">Password confirmation*</label>
                        <input
                          id="password_confirmation"
                          v-model.trim="formData.password_confirmation"
                          name="password_confirmation"
                          type="password"
                          placeholder="Confirm password"
                          class="form-control"
                        >
                        <label class="text-danger error">{{ errors[0] }}</label>
                      </ValidationProvider>
                    </div>
                  </div>
                  <div class="form-row submit">
                    <div class="col-md-12 mb-3">
                      <b-overlay
                        :show="busy"
                        roundedopacity="0.6"
                        spinner-smallspinner-variant="primary"
                        class="d-inline-block"
                      >
                        <form-button button-size="regular" button-style="primary primary--style1" label="Reset password"/>
                      </b-overlay>
                    </div>
                  </div>
                </form>
              </ValidationObserver>
            </div>
          </div>

        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import axios from 'axios'
import {ValidationProvider, extend, ValidationObserver} from 'vee-validate'
// eslint-disable-next-line camelcase
import {required, min, email, confirmed} from 'vee-validate/dist/rules'
import AuthService from '@/services/auth-service'
import FormButton from '@/components/buttons/form-button'
import SelectWrapper from "@/components/inputs/select-wrapper";

extend('confirmed', {
  params: ['target'],
  validate(value, { target }) {
    return value === target;
  },
  message: 'Password confirmation does not match'
});

extend('min', {
  ...required,
  message: 'Your password must be at least 8 characters long'
})

extend('required', {
  ...required,
  message: 'This field is required'
})

extend('email', {
  ...email,
  message: 'This isn\'t a valid email address'
})

export default {
  name: "reset-password-form",
  components: {FormButton, AuthService, SelectWrapper, ValidationObserver, ValidationProvider},
  props: {
    slice: {
      type: Object,
      default() {
        return {
          primary: {}
        }
      }
    },
    sliceIndex: {
      type: Number,
      default() {
        return 0
      }
    }
  },
  data() {
    return {
      formData: {
        email: this.$route.query.email,
        password: null,
        password_confirmation: null,
        token: this.$route.query.token
      },
      busy: false,
      alert: {
        msg: null,
        variant: 'success'
      }
    }
  },
  methods: {
    resetForm() {
      const self = this
      Object.keys(this.formData).forEach(function (key, index) {
        self.formData[key] = ''
      })
    },
    sucessAlert() {
      this.alert.msg = 'Your password has been reset.&nbsp;<a href="/login" title="Log in">Click here to log in</a>'
      this.alert.variant = 'success'
    },
    errorAlert(errorData) {
      let errorMsg = null
      console.error(errorData)
      this.alert.msg = 'There was an error resetting your password.'
      this.alert.variant = 'danger'
    },
    onSubmit() {
      // check here: https://logaretm.github.io/vee-validate/guide/forms.html#programmatic-access-with-refs
      this.$refs.form.validate().then((success) => {
        if (!success) {
          return
        }

        const vm = this
        vm.busy = true
        axios.get(process.env.VUE_APP_BACKEND_URL + process.env.VUE_APP_SANCTUM_ENDPOINT + '/csrf-cookie', {withCredentials: true}).then((response) => {
          // Then post the registration data
          axios.post(process.env.VUE_APP_BACKEND_URL + '/reset-password', this.formData, {withCredentials: true})
            .then(function (response) {
              vm.httpResponse = response
              // auto-login starts
              vm.apiToken = response.data
              // Loading False
              vm.busy = false

              // Success msg
              vm.sucessAlert()
              // Form Reset function
              vm.resetForm()
            })
            .catch(function (error) {
              vm.httpResponse = error.response
              vm.busy = false
              vm.errorAlert(error.response.data)
              vm.resetForm()
            })
        })

        // Wait until the models are updated in the UI
        this.$nextTick(() => {
          this.$refs.form.reset()
        })
      })
    }
  }
}
</script>

<style lang="scss">
.password-reset-form {
  margin: 32px 0;
}
</style>
