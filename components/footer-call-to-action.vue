<template>
  <section class="footer-cta" v-if="footerDownloadCta">

    <b-container>
      <b-row class="footer-cta__container" :style="containerStyle">
        <b-col md="6" class="footer-cta__image">
          <div class="footer-cta__image__container">
            <prismic-image :image="footerDownloadCta.data.image"/>
          </div>
        </b-col>

        <b-col md="6" class="footer-cta__content">
          <div class="footer-cta__content__inner">
            <p class="subline" v-if="footerDownloadCta.data.subline">
              {{ footerDownloadCta.data.subline }}
            </p>
            <p class="h2 footer-cta__content__title" v-if="footerDownloadCta.data.title">
              {{ footerDownloadCta.data.title[0].text }}
            </p>
            <button-link
              :prismic-link-object="footerDownloadCta.data.button_link"
              :label="footerDownloadCta.data.button_text" size="regular"
              button-style="whiteborder"
            />
          </div>
        </b-col>
      </b-row>
    </b-container>
  </section>
</template>

<script>
import ButtonLink from '@/components/buttons/button-link'
import PrismicImage from "@/components/prismic-image";

export default {
  name: 'FooterCallToAction',
  components: {PrismicImage, ButtonLink},
  computed: {
    /**
     * Get the container style object
     */
    containerStyle() {
      const style = {}
      if (this.footerDownloadCta && this.footerDownloadCta.data.background_image) {
        const backgroundImage = this.getImageUrl(this.footerDownloadCta.data.background_image, 1500, 1500)
        style.backgroundImage = `url('${backgroundImage}')`
      }
      return style
    },
    footerDownloadCta() {
      let footerDownloadCtaId = null
      // From the document level
      if (this.$store.state.prismicDoc.data.footer_call_to_action) {
        footerDownloadCtaId = this.$store.state.prismicDoc.data.footer_call_to_action.id
      } else if (this.$store.state.globalContent.footer_downloads_cta) { // From the global CMS level
        footerDownloadCtaId = this.$store.state.globalContent.footer_downloads_cta.id
      }
      if (footerDownloadCtaId) {
        return this.getPrismicDocById(footerDownloadCtaId)
      } else {
        return null
      }
    }
  }
}
</script>

<style lang="scss">
.footer-cta {
  margin-top: 38px;
  height: 400px;

  &__container {
    height: 300px;
    box-shadow: 0 30px 50px rgba(164, 73, 147, 0.3);
    background: {
      repeat: no-repeat;
      size: cover;
    };
    @include respond-below(xl) {
      overflow: hidden;
    }
  }

  &__image {
    position: relative;

    &__container {
      position: absolute;
      top: -21px;
      left: 70px;
      width: 358px;
      height: 253px;
      transform: rotate(-5deg);
      box-shadow: 5px 20px 50px rgba(34, 10, 18, 0.2);
      @include respond-below(md) {
        left: 40px;
        width: 250px;
        height: 250px;
      }

      img {
        width: 100%;
        height: auto;
      }
    }

    @include respond-below(sm) {
      display: none;
    }
  }

  &__content {
    display: flex;
    align-items: center;

    &__inner {
      .subline {
        margin-bottom: 30px;
        color: white;
      }

      .footer-cta__content__title {
        color: white;
        margin-bottom: 34px;
      }

      @include respond-below(sm) {
        .subline {
          margin-bottom: 15px;
        }
        .footer-cta__content__title {
          margin-bottom: 20px;
        }
      }
    }
  }

  @include respond-below(md) {
    height: auto;
  }
}
</style>
