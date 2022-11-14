<template>
  <div :id="slugify(slice.primary.download_title)" class="articledownload">
    <a target="_blank" :href="slice.primary.download_link.url" class="d-flex">
      <div class="image">
        <img src="@/assets/img/download-panel-icon.svg" alt="">
      </div>
      <div class="text">
        <h4 v-text="slice.primary.download_title" />
        <p>
          {{ slice.primary.download_textlnk }}
        </p>
      </div>
    </a>
  </div>
</template>

<script>
export default {
  name: 'ArticleDownload',
  props: {
    slice: {
      type: Object,
      default () {
        return {}
      }
    },
    sliceIndex: {
      type: Number,
      default () {
        return 0
      }
    }
  },
  data () {
    return {}
  }
}
</script>

<style lang="scss" scoped>
.articledownload {
  -webkit-box-shadow: 5px 15px 40px 0px rgba(0, 0, 0, 0.15);
  -moz-box-shadow: 5px 15px 40px 0px rgba(0, 0, 0, 0.15);
  box-shadow: 5px 15px 40px 0px rgba(0, 0, 0, 0.15);
  margin-bottom: 50px;
  margin-top: 50px;
  .image{
    display: block;
    margin-right: 20px;
    max-width: 40px;
    width: 100%;
    img{
      width: 100%;
      height: auto;
    }
  }
  .text{
    h4{
      margin-bottom: 10px;
      transition: .2s ease-in;
    }
    p{
      color: #210A12;
      margin: 0;
    }
  }
  a.d-flex{
    padding: 20px;
    align-items: center;
    &:hover{
      .text{
        h4{
          color: #F29131;
        }
      }
    }
  }
}
</style>
