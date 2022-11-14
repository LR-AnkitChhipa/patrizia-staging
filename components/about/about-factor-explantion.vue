<template>
  <div class="about-data-factor" v-if="slice && slice.primary">
    <b-container>
      <b-row>
        <b-col class="about-data-factor__title-bar">
          <h3 v-if="slice.primary.data_factor_title">{{ slice.primary.data_factor_title }}</h3>
          <p v-if="slice.primary.data_factor_subline">{{ slice.primary.data_factor_subline }}</p>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <div class="about-data-factor__content-area">
            <nav class="about-data-factor__content-area__tabs">
              <span v-for="title in titles" :key="title">
                <button
                  href="#"
                  :class="'about-data-factor__content-area__tabs__tab' + (activeTab === title ? ' active' : '')"
                  @click.prevent="activeTab = title"
                >{{ getFactorTabTitle(title) }}
                </button>
              </span>
            </nav>
            <template v-for="(title, i) in titles">
              <div v-if="activeTab === title" :key="title + '-' + i" class="about-data-factor__content-area__content">
                <div class="about-data-factor__content-area__content__chart">
                  <about-factor-explanation-animated-pie
                    v-if="title.toLowerCase() === 'demographics'"
                    :data="[12, 12, 12, 12, 12, 12, 12, 12, 12]"
                    :colours="['#29B5BA', '#51D5DB', '#7CDFE4', '#A8EAED', '#D3F4F6', '#B4A4A9', '#C3B5B9', '#D2C7CA', '#E1DADC']"
                    cluster-name="demographics"
                  />

                  <about-factor-explanation-animated-pie
                    v-if="title.toLowerCase() === 'innovation'"
                    :data="[25, 18, 14, 18, 25]"
                    :colours="['#A44993', '#B66EA9', '#C892BF', '#DAB7D4', '#ECDAE9']"
                    cluster-name="innovation"
                  />

                  <about-factor-explanation-animated-pie
                    v-if="title.toLowerCase() === 'connectivity'"
                    :data="[22, 20, 16, 20, 22]"
                    :colours="['#F29131', '#F4A759', '#F7BD83', '#FAD3AC', '#FCE9D6']"
                    cluster-name="connectivity"
                  />

                  <about-factor-explanation-animated-pie
                    v-if="title.toLowerCase() === 'economics'"
                    :data="[12, 12, 12, 12, 12, 12, 12, 12]"
                    :colours="['#0AC6F1', '#89D2F5', '#A6DDF7', '#C3E8F9', '#E1F3FC', '#B4A4A9', '#C3B5B9', '#D2C7CA']"
                    cluster-name="economics"
                  />
                </div>
                <div class="about-data-factor__content-area__content__text">
                  <p class="heading">{{ getFactorContentTitle(title) }}</p>
                  <div class="accordion" role="tablist">
                    <div v-for="(text, index) in getFactorContent(title)" :key="text + index">
                      <b-button v-b-toggle="'accordion-item-data-factors-' + index">
                        <div class="content">
                          <span class="round" :style="'background-color:'+ text.color +';' " />
                          <span class="text">{{ text.title }}</span>
                        </div>
                      </b-button>
                      <b-collapse
                        :id="'accordion-item-data-factors-' + index"
                        :visible="index === 0"
                        accordion="about-accordion"
                        class="accordion-desc"
                      >
                        <prismic-rich-text :field="text.content"/>
                      </b-collapse>
                    </div>
                  </div>
                </div>
              </div>
            </template>
          </div>
          <callout
            v-if="slice.primary.data_factor_call_to_action_text && slice.primary.data_factor_call_to_action_button_text && slice.primary.data_factor_call_to_action_link"
            cta-style="primary"
            :text="slice.primary.data_factor_call_to_action_text"
            :button-label="slice.primary.data_factor_call_to_action_button_text"
            :button-url="slice.primary.data_factor_call_to_action_link"
          />
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import Callout from '@/components/callout'
import AboutFactorExplanationAnimatedPie from "@/components/about/about-factor-explanation-animated-pie";

export default {
  name: 'AboutFactorExplanation',
  components: {
    AboutFactorExplanationAnimatedPie,
    Callout
  },
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
  data() {
    return {
      titles: [
        'Demographics', 'Innovation', 'Economics', 'Connectivity'
      ],
      activeTab: 'Demographics'
    }
  },
  methods: {
    getFactorTabTitle(factor_slug) {
      const key = `data_factors_${factor_slug.toLowerCase()}_title`
      try {
        return this.$store.state.globalContent[key]
      } catch (ex) {
        return null
      }
    },
    getFactorContentTitle(factor_slug) {
      const key = `data_factors_${factor_slug.toLowerCase()}_factors_title`
      try {
        return this.$store.state.globalContent[key]
      } catch (ex) {
        return null
      }
    },
    getFactorContent(factor_slug) {
      const key = `data_factors_${factor_slug.toLowerCase()}_factors`
      try {
        return this.$store.state.globalContent[key]
      } catch (ex) {
        return null
      }
    },
    getFactorImage(factor_slug) {
      const key = `data_factors_${factor_slug.toLowerCase()}_image`
      try {
        return this.$store.state.globalContent[key].url
      } catch (ex) {
        return null
      }
    }
  }
}
</script>

<style lang="scss">
.about-data-factor {
  background-color: #6AC6F1;
  padding: 130px 0 51px;
  background: {
    image: url("/images/about-data-bg.jpg");
    size: 150%;
    position: top;
    repeat: no-repeat;
  };
  @include respond-below(sm){
    background-size: cover;
  }

  &__title-bar {
    padding-bottom: 50px;
    text-align: center;

    &__title {
    }
  }

  &__content-area {
    background-color: white;

    &__tabs {
      padding: 0;
      display: flex;
      align-items: center;
      @include respond-below(sm) {
        padding: 0 10px;
        max-width: 270px;
        margin: 0 auto;
      }

      &__tab {
        border: 0;
        background-color: transparent;
        border-radius: 0;
        margin-left: 30px;
        height: 75px;
        border-bottom: 2px solid transparent;
        color: #B4A4A9;
        font-size: 14px;
        font-family: "Corporate S Pro Bold", Fallback, sans-serif;
        line-height: 16px;
        padding: 0;
        letter-spacing: 0.074em;
        text-transform: uppercase;
        margin-bottom: -2px;
        @include respond-below(sm) {
          height: 50px;
          margin-left: 10px;
          margin-right: 10px;
        }

        &.active {
          border-bottom: 2px solid #802437;
          color: #802437;
        }
      }

      @include respond-below(md) {
        flex-wrap: wrap;
        justify-content: center;
      }
    }

    &__content {
      padding: 51px 30px;
      display: flex;
      background-color: #FCFBFB;
      border-top: 2px solid #F5F3F4;

      &__chart {
        flex: 0 0 398px;
        margin-right: 32px;
        min-height: 398px;
      }

      &__text {
        flex: 1 1 auto;

        p.heading {
          margin-bottom: 10px;
          color: #9C3F57;
          font-family: 'Corporate S Pro Bold';
        }

        .accordion {
          button {
            .content {
              display: flex;
              align-items: center;
              padding-top: 7px;

              span {
                display: block;
              }

              .round {
                position: relative;
                background: #29B5BA;
                width: 10px;
                height: 10px;
                border-radius: 50%;
                margin-right: 10px;
              }
            }
          }
        }
      }

      @include respond-below(md) {
        flex-direction: column;
        justify-content: center;
        align-items: center;
        &__chart {
          margin: auto;
          margin-bottom: 40px;
          flex: 1;
          width: 100%;
          min-height: 320px;

          svg {
            width: 100%;
            height: auto;
          }
        }
      }
    }

    &__cta {

    }

  }
}
</style>
