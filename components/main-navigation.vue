<template>
  <b-navbar toggleable="lg">
    <!-- mainnav heading -->
    <b-navbar-brand to="/" class="nav-heading">
      {{ navHeading }}
    </b-navbar-brand>

    <!-- Navbar Toggler for mobile -->
    <b-navbar-toggle v-b-toggle.sidebar-backdrop target="sidebar-backdrop">
      <svg
        id="Capa_1"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        viewBox="0 0 384.97 384.97"
        style="enable-background:new 0 0 384.97 384.97;"
        xml:space="preserve"
      >
        <g>
          <g id="Menu_1_">
            <path
              d="M12.03,120.303h360.909c6.641,0,12.03-5.39,12.03-12.03c0-6.641-5.39-12.03-12.03-12.03H12.03
			c-6.641,0-12.03,5.39-12.03,12.03C0,114.913,5.39,120.303,12.03,120.303z"
            />
            <path
              d="M372.939,180.455H12.03c-6.641,0-12.03,5.39-12.03,12.03s5.39,12.03,12.03,12.03h360.909c6.641,0,12.03-5.39,12.03-12.03
			S379.58,180.455,372.939,180.455z"
            />
            <path
              d="M372.939,264.667H132.333c-6.641,0-12.03,5.39-12.03,12.03c0,6.641,5.39,12.03,12.03,12.03h240.606
			c6.641,0,12.03-5.39,12.03-12.03C384.97,270.056,379.58,264.667,372.939,264.667z"
            />
          </g>
          <g/>
          <g/>
          <g/>
          <g/>
          <g/>
          <g/>
        </g>
        <g/>
        <g/>
        <g/>
        <g/>
        <g/>
        <g/>
        <g/>
        <g/>
        <g/>
        <g/>
        <g/>
        <g/>
        <g/>
        <g/>
        <g/>
      </svg>
    </b-navbar-toggle>
    <!-- Right aligned nav items -->
    <b-navbar-nav class="ml-auto d-lg-block d-none">
      <b-navbar-nav v-if="$store.state.menus.mainMenu" class="navbar-new">
        <li
          v-for="(link, i) in $store.state.menus.mainMenu.data.nav"
          :key="i"
          class="nav-item"
        >
          <prismic-menu-link
            :link="link.primary"
            v-if="!shouldDisplaySubMenu(link)"
          />
          <span v-else>{{ link.primary.label[0].text }}</span>
          <ul class="nav-item__sub-menu" v-if="shouldDisplaySubMenu(link)">
            <li>
              <prismic-link
                :link="link.primary.link"
                title="Overview"
              >Overview</prismic-link>
            </li>
            <li v-for="(subnav, index) in link.items" :key="index">
              <prismic-link v-if="subnav.sub_nav_link_label[0]" :link="subnav.sub_nav_link"
                            :title="subnav.sub_nav_link_label[0].text">{{ subnav.sub_nav_link_label[0].text }}
              </prismic-link>
            </li>
          </ul>

        </li>
        <li
          v-if="!userLoggedIn"
          class="nav-item"
        >
          <span>
            <nuxt-link to="/login" class="login-link">City index login/register</nuxt-link>
          </span>
        </li>
        <li
          v-if="userLoggedIn"
          class="nav-item"
        >
          <span>
            <nuxt-link to="/user-account" class="login-link">My account</nuxt-link>
          </span>
        </li>
        <li
          v-if="userLoggedIn"
          class="nav-item"
        >
          <span>
            <a href="#" class="login-link" v-b-modal.logoutbox>Log out</a>
          </span>
        </li>
        <div v-if="error in error">
          <p>{{ error }}</p>
        </div>
      </b-navbar-nav>
    </b-navbar-nav>

    <!-- menu div ends  -->
  </b-navbar>
</template>

<script>
import AuthService from '@/services/auth-service'
import ButtonLink from '@/components/buttons/button-link'
import PrismicMenuLink from "@/components/prismic-menu-link";
import PrismicLink from "@/components/prismic-link";

export default {
  name: 'MainNavigation',
  components: {PrismicLink, PrismicMenuLink, ButtonLink},
  data() {
    return {
      data: [],
      error: [],
      apitoken: null,
      navHeading: 'European City Pulse'
    }
  },
  computed: {
    userLoggedIn() {
      const setAuth = this.$cookies.get('lcauth')
      this.$store.commit('setAuth', setAuth)
      return AuthService.isUserLoggedin(this)
    }
  },
  methods: {
    /**
     * Should a sub menu be displayed?
     * @param link
     * @returns {boolean|*}
     */
    shouldDisplaySubMenu(link) {
      return (link.items.length > 0 && AuthService.isUserLoggedin(this))
    },
    sucessToast() {
      this.$bvToast.toast("You're Logged In", {
        title: 'Success',
        variant: 'success',
        autoHideDelay: 5000,
        toaster: 'b-toaster-bottom-center',
        solid: true,
        appendToast: true
      })
    },
    logoutConfirm() {
      this.$bvToast.toast("You've been logged out", {
        title: 'Notification',
        variant: 'warning',
        autoHideDelay: 2500,
        appendToast: true,
        solid: true
      })
    }
  }
}
</script>

<style lang="scss">
.navbar {
  .navbar-nav.navbar-new {
    .nav-item {
      padding: 0 calc(1vw + 10px);
      position: relative;

      &:hover {
        .nav-item__sub-menu {
          display: block;
        }
      }

      .login-link {
        text-transform: uppercase;
      }

      span {
        font-family: 'Corporate S Pro';
        font-size: 16px;
        cursor: pointer;
        display: block;
        line-height: 4;

        a {
          display: block;
          margin-bottom: -1px;
          border-bottom: 1px solid transparent;
          transition: 0.2s ease-in-out;
          text-transform: capitalize;
          color: #fff;
          padding: 0;
          line-height: 4;
          text-decoration: none;

          &:hover {
            border-color: #fff;
          }

          &.active {
            border-color: #fff;
          }
        }

        @include respond-below(xl) {
          a {
            line-height: 5;
            font-size: 14px;
          }
        }
        @include respond-below(sm) {
          a {
            display: block;
            line-height: initial;
          }
        }
      }

      &:nth-child(7) {
        padding-right: 0;
        border-left: 1px solid rgba(255, 255, 255, 0.2);
        text-transform: uppercase;

        a {
          font-family: 'Corporate S Pro Demi';
          letter-spacing: 1px;
        }
      }

      &:nth-child(8) {
        padding-right: 0;
        text-transform: uppercase;

        a {
          font-family: 'Corporate S Pro Demi';
          letter-spacing: 1px;
        }
      }

      @include respond-below(xl) {
        padding: 0 calc(1vw + 6px);
      }
      @include respond-below(sm) {
        margin-top: 10px;
        margin-bottom: 10px;
        border: none;
        &:last-child {
          border: none;
        }
      }

      &__sub-menu {
        position: absolute;
        display: none;
        width: 170px;
        padding: 20px 20px 6px 20px;
        background-color: white;
        top: 52px;
        left: -20px;
        border-radius: 4px;
        box-shadow: 5px 20px 40px rgba(34, 10, 18, 0.1);

        &:after {
          bottom: 100%;
          left: 50%;
          border: solid transparent;
          content: "";
          height: 0;
          width: 0;
          position: absolute;
          pointer-events: none;
          border-color: rgba(255, 255, 255, 0);
          border-bottom-color: #ffffff;
          border-width: 7px;
          margin-left: -7px;
        }

        a {
          color: black;
          margin-bottom: 14px;
          display: block;

          &:hover, &:focus {
            color: #F29131;
          }
        }


        li:first-child {
          a {
            margin-bottom: 18px;
            padding-bottom: 18px;
            border-bottom: 1px solid #F0EDEE;
          }
        }
      }
    }

    @include respond-below(sm) {
      background: #0a0a0a91;
      width: 100%;
      padding: 1rem;
    }
  }
}
</style>
