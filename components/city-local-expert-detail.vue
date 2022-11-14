<template>
  <div id="contactarticle" v-if="localExpert !== null">
    <h3>Contact</h3>
    <div class="contact-card">
      <b-card no-body :img-src="localExpert.image.url" img-alt="Image" img-top v-if="localExpert.image">
        <b-card-body>
          <p class="contact-card__location" v-if="$store.state.cityApiData">{{ $store.state.cityApiData.name }}, {{ $store.state.cityApiData.country }}</p>
          <b-card-title v-if="localExpert.name">{{ localExpert.name }}</b-card-title>
          <b-card-sub-title v-if="localExpert.job_title">{{localExpert.job_title}}</b-card-sub-title>
          <div class="bottom-content">
            <ul>
              <li v-if="emailLink">
                <a :href="emailLink" :title="`Email ${localExpert.name}`">
                  <span><img src="@/assets/img/insights/email-article.svg" alt=""></span>
                  {{ localExpert.email_address }}</a>
              </li>
              <li v-if="phoneLink">
                <a :href="phoneLink" :title="`Phone ${localExpert.name} `">
                  <span><img src="@/assets/img/insights/phone-article.svg" alt=""></span>
                  {{ localExpert.phone_number }}</a>
              </li>
            </ul>
          </div>
        </b-card-body>
      </b-card>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CityLocalExpertDetail',
  data() {
    return {
      localExpert: null,
    }
  },
  mounted() {
    if(this.hasLocalExpertData) {
      this.localExpert = this.$store.state.prismicDoc.data.local_expert_link.data
    }
  },
  computed: {
    hasLocalExpertData() {
      if(this.$store.state.prismicDoc && this.$store.state.prismicDoc.data.local_expert_link && this.$store.state.prismicDoc.data.local_expert_link.data) {
        return  true
      }
      return false
    },
    emailLink() {
      if(this.localExpert.email_address) {
        return `mailto:${this.localExpert.email_address}`
      }
      return null
    },
    phoneLink() {
      if(this.localExpert.phone_number) {
        return `tel:${this.localExpert.phone_number}`
      }
      return null
    }
  }
}
</script>

<style lang="scss" scoped>
#contactarticle {
  margin-bottom: 3rem;
  h3 {
    margin-bottom: 2rem;
  }
  .contact-card {

    &__location {
      text-transform: uppercase;
    }

    .card {
      -webkit-box-shadow: 5px 20px 35px 0px rgba(34, 10, 18, 0.2);
      -moz-box-shadow: 5px 20px 35px 0px rgba(34, 10, 18, 0.2);
      box-shadow: 5px 20px 35px 0px rgba(34, 10, 18, 0.2);
      border: none;
      position: relative;
      border-radius: 0;
      img {
        border-radius: 0;
      }
      .card-body {
        position: relative;
        padding-top: 2rem;
        p {
          background: #802437;
          padding: 5px 10px;
          color: #fff;
          font-family: "Corporate S Pro bold";
          position: absolute;
          top: -15px;
          left: -10px;
          font-size: 12px;
          letter-spacing: 1px;
          margin: 0;
        }
        .card-title{
          margin-bottom: 1.3rem;
        }
        .card-subtitle{
          font-family: "Corporate S Pro";
          color: #210A12;
          font-size: 16px;
          margin-bottom: 2.3rem;
        }
        .bottom-content{
          border-top: 1px solid #D8D8D8;
          padding-top: 1.1rem;
          li{
            a{
              font-size: 14px;
              transition: .2s ease-in;
              span{
                margin-right: 8px;
                position: relative;
                top: -4px;
              }
              &:hover{
                color: #F29131;
              }
            }
          }
        }
      }
    }
  }
}
</style>
