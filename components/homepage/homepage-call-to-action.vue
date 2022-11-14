<template>
  <client-only>
    <intersect @enter="playSvgs" @leave="resetSvgs">
      <b-container fluid class="homepage-cta" v-if="slice">
        <inline-svg :src="require('@/assets/img/homepage/cta-image-1.svg')" id="homepage-cta-image-1"
                    @loaded="animateSvg($event, 0)"/>
        <inline-svg :src="require('@/assets/img/homepage/cta-image-2.svg')" id="homepage-cta-image-2"
                    @loaded="animateSvg($event, -300)"/>
        <b-container>
          <b-row>
            <b-col class="homepage-cta__col">
              <div class="homepage-cta__col__innerdiv">
                <h2 class="homepage-cta__col__innerdiv__heading" v-if="slice.primary.cta_title">
                  {{ slice.primary.cta_title }}
                </h2>
                <prismic-rich-text :field="slice.primary.cta_content" class="mb-4"
                                   v-if="slice.primary.cta_content"/>
                <div class="homepage-cta__buttons">
                  <div class="homepage-cta__buttons__button">
                    <button-link button-size="regular" button-style="primary primary--style1"
                                 :label="slice.primary.cta_button_text"
                                 v-if="slice.primary.cta_button_link && slice.primary.cta_button_text"
                                 :prismic-link-object="slice.primary.cta_button_link"/>
                  </div>
                  <div class="homepage-cta__buttons__button">
                    <text-link v-if="slice.primary.cta_text_link && slice.primary.cta_text_link_text"
                               :prismic-link-object="slice.primary.cta_text_link"
                               :text="slice.primary.cta_text_link_text"
                               link-style="primary"/>
                  </div>
                </div>
              </div>
            </b-col>
          </b-row>
        </b-container>
      </b-container>
    </intersect>
  </client-only>
</template>

<script>
import ButtonLink from '@/components/buttons/button-link'
import TextLink from '@/components/text-link'
import Vivus from 'vivus'

export default {
  name: 'HomepageCallToAction',
  props: {
    slice: {
      type: Object,
      default() {
        return null
      }
    },
    sliceIndex: {
      type: Number,
      default() {
        return 0
      }
    }
  },
  data() {
    return {
      vivusSvgs: []
    }
  },
  components: {ButtonLink, TextLink},
  mounted() {

  },
  methods: {
    animateSvg(element) {
      try {
        let duration = 200
        if (element.id === 'homepage-cta-image-1') {
          duration = 50
        }
        const vivusSvg = new Vivus(element.id, {duration: duration, method: 'manual'});
        this.vivusSvgs.push(vivusSvg)
      } catch (ex) {
      }
    },
    playSvgs() {
      this.vivusSvgs.forEach((item) => {
        item.play()
      })
    },
    resetSvgs() {
      this.vivusSvgs.forEach((item) => {
        item.reset()
      })
    }
  }
}
</script>

<style lang="scss">
.homepage-cta {
  background-color: #F0F0F0;
  position: relative;
  z-index: 2;
  overflow: hidden;

  #homepage-cta-image-1 {
    position: absolute;
    width: 66vw;
    height: 66vw;
    top: -33vw;
    left: -33vw;
    z-index: 1;
  }

  #homepage-cta-image-2 {
    position: absolute;
    width: 66vw;
    height: 66vw;
    bottom: -33vw;
    left: 66vw;
    z-index: 1;
  }

  &__buttons {

    &__button {
      a {
        margin-bottom: 16px;
      }

      &:last-child {
        a {
          margin-bottom: 0;
        }
      }
    }
  }

  &__col {
    min-height: 664px;
    display: flex;
    align-items: center;
    text-align: center;
    margin: auto;
    max-width: 552px;
    width: 100%;
    position: relative;
    z-index: 3;

    &__innerdiv {
      &__heading {
        padding: 0 40px;
        margin-bottom: 30px;
        @include respond-below(sm) {
          padding: 0 0;
        }
      }

      p {
        text-align: center;
      }

      a {
        &.primarylink {
          display: block;
          width: 300px;
          margin: auto;
          margin-top: 20px;
          @include respond-below(sm) {
            width: 100%;
          }
        }
      }
    }

    @include respond-below(sm) {
      min-height: auto;
      padding: 2rem 0;
    }
  }
}
</style>
