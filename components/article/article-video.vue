<template>
  <div id="articlevideo" :id="slugify(slice.primary.navigation_title)">
    <div class="overlay"/>
    <div data-v-0d1f83e0="" class="embed-responsive embed-responsive-16by9" v-html="embedHtml">

    </div>
    <div class="text">
      <p v-if="slice.primary.video_subline">{{ slice.primary.video_subline }}</p>
      <h3 v-if="slice.primary.video_title">{{ slice.primary.video_title }}</h3>
    </div>

    <!-- <img v-bind:src='poster' alt="" width="100%"> -->
  </div>
</template>

<script>
export default {
  name: 'ArticleVideo',
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
  computed: {
    embedHtml() {
      try {
        return this.slice.primary.video_embed_url.html
      } catch (ex) {
        return null
      }
    },
    source() {
      try {
        return this.slice.primary.video_embed_url.embed_url
      } catch (ex) {
        return null
      }
    },
    height() {
      try {
        return this.slice.primary.video_embed_url.height
      } catch (ex) {
        return null
      }
    }
  }
}
</script>

<style lang="scss" scoped>
#articlevideo {
  position: relative;
  margin-bottom: 50px;

  .overlay {
    width: 100%;
    position: absolute;
    height: 30%;
    bottom: 0;
    z-index: 9;
    background: rgb(2, 0, 36);
    background: linear-gradient(0deg, rgba(2, 0, 36, 0.6979166666666667) 0%, rgba(0, 0, 0, 0) 100%);
  }

  .text {
    position: absolute;
    bottom: 20px;
    color: #fff;
    z-index: 10;
    left: 40px;

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
