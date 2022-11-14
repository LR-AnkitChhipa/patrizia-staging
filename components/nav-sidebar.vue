<template>
  <div id="sidebar">
    <b-sidebar
      id="sidebar-backdrop"
      class="sidebar-mobile"
      no-header
      footer
      backdrop
      lazy
      backdrop-variant="dark"
    >
      <template #default="{ hide }">
        <div>
          <div class="heading d-flex">
            <b-navbar-brand class="logo animate__animated animate__fadeIn" to="/">
              <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 543 80" class="header__logoBrand">
                <polygon
                  points="79.2 39.8 53.6 78.7 106.5 52.3 88.7 80.2 17.4 80.2 -0.4 52.3 52.4 78.7 26.8 39.8 53 -0.3 "
                />
                <path
                  d="M241.6 22.9H289l0.5 14.7h-0.9c-1-4.6-2.3-7.6-3.9-9-1.6-1.4-4.9-2.1-9.9-2.1h-5.1v45c0 3.3 0.5 5.4 1.6 6.2 1 0.8 3.2 1.3 6.7 1.6v0.8h-25.2v-0.8c3.7-0.3 5.8-0.9 6.7-1.8 0.9-0.9 1.4-3.3 1.4-7v-44h-5.1c-4.8 0-8 0.7-9.8 2.1-1.7 1.4-3 4.4-3.9 9h-1L241.6 22.9zM359.8 79.3c3.5-0.3 5.8-0.8 6.8-1.6 1-0.8 1.6-2.9 1.6-6.2v-40c0-3.2-0.5-5.2-1.6-6.1-1-0.9-3.3-1.5-6.8-1.6v-0.8h25.6v0.8c-3.5 0.2-5.8 0.7-6.8 1.6-1 0.9-1.6 3-1.6 6.1v40c0 3.3 0.5 5.4 1.6 6.2 1 0.8 3.3 1.3 6.8 1.6v0.8h-25.6V79.3zM152.8 26.1c-1.8 0-2.9 0.2-3.3 0.5-0.4 0.4-0.6 1.1-0.6 2.3v23.3c1 0.1 2.9 0.3 4.8 0.3 13.2 0 15.6-7.7 15.6-13.6C169.4 31.4 164.6 26.1 152.8 26.1M132.9 79.3c3.3-0.3 5.3-1 6.2-2 0.8-1 1.2-3.3 1.2-6.8v-39c0-3-0.5-5-1.4-6-0.9-1-2.9-1.6-6-1.8v-0.8h22.8c16.4 0 23 7.3 23 16.3 0 8.2-4.8 16.8-23 16.8-2 0-5.7-0.1-6.8-0.1v15.7c0 3.2 0.5 5.3 1.5 6.1 1 0.8 3.2 1.4 6.7 1.6v0.8h-24.2V79.3zM407.7 76.9h19.2c5.1 0 8.8-1.2 11.1-3.6 1.5-1.5 2.8-4.3 3.9-8.3h1l-2.2 15.2h-44.4v-1l34.6-53-16.7 0c-5 0-8.6 1.3-10.7 3.8-1.3 1.5-2.3 4.1-3 7.7h-0.9l1.7-14.8h41v1L407.7 76.9zM331.3 53.4l13.9 21.8c2 3.2 4.3 3.9 6.8 4.1v0.8h-13.7L322.8 55l-1.8 0c-2 0-5.7-0.1-6.8-0.1v16.7c0 3.2 0.5 5.3 1.5 6.1 1 0.8 3.2 1.4 6.7 1.6v0.8h-24.2v-0.8c3.3-0.3 5.3-1 6.2-2 0.8-1 1.2-3.3 1.2-6.8v-39c0-3-0.5-5-1.4-6-0.9-1-2.9-1.6-6-1.8v-0.8H321c16 0 22.6 7.1 22.6 15.9C343.6 45 340.7 50.9 331.3 53.4M318.1 26.1c-1.8 0-2.9 0.2-3.3 0.5-0.4 0.4-0.6 1.1-0.6 2.3v22.6c1 0.1 2.9 0.3 4.8 0.3 13 0 15.2-7.3 15.2-13.2C334.2 31 329.2 26.1 318.1 26.1M181 80.2v-0.8c2.2-0.3 3.9-1.1 5-2.5 1.1-1.4 3-5.3 5.7-11.7l18.4-43.2h1.7l21.9 49.8c1.4 3.2 2.6 5.3 3.4 6 0.9 0.8 2.3 1.3 4.3 1.6v0.8h-22v-0.8c2.5-0.2 4.2-0.5 4.9-0.8 0.7-0.3 1.1-1.1 1.1-2.4 0-0.4-0.1-1.2-0.4-2.2-0.3-1.1-0.7-2.2-1.2-3.4l-3.8-9.1h-22.5c-2.3 5.7-3.9 9.9-4.4 11.1-0.4 1.2-0.6 2.2-0.6 3 0 1.5 0.6 2.5 1.8 3 0.7 0.3 2.1 0.6 4.1 0.8v0.8H181zM218.6 57.9l-9.8-23.5L199 57.9H218.6zM452.6 79.3c3.5-0.3 5.8-0.8 6.8-1.6 1-0.8 1.6-2.9 1.6-6.2v-40c0-3.2-0.5-5.2-1.6-6.1-1-0.9-3.3-1.5-6.8-1.6v-0.8h25.6v0.8c-3.5 0.2-5.8 0.7-6.8 1.6-1 0.9-1.6 3-1.6 6.1v40c0 3.3 0.5 5.4 1.6 6.2 1 0.8 3.3 1.3 6.8 1.6v0.8h-25.6V79.3zM482.9 80.2v-0.8c2.2-0.3 3.9-1.1 5-2.5 1.1-1.4 3-5.3 5.7-11.7L512 21.9h1.7l21.9 49.8c1.4 3.2 2.6 5.3 3.4 6 0.9 0.8 2.3 1.3 4.3 1.6v0.8h-22v-0.8c2.5-0.2 4.2-0.5 4.9-0.8 0.7-0.3 1.1-1.1 1.1-2.4 0-0.4-0.1-1.2-0.4-2.2-0.3-1.1-0.7-2.2-1.2-3.4l-3.8-9.1h-22.5c-2.2 5.7-3.9 9.9-4.4 11.1-0.4 1.2-0.6 2.2-0.6 3 0 1.5 0.6 2.5 1.8 3 0.7 0.3 2.1 0.6 4.1 0.8v0.8H482.9zM520.5 57.9l-9.8-23.5-9.8 23.5H520.5z"
                />
              </svg>
            </b-navbar-brand>
            <p class="close-btn animate__animated animate__fadeIn" block @click="hide">
              <img src="@/assets/img/icon-plus.svg" alt="">
            </p>
          </div>
          <div class="sidebar-menu">
            <b-navbar-nav v-if="$store.state.menus.mainMenu" class="navbar-new">
              <template v-for="(link, i) in $store.state.menus.mainMenu.data.nav">
                <li v-if="!shouldDisplaySubMenu(link)" :key="i" class="nav-item animate__animated animate__fadeIn">
                  <prismic-menu-link :link="link.primary" />
                </li>
                <li v-else :key="i" class="nav-item nav-item--dropdown animate__animated animate__fadeIn">
                  <span>
                    <a v-b-toggle="slugify(link.primary.label[0].text)" href="javascript:void(0)">
                      <span>{{ link.primary.label[0].text }}</span>
                    </a>
                  </span>
                  <b-collapse :id="slugify(link.primary.label[0].text)">
                    <ul class="sub-menu">
                      <li>
                        <prismic-link :link="link.primary.link" title="Overview">Overview</prismic-link>
                      </li>
                      <hr>
                      <li v-for="(subnav, index) in link.items" :key="index">
                        <prismic-link v-if="subnav.sub_nav_link_label[0]" :link="subnav.sub_nav_link" :title="subnav.sub_nav_link_label[0].text">{{ subnav.sub_nav_link_label[0].text }}</prismic-link>
                      </li>
                    </ul>
                  </b-collapse>
                </li>
              </template>
              <li
                v-if="!userLoggedIn"
                class="nav-item animate__animated animate__fadeIn"
              >
                <span>
                  <nuxt-link to="/login" class="login-link">Login/Register</nuxt-link>
                </span>
              </li>
              <li
                v-if="userLoggedIn"
                class="nav-item animate__animated animate__fadeIn"
              >
                <span>
                  <nuxt-link to="/user-account" class="login-link">My account</nuxt-link>
                </span>
              </li>
              <li
                v-if="userLoggedIn"
                class="nav-item animate__animated animate__fadeIn"
              >
                <span>
                  <a href="#" class="login-link" @click.prevent="logout">Log out</a>
                </span>
              </li>
              <div v-if="error in error">
                <p>{{ error }}</p>
              </div>
            </b-navbar-nav>
          </div>
        </div>
      </template>
      <template #footer="{ hide }">
        <div class="footer-contact">
          <h3>Follow us</h3>
          <ul>
            <li><a href="#"><img src="@/assets/img/linked-in.png" alt="linked"></a></li>
            <li><a href="#"><img src="@/assets/img/facebook.png" alt="facebook"></a></li>
            <li><a href="#"><img src="@/assets/img/youtube.png" alt="youtube"></a></li>
            <li><a href="#"><img src="@/assets/img/twitter.png" alt="twitter"></a></li>
          </ul>
        </div>
      </template>
    </b-sidebar>
  </div>
</template>

<script>
import AuthService from '@/services/auth-service'
import PrismicLink from '@/components/prismic-link'
import PrismicMenuLink from '@/components/prismic-menu-link'

export default {
  name: 'Navsidebar',
  components: { PrismicMenuLink, PrismicLink },
  data () {
    return {
      data: [],
      error: [],
      apitoken: null,
      navHeading: 'European City Ranking'
    }
  },
  computed: {
    userLoggedIn () {
      const setAuth = this.$cookies.get('lcauth')
      this.$store.commit('setAuth', setAuth)
      return AuthService.isUserLoggedin(this)
    }
  },
  methods: {
    sucessToast () {
      this.$bvToast.toast("You're Logged In", {
        title: 'Success',
        variant: 'success',
        autoHideDelay: 5000,
        toaster: 'b-toaster-bottom-center',
        solid: true,
        appendToast: true
      })
    },
    /**
     * Should a sub menu be displayed?
     * @param link
     * @returns {boolean|*}
     */
    shouldDisplaySubMenu (link) {
      return (link.items.length > 0 && AuthService.isUserLoggedin(this))
    },
    logout () {
      AuthService.logout(this)
      this.$store.commit('setAuth', null)
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="scss">
#sidebar {
  #sidebar-backdrop {
    width: 100%;

    .b-sidebar-body {
      position: relative;
      overflow: hidden;
      overflow-y: auto;

      a.navbar-brand {
        text-align: left;

        svg {
          max-width: 280px;
          width: calc(100vw - 60%);
          fill: #802437;
        }
      }

      p.close-btn {
        margin: 0;
        pointer-events: all;
        cursor: pointer;

        img {
          transform: rotate(45deg);
        }
      }

      .heading {
        justify-content: space-between;
        align-items: center;
        position: relative;
        padding: 16px 24px 24px 24px;

        &::after {
          content: '';
          position: absolute;
          bottom: 0;
          width: 100%;
          left: 0;
          right: 0;
          height: 1px;
          background: #8024362c;
        }

        .navbar-brand {
          padding: 0;
        }
      }

      .sidebar-menu {
        li.nav-item {
          padding: 0;
          position: relative;
          transition: .5s ease-in-out;
          border-bottom: 1px solid #8024362c;

          span {
            a {
              padding: 12px 24px;
              font-size: 18px;
              display: block;
              border-bottom: 1px solid transparent;
              position: relative;
              background: #f8f9fa;
              transition: .5s ease-in-out;
              z-index: 10;

              &:hover, &:focus {
                color: #F29131;
                background-color: #F0EDEE;
              }
            }
          }

          &:hover {
            span {
              a {
                &::before, &::after {
                  opacity: 1;
                }
              }
            }
          }

          &--dropdown{
            span a{
              transition: .2s ease-in-out;
              background-repeat: no-repeat;
              background-position: 96% center;
              background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='13.329' height='7.418' viewBox='0 0 13.329 7.418'%3E%3Cg id='Group_270' data-name='Group 270' transform='translate(13.664 8.08) rotate(-90)'%3E%3Cg id='Group_269' data-name='Group 269' transform='translate(7.333 -13) rotate(180)'%3E%3Cpath id='Path_187' data-name='Path 187' d='M0,0,5.333-6,0-12' fill='none' stroke='%23802437' stroke-width='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E%0A");

              &[aria-expanded='true'] {
                background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='13.329' height='7.418' viewBox='0 0 13.329 7.418'%3E%3Cg id='Group_270' data-name='Group 270' transform='translate(-0.336 -0.662) rotate(90)'%3E%3Cg id='Group_269' data-name='Group 269' transform='translate(7.333 -13) rotate(180)'%3E%3Cpath id='Path_187' data-name='Path 187' d='M0,0,5.333-6,0-12' fill='none' stroke='%23802437' stroke-width='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E%0A");
              }
            }
          }

          ul.sub-menu{
            padding: 1rem 2rem;
            padding-top: 0.5rem;

            hr{
              margin: 0.5rem 0;
            }

            li{
              a{
                display: block;
                padding: 0;
                margin: 0;
                padding: 0.5rem 0;
                line-height: 1;
              }
            }
          }
        }
      }
    }

    .b-sidebar-footer {
      .footer-contact {
        width: 100%;
        padding: 24px;
        background: #d5d5d5;

        h3 {
          margin-bottom: 5px;
        }

        ul {
          display: flex;
          align-items: center;

          li {
            padding: 5px 16px 5px 0;

            a {
              transition: .2s ease-in-out;

              &:hover {
                transform: scale(1.05);
              }
            }
          }
        }
      }
    }
  }
}
</style>
