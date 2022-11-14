<template>
  <div>
    <footer-call-to-action v-if="shouldDisplayCtaBlock"/>
    <!-- latest insights slider only shows above footer blocks on article pages -->
    <latest-insights
      v-if="
      (prismicDoc && prismicDoc.type === 'article' && prismicDoc.data && prismicDoc.data.display_footer_latest_insights_block === true)
      ||
      (!prismicDoc && $route.fullPath.includes('city'))
      "
    />
    <report-block
      v-if="prismicDoc && prismicDoc.data && prismicDoc.data.display_explore_and_download_blocks === true"
    />
    <latest-insights
      v-if="prismicDoc && prismicDoc.type !== 'article' && prismicDoc.data && prismicDoc.data.display_footer_latest_insights_block === true"
    />
    <investor-newsletter
      v-if="prismicDoc && prismicDoc.data && prismicDoc.data.display_investor_newsletter_block === true"/>
  </div>
</template>

<script>
import ReportBlock from '~/components/report-block'
import LatestInsights from '@/components/latest-insights'
import FooterCallToAction from '@/components/footer-call-to-action'
import InvestorNewsletter from "@/components/Investor-newsletter";

export default {
  name: 'FooterBlocks',
  components: {InvestorNewsletter, FooterCallToAction, LatestInsights, ReportBlock},
  data() {
    return {
      prismicDoc: this.$store.state.prismicDoc
    }
  },
  computed: {
    shouldDisplayCtaBlock() {
      if (
        this.prismicDoc
        &&
        this.prismicDoc.data
        &&
        this.prismicDoc.data.display_footer_call_to_action_block
      ) {
        return true
      }
      return false
    }
  }
}
</script>

<style scoped>

</style>
