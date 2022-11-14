<template>
  <div class="d-content">
    <p class="subline subline--with-dash">
      {{ slice.primary.download_block_subline }}
    </p>
    <prismic-rich-text :field="slice.primary.download_block_title"/>
    <prismic-rich-text :field="slice.primary.download_form_content"/>
    <button-link
      v-if="slice.primary.download_form_link_text"
      button-size="regular"
      button-style="primary primary--style1"
      :label="slice.primary.download_form_link_text"
      @click.prevent="download(slice.primary.download_form_link.uid)"
      class="mt-5"
    />
  </div>
</template>

<script>
import ButtonLink from '@/components/buttons/button-link'
import AuthService from "@/services/auth-service";

export default {
  components: {ButtonLink},
  props: {
    slice: {
      type: Object,
      default() {
        return {}
      }
    },
    sliceIndex: {
      type: Number,
      default() {
        return 0
      }
    }
  },
  methods: {
    download(downloadUrl) {
      console.log('Is logged in?', AuthService.isUserLoggedin(this))
      if(AuthService.isUserLoggedin(this)) {
        // Analytics push
        window.dataLayer = window.dataLayer || []
        dataLayer.push( { 'event': 'download-report', 'formType': 'loggedin', });
      }
      // The download
      window.location.href = downloadUrl
    }
  }

}
</script>

<style lang="scss" scoped>
.d-content {
  @include respond-below(md) {
    margin-bottom: 50px;
  }
}
</style>
