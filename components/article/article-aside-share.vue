<template>
  <div id="articleshare">
    <h3>Share this Article</h3>

    <div class="social-icons">
      
      <!-- <ShareNetwork
        network="facebook"
        url="https://news.vuejs.org/issues/180"
        title="Say hi to Vite! A brand new, extremely fast development setup for Vue."
        description="This week, I’d like to introduce you to 'Vite', which means 'Fast'. It’s a brand new development setup created by Evan You."
        quote="The hot reload is so fast it\'s near instant. - Evan You"
        hashtags="vuejs,vite"
        >
        <img src="@/assets/img/insights/share-fb.svg" alt="">
      </ShareNetwork>
      
      <ShareNetwork
        network="linkedin"
        url="https://news.vuejs.org/issues/180"
        title="Say hi to Vite! A brand new, extremely fast development setup for Vue."
        description="This week, I’d like to introduce you to 'Vite', which means 'Fast'. It’s a brand new development setup created by Evan You."
        quote="The hot reload is so fast it\'s near instant. - Evan You"
        hashtags="vuejs,vite"
        >
        <img src="@/assets/img/insights/share-in.svg" alt="">
      </ShareNetwork>
      
      <ShareNetwork
        network="twitter"
        url="https://news.vuejs.org/issues/180"
        title="Say hi to Vite! A brand new, extremely fast development setup for Vue."
        description="This week, I’d like to introduce you to 'Vite', which means 'Fast'. It’s a brand new development setup created by Evan You."
        quote="The hot reload is so fast it\'s near instant. - Evan You"
        hashtags="vuejs,vite"
        >
        <img src="@/assets/img/insights/share-tw.svg" alt="">
      </ShareNetwork> -->
      <a target="_blank" :href="'https://www.facebook.com/sharer/sharer.php?u='+url+''"><img src="@/assets/img/insights/share-fb.svg" alt=""></a>
      <a target="_blank" :href="'http://www.linkedin.com/shareArticle?mini=true&url='+url+'&title='+shareData.title+''"><img src="@/assets/img/insights/share-in.svg" alt=""></a>
      <a target="_blank" :href="'https://twitter.com/intent/tweet?url='+url+'&text='+shareData.title+''"><img src="@/assets/img/insights/share-tw.svg" alt=""></a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ArticleAsideShare',
  data() {
    return {
      shareData: this.$store.state.prismicDoc.data,
      url: null
    }
  },
  mounted () {
    this.getUrl()
  },
  methods: {
    getUrl () {
      if(window.location) {
        this.url = window.location.href
        return true
      }
    }
  }
}
</script>

<style lang="scss" scoped>
h3 {
  margin-bottom: 2rem;
}

.social-icons {
  border-bottom: 1px solid #f0edee;
  img{
    transition: .2s ease-in-out;
  }
  a{
    margin-bottom: 20px;
    display: inline-block;
    margin-right: 1rem;
    cursor: pointer;
    &:hover{
      img{
        transform: scale(1.1);
      }
    }
  }
}
</style>
