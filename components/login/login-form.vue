<template>
  <div id="loginform">
    <div class="topbanner">
      <div class="topbanner__overlay" />
      <div class="topbanner__inner-content">
        <p class="subline">
          REGISTERED MEMBERS
        </p>
        <h2>City Index Login</h2>
      </div>
    </div>
    <div class="formdiv">
      <b-alert :show="alertVisible" variant="danger">
        Please check your email address and password.
      </b-alert>
      <ValidationObserver ref="login">
        <b-form @submit.prevent="login">
          <ValidationProvider v-slot="{ classes, errors }" :bails="true" name="email-login" rules="required|email">
            <b-form-group id="email-login" :class="classes" label="Username" label-for="email-login">
              <b-form-input
                id="email-login"
                v-model="loginData.email"
                :class="classes"
                name="email-login"
                type="email"
                placeholder="Email"
              />
              <span v-if="errors[0]">
                <div class="error-box">
                  <img src="@/assets/img/error-icon-form.png" alt="">
                  <p>{{ errors[0] }}</p>
                </div>
              </span>
            </b-form-group>
          </ValidationProvider>
          <ValidationProvider v-slot="{ classes, errors }" :bails="true" name="password" rules="required">
            <b-form-group id="password" :class="classes" label="Password" label-for="password">
              <b-form-input
                id="password"
                v-model="loginData.password"
                :class="classes"
                name="password"
                type="password"
                placeholder="....."
              />
              <span v-if="errors[0]">
                <div class="error-box">
                  <img src="@/assets/img/error-icon-form.png" alt="">
                  <p>{{ errors[0] }}</p>
                </div>
              </span>
            </b-form-group>
          </ValidationProvider>

          <div class="btns">
            <text-link url="/forgotten-password" text="Forgotten password?" link-style="primary" />
            <b-overlay :show="busy" roundedopacity="0.6" spinner-smallspinner-variant="primary" class="d-inline-block">
              <form-button btntype="submit" button-size="regular" button-style="primary primary--style1" label="LOGIN" :disabled="userLoggedIn" />
            </b-overlay>
          </div>
        </b-form>
      </ValidationObserver>
    </div>
  </div>
</template>

<script>

import axios from 'axios'
import { ValidationProvider, extend, ValidationObserver, configure } from 'vee-validate'
import { required, email, alpha } from 'vee-validate/dist/rules'
import AuthService from '@/services/auth-service'
import FormButton from '@/components/buttons/form-button'
import TextLink from '@/components/text-link'

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
configure({
  classes: {
    valid: 'is-valid',
    invalid: 'is-invalid'
  }
})

export default {
  name: 'Login',
  components: { FormButton, TextLink, ValidationProvider, ValidationObserver },
  props: {
    slice: {
      type: Object,
      default() {
        return null
      }
    }
  },
  data () {
    return {
      loginData: {
        email: '',
        password: '',
        device_name: 'vue_app'
      },
      loginResponse: null,
      apiToken: null,
      busy: false,
      alertVisible: false
    }
  },
  middleware: 'auth',
  computed: {
    userLoggedIn () {
      return AuthService.isUserLoggedin(this)
    }
  },
  methods: {
    resetForm () {
      const self = this
      Object.keys(this.loginData).forEach(function (key, index) {
        self.loginData[key] = ''
      })
      self.loginData.device_name = 'vue_app'
    },
    login () {
      // check here: https://logaretm.github.io/vee-validate/guide/forms.html#programmatic-access-with-refs
      this.$refs.login.validate().then((success) => {
        if (!success) {
          return
        }

        const vm = this
        vm.busy = true
        axios.post(process.env.VUE_APP_BACKEND_URL + process.env.VUE_APP_AUTH_LOGIN_URL_TOKEN, this.loginData, { withCredentials: true })
          .then(function (response) {
            vm.loginResponse = response
            vm.apiToken = response.data
            vm.busy = false
            vm.resetForm()
            const auth = {
              accessToken: vm.apiToken
            }
            vm.$store.commit('setAuth', auth) // mutating to store for client rendering
            vm.$cookies.set('lcauth', auth.accessToken, {maxAge: 31536000})
            vm.$router.push('/city-analysis')
          })
          .catch(function (error) {
            vm.loginResponse = error
            vm.busy = false
            vm.alertVisible = true
            vm.resetForm()
          })

        // Wait until the models are updated in the UI
        this.$nextTick(() => {
          this.$refs.login.reset()
        })
      })
    }
  }
}
</script>

<style lang="scss">
#loginform{
    -webkit-box-shadow: 5px 20px 40px 0px rgba(0,0,0,0.15);
    -moz-box-shadow: 5px 20px 40px 0px rgba(0,0,0,0.15);
    box-shadow: 5px 20px 40px 0px rgba(0,0,0,0.15);
    .formdiv{
        border: 1px solid #F0EDEE;
        border-top: none;
        padding: 30px;
        background: #fff;
        .form-group{
            label{
                font-family: 'Corporate S Pro bold';
                font-size: 14px;
                color: #802437;
                text-transform: uppercase;
                letter-spacing: .8px;
            }
            input.form-control{
                border-color: #E1DBDD;
                border-radius: 0px;
                box-shadow: none;
                color: #802437;
                outline: none;
                font-size: 14px;
                line-height: 17px;
                height: 45px;
                font-family: 'Corporate S Pro';
                &:focus{
                  box-shadow: none;
                  outline: none;
                  border-color: #F29131;
                  background: none;
                }
            }
            &.is-invalid{
              label{
                color: #C53030;
              }
              input.form-control{
                border-color: #C53030;
              }
            }
        }
        .btns{
            margin-top: 30px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            @include respond-below(sm){
              flex-direction: column;
              a.primarylink{
                margin-bottom: 20px;
              }
            }
        }
    }
    @include respond-below(md){
      margin-bottom: 50px;
    }
}
.topbanner{
    background: url('~@/assets/img/login-banner.jpg') no-repeat;
    background-position: center;
    background-size: cover;
    position: relative;
    padding: 30px;
    overflow: hidden;
    &__overlay{
        width: 100%;
        height: 100%;
        background: rgba(36, 154, 158, 0.7);
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        z-index: 0;
    }
    &__inner-content{
        position: relative;
        z-index: 2;
        text-align: left;
        p.subline, h2{
            color: #fff;
        }
        h2{
            margin-bottom: 0;
        }
    }
}
</style>
