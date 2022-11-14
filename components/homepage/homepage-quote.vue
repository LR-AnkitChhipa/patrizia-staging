<template>
  <section class="blockquote-section" :class="{'shadows' : slice.primary.add_depth === true}">
    <b-container class="blockquote">
      <b-row>
        <b-col md="6" lg="8" sm="12">
          <blockquote class="blockquote__quote">
              <prismic-rich-text v-if="slice.primary.quote_text" :field="slice.primary.quote_text" class="blockquote__quote__inner" />
          </blockquote>
        </b-col>
        <b-col lg="4" md="6" sm="12" class="blockquote__person">
          <div class="blockquote__person__inner">
            <div class="blockquote__person__image" v-if="slice.primary.quote_person_image">
              <prismic-image :image="slice.primary.quote_person_image" />
            </div>
            <div class="blockquote__person__content">
              <p class="blockquote__person__name" v-if="slice.primary.quote_person_name">
                {{ slice.primary.quote_person_name }}
              </p>
              <p class="blockquote__person__subtitle" v-if="slice.primary.quote_job_title_company">
                {{ slice.primary.quote_job_title_company }}
              </p>
            </div>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </section>
</template>

<script>
import PrismicImage from "@/components/prismic-image";
export default {
  name: 'HomepageQuote',
  components: {PrismicImage},
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
}
</script>

<style lang="scss">
.blockquote-section {
  &.shadows{
    -webkit-box-shadow: 0px 40px 30px 0px rgba(34,10,18,0.1);
    -moz-box-shadow: 0px 40px 30px 0px rgba(34,10,18,0.1);
    box-shadow: 0px 40px 30px 0px rgba(34,10,18,0.1);
  }
}

.blockquote {
  padding: {
    top: 100px;
    bottom: 100px;
  }
  position: relative;
  @include respond-below(sm) {
    padding: {
      top: 40px;
      bottom: 50px;
    }
  }

  &__person {
    &:after {
      position: absolute;
      top: 17px;
      right: -20px;
      content: '';
      width: 37px;
      height: 28px;
      background: {
        image: url("/images/logo-only.svg");
        position: center;
        size: contain;
        repeat: no-repeat;
      };
    }
    @include respond-below(md){
      &:after {
        right: 25px
      }
    }
    &__inner{
      @include respond-below(md){
        padding-right: 50px;
      }
    }
  }

}
</style>
