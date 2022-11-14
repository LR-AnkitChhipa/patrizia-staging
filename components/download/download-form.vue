<template>
  <div class="d-form">
    <div class="topbanner">
      <div class="topbanner__overlay"/>
      <div class="topbanner__inner-content">
        <p class="subline">{{ slice.primary.download_form_subline }}</p>
        <h2>{{ slice.primary.download_form_title }}</h2>
      </div>
    </div>
    <div class="formdiv" v-if="isUserLoggedIn || isDirectDownloadLink">
      <prismic-rich-text v-if="isUserLoggedIn && slice.primary.logged_in_user_report_download_content"
                         :field="slice.primary.logged_in_user_report_download_content"/>
      <a @click="trackDownload()" :href="reportDownloadUrl" target="download-report"
         :title="slice.primary.download_button_text"
         class="p-btn primary primary--style1 regular" data-v-3c32edbc="" data-v-3d52f39d="">
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="36" viewBox="0 0 12 36" class="left"
             data-v-3c32edbc="">
          <path id="Path_128" data-name="Path 128" d="M12-24.045,0-6,0-42Z" transform="translate(0 42)" fill="#f29131"
                data-v-3c32edbc=""></path>
        </svg>
        <span class="text" data-v-3c32edbc="">{{ slice.primary.download_button_text }}</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="5.043" height="9.664" viewBox="0 0 5.043 9.664" class="right"
             data-v-3c32edbc="">
          <path id="Path_127" data-name="Path 127" d="M0,0,4,4.5,0,9" transform="translate(0.374 0.332)" fill="none"
                stroke="#fff" stroke-width="1" data-v-3c32edbc=""></path>
        </svg>
      </a>
    </div>
    <div class="formdiv" v-else-if="submitted">
      <prismic-rich-text v-if="slice.primary.form_submitted_content"
                         :field="slice.primary.form_submitted_content"/>
    </div>
    <div class="formdiv" v-else>
      <b-alert :show="(alert.msg ? true : false)" dismissible fade :variant="alert.variant" v-html="alert.msg"/>
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
            <div class="col-md-8 text-left">
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
                    <label class="text-danger error">{{ errors[0] }}</label>
                  </div>
                  <a href="https://www.patrizia.ag/en/privacy-policy/" title="PATRIZIA SE data protection policy"
                     target="_blank" rel="noopener" class="data-protection-link">
                    {{ getLabel('form_data_protection_information_text') }}
                  </a>
                </div>
              </ValidationProvider>
            </div>
            <div class="col-md-4 text-right">
              <b-overlay
                :show="busy"
                roundedopacity="0.6"
                spinner-smallspinner-variant="primary"
                class="d-inline-block"
              >
                <form-button button-size="regular" button-style="primary primary--style1" label="DOWNLOAD"/>
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
import SelectWrapper from '@/components/inputs/select-wrapper'
import ButtonLink from "@/components/buttons/button-link";

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
  name: 'DownloadForm',
  // eslint-disable-next-line vue/no-unused-components
  components: {ButtonLink, SelectWrapper, FormButton, ValidationProvider, ValidationObserver},
  props: {
    slice: {
      type: Object,
      default() {
        return {}
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
      submitted: false,
      formData: {
        name: 'Patrizia User',
        title: '',
        gender: 'Mr',
        first_name: '',
        last_name: '',
        email: '',
        company: '',
        agreed_terms: null,
        password: '1234567890',
        password_confirmation: '1234567890',
        device_name: 'vue_app',
        download_name: this.slice.primary.download_internal_name ?? null,
        download_url: this.$route.fullPath ?? null,
        // We also send the email content from the CMS to the back end so we can include
        // The contnet in the email to the user
        email_content: this.getEmailContent()
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
    isDirectDownloadLink() {
      if (this.$route.query.direct) {
        return true
      }
      return false
    },
    reportDownloadUrl() {
      try {
        return this.slice.primary.download_button_link.url ?? process.env.VUE_APP_REPORT_PDF_URL
      } catch (ex) {
        console.error('Error getting download URL')
      }
      return process.env.VUE_APP_REPORT_PDF_URL
    },
    userLoggedIn() {
      return AuthService.isUserLoggedin(this)
    }
  },
  methods: {
    /**
     * Track click of the download buttons
     */
    trackDownload() {
      // Analytics push
      window.dataLayer = window.dataLayer || []
      window.dataLayer.push({'event': 'download-report', 'formType': 'loggedin',})
    },
    /**
     * This is used to get an object of email
     * content for sending to store in the back end
     */
    getEmailContent() {
      try {
        return {
          subject: this.slice.primary.email_subject ?? null,
          content: this.slice.primary.email_content ?? null,
          button_text: this.slice.primary.email_button_text ?? null
        }
      } catch (ex) {
        console.error('Error getting email content object', ex)
      }
      return null
    },

    resetForm() {
      const self = this
      Object.keys(this.formData).forEach(function (key, index) {
        self.formData[key] = ''
      })
    },
    sucess() {
      this.submitted = true
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

        // Analytics datalayer push
        window.dataLayer = window.dataLayer || []
        dataLayer.push({'event': 'download-report', 'formType': 'register',});

        const vm = this
        vm.busy = true

        axios.get(process.env.VUE_APP_BACKEND_URL + process.env.VUE_APP_SANCTUM_ENDPOINT + '/csrf-cookie', {withCredentials: true}).then((response) => {
          // Then post the registration data
          axios.post(process.env.VUE_APP_BACKEND_URL + process.env.VUE_APP_DOWNLOAD_URL, this.formData, {withCredentials: true})
            .then(function (response) {
              vm.httpResponse = response
              // auto-login starts
              vm.apiToken = response.data
              // Loading False
              vm.busy = false

              // Success msg
              vm.sucess()
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

<style lang="scss" scoped>
.d-form {
  -webkit-box-shadow: 5px 20px 40px 0px rgba(0, 0, 0, 0.15);
  -moz-box-shadow: 5px 20px 40px 0px rgba(0, 0, 0, 0.15);
  box-shadow: 5px 20px 40px 0px rgba(0, 0, 0, 0.15);

  .topbanner {
    background: url('~@/assets/img/city-download.jpg') no-repeat;
    background-position: center;
    background-size: cover;
    position: relative;
    padding: 30px;
    overflow: hidden;

    &__overlay {
      width: 100%;
      height: 100%;
      background: rgb(164, 73, 147);
      background: linear-gradient(0deg, rgba(164, 73, 147, 0.30015756302521013) 0%, rgba(164, 73, 147, 0.6979166666666667) 100%);
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      z-index: 0;
      opacity: 0;
    }

    &__inner-content {
      position: relative;
      z-index: 2;
      text-align: left;

      p.subline, h2 {
        color: #fff;
      }

      h2 {
        margin-bottom: 0;
      }
    }
  }
}

</style>
