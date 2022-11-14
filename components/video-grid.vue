<template>
  <section class="videogrid">
    <b-container>
      <h2>{{slice.primary.title1}}</h2>
      <b-row>
        <b-col cols="12" md="6" lg="4" class="videogrid__box" v-for="(video, index) in slice.items" :key="index">
          <div @click="$bvModal.show(`modal-${index}`)" class="videogrid__frame-box with-lily depth50">
            <img :src="video.video_poster_image.url" :alt="video.video_poster_image.alt" class="img-fluid boximage">
            <img src="@/assets/img/play-btn.svg" alt="play" class="playbutton">
          </div>
          <h4 class="videogrid__video-title">{{ video.title1 }}</h4>
        </b-col>
      </b-row>
    </b-container>
    <template v-for="(video, index) in VideoContent">
      <b-modal :id="'modal-' + index" :key="'modal-' + index" size="lg" centered lazy hide-footer title-tag='h4' :title="video.title">
        <iframe width="100%" height="450" :src="`${video.link}?autoplay=1`" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" autoplay webkitallowfullscreen mozallowfullscreen allowfullscreen />
      </b-modal>
    </template>
  </section>
</template>

<script>
export default {
  name: 'VideoGrid',
  props: {
    slice: {
      type: Object,
      default() {
        return {
          primary: {}
        }
      }
    },
    sliceIndex: {
      type: Number,
      default() {
        return 0
      }
    }
  },
  data () {
    return {
      VideoContent: [
        { link: 'https://www.youtube.com/embed/BAHiV1HNc3k', title: 'Introduction to data intelligence in real estate investment', thumbSrc: 'https://images.prismic.io/patrizia-living-cities/56c9e0db-0f3b-4a24-a028-7c92e03f48a0_thumb-02.jpg' },
        { link: 'https://www.youtube.com/embed/jb-02U_ZJvw', title: 'Real estate investments in the era of data intelligence', thumbSrc: 'https://images.prismic.io/patrizia-living-cities/f6b5e7c8-da1d-47e4-a609-feb458bf453b_thumb-03.jpg' },
        { link: '', title: 'Using data intelligence technology in real estate', thumbSrc: 'https://images.prismic.io/patrizia-living-cities/ea794d57-7f3b-4dd8-b78f-e377d8d5a1d3_thumb-01.jpg' },
      ]
    }
  }
}
</script>

<style lang="scss">
.videogrid{
  margin-bottom: 60px;
  @include respond-below(sm) {
    margin-bottom: 0;
  }

  &__box{
    margin-bottom: 20px;
  }

  &__frame-box{
    max-width: 338px;
    width: 100%;
    height: 220px;
    position: relative;
    background: #B4A4A9;
    transition: all .35s ease-in-out;
    overflow: hidden;
    cursor: pointer;
    pointer-events: all;
    iframe{
      position: absolute;
      top: 50%;
      left: 50%;
      width: 100%;
      height: 100%;
      object-fit: cover;
      transform: translate(-50%, -50%);
      z-index: 10;
    }
    img.boximage{
      object-fit: cover;
      width: 100%;
      height: 100%;
      transition: .35s ease-in-out;
      z-index: 0;
    }
    img.playbutton{
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      -o-object-fit: cover;
      object-fit: cover;
      max-width: 125px;
      width: 100%;
      height: auto;
      z-index: 1;
    }

    &:hover{
      img.boximage{
        transform: scale(1.05);
      }
    }
  }
  &__video-title{
    margin-top: 25px;
  }

}

</style>
