<template>
  <section class="city-footer-cta">
    <b-container fluid class="p-0">
      <div class="callout">
        <p>
          <span v-if="!userLoggedIn" v-html="text" />
        </p>
        <div class="right d-flex align-items-center">
          <p class="m-0 mr-2">
            Explore more featured cities:
          </p>
          <select-wrapper>
            <select id="citydata" name="citydata" v-model="currentCity" class="form-control" @change="onChange()">
              <option v-for="option in options" :key="option.slug" :value="option.slug">
                {{ option.name }}
              </option>
            </select>
          </select-wrapper>
        </div>
      </div>
    </b-container>
  </section>
</template>

<script>
import axios from 'axios'
import AuthService from '@/services/auth-service'
import SelectWrapper from "@/components/inputs/select-wrapper";

export default {
  name: 'CityFooterCta',
  components: {SelectWrapper},
  data() {
    return {
      currentCity: this.$store.state.cityApiData.slug,
      options: null,
      text: this.getLabel('city_footer_cta_text')
    }
  },
  computed: {
    userLoggedIn() {
      return AuthService.isUserLoggedin(this)
    }
  },
  mounted() {
    this.getCityData()
  },
  methods: {
    async getCityData() {
      const vm = this
      if (this.userLoggedIn === true) {
        // Fetch All cities
        try {
          const response = await axios.get('https://data.patrizialivingcities.chaos.staging.yourtemporary.net/api/city');
          // console.log(response.data)
          vm.options = response.data
        } catch (error) {
          console.error(error);
        }
      } else {
        // Fetch Featured cities
        try {
          const response = await axios.get('https://data.patrizialivingcities.chaos.staging.yourtemporary.net/api/city/featured');
          // console.log(response.data);
          vm.options = response.data
        } catch (error) {
          console.error(error);
        }
      }
    },
    onChange() {
      const vm = this
      // get name and redirect
      vm.$router.push(`${vm.currentCity}`)
    }
  }
}
</script>

<style lang="scss">
.city-footer-cta {
  position: fixed;
  bottom: 0;
  width: 100%;
  z-index: 99;

  .callout {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    min-height: 66px;
    background: #6AC6F1;
    position: relative;
    overflow: hidden;
    padding: 1rem;

    &::before {
      background: {
        repeat: no-repeat;
        image: url("~@/assets/img/city-footer-cta-arrow.svg");
        size: contain;
      }
    }

    & > p {
      color: #210A12;
      font-weight: 300;
      margin: 0;
      margin-left: 1.5rem;
      line-height: 1;
      font-family: 'Corporate S Pro';

      a {
        font-family: 'Corporate S Pro Bold';
        color: #210A12;
      }

      @include respond-below(md) {
        margin: auto;
        margin-bottom: 1rem;
        text-align: center;
      }
    }

    .box-select {
      display: flex;
      align-items: center;
      background: #fff;
      @include respond-below(md) {
        flex-basis: auto;
      }
      @include respond-below(sm) {
        flex-basis: 100%;
      }
    }

    @include respond-below(md) {
      flex-direction: column;
    }
  }
}
</style>
