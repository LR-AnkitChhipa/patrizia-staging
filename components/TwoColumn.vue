<template>
  <section class="two-column-section" :class="{'divider' : slice.primary.add_divider === true}">
    <b-container :class="componentCssClass">
      <b-row>
        <b-col cols="12" md="6" class="two-column__content">
          <div class="two-column__content__inner">
            <p v-if="slice.primary.two_column_subline" class="subline subline--with-dash">
              {{ slice.primary.two_column_subline }}
            </p>
            <h2 v-if="slice.primary.two_column_title" class="two-column__content__title">
              {{ slice.primary.two_column_title }}
            </h2>
            <prismic-rich-text v-if="slice.primary.two_column_content" :field="slice.primary.two_column_content"/>
            <prismic-rich-text v-if="slice.primary.two_column_text_left" :field="slice.primary.two_column_text_left"/>
            <div v-if="slice.primary.two_column_button_link && slice.primary.two_column_button_text" class="two-column__content__button">
              <login-to-view-button
                v-if="slice.primary.two_column_button_link && slice.primary.two_column_button_text"
                :enabled="slice.primary.two_column_button_is_gated"
              >
                <button-link
                  v-if="slice.primary.two_column_button_link && slice.primary.two_column_button_text"
                  button-size="regular"
                  button-style="primary primary--style1"
                  :label="slice.primary.two_column_button_text"
                  :prismic-link-object="slice.primary.two_column_button_link"/>
              </login-to-view-button>
            </div>
          </div>
        </b-col>
        <b-col cols="12" md="6" class="two-column__quote" v-if="slice.slice_type === 'two_column_with_quote_block'">
          <div class="two-column__quote__inner">
            <div>
              <p class="subline--with-dash subline" v-if="slice.primary.two_column_quote_subline">{{slice.primary.two_column_quote_subline}}</p>
              <blockquote class="blockquote__quote">
                <prismic-rich-text v-if="slice.primary.two_column_quote_text" :field="slice.primary.two_column_quote_text" class="blockquote__quote__inner" />
              </blockquote>
            </div>
            <div class="blockquote__person">
              <div class="blockquote__person__inner">
                <div class="blockquote__person__image" v-if="slice.primary.two_column_quote_person_image">
                  <prismic-image :image="slice.primary.two_column_quote_person_image" />
                </div>
                <div class="blockquote__person__content">
                  <p class="blockquote__person__name" v-if="slice.primary.two_column_quote_person_name">
                    {{ slice.primary.two_column_quote_person_name }}
                  </p>
                  <p class="blockquote__person__subtitle" v-if="slice.primary.two_column_quote_job_title_company">
                    {{ slice.primary.two_column_quote_job_title_company }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </b-col>
        <b-col cols="12" md="6" :class="imageContainerCssClass" v-else-if="slice.primary.two_column_image">
          <div class="two-column__image__inner" :class="{'wd_100' : $store.state.prismicDoc.uid === 'amenities-magnet' }">
            <prismic-image v-if="slice.primary.two_column_image" :image="slice.primary.two_column_image"/>
          </div>
        </b-col>
        <b-col cols="12" md="6" :class="imageContainerCssClass" v-else-if="slice.primary.two_column_text_right">
          <prismic-rich-text :field="slice.primary.two_column_text_right" />
        </b-col>
      </b-row>
    </b-container>
  </section>
</template>

<script>
import PrismicImage from '@/components/prismic-image'
import ButtonLink from "@/components/buttons/button-link";
import LoginToViewButton from "@/components/login-to-view-button";
import global from "@/mixins/global";

export default {
  name: 'TwoColumn',
  mixins: [global],
  components: {LoginToViewButton, ButtonLink, PrismicImage},
  props: {
    slice: {
      type: Object,
      default() {
        return {
          primary: {}
        }
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
    componentCssClass() {
      let cssClass = 'two-column'
      if (
        this.slice.primary.two_column_layout && this.slice.primary.two_column_layout.toLowerCase() === 'content first'
        ||
        this.slice.slice_type === 'two_column_text_block'
      ) {
        cssClass += ' two-column--content-first'
      } else {
        cssClass += ' two-column--image-first'
      }

      try {
        cssClass += ` two-column--${this.slice.slice_type.toLowerCase()}`
      } catch (ex) {

      }
      return cssClass
    },
    imageContainerCssClass() {
      let cssClass = 'two-column__image'
      cssClass += (this.slice.primary.two_column_image_has_shadow ? ' two-column__image--with-shadow' : '')
      cssClass += (this.slice.primary.two_column_display_dots ? ' two-column__image--with-dots' : '')
      return cssClass
    }
  }
}
</script>

<style lang="scss">
.two-column-section {
  &.divider{
    border-bottom: 1px solid #F5F3F4;
  }
}

.two-column {
  margin: {
    top: 42px;
    bottom: 31px;
  }
  @include respond-below(sm) {
    margin: 20px auto;
  }

  &--two_column_text_block {
    .two-column__content {
      order: 1;

      p {
        strong {
          font-family: "Georgia Pro Semibold";
          color: #802437;
          line-height: 26px;
        }
      }
    }

    .two-column__image {
      order: 2;
      margin-top: 86px;

      @include respond-below(sm) {
        margin-top: 0;
      }
    }
  }

  &--image-first {
    .two-column {
      &__image, &__quote {
        order: 1;
      }

      &__content {
        order: 2;
      }
    }
  }

  &--content-first {
    .two-column {
      &__content {
        order: 1;
      }

      &__image, &__quote {
        order: 2;
      }
    }
  }

  &__quote {
    .subline {
      margin-bottom: 32px;
    }
  }

  &__image, &__quote {
    position: relative;
    margin-top: 48px;
    @include respond-below(sm) {
      margin-top: 10px;
    }

    &__inner {
      max-width: 420px;
      &.wd_100{
        max-width: 100%;
      }
    }

    img {
      z-index: 2;
      width: 100%;
      height: auto;
    }

    &--with-shadow {
      img {
        box-shadow: 5px 20px 50px rgba(34, 10, 18, 0.15);
      }
    }

    &--with-dots {
      .two-column__image__inner {
        max-width: 100%;
      }

      &:before {
        z-index: 1;
        content: '';
        display: block;
        position: absolute;
        width: 315px;
        height: 134px;
        top: -42px;
        left: -42px;
        background: {
          image: url("/images/bg-dots.svg");
          size: contain;
          repeat: no-repeat;
          position: top left;
        };
      }
    }
  }

  &__quote {
    margin-top: 166px;

    @include respond-below(sm) {
      margin-top: 1.2rem;
    }
  }

  &__content {
    margin-top: 48px;

    p {
      strong {
        font-family: "Corporate S Pro Bold";
      }
    }

    @include respond-below(sm) {
      margin-top: 0;
    }

    .subline {
      margin-bottom: 22px;
    }

    &__button {
      margin-top: 40px;
    }

    &__inner {
      max-width: 420px;
      @include respond-below(sm) {
        margin-top: 40px;
      }

      div{
        p {

        }
      }
    }
  }
}
</style>
