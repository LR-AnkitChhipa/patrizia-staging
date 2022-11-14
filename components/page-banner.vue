<template>
  <div>
    <div class="container-fluid p-0">
      <div v-if="$store.state.prismicDoc" class="banner" :class="{topbarmargin : showCityTopbarSection}"
           :style="bannerStyle">
        <div class="banner__overlay"/>
        <img src="@/assets/img/patrizia-logo-banner.png" alt="patrizia" class="banner__patrizia-brand">
        <client-only>
          <div v-if="vimeoVideoId || youtubeVideoId" class="banner__vimeo-wrapper">
            <iframe
              v-if="vimeoVideoId"
              :src="`https://player.vimeo.com/video/${vimeoVideoId}?background=1&autoplay=1&loop=1&byline=0&title=0&quality=1080p`"
              frameborder="0"
              webkitallowfullscreen
              mozallowfullscreen
              allowfullscreen
            />
            <youtube
              v-if="youtubeVideoId"
              ref="pageannerYT"
              :video-id="youtubeVideoId"
              :player-vars="{
                autoplay: 1,
                mute: 1,
                loop: 1,
                controls: 0,
                vq: 'hd1080',
                playsinline: 1,
                playlist: youtubeVideoId
              }"
              @ready="playYouTubeVideo()"
            />
          </div>
        </client-only>
        <!-- https://www.youtube.com/embed/VQttXb6qE6k?autoplay=1&mute=1&loop=1&controls=0&playlist=VQttXb6qE6k -->
        <div class="container banner__page-title">
          <p v-if="subline" v-html="subline"/>
          <h1> {{ title }}</h1>
          <city-topbar-section v-if="showCityTopbarSection"/>
        </div>
      </div>

      <div v-else
           class="banner"
           :class="{topbarmargin : showCityTopbarSection}"
           :style="bannerStyle"
      >
        <div class="banner__overlay"/>
        <img src="@/assets/img/patrizia-logo-banner.png" alt="patrizia" class="banner__patrizia-brand">
        <div class="container banner__page-title">
          <p v-if="subline">
            {{ subline }}
          </p>
          <h1 v-if="title">
            {{ title }}
          </h1>
          <city-topbar-section v-if="showCityTopbarSection"  :is-featured-city="!isNonFeaturedCityBanner"/>
        </div>
      </div>
    </div>
    <b-container>
      <Breadcrumb v-if="showBreadcrumb" :breadcrumbitems="{items}"/>
    </b-container>
  </div>
</template>

<script>
import Breadcrumb from '~/components/breadcrumb'
import CityTopbarSection from '@/components/city/city-topbar-section'

export default {
  name: 'PageBanner',
  components: {Breadcrumb, CityTopbarSection},
  props: {
    /**
     * isNonFeaturedCityBanner used to define if this is a banner on a non-featured city page
     */
    isNonFeaturedCityBanner: {
      type: Boolean,
      default() {
        return false
      }
    },
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
    },
    showBreadcrumb: {
      type: Boolean,
      default() {
        return true
      }
    },
    showCityTopbarSection: {
      type: Boolean,
      default() {
        return false
      }
    }
  },
  data() {
    return {
      items: [
        {text: 'European City Pulse', to: '/'},
        {
          text: this.slice.primary ? this.slice.primary.page_banner_title : this.$route.params.uid,
          to: {name: this.$route.params.uid},
          active: true
        }
      ]
    }
  },
  mounted() {
  },
  methods: {
    playYouTubeVideo() {
      const player = this.$refs.pageannerYT.player
      if (player) {
        player.playVideo()
      }
    }
  },
  // Added Props for text mutation
  computed: {
    /**
     * Get Vimeo video ID
     */
    vimeoVideoId() {
      try {
        if (this.slice.primary) {
          if (this.slice.primary.background_video !== null && this.slice.primary.background_video !== {} && this.slice.primary.background_video.provider_name === 'vimeo') {
            return this.slice.primary.background_video.video_id
          } else {
            return null
          }
        } else {
          return null
        }
      } catch (ex) {}
      return null
    },
    /**
     * Get YouTube video ID
     * @returns {boolean|*}
     */
    youtubeVideoId() {
      try {
        if (this.slice.primary) {
          if (this.slice.primary.background_video !== null && this.slice.primary.background_video !== {} && this.slice.primary.background_video.provider_name === 'YouTube') {
            const ParsedUrl = this.slice.primary.background_video.embed_url
            const getId = /[^/]*$/.exec(ParsedUrl)[0]
            // console.log(getId)
            return getId
          } else {
            return null
          }
        } else {
          return null
        }
      } catch (ex) {
        return null
      }
    },
    title() {
      try {
        return this.slice.primary.page_banner_title
      } catch (e) {

      }
      return null
    },
    subline() {
      try {
        return this.slice.primary.page_banner_subline
      } catch (e) {

      }
      return null
    },
    bannerStyle() {
      // If this is a non-featured city page, get a random banner image
      let backgroundImageUrl
      if (this.isNonFeaturedCityBanner) {
        function getRandomInt(max) {
          return Math.floor(Math.random() * Math.floor(max));
        }

        backgroundImageUrl = `/images/non-featured-city-banners/${getRandomInt(4)}.jpg`

      } else if (!this.vimeoVideoId && !this.youtubeVideoId && this.slice.primary && this.slice.primary.page_banner_image) {
        try {
          backgroundImageUrl = this.slice.primary.page_banner_image.url
        } catch (e) {
          console.log(e)
        }
      }

      if (backgroundImageUrl) {
        return {
          backgroundImage: 'url("' + backgroundImageUrl + '")'
        }
      } else {
        return {
          backgroundImage: 'url("../images/main-banner.jpg")'
        }
      }
      return null
    }
  }
}
</script>

<style lang="scss">
.banner {
  min-height: 460px;
  background: url("../static/images/main-banner.jpg");
  background-position: center center;
  background-size: cover;
  position: relative;
  display: flex;
  align-items: flex-end;
  margin-bottom: 3rem;

  &.topbarmargin {
    margin-bottom: 7rem;
    min-height: 620px;
    @include respond-below(sm) {
      margin-bottom: 230px;
    }
  }

  &__overlay {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgb(0, 0, 0);
    background: linear-gradient(
        353deg,
        rgba(0, 0, 0, 0.5) 30%,
        rgba(122, 35, 52, 0.5) 100%
    );
    z-index: 5;
  }

  &__patrizia-brand {
    position: absolute;
    right: 0;
    bottom: -1px;
    opacity: .8;
    z-index: 4;
  }

  &__page-title {
    margin-bottom: 4rem;
    z-index: 9;
    color: #fff;
    @include respond-below(sm) {
      margin-bottom: 1rem;
    }

    p {
      text-transform: uppercase;
      font-size: 16px;
      line-height: 18px;
      margin-bottom: 1.5rem;
      letter-spacing: 2px;
      font-family: "Corporate S Pro bold", Fallback, sans-serif;
      color: #F0EDED;
      @include respond-below(sm) {
        margin-bottom: .5rem;
      }
    }

    h1 {
      margin-bottom: 10px;
      letter-spacing: 1px;
      color: #fff;
    }
  }

  &__vimeo-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    pointer-events: none;
    overflow: hidden;

    iframe {
      width: 100vw;
      height: 56.25vw; /* Given a 16:9 aspect ratio, 9/16*100 = 56.25 */
      min-height: 100vh;
      min-width: 177.77vh; /* Given a 16:9 aspect ratio, 16/9*100 = 177.77 */
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 1;
    }
  }

}

.b-content {
  font-size: 2.5rem;
  height: 40vh;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #892938;
}
</style>
