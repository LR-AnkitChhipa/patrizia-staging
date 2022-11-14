<template>
  <div class="email-verified">
    <Header/>
    <page-banner
      :slice="bannerSlice"
    :show-breadcrumb="false" />
    <b-container>
      <b-row>
        <b-col>
          <p class="large-paragraph">Thank you. Your email address has been verified.</p>
          <p>We will review your application and notify you when your application has been approved.</p>
        </b-col>
      </b-row>
    </b-container>
    <Footer/>
  </div>
</template>

<script>
import Page from "@/components/page";
import PageBanner from "@/components/page-banner";
import MainNavigation from "@/components/main-navigation";
import Header from "@/components/header";
import Footer from "@/components/footer";

export default {
  name: "verified",
  components: {Footer, Header, MainNavigation, PageBanner, Page},
  data() {
    return {
      bannerSlice: {
        primary: {
          page_banner_title: 'Email Verified',
          background_video: null
        }
      }
    }
  }
}
</script>

<style scoped>

</style>
