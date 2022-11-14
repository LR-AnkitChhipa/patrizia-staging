<template>
  <article v-if="$store.state.prismicDoc">
    <template v-for="(slice, slideIndex) in $store.state.prismicDoc.data.body">
      <city-introduction
        :is-featured-city="true"
        v-if="slice.slice_type === 'city-introduction'"
        :key="slideIndex"
        :slice="slice"
        :slice-index="slideIndex"
      />
      <city-data-tabs
        v-if="slice.slice_type === 'city_datatabs'"
        :key="slideIndex"
        :slice="slice"
        :slice-index="slideIndex"
      />
      <city-video
        v-if="slice.slice_type === 'city_video'"
        :key="slideIndex"
        :slice="slice"
        :slice-index="slideIndex"
      />
      <city-facts
        v-if="slice.slice_type === 'city_facts'"
        :key="slideIndex"
        :slice="slice"
        :slice-index="slideIndex"
      />
      <city-infographic-cta
        v-if="slice.slice_type === 'banner_with_caption'"
        :key="slideIndex"
        :slice="slice"
        :slice-index="slideIndex"
      />
    </template>
    <city-footer-cta />
    <!-- fixed side buttons -->
    <fixed-sidebtns />

  </article>
  <!--  Non featured city here-->
  <article v-else-if="isUserLoggedIn">
    <page-banner
      :is-non-featured-city-banner="true"
      :show-city-topbar-section="true"
      :slice="{primary: {
        page_banner_title: this.$store.state.cityApiData.name,
        page_banner_subline: this.$store.state.cityApiData.cluster,
      }}"
    />
    <city-introduction
      :is-featured-city="false"
    />
    <city-data-tabs />
    <city-footer-cta />
    <!-- fixed side buttons -->
    <fixed-sidebtns />
  </article>
  <article v-else>
    <page-banner
      :show-city-topbar-section="false"
      :slice="{primary: {
        page_banner_title: 'Please log in',
        page_banner_subline: null,
      }}"
    />
    <b-container>
      <b-row>
        <b-col><p>Please log in to view this page</p></b-col>
      </b-row>
    </b-container>
  </article>
</template>

<script>
import CityIntroduction from '@/components/city/city-introduction'
import CityDataTabs from '@/components/city/city-data-tabs'
import CityVideo from '@/components/city/city-video'
import CityFacts from '@/components/city/city-facts'
import CityInfographicCta from '@/components/city/city-infographic-cta'
import CityFooterCta from '@/components/city/city-footer-cta'
import FixedSidebtns from '@/components/city/fixed-sidebtns'
import PageBanner from '@/components/page-banner'
import LatestInsights from "@/components/latest-insights";

export default {
  name: 'City',
  components: {
    LatestInsights,
    PageBanner,
    CityFooterCta,
    CityInfographicCta,
    CityFacts,
    CityVideo,
    CityDataTabs,
    FixedSidebtns,
    CityIntroduction
  }
}
</script>

<style lang="scss" scoped>
</style>
