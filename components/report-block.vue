<template>
  <b-container id="reportblock" fluid>
    <b-row>
      <b-col
        v-for="box in reportBox"
        :key="box.top_title"
        cols-12
        md="6"
        class="bg-image"
        :style="'background-image: url(' + box.box_backgroud.url + ')'"
      >
        <div class="content-box">
          <prismic-image :image="box.box_icon" class="image" />
          <p> {{ box.top_title }} </p>
          <h2> {{ box.heading }} </h2>
          <button-link button-size="regular" button-style="whiteborder" :label="box.button_text" :prismic-link-object="box.button_iink" />
          <p
            v-if="getLabel('homepage_footer_below_cta')"
            class="mt-4"
          >
            {{ getLabel('homepage_footer_below_cta') }}
          </p>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import ButtonLink from '@/components/buttons/button-link'
import PrismicImage from '@/components/prismic-image'

export default {
  name: 'ReportBlock',
  components: { ButtonLink, PrismicImage },
  computed: {
    reportBox () {
      try {
        return this.$store.state.globalContent.report_box
      } catch (ex) {
        return null
      }
    }
  }

}
</script>

<style lang="scss" scoped>

#reportblock{
    .row{
        .bg-image{
            background: #fff;
            background-repeat:no-repeat;
            background-size: cover;
            color: #fff;
            text-align: center;
            & > div.content-box{
                padding: 10rem 1rem;
                  @include respond-below(md){
                     padding: 5rem 1rem;
                  }
                .image{
                    margin-bottom: 25px;
                    img{
                      min-height: 85px;
                      width: auto;
                    }
                }
                p{
                    font-size: 14px;
                    color: #fff;
                    letter-spacing: .8px;
                    margin-bottom: 25px;
                    @include respond-below(md){
                      margin-bottom: 15px;
                    }
                }
                h2{
                    font-size: 30px;
                    margin-bottom: 35px;
                    color: #fff;
                   @include respond-below(md){
                     font-size: 20px;
                     margin-bottom: 20px;
                   }
                }
            }
        }
    }
}

</style>
