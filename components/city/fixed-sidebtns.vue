<template>
  <div class="fixed-msg">
    <a href="#" class="fixed-msg__msg msg--share" @click.stop.prevent="msgActive()">
      <img src="@/assets/img/social-share-btns.svg" class="fixed-msg__msg__icon" alt="">
    </a>
    <a :href="'mailto:admin@patrizia.ag?subject=PATRIZIA City Pulse - ' + cityData.name + ' &body=Hi,%0D%0A%0D%0A I found this webpage and thought you might like it %0D%0A%0D%0A ' + cityData.name + ' - PATRIZIA City Pulse %0D%0A%0D%0A' + pageUrl + '%0D%0A%0D%0A'" class="fixed-msg__msg">
      <img src="@/assets/img/mail_icon.svg" class="fixed-msg__msg__icon" alt="">
    </a>
    <a v-scroll-to="'#homenavbar'" href="#" class="fixed-msg__msg">
      <img src="@/assets/img/arrow_up.svg" class="fixed-msg__msg__icon fixed-msg__msg__icon" alt="">
    </a>

    <!-- popup box -->
    <div v-if="toggleActive" class="fixed-msg__msg__sharing-block">
      <div class="inner-content">
        <p class="fixed-msg__msg__sharing-block__headline">
          SHARE
        </p>
        <ul class="fixed-msg__msg__sharing-block__iconsbox">
          <li>
            <a target="_blank" :href="'http://www.linkedin.com/shareArticle?mini=true&url='+pageUrl+'&title=Property Investment - '+cityData.slug+' - '+cityData.country+''">
              <font-awesome-icon :icon="['fab', 'linkedin']"/>
            </a>
          </li>
          <li>
            <a target="_blank" :href="'https://www.facebook.com/sharer/sharer.php?u='+pageUrl+''">
              <font-awesome-icon :icon="['fab', 'facebook-square']"/>
            </a>
          </li>
          <li>
            <a target="_blank" :href="'https://twitter.com/intent/tweet?url='+pageUrl+'&text=Property Investment - '+cityData.slug+' - '+cityData.country+''">
              <font-awesome-icon :icon="['fab', 'twitter']"/>
            </a>
          </li>
        </ul>
      </div>
      <a href="#" class="close-btn" @click.stop.prevent="msgActive()">
        <svg xmlns="http://www.w3.org/2000/svg" width="12.021" height="12.021" viewBox="0 0 12.021 12.021">
          <g id="Group_5382" data-name="Group 5382" transform="translate(-79.55 -1795.698) rotate(45)">
            <line
              id="Line_625"
              data-name="Line 625"
              x2="16"
              transform="translate(1326.5 1213.5)"
              fill="none"
              stroke="#802537"
              stroke-width="1"
            />
            <line
              id="Line_626"
              data-name="Line 626"
              x2="16"
              transform="translate(1334.5 1205.5) rotate(90)"
              fill="none"
              stroke="#802537"
              stroke-width="1"
            />
          </g>
        </svg>
      </a>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'
import {library} from '@fortawesome/fontawesome-svg-core'
import {faFontAwesome, faFacebookSquare, faLinkedin, faYoutube, faTwitter} from '@fortawesome/free-brands-svg-icons'

library.add(faFontAwesome, faFacebookSquare, faLinkedin, faYoutube, faTwitter)

export default {
  name: 'Fixedsidebtns',
  components: {
    FontAwesomeIcon
  },
  data () {
    return {
      toggleActive: false,
      cityData: this.$store.state.cityApiData,
      pageUrl: null
    }
  },
  mounted () {
    this.getUrl()
  },
  methods: {
    msgActive () {
      if (this.toggleActive === false) {
        this.toggleActive = true
      } else {
        this.toggleActive = false
      }
    },
    getUrl () {
      if (process.client) {
        this.pageUrl = window.location.href
        return true
      }
    }
  }

}
</script>

<style lang="scss">
.fixed-msg {
  display: inline-block;
  position: fixed;
  bottom: 120px;
  right: 20px;
  z-index: 99;

  &__msg {
    background: #802437;
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 10px;

    &__icon{
      transform: rotate(90deg);
    }

    &__sharing-block{
      position: absolute;
      top: -105px;
      right: 0;
      border-radius: 4px;
      max-width: 200px;
      height: auto;
      background: #fff;
      z-index: 111;
      padding: 20px;
      border: #B4A4A9 1px solid;
      -webkit-box-shadow: 5px 20px 40px 0px rgba(34,10,18,0.1);
      -moz-box-shadow: 5px 20px 40px 0px rgba(34,10,18,0.1);
      box-shadow: 5px 20px 40px 0px rgba(34,10,18,0.1);
      .inner-content{
        width: 100%;
        height: 100%;
        position: relative;
          &:after{
            content: '';
            position: absolute;
            width: 15px;
            height: 15px;
            bottom: -28px;
            background: #fff;
            border-bottom: #B4A4A9 1px solid;
            transform: rotate(-45deg);
            right: -7px;
            z-index: 0;
            border-left: #B4A4A9 1px solid;
        }
      }
       &__headline {
         color: #B4A4A9;
         font-size: 14px;
         font-family: 'Corporate S Pro Bold';
         margin-bottom: 7px;
         color: #B4A4A9;
         letter-spacing: .7px;
       }
      .close-btn{
          position: absolute;
          top: 10px;
          right: 10px;
        }
       &__iconsbox{
         display: flex;
         justify-content: flex-start;
         align-items: center;
          li {
            margin-right: 20px;
            a>svg{
              width: 23px !important;
              height: 23px !important;
              color: #C3B6BA;
              transition: .2s ease-in-out;
            }

            &:last-child {
              margin-right: 0;
            }

            &:hover {
              a {
                svg {
                  transform: scale(1.15);
                  color: #210A12;
                }
              }
            }

            @include respond-below(xl) {
              margin-right: 12px;
            }
          }
       }
    }
  }

  @include respond-below(md) {
    right: 0;
  }
}
</style>
