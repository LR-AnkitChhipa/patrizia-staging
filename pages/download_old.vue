<template>
  <div id="city-downlaod">
    <Header />
    <page-banner :heading="heading" />
    <div class="download">
      <b-container>
        <b-row align-v="center">
          <b-col cols="12" xl="4" lg="4" md="12">
            <download-content />
          </b-col>
          <b-col cols="12" xl="7" lg="8" md="12" offset-xl="1">
            <download-form />
          </b-col>
        </b-row>
      </b-container>
    </div>
    <!-- <city-infographic-cta /> -->
    <latest-insights />
    <Footer />
  </div>
</template>

<script>
import Header from '@/components/header'
import Footer from '@/components/footer'
import PageBanner from '@/components/page-banner'
import CityInfographicCta from '@/components/city/city-infographic-cta'
import DownloadContent from '@/components/download/download-content'
import DownloadForm from '@/components/download/download-form'
import LatestInsights from '~/components/latest-insights'

export default {
  name: 'CityDownlaod',

  components: {
    Header,
    PageBanner,
    CityInfographicCta,
    LatestInsights,
    DownloadContent,
    DownloadForm,
    Footer
  },

  data () {
    return {
      heading: { title: 'Insights', subline: 'Subline to be defined' }
    }
  }

}
</script>

<style lang="scss" scoped>

#city-downlaod {
  .city-infographic-cta{
    height: auto;
    .absolute-top{
      position: unset;
    }
  }
  .download{
    margin: 50px 0 100px 0;
  }
}
</style>
