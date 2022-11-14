<template>
  <div v-if="$store.state.prismicDoc && $store.state.prismicDoc.data">
    <template v-for="(slice, slideIndex) in $store.state.prismicDoc.data.body">
      <page-banner
        v-if="slice.slice_type === 'page_banner'"
        :key="slideIndex"
        :show-city-topbar-section="$store.state.prismicDoc.type === 'city'"
        :show-breadcrumb="$store.state.prismicDoc.type !== 'article'"
        :slice="slice"
        :slice-index="slideIndex"
      />
      <two-column
        v-else-if="
        slice.slice_type === 'two_column_block'
        ||
        slice.slice_type === 'two_column_with_quote_block'
        ||
        slice.slice_type === 'two_column_text_block'
        "
        :key="slideIndex"
        :slice="slice"
        :slice-index="slideIndex"
      />
      <about-factor-explanation
        v-else-if="slice.slice_type === 'about_page_factor_explanation'"
        :key="slideIndex"
        :slice="slice"
        :slice-index="slideIndex"
      />
      <about-liquidity-indicators
        v-else-if="slice.slice_type === 'about_page_-_liquidity_indicators'"
        :key="slideIndex"
        :slice="slice"
        :slice-index="slideIndex"
      />
      <about-city-ranking
        v-else-if="slice.slice_type === 'about_-_city_ranking'"
        :key="slideIndex"
        :slice="slice"
        :slice-index="slideIndex"
      />
      <about-focussed-views
        v-else-if="slice.slice_type === 'about_page_-_focussed_views'"
        :key="slideIndex"
        :slice="slice"
        :slice-index="slideIndex"
      />
      <insights-listing
        v-else-if="slice.slice_type === 'latest_insights_listing'"
        :key="slideIndex"
        :slice="slice"
        :slice-index="slideIndex"
      />
      <next-steps
        v-else-if="slice.slice_type === 'next_steps_block'"
        :key="slideIndex"
      />
      <!-- Homepage blocks-->
      <homepage-hero
        v-else-if="slice.slice_type === 'homepage_hero'"
        :key="slideIndex"
        :slice="slice"
        :slice-index="slideIndex"
      />
      <homepage-quote
        v-else-if="
        slice.slice_type === 'homepage_quote'
        ||
        slice.slice_type === 'blockquote'
        "
        :key="slideIndex"
        :slice="slice"
        :slice-index="slideIndex"
      />
      <homepage-call-to-action
        v-else-if="slice.slice_type === 'homepage_call_to_action'"
        :key="slideIndex"
        :slice="slice"
        :slice-index="slideIndex"
      />
      <homepage-latest-insights
        v-else-if="slice.slice_type === 'homepage_latest_insights'"
        :key="slideIndex"
        :slice="slice"
        :slice-index="slideIndex"
      />
      <homepage-featured-cities
        v-else-if="slice.slice_type === 'homepage_featured_cities'"
        :key="slideIndex"
        :slice="slice"
        :slice-index="slideIndex"
      />
      <homepage-video
        v-else-if="slice.slice_type === 'homepage_video'"
        :key="slideIndex"
        :slice="slice"
        :slice-index="slideIndex"
      />
      <city-index
        v-else-if="slice.slice_type === 'city_index_block'"
        :key="slideIndex"
        :slice="slice"
        :slice-index="slideIndex"
      />
      <city-analysis-cards
        v-else-if="slice.slice_type === 'city_analysis_cards'"
        :key="slideIndex"
        :slice="slice"
        :slice-index="slideIndex"
      />
      <featured-cities-charts
        v-else-if="slice.slice_type === 'featured_cities_charts'"
        :key="slideIndex"
        :slice="slice"
        :slice-index="slideIndex"
      />
      <city-index-table
        v-else-if="slice.slice_type === 'city_index_tables'"
        :key="slideIndex"
        :slice="slice"
        :slice-index="slideIndex"
      />
      <featured-cities-table
        v-else-if="slice.slice_type === 'featured_cities_tables'"
        :key="slideIndex"
        :slice="slice"
        :slice-index="slideIndex"
      />
      <download-form-slice
        v-else-if="slice.slice_type === 'download_form'"
        :key="slideIndex"
        :slice="slice"
        :slice-index="slideIndex"
      />
      <full-form
        v-else-if="slice.slice_type === 'registration_form'"
        :key="slideIndex"
        :slice="slice"
        :slice-index="slideIndex"
      />
      <amenities-magnet-maps
        v-else-if="slice.slice_type === 'amenities_magnet_maps'"
        :key="slideIndex"
        :slice="slice"
        :slice-index="slideIndex"
      />
      <call-to-action
        v-else-if="slice.slice_type === 'call_to_action_banner'"
        :key="slideIndex"
        :slice="slice"
        :slice-index="slideIndex"
      />
      <video-grid
        v-else-if="slice.slice_type === 'video_grid'"
        :key="slideIndex"
        :slice="slice"
        :slice-index="slideIndex"
      />
      <spatial-temporal-analysis-introduction
        v-else-if="slice.slice_type === 'spatial-temporal_analysis_introduction'"
        :key="slideIndex"
        :slice="slice"
        :slice-index="slideIndex"
      />
      <spatial-temporal-analysis-chart
        v-else-if="slice.slice_type === 'spatial-temporal_analysis_chart'"
        :key="slideIndex"
        :slice="slice"
        :slice-index="slideIndex"
      />
      <reset-password-form
        v-else-if="slice.slice_type === 'reset_password_form'"
        :key="slideIndex"
        :slice="slice"
        :slice-index="slideIndex"
      />
      <forgotten-password-form
        v-else-if="slice.slice_type === 'forgotten_password_form'"
        :key="slideIndex"
        :slice="slice"
        :slice-index="slideIndex"
      />
<!--      <div v-else>No component found for this slice with the slice_type {{ slice.slice_type }}</div>-->
    </template>
  </div>
</template>

<script>
import PageBanner from '~/components/page-banner'
import TwoColumn from '~/components/TwoColumn'
import AboutFactorExplanation from '~/components/about/about-factor-explantion'
import AboutLiquidityIndicators from '~/components/about/about-liquidity-indicators'
import AboutCityRanking from '~/components/about/about-city-ranking'
import AboutFocussedViews from '~/components/about/about-focussed-views'
import NextSteps from '~/components/next-steps'
import InsightsListing from '~/components/insights-listing'
import HomepageHero from '~/components/homepage/homepage-hero'
import HomepageQuote from '~/components/homepage/homepage-quote'
import HomepageCallToAction from '~/components/homepage/homepage-call-to-action'
import HomepageLatestInsights from '~/components/homepage/homepage-latest-insights'
import HomepageFeaturedCities from '~/components/homepage/homepage-featured-cities'
import HomepageVideo from '~/components/homepage/homepage-video'
import CityTopbarSection from '@/components/city/city-topbar-section'
import CityIndex from '@/components/city-index'
import FeaturedCitiesCharts from '@/components/featured-cities-charts'
import FeaturedCitiesTable from '@/components/featured-cities-table'
import DownloadForm from "@/components/download/download-form";
import DownloadFormSlice from "@/components/download-form-slice";
import CityAnalysisCards from "@/components/city-analysis-cards";
import CityIndexTable from "@/components/city-index-table";
import FullForm from "@/components/login/full-form";
import AmenitiesMagnetMaps from "@/components/amenities-magnet-maps";
import FooterCallToAction from "@/components/footer-call-to-action";
import CallToAction from "@/components/call-to-action";
import VideoGrid from "@/components/video-grid";
import SpatialTemporalAnalysisIntroduction from "@/components/spatial-temporal-analysis-introduction";
import SpatialTemporalAnalysisChart from "@/components/spatial-temporal-analysis-chart";
import ResetPasswordForm from "@/components/reset-password-form";
import ForgottenPasswordForm from "@/components/forgotten-password-form";

export default {
  name: 'Slices',
  components: {
    ForgottenPasswordForm,
    ResetPasswordForm,
    SpatialTemporalAnalysisChart,
    SpatialTemporalAnalysisIntroduction,
    VideoGrid,
    CallToAction,
    FooterCallToAction,
    AmenitiesMagnetMaps,
    FullForm,
    CityIndexTable,
    CityAnalysisCards,
    DownloadFormSlice,
    FeaturedCitiesTable,
    FeaturedCitiesCharts,
    CityIndex,
    HomepageVideo,
    HomepageFeaturedCities,
    HomepageLatestInsights,
    HomepageCallToAction,
    HomepageQuote,
    HomepageHero,
    InsightsListing,
    NextSteps,
    AboutFocussedViews,
    AboutCityRanking,
    AboutLiquidityIndicators,
    AboutFactorExplanation,
    TwoColumn,
    PageBanner,
    CityTopbarSection
  }
}
</script>

<style scoped>

</style>
