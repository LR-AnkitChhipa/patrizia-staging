<template>
  <section class="spatialchart">
    <b-container>
      <div class="spatialchart__heading">
        <h3>{{slice.primary.title1}}</h3>
        <prismic-rich-text :field="slice.primary.introduction" />
      </div>
      <div class="spatialchart__chartbox">
        <div class="spatialchart__chartbox__forms">
          <select-wrapper>
            <select id="title" v-model="selectedCity" name="title" class="form-control">
              <option
                v-for="option in options"
                :key="option.text"
                :value="option.value"
                :disabled="option.disable"
              >
                {{ option.text }}
              </option>
            </select>
          </select-wrapper>
          <div class="range">
            <ul class="range__labels">
              <li>2014</li>
              <li>2017</li>
              <li>2020</li>
            </ul>
            <b-form-input id="range-1" class="range__input" v-model="selectedYear" type="range" min="2014" max="2020" step="3" />
          </div>
        </div>
        <div class="spatialchart__chartbox__mapncontent">
          <b-row>
            <b-col cols="12" md="12" lg="8" class="col spatialchart__chartbox__mapncontent__map">
              <inline-svg :src="require(`@/static/images/spatial/${selectedCity}-${selectedYear}.svg`)" />
            </b-col>
            <b-col cols="12" md="12" lg="4" class="col spatialchart__chartbox__mapncontent__content">
              <h4>{{ selectedContent.heading }}</h4>
              <ul>
                <li v-for="item in selectedContent.values" :key="item.text">{{ item.text }}</li>
              </ul>
              <p v-for="item in selectedContent.description" :key="item.text">{{ item.text }}</p>
            </b-col>
          </b-row>
        </div>
      </div>
      <callout cta-style="primary" :text="slice.primary.cta_text" :button-label="slice.primary.call_to_action_link_text" :button-url="slice.primary.call_to_action_link ? slice.primary.call_to_action_link.url : null" />
    </b-container>
  </section>
</template>

<script>
import Callout from '@/components/callout'
import SelectWrapper from '@/components/inputs/select-wrapper'
export default {
  name: 'SpatialChart',
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
  components: {
    Callout,
    SelectWrapper
  },
  data () {
    return {
      selectedYear: 2014,
      selectedCity: 'munich',
      options: [
        { value: 'munich', text: 'Munich' },
        { value: 'frankfurt', text: 'Frankfurt am Main' }
      ],
      value: 1,
      chartContent: {
        munich: {
          heading: this.slice.primary.munich_asking_rents_title,
          values: [
            { text: '≤ 300' },
            { text: '300 - 950' },
            { text: '950 - 1,000' },
            { text: '1,000 - 1,100' },
            { text: '1,100 - 1,200' },
            { text: '≥ 1,200' }
          ],
          description: this.slice.primary.munich_asking_rents_content
        },
        frankfurt: {
          heading: this.slice.primary.frankfurt_asking_rents_title,
          values: [
            { text: '≤ 650' },
            { text: '650 - 750' },
            { text: '750 - 850' },
            { text: '850 - 900' },
            { text: '900 - 1,100' },
            { text: '≥ 1,100' }
          ],
          description: this.slice.primary.frankfurt_asking_rents_content
        }
      }
    }
  },
  computed: {
    /**
     * Get the content for a selected city
     */
    selectedContent() {
      return this.chartContent[this.selectedCity]
    },
    /**
     * Get the image for a city and year combination
     * @returns {string}
     */
    cityYearImage() {
      if(this.selectedCity === 'munich') {
        return '/assets/img/amenities-graphics-frankfurt-am-main-2020.png'
      } else {
        return '/assets/img/amenities-graphics-frankfurt-am-main-2020.png'
      }
    }
  }
}
</script>

<style lang="scss">
.spatialchart{
  overflow: hidden;
  margin-bottom: 50px;

  @include respond-below(sm) {
    margin-bottom: 0;
  }

  &__heading{
    max-width: 47.7%;
    margin-bottom: 20px;
    h3{
      margin-bottom: 20px;
    }
    @include respond-below(md) {
      max-width: 100%;
    }
  }

  &__chartbox{
    width: 100%;
    padding: 40px;
    -webkit-box-shadow: 0px 0px 10px 0px rgba(34,10,18,0.15);
    -moz-box-shadow: 0px 0px 10px 0px rgba(34,10,18,0.15);
    box-shadow: 0px 0px 10px 0px rgba(34,10,18,0.15);

    &__forms{
      display: flex;
      flex-wrap: wrap;
      align-items: flex-start;

      @include respond-below(md) {
        flex-direction: column;
      }

      .box-select{
        margin-right: 40px;
        margin-bottom: 20px;
        select{
          width: 315px;
        }
        @include respond-below(md) {
          width: 100%;
          select{
            width: 100%;
          }
        }
      }

      .range{
        width: 300px;
        position: relative;
        @include respond-below(md) {
          width: 100%;
        }

        &__labels{
          display: flex;
          justify-content: space-between;
          align-items: center;
          li{
            color: #9C8A8F;
            font-family: 'Corporate S Pro';
            line-height: 15px;
            font-size: 14px;
            margin-bottom: 10px;
            position: relative;
            &::after{
              content: '';
              position: absolute;
              height: 9px;
              width: 9px;
              background: #E1DBDD;
              bottom: -26px;
              border-radius: 50%;
              left: -1px;
              z-index: -1;
            }
            &:last-child{
              &::after{
                left: auto;
                right: -1px;
              }
            }
            &:nth-child(2){
              &::after{
                left: 10px;
              }
            }
          }
        }

        &__input{
          margin: auto;
        }
        input[type=range]{
            -webkit-appearance: none;
        }

        input[type=range]::-webkit-slider-runnable-track {
            width: 100%;
            height: 3px;
            background: #E1DBDD;
            border: none;
            position: relative;
            z-index: -1;
        }

        input[type=range]::-webkit-slider-thumb {
            -webkit-appearance: none;
            border: none;
            height: 30px;
            width: 30px;
            border-radius: 50%;
            background:#29B5BA;
            margin-top: -13.5px;
            border: 5px solid #fff;
            -webkit-box-shadow: 0px 0px 10px 0px rgba(34,10,18,0.15);
            -moz-box-shadow: 0px 0px 10px 0px rgba(34,10,18,0.15);
            box-shadow: 0px 0px 10px 0px rgba(34,10,18,0.15);
            position: relative;
            z-index: 10;
        }

        input[type=range]::-moz-range-track {
            width: 100%;
            height: 3px;
            background: #E1DBDD;
            border: none;
            position: relative;
            z-index: 0;
        }

        input[type=range]::-moz-range-thumb {
            border: none;
            height: 20px;
            width: 20px;
            border-radius: 50%;
            background:#29B5BA;
            margin-top: -13.5px;
            border: 5px solid #fff;
            -webkit-box-shadow: 0px 0px 10px 0px rgba(34,10,18,0.15);
            -moz-box-shadow: 0px 0px 10px 0px rgba(34,10,18,0.15);
            box-shadow: 0px 0px 10px 0px rgba(34,10,18,0.15);
            position: relative;
            z-index: 10;
        }

        input[type=range]::-ms-track {
            background: transparent;
            border-color: transparent;
            border-width: 13.5px 0;
            color: transparent;
            width: 100%;
            height: 3px;
            cursor: pointer;
        }

        input[type=range]::-ms-fill-lower {
            border: 0;
        }

        input[type=range]::-ms-fill-upper {
            border: 0;
        }

        input[type=range]::-ms-thumb {
            width: 30px;
            height: 30px;
            border: 5px solid #ffffff;
            border-radius: 15px;
            cursor: pointer;
            margin-top: 0px;
        }

      }
    }

    &__mapncontent{

      .row{
        align-items: stretch;
      }

      &__map{
        margin-top: 15px;
        overflow: hidden;
        img{
          width: 100%;
          height: auto;
        }
        svg {
          width: 100%;
          height: auto;
        }
      }

      &__content{
        margin-top: 15px;
        h4{
          margin-bottom: 20px;
        }
        ul{
          margin-bottom: 30px;
          li{
            position: relative;
            font-family: 'Corporate S Pro';
            color: #210A12;
            font-size: 16px;
            line-height: 20px;
            padding-left: 18px;
            margin-bottom: 5px;
            &::before{
              content: '';
              position: absolute;
              width: 10px;
              height: 10px;
              background: #00B5B9;
              top: 50%;
              transform: translateY(-50%);
              left: 0;
              border-radius: 50%;
            }
            &:nth-child(2){
              &::before{
                background-color: #4BDDE0;
              }
            }
            &:nth-child(3){
              &::before{
                background-color: #C9F4F5;
              }
            }
            &:nth-child(4){
              &::before{
                background-color: #F6C9D1;
              }
            }
            &:nth-child(5){
              &::before{
                background-color: #EA95A3;
              }
            }
            &:nth-child(6){
              &::before{
                background-color: #DE5F75;
              }
            }
          }
        }
        p{
          margin-bottom: 20px;
          &:last-child{
            margin-bottom: 0;
          }
        }
      }

    }

  }

}
</style>
