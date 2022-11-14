<template>
  <footer id="app">
    <!-- topfooter starts -->
    <div class="topfooter">
      <div class="container">
        <a target="_blank" href="https://www.patrizia.ag/">
          <font-awesome-icon :icon="['fa', 'angle-right']"/>
          {{ topFooter.text }} <span>{{ topFooter.link }}</span>
        </a>
      </div>
    </div>
    <!-- topfooter Ends -->

    <!-- mainfooter starts -->
    <div class="main-footer">
      <div class="container">
        <div class="row">
          <div class="col-lg-4 col-md-5 col-sm-12">
            <div class="logo">
              <a href="#">
                <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 543 80" class="header__logoBrand">
                  <polygon
                    points="79.2 39.8 53.6 78.7 106.5 52.3 88.7 80.2 17.4 80.2 -0.4 52.3 52.4 78.7 26.8 39.8 53 -0.3 "/>
                  <path
                    d="M241.6 22.9H289l0.5 14.7h-0.9c-1-4.6-2.3-7.6-3.9-9-1.6-1.4-4.9-2.1-9.9-2.1h-5.1v45c0 3.3 0.5 5.4 1.6 6.2 1 0.8 3.2 1.3 6.7 1.6v0.8h-25.2v-0.8c3.7-0.3 5.8-0.9 6.7-1.8 0.9-0.9 1.4-3.3 1.4-7v-44h-5.1c-4.8 0-8 0.7-9.8 2.1-1.7 1.4-3 4.4-3.9 9h-1L241.6 22.9zM359.8 79.3c3.5-0.3 5.8-0.8 6.8-1.6 1-0.8 1.6-2.9 1.6-6.2v-40c0-3.2-0.5-5.2-1.6-6.1-1-0.9-3.3-1.5-6.8-1.6v-0.8h25.6v0.8c-3.5 0.2-5.8 0.7-6.8 1.6-1 0.9-1.6 3-1.6 6.1v40c0 3.3 0.5 5.4 1.6 6.2 1 0.8 3.3 1.3 6.8 1.6v0.8h-25.6V79.3zM152.8 26.1c-1.8 0-2.9 0.2-3.3 0.5-0.4 0.4-0.6 1.1-0.6 2.3v23.3c1 0.1 2.9 0.3 4.8 0.3 13.2 0 15.6-7.7 15.6-13.6C169.4 31.4 164.6 26.1 152.8 26.1M132.9 79.3c3.3-0.3 5.3-1 6.2-2 0.8-1 1.2-3.3 1.2-6.8v-39c0-3-0.5-5-1.4-6-0.9-1-2.9-1.6-6-1.8v-0.8h22.8c16.4 0 23 7.3 23 16.3 0 8.2-4.8 16.8-23 16.8-2 0-5.7-0.1-6.8-0.1v15.7c0 3.2 0.5 5.3 1.5 6.1 1 0.8 3.2 1.4 6.7 1.6v0.8h-24.2V79.3zM407.7 76.9h19.2c5.1 0 8.8-1.2 11.1-3.6 1.5-1.5 2.8-4.3 3.9-8.3h1l-2.2 15.2h-44.4v-1l34.6-53-16.7 0c-5 0-8.6 1.3-10.7 3.8-1.3 1.5-2.3 4.1-3 7.7h-0.9l1.7-14.8h41v1L407.7 76.9zM331.3 53.4l13.9 21.8c2 3.2 4.3 3.9 6.8 4.1v0.8h-13.7L322.8 55l-1.8 0c-2 0-5.7-0.1-6.8-0.1v16.7c0 3.2 0.5 5.3 1.5 6.1 1 0.8 3.2 1.4 6.7 1.6v0.8h-24.2v-0.8c3.3-0.3 5.3-1 6.2-2 0.8-1 1.2-3.3 1.2-6.8v-39c0-3-0.5-5-1.4-6-0.9-1-2.9-1.6-6-1.8v-0.8H321c16 0 22.6 7.1 22.6 15.9C343.6 45 340.7 50.9 331.3 53.4M318.1 26.1c-1.8 0-2.9 0.2-3.3 0.5-0.4 0.4-0.6 1.1-0.6 2.3v22.6c1 0.1 2.9 0.3 4.8 0.3 13 0 15.2-7.3 15.2-13.2C334.2 31 329.2 26.1 318.1 26.1M181 80.2v-0.8c2.2-0.3 3.9-1.1 5-2.5 1.1-1.4 3-5.3 5.7-11.7l18.4-43.2h1.7l21.9 49.8c1.4 3.2 2.6 5.3 3.4 6 0.9 0.8 2.3 1.3 4.3 1.6v0.8h-22v-0.8c2.5-0.2 4.2-0.5 4.9-0.8 0.7-0.3 1.1-1.1 1.1-2.4 0-0.4-0.1-1.2-0.4-2.2-0.3-1.1-0.7-2.2-1.2-3.4l-3.8-9.1h-22.5c-2.3 5.7-3.9 9.9-4.4 11.1-0.4 1.2-0.6 2.2-0.6 3 0 1.5 0.6 2.5 1.8 3 0.7 0.3 2.1 0.6 4.1 0.8v0.8H181zM218.6 57.9l-9.8-23.5L199 57.9H218.6zM452.6 79.3c3.5-0.3 5.8-0.8 6.8-1.6 1-0.8 1.6-2.9 1.6-6.2v-40c0-3.2-0.5-5.2-1.6-6.1-1-0.9-3.3-1.5-6.8-1.6v-0.8h25.6v0.8c-3.5 0.2-5.8 0.7-6.8 1.6-1 0.9-1.6 3-1.6 6.1v40c0 3.3 0.5 5.4 1.6 6.2 1 0.8 3.3 1.3 6.8 1.6v0.8h-25.6V79.3zM482.9 80.2v-0.8c2.2-0.3 3.9-1.1 5-2.5 1.1-1.4 3-5.3 5.7-11.7L512 21.9h1.7l21.9 49.8c1.4 3.2 2.6 5.3 3.4 6 0.9 0.8 2.3 1.3 4.3 1.6v0.8h-22v-0.8c2.5-0.2 4.2-0.5 4.9-0.8 0.7-0.3 1.1-1.1 1.1-2.4 0-0.4-0.1-1.2-0.4-2.2-0.3-1.1-0.7-2.2-1.2-3.4l-3.8-9.1h-22.5c-2.2 5.7-3.9 9.9-4.4 11.1-0.4 1.2-0.6 2.2-0.6 3 0 1.5 0.6 2.5 1.8 3 0.7 0.3 2.1 0.6 4.1 0.8v0.8H482.9zM520.5 57.9l-9.8-23.5-9.8 23.5H520.5z"/>
                </svg>
              </a>
              <p>{{ mainfooter.text }}</p>
            </div>
            <div class="social">
              <p>
                <a :href="mainfooter.contact.link" :title="mainfooter.contact.text" :target="mainfooter.contact.target" rel="noreferrer">{{mainfooter.contact.text}}</a>
              </p>
              <ul>
                <li><a target="_blank" href="https://www.linkedin.com/company/patrizia-ag">
                  <font-awesome-icon :icon="['fab', 'linkedin']"/>
                </a></li>
                <li><a target="_blank" href="https://www.facebook.com/patriziaimmobilien">
                  <font-awesome-icon :icon="['fab', 'facebook-square']"/>
                </a></li>
                <li><a target="_blank" href="https://www.youtube.com/user/patriziaimmobilien">
                  <font-awesome-icon :icon="['fab', 'youtube']"/>
                </a></li>
                <li><a target="_blank" href="https://twitter.com/PATRIZIA_news">
                  <font-awesome-icon :icon="['fab', 'twitter']"/>
                </a></li>
              </ul>
            </div>
          </div>
          <div class="col-lg-2 col-md-3 col-sm-6">
            <div class="menus">
              <ul>
                <li v-for="(link, linkIndex) of footerMenu" :key="linkIndex">
                  <prismic-menu-link
                    :link="link.primary"
                  />
                </li>
              </ul>
            </div>
          </div>
          <div class="col-lg-3 col-md-3 col-sm-6">
            <div class="menus">

              <ul>
                <!--                <li v-for="menu of menus2" :key="menu.menu">-->
                <!--                  <a href="#">{{ menu.menu }}</a>-->
                <!--                </li>-->
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- mainfooter Ends -->

    <!-- Subfooter Start -->
    <div class="subfooter">
      <div class="container">
        <div class="row">
          <div class="col-md-4 col-sm-12">
            <p v-html="subFooter.copy"/>
          </div>
          <div class="col-md-8 col-sm-12">
            <ul>
<!--              <li v-for="menu of subdooterMenus" :key="menu.menu">-->
<!--                <a href="#">{{ menu.menu }}</a>-->
<!--              </li>-->
            </ul>
          </div>
        </div>
      </div>
    </div>
    <!-- Subfooter Ends -->
  </footer>
</template>

<script>

// Font awesome added
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'
import {library} from '@fortawesome/fontawesome-svg-core'
import {faAngleRight} from '@fortawesome/free-solid-svg-icons'
import {faFontAwesome, faFacebookSquare, faLinkedin, faYoutube, faTwitter} from '@fortawesome/free-brands-svg-icons'
import PrismicMenuLink from "@/components/prismic-menu-link";

library.add(faAngleRight, faFontAwesome, faFacebookSquare, faLinkedin, faYoutube, faTwitter)

export default {

  components: {
    PrismicMenuLink,
    FontAwesomeIcon
  },
  data() {
    return (
      {
        topFooter: {
          text: 'Visit',
          link: 'PATRIZIA.AG'
        },
        mainfooter: {
          text: this.getLabel('footer_company_tagline'),
          contact: {
            text: 'Contact',
            link: 'https://www.patrizia.ag/en/contact',
            target: '_blank',
          }
        },
        subFooter: {
          copy: `&copy; ${this.getTheYear()}, PATRIZIA SE`
        }
      }
    )
  },
  computed: {
    footerMenu() {
      try {
        return this.$store.state.menus.footerLegalMenu.data.nav
      } catch (ex) {
        return null
      }
    }
  },
  methods: {
    getTheYear() {
      const d = new Date()
      return d.getFullYear()
    }
  }
}
</script>

<style lang="scss" scoped>

$link-color: #892638;
$link-color-hover: #330d14;
//Default var css

// default tag and behaviour
a {
  color: $link-color;
  transition: .2s ease-in-out;
  text-decoration: none;
  font-family: "Corporate S Pro Demi", Fallback, sans-serif;

  &:hover {
    color: $link-color-hover;
  }
}

svg {
  transition: .2s ease-in-out;
}

footer {
  background: #f0f0f0;

  .topfooter {
    background-color: #892638;
    color: #fff;

    a {
      text-decoration: none;
      font-size: 1rem;
      display: inline-block;
      padding: 1.2rem 0;
      color: #fff;
      font-family: 'Corporate S Pro';

      span {
        text-transform: uppercase;
        border-bottom: 1px solid transparent;
        transition: .2s ease-in-out;
      }

      svg {
        font-weight: 100;
        margin-right: 10px;
      }

      &:hover {
        span {
          border-bottom: 1px solid #fff;
        }
      }
    }
  }

  .main-footer {
    padding: 2.5rem 0;
    padding-bottom: 1.5rem;

    .logo {
      margin-bottom: 2.4rem;

      svg {
        fill: #892638;
        width: 222px;
        margin-bottom: 2rem;
      }

      p {
        font-family: "Corporate S Pro", Fallback, sans-serif;
        font-size: 1rem;
        color: #220A12;
      }
    }

    .social {
      p {
        color: #892638;
        margin-bottom: 1.5rem;
        font-family: "Corporate S Pro Demi", Fallback, sans-serif;
      }

      ul {
        display: flex;
        align-items: center;

        li {
          font-size: 1.3rem;
          margin-right: 1.3rem;

          &:last-child {
            margin: 0;
          }

          a {
            svg {
              width: 23px;
              height: 23px;
              color: #B4A4A9;
              transition: .2s ease-in-out;
            }

            &:hover {
              svg {
                color: #802437;
                transform: scale(1.15);
              }
            }
          }
        }
      }
    }

    .menus {
      padding-top: .8rem;

      ul > li {
        margin-bottom: 1rem;
      }

    }
  }

  .subfooter {
    .container {
      .row {
        padding: 1.5rem 0;
        margin: 0;
        border-top: 1px solid #c2c2c28a;

        div {
          padding: 0;

          p {
            color: #8024367e;
            font-family: "Corporate S Pro", Fallback, sans-serif;
          }

          ul {
            display: flex;
            justify-content: flex-end;
            align-items: center;
            flex-wrap: wrap;

            li {
              padding-left: 1.5rem;

              a {
                color: #8024367e;
                font-family: "Corporate S Pro", Fallback, sans-serif;

                &:hover {
                  color: #802437;
                }
              }
            }

            @include respond-below(sm) {
              justify-content: flex-start;
              flex-direction: column;
              li {
                padding-left: 0;
                display: block;
                width: 100%;
              }
            }
          }
        }
      }
    }
  }
}
</style>
