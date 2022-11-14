<template>
  <section class="city-local-expert">
    <b-container>
      <b-row>
        <b-col cols="12" lg="9" md="8">
          <h2>Your local expert</h2>
          <div class="local-expert-content typography" v-if="slice.primary.blockquote_text">
            <prismic-rich-text :field="slice.primary.blockquote_text"/>
            <p class="local-expert-content__quotee" v-if="slice.primary.blockquote_by">
              {{ slice.primary.blockquote_by }}
              <span v-if="slice.primary.local_expert_content_person_job_title"><br>{{slice.primary.local_expert_content_person_job_title}}</span>
            </p>
          </div>
        </b-col>
        <b-col cols="12" lg="3" md="4">
          <city-local-expert-detail/>
        </b-col>
      </b-row>
    </b-container>
  </section>
</template>

<script>
import CityLocalExpertDetail from "@/components/city-local-expert-detail";

export default {
  name: 'CityLocalExpert',
  props: {
    slice: {
      type: Object,
      default() {
        return null
      }
    }
  },
  components: {CityLocalExpertDetail}
}
</script>

<style lang="scss">
.city-local-expert {
  background: url('~@/assets/img/local-ex-bg.jpg') no-repeat;
  background-color: white;
  background-size: cover ;
  background-position: center;
  background-repeat: no-repeat;

  .container {
    padding-top: 100px;
    padding-bottom: 100px;

    .row {

      .local-expert-content {
        margin-bottom: 55px;
        padding: 0 0 13px 0;
        width: 430px;

        &.typography {
          li {
            border-bottom: 0;
            line-height: 1.5;
          }
        }

        &__quote {
          p {
            font-family: "Georgia Pro Semibold", Fallback, sans-serif;
            color: #29B5BA;
            font-size: 18px;
            line-height: 26px;
            margin-bottom: 28px;
          }
        }

        &__quotee {
          color: #802437;
          font-family: "Corporate S Pro Bold";
          margin: 0;

          span {
            font-family: "Corporate S Pro";
          }
        }

        @include respond-below(md) {
          width: 80%;
        }
        @include respond-below(sm) {
          width: 100%;
        }
      }

      #contactarticle {
        h3 {
          display: none;
        }
      }
    }
  }
}
</style>
