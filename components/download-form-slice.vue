<template>
  <div class="download">
    <b-container>
      <b-row align-v="center">
        <template v-for="(slice, slideIndex) in $store.state.prismicDoc.data.body">
          <b-col cols="12" xl="4" lg="4" md="12">
            <download-content
              v-if="slice.slice_type === 'download_form'"
              :key="slideIndex"
              :slice="slice"
              :slice-index="slideIndex"
            />
          </b-col>
          <b-col cols="12" xl="7" lg="8" md="12" offset-xl="1">
            <download-form
              v-if="slice.slice_type === 'download_form'"
              :key="slideIndex"
              :slice="slice"
              :slice-index="slideIndex"
            />
          </b-col>
        </template>
      </b-row>
      <!-- <city-infographic-cta /> -->
    </b-container>
  </div>
</template>

<script>
import DownloadContent from '@/components/download/download-content'
import DownloadForm from '@/components/download/download-form'
import CityInfographicCta from '@/components/city/city-infographic-cta'

export default {
  name: 'DownloadFormSlice',
  // eslint-disable-next-line vue/no-unused-components
  components: { DownloadForm, DownloadContent, CityInfographicCta },
  props: {
    slice: {
      type: Object,
      default () {
        return {
          primary: {}
        }
      }
    },
    sliceIndex: {
      type: Number,
      default () {
        return 0
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .city-infographic-cta {
    height: auto;

    .absolute-top {
      position: unset;
    }
  }

  .download {
    margin: 50px 0 100px 0;
  }
</style>
