<template>
  <section class="city-infographic-cta">
    <b-container class="absolute-top">
      <div id="city-infographic-cta" class="desaturate city-infographic-cta__container" :style="getBackgroundImage">
        <div class="city-infographic-cta__container__overlay" />
        <div class="city-infographic-cta__container__content">
          <prismic-rich-text :field="slice.primary.description" />
          <prismic-rich-text :field="slice.primary.title_of_banner" />
          <span v-if="slice.primary.button_link.url" @click.stop.prevent="showViewer">
            <button-link button-size="regular" button-style="whiteborder" :label="slice.primary.button_label[0].text" :url="slice.primary.button_link.uid" />
          </span>
          <span v-else>
            <button-link button-size="regular" button-style="whiteborder" :label="slice.primary.button_label[0].text" :url="slice.primary.button_link.uid" />
          </span>
        </div>
      </div>
    </b-container>
    <div id="inforgraphicmodal">
      <!-- <viewer
          :options='options'
          @inited='inited'
          class='viewer'
          ref='viewer'
        >
        <template slot-scope="scope" v-if="slice.primary.button_link.url">
          <img :src="slice.primary.button_link.url" class="image-modal">
        </template>
        </viewer> -->
      <div
        v-viewer="{
          inline: false,
          button: true,
          navbar: false,
          title: false,
          toolbar: true,
          tooltip: false,
          movable: true,
          zoomable: true,
          rotatable: false,
          scalable: false,
          transition: true,
          fullscreen: true,
          keyboard: false
        }"
        class="images"
      >
        <img :src="slice.primary.button_link.url" class="image-modal">
      </div>
    </div>
  </section>
</template>

<script>
import ButtonLink from '@/components/buttons/button-link'

export default {
  name: 'CityInfographicCta',
  components: { ButtonLink },
  props: {
    slice: {
      type: Object,
      default () {
        return {}
      }
    },
    sliceIndex: {
      type: Number,
      default () {
        return 0
      }
    }
  },
  computed: {
    getBackgroundImage () {
      if (this.slice.primary.image_banner) {
        return {
          backgroundImage: 'url(' + this.slice.primary.image_banner.url + ')'
        }
      } else {
        return false
      }
    }
  },
  methods: {
    inited (viewer) {
      this.$viewer = viewer
    },
    showViewer () {
      const viewer = this.$el.querySelector('.images').$viewer
      viewer.show()
    }
  }
}
</script>

<style lang="scss">
.city-infographic-cta {
  height: 300px;
  position: relative;
  &__container{
    background: url('~@/assets/img/city-overview-image.jpg') no-repeat;
    background-position: center center;
    background-size: cover;
    position: relative;
    overflow: hidden;
    z-index: 10;
    -webkit-box-shadow: 0px 30px 50px 0px rgba(41,181,186,0.3);
    -moz-box-shadow: 0px 30px 50px 0px rgba(41,181,186,0.3);
    box-shadow: 0px 30px 50px 0px rgba(41,181,186,0.3);
    &__overlay{
      width: 100%;
      height: 100%;
      background: #29b5bab6;
      position: absolute;
      left: 0;
      right: 0;
      z-index: 11;
    }
    &__content{
      position: relative;
      z-index: 12;
      text-align: center;
      padding: 124px;
      p{
        font-family: 'Corporate S Pro Bold';
        font-size: 14px;
        color: #fff;
        margin-bottom: 30px;
      }
      h2{
        color: #fff;
        margin-bottom: 35px;
      }
      @include respond-below(md){
        padding: 124px 10px;
      }
    }
  }
  .container{
    &.absolute-top{
      position: absolute;
      top: -200px;
      left: 0;
      right: 0;
    }
  }
  @include respond-below(md){
    height: 200px;
  }
  #inforgraphicmodal {
    img.image-modal {
      display: none;
    }
  }
}
</style>
