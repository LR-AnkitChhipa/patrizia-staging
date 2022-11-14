<template>
  <section class="spatialcontent">
    <b-container>
      <div class="spatialcontent__heading">
        <p class="subline subline--with-dash">{{ slice.primary.subline }}</p>
        <h2>{{ slice.primary.title1 }}</h2>
      </div>
      <div class="spatialcontent__points">
        <div class="inner">
          <div class="spatialcontent__points__block spatialcontent__points__block--one">
            <p class="spatialcontent__points__block__count">1</p>
            <p class="spatialcontent__points__block__content">{{ slice.primary.column_one_content }}</p>
          </div>
          <div class="spatialcontent__points__block spatialcontent__points__block--two">
            <p class="spatialcontent__points__block__count">2</p>
            <p class="spatialcontent__points__block__content">{{ slice.primary.column_two_content }}</p>
          </div>
          <div class="spatialcontent__points__block spatialcontent__points__block--three">
            <p class="spatialcontent__points__block__count">3</p>
            <p class="spatialcontent__points__block__content">{{ slice.primary.column_three_content }}</p>
          </div>
        </div>
      </div>
      <div class="spatialcontent__content">
        <prismic-rich-text :field="slice.primary.content" />
      </div>
    </b-container>
    <img src="~@/assets/img/spatial-intro-section.png" alt="" class="img-fluid spatialcontent__bottom-image">
  </section>
</template>

<script>
export default {
  name: 'SpatialContent',
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
}
</script>

<style lang="scss">
.spatialcontent{
  position: relative;
  overflow: hidden;
  padding-top: 50px;
  padding-bottom: 50px;
  -webkit-box-shadow: 5px 30px 30px 0px rgba(34,10,18,0.15);
  -moz-box-shadow: 5px 30px 30px 0px rgba(34,10,18,0.15);
  box-shadow: 5px 30px 30px 0px rgba(34,10,18,0.15);

  &__heading{
    h2{
      max-width: 43%;
      width: 100%;
      margin-bottom: 30px;
      @include respond-below(md) {
        max-width: 100%;
      }
    }
  }

  &__points{
    background: #fff;
    margin-bottom: 30px;
    width: 100%;
    position: relative;
    z-index: 1;
    -webkit-box-shadow: 0px 0px 10px 0px rgba(34,10,18,0.15);
    -moz-box-shadow: 0px 0px 10px 0px rgba(34,10,18,0.15);
    box-shadow: 0px 0px 10px 0px rgba(34,10,18,0.15);

    .inner{
      display: flex;
      justify-content: space-around;
      align-content: center;
      flex-wrap: wrap;
    }

    &__block{
      display: flex;
      flex-wrap: nowrap;
      flex: 1;
      border-right: 1px solid #F0EDEE;
      min-height: 121px;
      align-items: flex-start;
      justify-content: center;
      padding: 18px 20px;
      p{
        padding: 0;
        margin: 0;

        &:first-child{
          font-size: 58px;
          line-height: 68px;
          color: #6AC6F1;
          font-family: 'Corporate S Pro light';
          position: relative;
          top: -15px;
          margin-right: 20px;
        }
        &:last-child{
          color: #802537;
        }
      }
      &--two{
        p.spatialcontent__points__block__count{
          color: #29B5BA;
        }
      }
      &--three{
        p.spatialcontent__points__block__count{
          color: #A44993;
        }
      }

      &:last-child{
        border: none;
      }

      @include respond-below(md) {
        flex-basis: 100%;
        justify-content: flex-start;
        border: none;
        align-items: center;
        border-bottom: 1px solid #F0EDEE;
        p.spatialcontent__points__block__count{
          top: 0;
        }
      }
    }
  }

  &__content{
    color: #210A12;
    max-width: 42%;
    width: 100%;
    margin: 0;
    @include respond-below(md) {
      max-width: 100%;
    }
  }

  &__bottom-image{
    position: absolute;
    bottom: 0;
    right: 0;
    z-index: -1;
      @include respond-below(md) {
        opacity: .5;
      }
      @include respond-below(sm) {
        opacity: .1;
      }
  }
}
</style>
