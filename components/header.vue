<template>
  <div id="homenavbar">
    <div
      class="header animate__animated" :class="{'active maintopfixed animate__fadeIn' : headerfixedtop}">
      <div
        v-if="$store.state.userdata && !$store.state.userdata.agreed_monitoring && !$store.state.trackingNotificationHidden"
        class="p-callout activity-alert animate__animated" :class="{'d-none animate__fadeIn' : headerfixedtop}">
        <svg class="calloutleft" xmlns="http://www.w3.org/2000/svg" width="22" height="66" viewBox="0 0 22 66">
          <path id="Path_205" data-name="Path 205" d="M22-9.083,0,24,0-42Z" transform="translate(0 42)" fill="#f29131"/>
        </svg>
        <span class="callouttext"><b>Help improve the City Pulse experience</b> by allowing PATRIZIA to monitor your activity on this site</span>
        <div class="activity-alert-right">
          <text-link url="https://www.patrizia.ag/en/privacy-policy/" title="Learn more" text="Learn more" target="_blank" />
          <div @click="allowTracking()" class="p-btn primary primary--style1 regular allow-button">
          <svg class="left" xmlns="http://www.w3.org/2000/svg" width="12" height="36" viewBox="0 0 12 36">
            <path id="Path_128" data-name="Path 128" d="M12-24.045,0-6,0-42Z" transform="translate(0 42)" fill="#f29131" />
          </svg>
          <span class="text">ALLOW</span>
          <svg class="right" xmlns="http://www.w3.org/2000/svg" width="5.043" height="9.664" viewBox="0 0 5.043 9.664">
            <path
              id="Path_127"
              data-name="Path 127"
              d="M0,0,4,4.5,0,9"
              transform="translate(0.374 0.332)"
              fill="none"
              stroke="#fff"
              stroke-width="1"
            />
          </svg>
          </div>

          <a href="#" class="closebtn" @click="$store.commit('SET_TRACKING_NOTIFICATION_STATE', true)" title="Close">
            <img src="~/assets/img/logout-cancel-btn.svg" alt="">
          </a>
        </div>
      </div>
      <div class="top-navigation animate__animated">
        <b-navbar toggleable="lg">
          <b-navbar-brand class="logo">
            <a href="http://patrizia.ag/" target="_blank" title="Go to PATRIZIA.ag">
              <svg xmlns="http://www.w3.org/2000/svg" width="6.383" height="12.028" viewBox="0 0 6.383 12.028"
                   class="icon-left">
                <path id="Path_187" data-name="Path 187" d="M0,11.343,5.333,5.672,0,0"
                      transform="translate(6.019 11.686) rotate(180)" fill="none" stroke="#fff" stroke-width="1"/>
              </svg>
            </a>

            <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 543 80" class="header__logoBrand">
              <polygon
                points="79.2 39.8 53.6 78.7 106.5 52.3 88.7 80.2 17.4 80.2 -0.4 52.3 52.4 78.7 26.8 39.8 53 -0.3 "/>
              <path
                d="M241.6 22.9H289l0.5 14.7h-0.9c-1-4.6-2.3-7.6-3.9-9-1.6-1.4-4.9-2.1-9.9-2.1h-5.1v45c0 3.3 0.5 5.4 1.6 6.2 1 0.8 3.2 1.3 6.7 1.6v0.8h-25.2v-0.8c3.7-0.3 5.8-0.9 6.7-1.8 0.9-0.9 1.4-3.3 1.4-7v-44h-5.1c-4.8 0-8 0.7-9.8 2.1-1.7 1.4-3 4.4-3.9 9h-1L241.6 22.9zM359.8 79.3c3.5-0.3 5.8-0.8 6.8-1.6 1-0.8 1.6-2.9 1.6-6.2v-40c0-3.2-0.5-5.2-1.6-6.1-1-0.9-3.3-1.5-6.8-1.6v-0.8h25.6v0.8c-3.5 0.2-5.8 0.7-6.8 1.6-1 0.9-1.6 3-1.6 6.1v40c0 3.3 0.5 5.4 1.6 6.2 1 0.8 3.3 1.3 6.8 1.6v0.8h-25.6V79.3zM152.8 26.1c-1.8 0-2.9 0.2-3.3 0.5-0.4 0.4-0.6 1.1-0.6 2.3v23.3c1 0.1 2.9 0.3 4.8 0.3 13.2 0 15.6-7.7 15.6-13.6C169.4 31.4 164.6 26.1 152.8 26.1M132.9 79.3c3.3-0.3 5.3-1 6.2-2 0.8-1 1.2-3.3 1.2-6.8v-39c0-3-0.5-5-1.4-6-0.9-1-2.9-1.6-6-1.8v-0.8h22.8c16.4 0 23 7.3 23 16.3 0 8.2-4.8 16.8-23 16.8-2 0-5.7-0.1-6.8-0.1v15.7c0 3.2 0.5 5.3 1.5 6.1 1 0.8 3.2 1.4 6.7 1.6v0.8h-24.2V79.3zM407.7 76.9h19.2c5.1 0 8.8-1.2 11.1-3.6 1.5-1.5 2.8-4.3 3.9-8.3h1l-2.2 15.2h-44.4v-1l34.6-53-16.7 0c-5 0-8.6 1.3-10.7 3.8-1.3 1.5-2.3 4.1-3 7.7h-0.9l1.7-14.8h41v1L407.7 76.9zM331.3 53.4l13.9 21.8c2 3.2 4.3 3.9 6.8 4.1v0.8h-13.7L322.8 55l-1.8 0c-2 0-5.7-0.1-6.8-0.1v16.7c0 3.2 0.5 5.3 1.5 6.1 1 0.8 3.2 1.4 6.7 1.6v0.8h-24.2v-0.8c3.3-0.3 5.3-1 6.2-2 0.8-1 1.2-3.3 1.2-6.8v-39c0-3-0.5-5-1.4-6-0.9-1-2.9-1.6-6-1.8v-0.8H321c16 0 22.6 7.1 22.6 15.9C343.6 45 340.7 50.9 331.3 53.4M318.1 26.1c-1.8 0-2.9 0.2-3.3 0.5-0.4 0.4-0.6 1.1-0.6 2.3v22.6c1 0.1 2.9 0.3 4.8 0.3 13 0 15.2-7.3 15.2-13.2C334.2 31 329.2 26.1 318.1 26.1M181 80.2v-0.8c2.2-0.3 3.9-1.1 5-2.5 1.1-1.4 3-5.3 5.7-11.7l18.4-43.2h1.7l21.9 49.8c1.4 3.2 2.6 5.3 3.4 6 0.9 0.8 2.3 1.3 4.3 1.6v0.8h-22v-0.8c2.5-0.2 4.2-0.5 4.9-0.8 0.7-0.3 1.1-1.1 1.1-2.4 0-0.4-0.1-1.2-0.4-2.2-0.3-1.1-0.7-2.2-1.2-3.4l-3.8-9.1h-22.5c-2.3 5.7-3.9 9.9-4.4 11.1-0.4 1.2-0.6 2.2-0.6 3 0 1.5 0.6 2.5 1.8 3 0.7 0.3 2.1 0.6 4.1 0.8v0.8H181zM218.6 57.9l-9.8-23.5L199 57.9H218.6zM452.6 79.3c3.5-0.3 5.8-0.8 6.8-1.6 1-0.8 1.6-2.9 1.6-6.2v-40c0-3.2-0.5-5.2-1.6-6.1-1-0.9-3.3-1.5-6.8-1.6v-0.8h25.6v0.8c-3.5 0.2-5.8 0.7-6.8 1.6-1 0.9-1.6 3-1.6 6.1v40c0 3.3 0.5 5.4 1.6 6.2 1 0.8 3.3 1.3 6.8 1.6v0.8h-25.6V79.3zM482.9 80.2v-0.8c2.2-0.3 3.9-1.1 5-2.5 1.1-1.4 3-5.3 5.7-11.7L512 21.9h1.7l21.9 49.8c1.4 3.2 2.6 5.3 3.4 6 0.9 0.8 2.3 1.3 4.3 1.6v0.8h-22v-0.8c2.5-0.2 4.2-0.5 4.9-0.8 0.7-0.3 1.1-1.1 1.1-2.4 0-0.4-0.1-1.2-0.4-2.2-0.3-1.1-0.7-2.2-1.2-3.4l-3.8-9.1h-22.5c-2.2 5.7-3.9 9.9-4.4 11.1-0.4 1.2-0.6 2.2-0.6 3 0 1.5 0.6 2.5 1.8 3 0.7 0.3 2.1 0.6 4.1 0.8v0.8H482.9zM520.5 57.9l-9.8-23.5-9.8 23.5H520.5z"/>
            </svg>
          </b-navbar-brand>

          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">
            <b-nav-item class="text-uppercase"
                        :href="header.contact.link"
                        :title="header.contact.text"
                        :target="header.contact.target"
                        rel="noreferrer"
            >
              {{ header.contact.text }}
            </b-nav-item>
          </b-navbar-nav>
        </b-navbar>
      </div>

      <!-- nav menus imported -->
      <div class="main-navbar animate__animated">
        <main-navigation/>
      </div>
    </div>
    <nav-sidebar/>
  </div>
</template>

<script>

// Importing FontAwesome here
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'
import {library} from '@fortawesome/fontawesome-svg-core'
import {faAngleLeft} from '@fortawesome/free-solid-svg-icons'
import MainNavigation from '@/components/main-navigation'
import NavSidebar from '@/components/nav-sidebar'
import TextLink from '@/components/text-link'
import ButtonLink from '@/components/buttons/button-link'
import AuthService from "@/services/auth-service";
import axios from "axios";
// adding FontAwesome library
library.add(faAngleLeft)

// Importing Components
// eslint-disable-next-line no-unused-vars

export default {
  name: 'Header',
  components: {
    MainNavigation,
    NavSidebar,
    TextLink,
    ButtonLink,
    // adding as component
    FontAwesomeIcon
  },
  data() {
    return {
      headerfixedtop: false,
      header: {
        contact: {
          text: 'Contact Us',
          link: 'https://www.patrizia.ag/en/contact',
          target: '_blank',
        }
      }
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleMainnav)
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleMainnav)
  },
  methods: {
    /**
     * Set the user's allow tracking preferences
     */
    allowTracking() {
      this.$store.commit('SET_USER_PROPERTY', {'agreed_monitoring': true})
      // Post the update
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
    handleMainnav() {
      const homepageHero = document.querySelector('#homepagehero .navigation-wrapper')
      const pageBanner = document.querySelector('.banner')

      let scrollYActivate = 0
      if (homepageHero) {
        scrollYActivate = homepageHero.scrollHeight
      } else if (pageBanner) {
        scrollYActivate = pageBanner.scrollHeight
      }

      if (window.scrollY > scrollYActivate) {
        this.headerfixedtop = true
      } else {
        this.headerfixedtop = false
      }
    }
  },
  computed: {
    trackingNotificationHidden() {
      return this.$store.state.trackingNotificationHidden
    }
  }
}
</script>

<style lang="scss">

/* Normal css applied without scope */
$primary-color: #802437;
$white-color: #fff;

.header {
  position: absolute;
  top: 0;
  width: 100%;
  z-index: 99;
  transition: .2s ease-in-out;

  &.maintopfixed {
    position: fixed;
  }

  .activity-alert{
    .activity-alert-right{
      display: flex;
      align-items: center;
      padding-right: 15px;

      .allow-button {
        margin-right: 30px;
        cursor: pointer;
      }

      > a {
        margin-right: 30px;

        &.closebtn{
          img{
            width: 20px;
            height: 20px;
          }
        }
      }
    }
    @include respond-below(sm) {
      display: none;
    }
  }
}

.header {
  .navbar {
    background: transparent;
    color: #fff;
    padding-top: 0;
    padding-bottom: 0;
    padding-right: 2rem;
  }
}

.header .top-navigation {
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}

.header.active {
  background: #fff;
}

.header .top-navigation .navbar {
  min-height: 55px;
  font-family: 'Corporate S Pro bold';

}

.header .navbar-nav.navbar-new .nav-item:last-child {
  padding-right: 0;
}

.header .top-navigation .navbar-nav .nav-link {
  font-family: 'Corporate S Pro bold';
}

.header .main-navbar {
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  min-height: 65px;
}

.header .main-navbar .navbar .navbar-brand{
  &::after{
    content: '';
    position: absolute;
    opacity: 0;
    bottom: -15px;
    width: 215px;
    background: #fff;
    height: 1px;
    left: 56.50%;
    transform: translateX(-50%);
    transition: .2s ease-in-out;
  }
}

.header .main-navbar .navbar .navbar-brand:hover {
  &::after{
    opacity: 1;
  }
}

.header.active .main-navbar .navbar .navbar-brand:hover {
  &::after{
    background-color: #802437;
  }
}

.header .main-navbar.fixedtop {
  position: fixed;
  top: 55px;
  width: 100%;
  background: #fff;
  z-index: 1;
}

.header.active .main-navbar, .header.active .top-navigation, .header.active .navbar .navbar-nav.navbar-new .nav-item:nth-child(7) {
  border-color: #80243724;
}

.navbar-expand-lg .navbar-nav {
  align-items: center;
}

.header .navbar-light .navbar-brand {
  color: #fff;
  font-weight: 500;
  transition: 0.2s ease-in-out;
  align-items: center;
  min-height: auto;
  padding: 0;
  padding-left: 2rem;
  position: relative;
}

.header .top-navigation .navbar .navbar-brand {
  top: -4px;
}

.header .main-navbar .navbar .navbar-brand {
  @include respond-below(md){
    padding-left: 0;
  }
}

.header .main-navbar .navbar .navbar-brand:hover {
  color: #fff;
}

.header.active .main-navbar .navbar .navbar-brand:hover {
  color: #802437;
}

.header.active .navbar-light .navbar-brand {
  color: #802437;
}

.header .navbar-brand:hover {
  color: #fff;
}

.header.active .navbar-brand:hover {
  color: rgb(63, 30, 30);
}

.header .navbar-brand.logo {
  display: block;
  fill: #ffffff;

  .header__logoBrand {
    width: 176px;
  }
}

.header.active .navbar-brand.logo svg {
  fill: #802437;

  &.icon-left {
    path {
      stroke: #802437;
    }
  }
}

.header .navbar-brand.logo svg.icon-left {
  position: absolute;
  top: 60%;
  transform: translateY(-50%);
  left: 5px;
  width: 6px;
  height: 12px;
}

.header .navbar-brand.nav-heading {
  font-family: "Georgia Pro Regular";
  font-size: 24px;
}

.header .navbar-light .navbar-nav .nav-link {
  color: #fff;
  transition: 0.2s ease-in-out;
  padding: 0;
  letter-spacing: 1px;

  &:hover, &:focus {
    color: white;
  }
}

.header.active .main-navbar .navbar ul.navbar-nav .nav-item span {
  color: #802437;

  a {
    color: #802437;
  }
}

.header.active .main-navbar .navbar ul.navbar-nav .nav-item:last-child {
  border-color: #80243724;
}

.header.active .main-navbar .navbar ul.navbar-nav .nav-item span a:hover {
  border-color: #802437;
}

.header.active .main-navbar .navbar ul.navbar-nav .nav-item span a.active {
  border-color: #802437;
}

.header.active .navbar-light .navbar-nav .nav-link {
  color: #802437;
}

@media only screen and (max-width: 1200px) {
  .header .navbar-brand.nav-heading {
    font-size: 20px;
  }
}

@media only screen and (max-width: 991px) {
  .header .main-navbar {
    min-height: auto;
    padding: 1rem;
  }
  .header .main-navbar .navbar-toggler {
    border-radius: 0;
    width: 30px;
    padding: 1px;
    border: none;
    margin: 0;
  }
  .header .main-navbar .navbar-toggler svg {
    fill: #fff;
  }
  .header.active .main-navbar .navbar-toggler svg {
    fill: #802437;
  }
}

@media only screen and (max-width: 600px) {
  .header .main-navbar {
    min-height: auto;
    padding: 0;
  }
  .header .navbar {
    padding: 1rem;
  }
  .header .navbar-brand.nav-heading {
    padding: 0;
  }
}

@media only screen and (max-width: 400px) {
  .header .main-navbar {
    min-height: auto;
    padding: 0;
  }
  .header .navbar {
    padding: 1rem;
  }
  .header .main-navbar .navbar-toggler {
    padding: 2px;
  }
  .header .navbar-brand.nav-heading {
    font-size: 17px;
    padding: 0;
  }
  .header .navbar-brand.logo svg {
    width: 110px;
  }
}

</style>
