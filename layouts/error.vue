<template>
  <div>
    <Header />
    <PageBanner />
    <b-container>
      <b-row>
        <b-col>
          <h1>Page not found :(</h1>
          <p>Sorry, the page you were looking for could not be found.</p>
          <p>
            try going <a href="javascript:history.back()">back</a> or to the <nuxt-link to="/">
              homepage
            </nuxt-link>
          </p>
        </b-col>
      </b-row>
    </b-container>
    <Footer />
  </div>
</template>

<script>
// import Navigation from '../components/navigation'
import Header from '~/components/header'
import PageBanner from '~/components/page-banner'
import Footer from '~/components/footer'

export default {
  components: { Footer, PageBanner, Header },
  async middleware ({ store, $prismic }) {
    await store.dispatch('fetchAllMenus', $prismic)
  }
}
</script>
