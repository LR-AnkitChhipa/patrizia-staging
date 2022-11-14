<template>
  <div class="account">
    <Header />
    <b-container fluid class="account__account-bg">
      <b-row>
        <div class="account__account-bg__overlay overlay--top" />
        <b-container class="account__account-bg__innerdiv">
          <b-row>
            <b-col cols="12" class="mb-5">
              <p class="subline">
                {{ sublinetext }}
              </p>
              <h1 class="heading">
                {{ sublineheading }}
              </h1>
            </b-col>

            <b-col cols="12" md="8" class="account__account-bg__innerdiv__user-content">
              <div v-if="sucessBox" class="bg-white">
                <div class="account__account-bg__innerdiv__user-content__success-box">
                  <img src="@/assets/img/userupdateicon.svg" alt="">
                  <p>Your account has been updated</p>
                </div>
              </div>
              <user-details v-if="UserDetails" @editButtonClicked="handleEditButtonClicked" />
              <name-edit v-if="NameEdit" @updateButtonClicked="updateUserDetails" @cancelButton="onCancel" />
              <email-edit v-if="EmailEdit" @updateButtonClicked="updateUserDetails" @cancelButton="onCancel" />
              <password-edit v-if="PassEdit" @updateButtonClicked="updateUserDetails" @cancelButton="onCancel" />
              <company-edit v-if="CompanyEdit" @updateButtonClicked="updateUserDetails" @cancelButton="onCancel" />
              <privacy-edit v-if="PrivacyEdit" @updateButtonClicked="updateUserDetails" @cancelButton="onCancel" />
            </b-col>

            <b-col v-if="UserDetails" cols="12" md="4" class="account__account-bg__innerdiv__rightbanner">
              <div class="account__account-bg__innerdiv__rightbanner__image-box image-box">
                <img src="@/assets/img/city-analysys-icon-ac.svg" alt="icon">
                <p>EXPLORE 119 Cities</p>
                <h4>City Analysis</h4>
                <button-link button-size="regular" button-style="whiteborder" label="VIEW THE TOOLS" url="city-analysis" />
              </div>
              <!-- <div class="account__account-bg__innerdiv__rightbanner__image-box image-box--two">
                <img src="@/assets/img/icon-2.svg" alt="icon">
                <h4>European City Index</h4>
                <button-link button-size="regular" button-style="primary primary--style1 white" label="VIEW NOW" url="#" />
              </div> -->
            </b-col>
          </b-row>
        </b-container>
        <div class="account__account-bg__overlay overlay--bottom" />
      </b-row>
    </b-container>
    <Footer />
  </div>
</template>

<script>
import axios from 'axios'
import Header from '@/components/header'
import Footer from '@/components/footer'
import ButtonLink from '~/components/buttons/button-link'
import UserDetails from '~/components/account/user-details'
import NameEdit from '~/components/account/name-edit'
import EmailEdit from '~/components/account/email-edit'
import PasswordEdit from '~/components/account/password-edit'
import CompanyEdit from '~/components/account/company-edit'
import AuthService from '@/services/auth-service'
import PrivacyEdit from "@/components/account/privacy-edit";

export default {
  name: 'Account',
  components: {
    PrivacyEdit,
    Header,
    ButtonLink,
    UserDetails,
    NameEdit,
    EmailEdit,
    PasswordEdit,
    CompanyEdit,
    Footer
  },
  data () {
    return {
      UserDetails: true,
      NameEdit: false,
      EmailEdit: false,
      PassEdit: false,
      CompanyEdit: false,
      PrivacyEdit: false,
      sublinetext: '',
      sublineheading: 'ACCOUNT DETAILS',
      sucessBox: false,
      userdata: {}
    }
  },
  middleware: 'authroute',
  watch: {
    // if user logs out
  },
  created  () {
    this.userData()
  },
  methods: {
    userData () {
      const vm = this
      const apiToken = AuthService.getApiToken(this)
      if (vm.$store.state.auth) {
        axios.get(process.env.VUE_APP_BACKEND_URL + process.env.VUE_APP_TEST_AUTH_TOKEN, {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiToken}`
          }
        })
          .then(function (response) {
            vm.userdata = response.data
          })
          .catch(function (error) {
            vm.loginResponse = error
          })
      }
    },
    handleEditButtonClicked (data) {
      this.UserDetails = false
      this.PassEdit = false
      this.EmailEdit = false
      this.CompanyEdit = false
      this.PrivacyEdit = false
      this.NameEdit = false
      this.sublineheading = ''
      this.sublinetext = 'ACCOUNT DETAILS'

      switch (data.link) {
        case 'name-edit':
          this.NameEdit = true
          this.sublineheading = 'Change Your Name'
          break
        case 'email-edit':
          this.EmailEdit = true
          this.sublineheading = 'Change Your Email Address'
          break
        case 'password-edit':
          this.PassEdit = true
          this.sublineheading = 'Change Password'
          break
        case 'company-edit':
          this.CompanyEdit = true
          this.sublineheading = 'Change Company Name'
          break
        case 'privacy-edit':
          this.PrivacyEdit = true
          this.sublineheading = 'Privacy & Subscriptions'
          break
        default:
          this.UserDetails = true
          this.sublineheading = 'Account Details'
          break
      }
    },
    updateSucessBox () {
      this.sucessBox = true
      setTimeout(() => {
        this.sucessBox = false
      }, 5000)
    },
    // Handle the update user details
    updateUserDetails () {
      // Update the API with the new user details
      const apiToken = AuthService.getApiToken(this)
      const userdata = this.$store.state.userdata
      const vm = this
      // post the user data
      axios.post(process.env.VUE_APP_BACKEND_URL + '/api/user/update', userdata, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiToken}`
        }
      })
        .then(function (response) {
          vm.httpResponse = response
          vm.userData = response.data
          vm.handleEditButtonClicked('account')
          vm.updateSucessBox()
        })
        .catch(function (error) {
          vm.httpResponse = error
        })
    },
    onCancel () {
      const vm = this
      vm.handleEditButtonClicked('account')
    }
  },
  head() {
    return {
      title: 'User Account | PATRIZIA City Pulse'
    }
  }
}
</script>

<style lang="scss">
.account{
  &__account-bg{
    background: url('~@/assets/img/user-account-banner.png') no-repeat;
    background-size: cover;
    background-position: center;
    padding-top: 340px;
    padding-bottom: 300px;
    position: relative;
    z-index: 0;
    min-height: 100vh;

    &__overlay{
      position: absolute;
      width: 100%;
      height: 50%;
      background: rgb(255,255,255);
      background: linear-gradient(0deg, rgba(255,255,255,0) 0%, rgba(51,10,18,0.700717787114846) 100%);
      z-index: 1;
      &.overlay--top{
        top: 0;
        bottom: auto;
      }
      &.overlay--bottom{
        top: auto;
        bottom: 0;
        background: rgb(34,10,18);
        background: linear-gradient(0deg, rgba(34,10,18,0.5) 0%, rgba(255,255,255,0) 100%);
      }
    }
    &__innerdiv{
      position: relative;
      z-index: 5;
      &__rightbanner{
        -webkit-box-shadow: 5px 20px 40px 0px rgba(34,10,18,0.1);
        -moz-box-shadow: 5px 20px 40px 0px rgba(34,10,18,0.1);
        box-shadow: 5px 20px 40px 0px rgba(34,10,18,0.1);
        &__image-box{
          background: #6AC6F1;
          background: url('~@/assets/img/account-city-bg.png') no-repeat;
          background-size: cover;
          text-align: center;
          padding: 100px 20px;
          img{
            max-width: 88px;
            width: 100%;
            margin-bottom: 35px;
          }
          p{
            font-family: 'Corporate S Pro Bold';
            font-size: 14px;
            letter-spacing: .5px;
            line-height: 17px;
            color: #fff;
            margin-bottom: 20px;
          }
          h4{
            color: #fff;
            margin-bottom: 35px;
            font-size: 30px;
          }
        }
      }
      &__user-content{
        padding-right: 65px;
        @include respond-below(sm){
          padding-right: 16px;
          margin-bottom: 50px;
        }
        &__success-box {
          background: #01bc7744;
          padding: 10px;

          img {
            float: left;
            margin-right: 10px;
          }

          p {
            color: #01A64B;
            font-family: 'Corporate S Pro Demi';
            margin: 0;
            font-size: 14px;
          }
        }
        .bg-white{
          padding: 30px;
          padding-bottom: 0;
        }
        .userdetails {
          &__content {
            background: #fff;
            padding: 30px;
            min-height: 440px;

            &__success-box {
              background: #01bc7744;
              padding: 10px;
              margin-bottom: 20px;

              img {
                float: left;
                margin-right: 10px;
              }

              p {
                color: #01A64B;
                font-family: 'Corporate S Pro Demi';
                margin: 0;
                font-size: 14px;
              }
            }

            &__form-details {
              &__box {
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 20px 0;
                border-bottom: 2px solid #F5F3F4;

                h4 {
                  margin-bottom: 8px;
                }

                p {
                  margin: 0;
                }

                &:first-child {
                  padding-top: 0;
                }

                &:last-child {
                  padding-bottom: 0;
                  border: none;
                }
                .box__text{
                  flex-basis: 70%;
                }

                @include respond-below(sm) {
                  flex-wrap: wrap;
                }
              }
            }
          }
        }
      }
      p.subline, h1.heading{
        color: #F0EDED;
      }
    }
  }
}
</style>
