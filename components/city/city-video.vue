<template>
  <b-container id="cityevideo">
    <b-row>
      <div class="col p-0 position-relative">
        <div class="overlay"/>
        <!-- <prismic-embed prismic-embed :field="slice.primary.video_ref" /> -->
        <div class="embed-responsive embed-responsive-16by9" v-html="slice.primary.video_ref.html"/>
        <div v-if="hasText" class="text">
          <prismic-rich-text :field="slice.primary.video_text"/>
        </div>
      </div>
    </b-row>
  </b-container>
</template>

<script>
const VueScrollTo = require('vue-scrollto')

export default {
  name: 'CityeVideo',
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
  mounted() {
    if (process.client) {
      const hash = location.hash.replace('#', '')
      if (hash && hash !== 'expert') {
        setTimeout(() => {
          VueScrollTo.scrollTo(
            `#cityevideo`,
            500,
            {
              duration: 500,
              easing: 'linear',
              offset: -150,
              force: true,
              cancelable: true,
              x: false,
              y: true
            }
          )
        }, 500)
      }
    }
  },
  computed: {
    hasText() {
      try {
        if (this.slice.primary.video_text[0].text) {
          return true
        }
        return false
      } catch (e) {
        return false
      }
    }
  }
}
</script>

<style lang="scss">
#cityevideo {
  margin-bottom: 50px;
  @include respond-below(sm) {
    margin-bottom: 30px;
  }

  .overlay {
    width: 100%;
    position: absolute;
    height: 30%;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 9;
    background: rgb(2, 0, 36);
    background: linear-gradient(0deg, rgba(2, 0, 36, 0.6979166666666667) 0%, rgba(0, 0, 0, 0) 100%);
    @include respond-below(sm) {
      display: none;
    }
    @include respond-below(sm) {
      display: none;
    }
  }

  .embed-responsive {
    @include respond-below(sm) {
      width: 90%;
      margin: auto;
    }
  }

  .text {
    position: absolute;
    bottom: 20px;
    color: #fff;
    z-index: 10;
    left: 40px;
    @include respond-below(sm) {
      display: none;
    }

    p {
      position: relative;
      color: #fff;
      font-family: 'Corporate S Pro bold';
      letter-spacing: .7px;
      text-transform: uppercase;
      margin-bottom: 1rem;

      &::before {
        content: '';
        background: #fff;
        width: 30px;
        height: 2px;
        position: absolute;
        left: -40px;
        top: 48%;
        transform: translateY(-50%);
        z-index: 10;
      }
    }

    h3 {
      color: #fff;
    }

    @include respond-below(sm) {
      bottom: 0;
    }
  }
}
</style>
