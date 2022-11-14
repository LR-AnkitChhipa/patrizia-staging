<template>
  <div id="Insights">
    <Header />
    <PageBanner :heading="heading" />

    <Footer />
  </div>
</template>

<script>
import Header from '@/components/header'
import Footer from '@/components/footer'
import PageBanner from '@/components/page-banner'

export default {
  name: 'Insights',

  components: {
    Header,
    PageBanner,
    Footer
  },
  // eslint-disable-next-line no-unused-vars
  async asyncData ({ $prismic, error }) {
    // try {
    const document = (await $prismic.api.getSingle('homepage')).data

    return {
      document
    }
    // } catch (e) {
    //   error({statusCode: 404, message: 'Page not found'})
    // }
  },
  async middleware ({ store, $prismic }) {
    await store.dispatch('fetchAllMenus', $prismic)
  },

  data () {
    return {
      heading: { text: 'Insights', subline: 'Subline to be defined' }
    }
  }

}
</script>

<style lang="scss">

#Insights {
  .container-fluid {
    .banner {
      background-image: url("../assets/img/insights/Page-header.png");
    }
  }
}
</style>
