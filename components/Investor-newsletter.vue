<template>
  <section id="investornewsletter" v-if="$store.state.investorNewsletter" class="investornewsletter">
    <div class="investornewsletter__background">
      <!-- {{$store.state.investorNewsletter.data}} -->
      <b-container>
        <b-row>
          <b-col cols="12" sm="5" class="investornewsletter__background__col5">
            <div>
              <p class="subline subline--with-dash">
                {{ content.data.subline_text }}
              </p>
              <h2>{{ content.data.nl_heading }}</h2>
              <p>{{ content.data.nl_content }}</p>
            </div>
          </b-col>
          <b-col cols="12" sm="7" class="investornewsletter__background__col7">

            <b-alert :show="(alert.msg ? true : false)" :variant="alert.variant" v-html="alert.msg"/>
            <div class="formdiv formdiv--noborder formdiv--nopad">
              <ValidationObserver ref="form">
                <form @submit.prevent="onSubmit">
                  <div class="form-row flex-wrap">
                    <div class="item col item--one">
                      <ValidationProvider v-slot="{ errors }" name="title" rules="required">
                        <label for="title">Title*</label>
                        <br>
                        <select-wrapper>
                          <select id="title" v-model="formData.title" name="title" class="form-control">
                            <option
                              v-for="option in options"
                              :key="option.text"
                              :value="option.value"
                              :disabled="option.disable"
                            >
                              {{ option.text }}
                            </option>
                          </select>
                        </select-wrapper>
                        <label class="text-danger error">{{ errors[0] }}</label>
                      </ValidationProvider>
                    </div>
                    <div class="item col item--two">
                      <ValidationProvider v-slot="{ errors }" name="first_name" rules="required|alpha_spaces">
                        <label for="first_name">First name*</label>
                        <input
                          id="first_name"
                          v-model="formData.first_name"
                          name="first_name"
                          type="text"
                          class="form-control"
                          placeholder="First name"
                        >
                        <label class="text-danger error">{{ errors[0] }}</label>
                      </ValidationProvider>
                    </div>
                    <div class="item col item--three">
                      <ValidationProvider v-slot="{ errors }" name="last_name" rules="required|alpha_spaces">
                        <label for="last_name">Surname*</label>
                        <input
                          id="last_name"
                          v-model="formData.last_name"
                          name="last_name"
                          type="text"
                          class="form-control"
                          placeholder="Surname"
                        >
                        <label class="text-danger error">{{ errors[0] }}</label>
                      </ValidationProvider>
                    </div>
                  </div>
                  <div class="form-row divider-down">
                    <div class="col-md-6">
                      <ValidationProvider v-slot="{ errors }" name="company" rules="required">
                        <label for="company">Company*</label>
                        <input
                          id="company"
                          v-model="formData.company"
                          name="company"
                          type="text"
                          class="form-control"
                          placeholder="Company"
                        >
                        <label class="text-danger error">{{ errors[0] }}</label>
                      </ValidationProvider>
                    </div>
                    <div class="col-md-6">
                      <ValidationProvider v-slot="{ errors }" name="email" rules="required|email">
                        <label for="email">Email*</label>
                        <input
                          id="email"
                          v-model.trim="formData.email"
                          name="email"
                          type="email"
                          placeholder="Email"
                          class="form-control"
                        >
                        <label class="text-danger error">{{ errors[0] }}</label>
                      </ValidationProvider>
                    </div>
                  </div>
                  <div class="form-row submit">
                    <div class="col-md-9 text-left">
                      <ValidationProvider v-slot="{ errors }" name="agreed_terms"
                                          :rules="{required: { allowFalse: false } }">
                        <div class="form-check">
                          <div class="checkbox-animated">
                            <input id="agreed_terms" v-model="formData.agreed_terms" name="agreed_terms"
                                   type="checkbox">
                            <label for="agreed_terms">
                              <span class="check"/>
                              <span class="box"/>
                              * I agree that PATRIZIA SE may use my name and e-mail-address to send me a monthly newsletter on insights into European residential developments and trends.
                            </label>
                            <label class="text-danger error">{{ errors[0] }}</label>
                          </div>

                          <a href="https://www.patrizia.ag/en/privacy-policy/" title="PATRIZIA SE data protection policy" target="_blank" rel="noopener" class="data-protection-link">
                            {{getLabel('form_data_protection_information_text')}}
                          </a>
                        </div>
                      </ValidationProvider>
                    </div>
                    <div class="col-md-3 text-right">
                      <b-overlay
                        :show="busy"
                        roundedopacity="0.6"
                        spinner-smallspinner-variant="primary"
                        class="d-inline-block"
                      >
                        <form-button button-size="regular" button-style="primary primary--style1" label="SUBSCRIBE"/>
                      </b-overlay>
                    </div>
                  </div>
                </form>
              </ValidationObserver>
            </div>
          </b-col>
        </b-row>
      </b-container>
    </div>
  </section>
</template>

<script>
import axios from 'axios'
import {ValidationProvider, extend, ValidationObserver} from 'vee-validate'
// eslint-disable-next-line camelcase
import {required, email, alpha, alpha_spaces} from 'vee-validate/dist/rules'
import FormButton from '@/components/buttons/form-button'
import SelectWrapper from '@/components/inputs/select-wrapper'

extend('required', {
  ...required,
  message: 'This field is required'
})

extend('email', {
  ...email,
  message: 'This isn\'t a valid email address'
})

extend('alpha', {
  ...alpha,
  message: 'only alphabetic characters (without space)'
})

extend('alpha_spaces', {
  // eslint-disable-next-line camelcase
  ...alpha_spaces,
  message: 'only alphabetic characters (without space)'
})

export default {
  name: 'InvestorNewsletter',
  components: {SelectWrapper, FormButton, ValidationProvider, ValidationObserver},
  data() {
    return {
      content: this.$store.state.investorNewsletter,
      formData: {
        title: '',
        first_name: '',
        last_name: '',
        email: '',
        company: '',
        agreed_terms: false,
      },
      httpResponse: null,
      options: [
        {text: 'Select', value: '', disable: true},
        {text: 'Mr', value: 'Mr'},
        {text: 'Mrs', value: 'Mrs'},
        {text: 'Miss', value: 'Miss'},
        {text: 'Ms', value: 'Ms'},
        {text: 'Dr', value: 'Dr'}
      ],
      busy: false,
      alert: {
        msg: null,
        variant: 'success'
      }
    }
  },
  methods: {
    onSubmit() {
      // check here: https://logaretm.github.io/vee-validate/guide/forms.html#programmatic-access-with-refs
      this.$refs.form.validate().then((success) => {
        if (!success) {
          return
        }

        this.trackSuccessfulSubmission()

        const vm = this
        vm.busy = true
        // Then post the registration data
        axios.get(process.env.VUE_APP_BACKEND_URL + process.env.VUE_APP_SANCTUM_ENDPOINT + '/csrf-cookie', {withCredentials: true}).then((response) => {
          axios.post(process.env.VUE_APP_BACKEND_URL + process.env.VUE_APP_NEWSLETTER_URL, this.formData, {withCredentials: true})
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
    },
    /**
     * Send tracking data to xpose360 tracking
     */
    trackSuccessfulSubmission() {
      window.dataLayer = window.dataLayer || []
      dataLayer.push({
        'event': 'formSubmission',
        'formType': 'Newsletter',
      });
    },
    resetForm() {
      const self = this
      Object.keys(this.formData).forEach(function (key, index) {
        self.formData[key] = ''
      })
    },
    sucessAlert() {
      this.alert.msg = 'Thank you. You have been subscribed to the newsletter.'
      this.alert.variant = 'success'
    },
    errorAlert(errorData) {
      let errorMsg = null
      if (errorData.errors && errorData.errors.email) {
        errorMsg += `\r\n${errorData.errors.email[0]}`
      }
      this.alert.msg = errorMsg
      this.alert.variant = 'danger'
    }
  }
}
</script>

<style lang="scss">
.investornewsletter {
  &__background {
    position: relative;
    padding: 100px 0;
    background: rgb(255, 255, 255);
    background: linear-gradient(0deg, rgba(255, 255, 255, 0) 90%, rgba(34, 10, 16, 0.2) 100%);

    &__col5 {
      padding-right: 50px;

      p.subline, h2 {
        margin-bottom: 25px;
      }
    }
  }
}
</style>
