<template>
  <div>
    <Header/>
    <slices/>

    <!-- City page-->
    <city v-if="
    ($store.state.prismicDoc && $store.state.prismicDoc.type === 'city')
    ||
    $route.path.includes('/city/')
    "/>
    <!-- / City page-->

    <!-- Single article content-->
    <b-container v-if="$store.state.prismicDoc && $store.state.prismicDoc.type === 'article'">
      <b-row>
        <b-col cols="12" lg="3" md="4" class="belowtab-b-margin order-md-1 order-mob-2">
          <Sidebar/>
        </b-col>
        <!-- <b-col v-if="$store.state.prismicDoc.type === 'article'" cols="1" class="belowtab-noshow"/> -->
        <b-col class="order-md-2 order-mob-1 ml-92">
          <article-slices/>
        </b-col>
      </b-row>
    </b-container>
    <!-- /Single article content-->

    <footer-blocks/>
    <logout-popup />
    <Footer/>
  </div>
</template>

<script>
import Header from '~/components/header'
import Footer from '~/components/footer'
import Slices from '~/components/slices'
import FooterBlocks from '~/components/footer-blocks'
import Sidebar from '~/components/sidebar'
import ArticleSlices from '~/components/article-slices'
import LatestInsights from '~/components/latest-insights'
import City from '@/components/city'
import LogoutPopup from '@/components/logout-popup'

export default {
  name: 'Page',
  components: {
    City,
    LatestInsights,
    ArticleSlices,
    Sidebar,
    FooterBlocks,
    Slices,
    Footer,
    Header,
    LogoutPopup
  }
}
</script>

<style scoped>
.bottom-text p {
  font-size: 12px;
  line-height: 16px;
  padding-right: 9%;
}
.ml-92{
  margin-left: 92px;
  margin-bottom: 50px;
}

@media only screen and (max-width: 1025px) {
  .ml-92{
    margin-left: 0;
  }
}

@media only screen and (max-width: 767px) {
  .belowtab-b-margin {
    margin-bottom: 50px;
  }

  .order-mob-1 {
    order: 1;
  }

  .order-mob-2 {
    order: 2;
  }

  .ml-92 {
    margin-left: 0;
    margin-bottom: 25px;
  }
  .belowtab-noshow {
    display: none;
  }
}
</style>
