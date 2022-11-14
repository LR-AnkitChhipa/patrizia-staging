<template>
  <div id="articleslider" :id="slugify(slice.primary.navigation_title)">
    <div class="navigation-wrapper">
      <div ref="slider" class="keen-slider">
        <div v-for="n in 6" :key="n" class="keen-slider__slide" :class="'silde-' + n">
          <div class="overlay" />
          <img src="@/assets/img/slider-image-01.jpg" alt="" class="img-fluid" width="100%">
        </div>
      </div>

      <div class="static-box">
        <div class="right">
          <p> {{ current }} / {{ total }} </p>
          <h3> {{ sliderheading }} </h3>
        </div>
        <div class="left">
          <a class="leftarrow" href="javascript:void(0)" @click="slider.prev()">
            <svg xmlns="http://www.w3.org/2000/svg" width="15.142" height="30.92" viewBox="0 0 15.142 30.92">
              <g id="Group_393" data-name="Group 393" transform="translate(15.759 17.984) rotate(180)">
                <g id="Group_269" data-name="Group 269" transform="translate(15.331 17) rotate(180)">
                  <path
                    id="Path_187"
                    data-name="Path 187"
                    d="M0,29.6,13.059,14.8,0,0"
                    transform="translate(0.322 -0.322)"
                    fill="none"
                    stroke="#fff"
                    stroke-width="2"
                  />
                </g>
              </g>
            </svg>
          </a>

          <a href="javascript:void(0)" class="rightarrow" @click="slider.next()">
            <svg xmlns="http://www.w3.org/2000/svg" width="15.142" height="30.92" viewBox="0 0 15.142 30.92">
              <g id="Group_393" data-name="Group 393" transform="translate(15.759 17.984) rotate(180)">
                <g id="Group_269" data-name="Group 269" transform="translate(15.331 17) rotate(180)">
                  <path
                    id="Path_187"
                    data-name="Path 187"
                    d="M0,29.6,13.059,14.8,0,0"
                    transform="translate(0.322 -0.322)"
                    fill="none"
                    stroke="#fff"
                    stroke-width="2"
                  />
                </g>
              </g>
            </svg>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import KeenSlider from 'keen-slider'

export default {
  name: 'ArticleCarousel',
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
  data () {
    return {
      current: 1,
      total: 0,
      sliderheading: 'Image Carousel Module',
      slider: null
    }
  },

  mounted () {
    this.slider = new KeenSlider(this.$refs.slider, {
      loop: true,
      initial: this.current,
      slideChanged: (s) => {
        this.current = s.details().relativeSlide + 1
      }
    })
    this.total = this.slider.details().size
  }
}
</script>

<style lang="scss" scoped>

.overlay{
  width: 100%;
  position: absolute;
  height: 30%;
  bottom: 0;
  z-index: 9;
  background: rgb(2,0,36);
  background: linear-gradient(0deg, rgba(2,0,36,0.6979166666666667) 0%, rgba(0,0,0,0) 100%);
}

#articleslider{
  margin-bottom: 50px;
  .navigation-wrapper{
    position: relative;
    .keen-slider{
      .keen-slider__slide{
        .overlay{
          width: 100%;
          position: absolute;
          height: 30%;
          bottom: 0;
          z-index: 9;
          background: rgb(2,0,36);
          background: linear-gradient(0deg, rgba(2,0,36,0.6979166666666667) 0%, rgba(0,0,0,0) 100%);
        }
      }
    }
    .static-box{
      position: absolute;
      bottom: 0;
      padding: 2rem;
      padding-top: 0;
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      .right{
        p{
          position: relative;
          color: #fff;
          font-family: 'Corporate S Pro bold';
          letter-spacing: .7px;
          text-transform: uppercase;
          margin-bottom: 1rem;
          &::before{
            content: '';
            background: #fff;
            width: 25px;
            height: 2px;
            position: absolute;
            left: -34px;
            top: 48%;
            transform: translateY(-50%);
            z-index: 10;
          }
        }
        h3{
          color: #fff;
          margin: 0;
        }
      }
      .left{
        position: relative;
        top: -5px;
        .leftarrow{
          margin-right: 40px;
          svg{
            transform: rotate(180deg);
          }
        }
        a:hover{
          svg{
            path{
              stroke: #802437;
            }
          }
        }
      }
    }
  }
}
</style>
