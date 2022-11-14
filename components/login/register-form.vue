<template>
  <div id="register">
    <div>
      <p class="subline subline--with-dash" v-if="slice.primary.form_subline">
        {{ slice.primary.form_subline }}
      </p>
      <h2 class="register__title" v-if="slice.primary.form_title">{{ slice.primary.form_title }}</h2>
      <p class="register__notice"
         v-if="getLabel('institutional_investors_only_notice')">
        {{ getLabel('institutional_investors_only_notice') }}
      </p>
    </div>
    <b-alert :show="(alert.msg ? true : false)" :variant="alert.variant" v-html="alert.msg"/>

    <div class="formdiv formdiv--noborder formdiv--nopad">
      <ValidationObserver ref="form">
        <form @submit.prevent="onSubmit">
          <div class="form-row flex-wrap">
            <div class="item col item--one mb-3">
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
            <div class="item col item--two mb-3">
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
            <div class="item col item--three mb-3">
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
            <div class="col-md-6 mb-3">
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
            <div class="col-md-6 mb-3">
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
            <div class="col-md-9 mb-3 text-left">
              <ValidationProvider v-slot="{ errors }" name="agreed_terms" :rules="{required: { allowFalse: false } }">
                <div class="form-check">
                  <div class="checkbox-animated">
                    <input id="agreed_terms" v-model="formData.agreed_terms" name="agreed_terms" type="checkbox">
                    <label for="agreed_terms">
                      <span class="check"/>
                      <span class="box"/>
                      I agree that Patrizia SE may use my name and e-mail address to contact me on the topic of the
                      query.
                    </label>
                    <label class="text-danger error" v-if="errors[0]">{{ errors[0] }}</label>
                  </div>
                  <a href="https://www.patrizia.ag/en/privacy-policy/" title="PATRIZIA SE data protection policy"
                     target="_blank" rel="noopener" class="data-protection-link">
                    {{ getLabel('form_data_protection_information_text') }}
                  </a>
                </div>
              </ValidationProvider>
            </div>
            <div class="col-md-9 mb-3 text-left">
              <ValidationProvider name="agreed_monitoring">
                <div class="form-check">
                  <div class="checkbox-animated">
                    <input id="agreed_monitoring" v-model="formData.agreed_monitoring" name="agreed_terms"
                           type="checkbox">
                    <label for="agreed_monitoring">
                      <span class="check"/>
                      <span class="box"/>
                      I agree to Patrizia SE monitoring my activity on this website including the pages I visit and my
                      interactions with the website through the use of cookies. Patrizia SE may use this information to
                      understand your interests on the City Pulse website in order to be able to send you customised
                      marketing material based on your interests on a monthly basis. Duration of the cookies is 1 month.
                    </label>
                  </div>
                </div>
              </ValidationProvider>
            </div>

            <!--            Learn more-->
            <div
              :class="`col-md-9 mb-3 text-left register__learn-more ${isLearnMoreOpen ? 'register__learn-more--open' : ''}`"
              v-if="slice.primary.learn_more_title">
              <a href="#" @click.prevent="isLearnMoreOpen = !isLearnMoreOpen">{{ slice.primary.learn_more_title }}</a>
              <div class="register__learn-more__content" v-if="isLearnMoreOpen">
                <prismic-rich-text :field="slice.primary.learn_more_text"/>
              </div>
            </div>
            <!--            /Learn more-->

            <div class="col-md-3 mb-3 text-right">
              <b-overlay
                :show="busy"
                roundedopacity="0.6"
                spinner-smallspinner-variant="primary"
                class="d-inline-block"
              >
                <form-button button-size="regular" button-style="primary primary--style1" label="APPLY"/>
              </b-overlay>
            </div>
          </div>
        </form>
      </ValidationObserver>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import {ValidationProvider, extend, ValidationObserver} from 'vee-validate'
// eslint-disable-next-line camelcase
import {required, email, alpha, alpha_spaces} from 'vee-validate/dist/rules'
import AuthService from '@/services/auth-service'
import FormButton from '@/components/buttons/form-button'
import SelectWrapper from "@/components/inputs/select-wrapper";

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
  name: 'Register',
  components: {SelectWrapper, FormButton, ValidationProvider, ValidationObserver},
  props: {
    slice: {
      type: Object,
      default() {
        return null
      }
    }
  },
  data() {
    return {
      isLearnMoreOpen: false,
      formData: {
        name: 'Patrizia User',
        title: '',
        gender: 'Mr',
        first_name: '',
        last_name: '',
        email: '',
        company: '',
        agreed_terms: null,
        agreed_monitoring: null,
        password: '1234567890',
        password_confirmation: '1234567890',
        device_name: 'vue_app'
      },
      httpResponse: null,
      apiToken: null,
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
  middleware: 'auth',
  computed: {
    userLoggedIn() {
      return AuthService.isUserLoggedin(this)
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
      this.alert.msg = 'Thank you. We have received your application.'
      this.alert.variant = 'success'
    },
    errorAlert(errorData) {
      let errorMsg = null
      if (errorData.errors && errorData.errors.email) {
        errorMsg += `\r\n${errorData.errors.email[0]}`
      }
      this.alert.msg = errorMsg
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
          axios.post(process.env.VUE_APP_BACKEND_URL + process.env.VUE_APP_AUTH_REGISTER_URL, this.formData, {withCredentials: true})
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
.register {
  &__title {
    margin-bottom: 20px;
  }

  &__notice {
    margin-bottom: 40px;
  }

  &__learn-more {
    a {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-bottom: 11px;
      border-bottom: 1px solid #F0EDEE;

      &:after {
        content: '';
        width: 16px;
        height: 16px;
        background: {
          image: url("~@/static/images/icon-plus.svg");
          position: center;
          size: contain;
          repeat: no-repeat;
        };
      }
    }

    &--open {
      a {
        color: #f29131;
      }

      a:after {
        background-image: url("~@/static/images/icon-minus.svg");
      }
    }

    &__content {
      padding: 24px 0;

    }
  }
}

</style>
