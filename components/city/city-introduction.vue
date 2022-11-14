<template>
  <section id="city-introduction" class="city-introduction">
    <b-container>
      <b-row>
        <b-col cols="12" lg="8" class="city-introduction__content">
          <prismic-rich-text v-if="isFeaturedCity" :field="slice.primary.city_content" />
          <div v-else>
            <h2>{{nonFeaturedCityTitle}}</h2>
            <p class="large-paragraph">{{nonFeaturedCityIntroduction}}</p>
          </div>
        </b-col>
        <b-col v-if="isFeaturedCity" cols="12" lg="4" class="city-introduction__blockquote">
          <div class="city-introduction__blockquote__city-blockquote">
            <blockquote class="city-introduction__blockquote__city-blockquote__quote">
              <prismic-rich-text :field="slice.primary.city_quote" />
            </blockquote>
            <p class="city-introduction__blockquote__city-blockquote__quotee">
              {{ slice.primary.city_quotee }}
            </p>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </section>
</template>

<script>
export default {
  name: 'CityIntroduction',
  props: {
    isFeaturedCity: {
      type: Boolean,
      default () {
        return true
      }
    },
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
    nonFeaturedCityTitle() {
      const cluster = this.$store.state.cityApiData.cluster.toLowerCase()
      let title = `${this.$store.state.cityApiData.name} is a`;
      if(
        cluster === 'affordable'
        ||
        cluster === 'innovative'
      ) {
        title += 'n'
      }
      title += ` ${cluster === 'affordable' ? 'aspiring' : cluster} city`
      return title
    },
    nonFeaturedCityIntroduction() {
      const cluster = this.$store.state.cityApiData.cluster.toLowerCase()
      switch (cluster) {
        case 'powerful':
          return this.$store.state.globalContent.powerful_cluster_description
        case 'innovative':
          return this.$store.state.globalContent.innovative_cluster_description
        case 'affordable':
          return this.$store.state.globalContent.affordable_cluster_description
        case 'liquid':
          return this.$store.state.globalContent.liquid_cluster_description
        default:
          return ''
      }
    }
  }
}
</script>

<style lang="scss">
.city-introduction {
  margin-top: 36px;
  margin-bottom: 0px;

  &__content {
    h2 {
      margin-bottom: 40px;
    }

    h5 {
      margin-bottom: 30px;
    }

    h4 {
      margin-bottom: 21px;
    }

    @include respond-below(md) {
      margin-bottom: 50px;
    }
  }
  &__blockquote{

    &__city-blockquote{
      margin-bottom: 55px;
      padding: 20px 0 13px 30px;
      border-left: 1px solid #29B5BA;
      @include respond-below(sm) {
        margin-bottom: 0;
      }

      &__quote {
          p, a{
            font-family: "Georgia Pro Semibold", Fallback, sans-serif;
            color: #29B5BA;
            font-size: 18px;
            line-height: 26px;
            margin-bottom: 28px;
          }
          a{
            border-bottom: 1px solid;
            padding-bottom: 2px;
          }
      }

      &__quotee {
          color: #29B5BA;
          margin: 0;
          word-wrap: break-word;
          overflow-wrap: break-word;
      }
    }
  }
}
</style>
