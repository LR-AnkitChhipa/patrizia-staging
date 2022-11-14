<template>
  <section class="next-steps" :style="blockStyle">
    <b-container>
      <b-row>
        <b-col class="next-steps__header">
          <prismic-rich-text v-if="blockData.title" :field="blockData.title" />
          <prismic-rich-text v-if="blockData.content" :field="blockData.content" />
        </b-col>
      </b-row>
      <b-row class="next-steps__cards justify-content-start">
        <template v-for="(card, i) in blockData.step_block">
          <b-col :key="i" cols="12" :lg="lgsize()" md="6" class="next-steps__cards__card">
            <div class="next-steps__cards__card__inner">
              <header
                :style="'background-image: url(' + card.header_image.url +')'"
                class="next-steps__cards__card__header"
              >
                <div>
                  <inline-svg
                    :src="card.icon.url"
                    class="next-steps__cards__card__header__icon"
                  />
                  <prismic-rich-text :field="card.step_title" class="next-steps__cards__card__header__title" />
                </div>
              </header>
              <article class="typography next-steps__cards__card__content">
                <prismic-rich-text :field="card.step_content" />
              </article>
              <footer class="next-steps__cards__card__footer">
                <button-link
                  :label="card.step_button_link_text"
                  :url="getPrismicLink(card.step_link)"
                  button-style="primary primary--style1"
                  button-size="regular"
                />
              </footer>
            </div>
          </b-col>
        </template>
      </b-row>
    </b-container>
  </section>
</template>

<script>
import ButtonLink from '@/components/buttons/button-link'

export default {
  name: 'NextSteps',
  components: { ButtonLink },
  data () {
    return {
      blockData: {}
    }
  },
  computed: {
    blockStyle () {
      if (this.blockData.background_image) {
        return {
          backgroundImage: 'url(' + this.blockData.background_image.url + ')'
        }
      }
      return {}
    }
  },
  mounted () {
    // Make the next steps block data available here
    this.blockData = this.$store.state.nextStepsBlock
  },
  methods: {
    lgsize () {
      if (this.blockData.step_block.length > 3) {
        return 6
      }
      return 4
    }
  }
}
</script>

<style lang="scss">
.next-steps {
  padding: 100px 0;
  margin-bottom: 100px;
  background: {
    size: cover;
    position: center;
    repeat: no-repeat;
  };
  @include respond-below(sm) {
    padding: 30px 0;
    margin-bottom: 40px;
  }

  &__cards {
    margin-top: 67px;
    height: 100%;
    align-items: stretch;

    @include respond-below(sm) {
      margin-top: 15px;
    }

    &__card {
      margin-bottom: 30px;

      &__inner {
        background-color: white;
        box-shadow: 0 30px 50px rgba(106, 198, 241, 0.3);
        height: 100%;
        margin: auto;
      }

      &__header {
        height: 220px;
        display: flex;
        align-items: center;
        justify-content: space-around;
        background-repeat: no-repeat;
        background-size: cover;

        > div {
          text-align: center;
        }

        &__title {
          h2, h3, h4 {
            color: white;
            font-family: "Georgia Pro Semibold";
            font-size: 18px;
            line-height: 21px;
            margin-top: 17px;
            margin-bottom: 0;
          }

        }
      }

      &__content {
        padding: 20px 20px 0;
      }

      &__footer {
        padding: 0 20px 20px;
      }
      @include respond-below(md){
        margin-bottom: 30px;
      }
    }
  }
}
</style>
