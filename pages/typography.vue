<template>
  <div>
    <Header />
    <PageBanner :heading="heading" :show-breadcrumb="false" />
    <b-container>
      <b-row>
        <b-col>
          <!-- Primary__callout -->
          <callout cta-style="primary" text="<b>Primary</b> call-out CTA" button-label="Button label" button-url="#" />
          <callout cta-style="secondary" text="<b>Secondary</b> call-out CTA" button-label="Button label" button-url="#" />
          <div class="buttons">
            <!-- PRIMARY BUTTON LARGE -->
            <div class="row mb-4">
              <div class="col">
                <button-link button-size="large" button-style="primary primary--style1" label="Primary button" url="#" />
              </div>
              <div class="col">
                <button-link button-size="large" button-style="primary primary--style2" label="Primary button" url="#" />
              </div>
            </div>
            <!-- PRIMARY BUTTON REGULAR -->
            <div class="row mb-4">
              <div class="col">
                <button-link button-size="regular" button-style="primary primary--style1" label="Primary 01 button" url="#" />
              </div>
              <div class="col">
                <button-link button-size="regular" button-style="primary primary--style2" label="Primary 02 button" url="#" />
              </div>
            </div>
            <!-- SECONDARY BUTTON -->
            <div class="row mb-4">
              <div class="col">
                <button-link button-size="regular" button-style="secondary secondary--style1" label="Secondary 01 button" url="#" />
              </div>
              <div class="col">
                <button-link button-size="regular" button-style="secondary secondary--style1" label="Secondary 02 button" url="#" />
              </div>
            </div>
            <div class="row mb-4">
              <div class="col">
                <button-link button-size="regular" button-style="pale" label="Pale button" url="#" />
              </div>
              <div class="col">
                <button-link button-size="regular" button-style="whiteborder" label="White button" url="#" />
              </div>
            </div>
            <hr>
            <pre>Form Buttons</pre>
            <div class="row mb-4">
              <div class="col">
                <form-button button-size="large" button-style="primary primary--style1" label="Form button" url="#" />
              </div>
              <div class="col">
                <form-button button-size="regular" button-style="secondary secondary--style1" label="Form button" url="#" />
              </div>
              <div class="col">
                <form-button button-size="large" button-style="primary primary--style2" label="Form button" url="#" />
              </div>
              <div class="col">
                <form-button button-size="regular" button-style="secondary secondary--style2" label="Form button" url="#" />
              </div>
            </div>
          </div>
          <!-- links -->
          <div class="anchor-tags">
            <div class="row mb-4">
              <div class="col">
                <text-link url="#" text="Text link" link-style="primary" />
              </div>
              <div class="col">
                <text-link url="#" text="Text link" link-style="secondary" />
              </div>
            </div>
            <div class="row mb-4">
              <div class="col">
                <a href="#" class="link view primarylink">
                  View All
                  <img src="@/assets/img/view-arrow-primary.svg" alt="">
                </a>
              </div>
              <div class="col">
                <a href="#" class="link view secondarylink">
                  View All
                  <img src="@/assets/img/view-arrow-secondary.svg" alt="">
                </a>
              </div>
            </div>
          </div>
          <!-- text formates  -->
          <h1>H1 Georgia SemiBold 48/55</h1>
          <h2>H2 Georgia SemiBold 30/42</h2>
          <h3>H3 Georgia SemiBold 21/30</h3>
          <h4>H4 Georgia SemiBold 18/26</h4>
          <h5>H5 Corporate S Pro Bold 16/21</h5>
          <p>Body text - Corporate S Pro Regular 16/21</p>
          <p class="subline">
            Subline Corporate S Pro Bold 14/16
          </p>

          <!-- end of global component css  -->
          <div class="typography">
            <h3 v-text="bulletspointsheading" />
            <ul>
              <li v-for="n in 4" :key="n">
                {{ bulletspointstext }}
              </li>
            </ul>
          </div>

          <div class="imagewithtag">
            <img src="~/assets/img/insights/slider-image.png" alt="iage" class="main-slide-image">
            <p class="image-tag">
              ARTICLE TAG
            </p>
          </div>
        </b-col>
      </b-row>
    </b-container>

    <!-- new btns  -->
    <!-- <div class="newbtns container mt-5 mb-5">
      <div class="row">
        <div class="col-6 buttons">
          <nuxt-link to="/" class="p-btn primary primary--style1 large">
            <svg class="left" xmlns="http://www.w3.org/2000/svg" width="12" height="36" viewBox="0 0 12 36">
              <path id="Path_128" data-name="Path 128" d="M12-24.045,0-6,0-42Z" transform="translate(0 42)" fill="#f29131"/>
            </svg>
            <span class="text">PRIMARY BUTTON LARGE</span>
            <svg class="right" xmlns="http://www.w3.org/2000/svg" width="5.043" height="9.664" viewBox="0 0 5.043 9.664">
              <path id="Path_127" data-name="Path 127" d="M0,0,4,4.5,0,9" transform="translate(0.374 0.332)" fill="none" stroke="#fff" stroke-width="1"/>
            </svg>
          </nuxt-link>
          <br>
          <nuxt-link to="/" class="p-btn primary primary--style1 regular">
            <svg class="left" xmlns="http://www.w3.org/2000/svg" width="12" height="36" viewBox="0 0 12 36">
              <path id="Path_128" data-name="Path 128" d="M12-24.045,0-6,0-42Z" transform="translate(0 42)" fill="#f29131"/>
            </svg>
            <span class="text">PRIMARY BUTTON REGULAR</span>
            <svg class="right" xmlns="http://www.w3.org/2000/svg" width="5.043" height="9.664" viewBox="0 0 5.043 9.664">
              <path id="Path_127" data-name="Path 127" d="M0,0,4,4.5,0,9" transform="translate(0.374 0.332)" fill="none" stroke="#fff" stroke-width="1"/>
            </svg>
          </nuxt-link>
          <br>
          <nuxt-link to="/" class="p-btn secondary secondary--style1 regular">
            <svg class="left" xmlns="http://www.w3.org/2000/svg" width="12" height="36" viewBox="0 0 12 36">
              <path id="Path_128" data-name="Path 128" d="M12-24.045,0-6,0-42Z" transform="translate(0 42)" fill="#f29131"/>
            </svg>
            <span class="text">SECONDARY BUTTON</span>
            <svg class="right" xmlns="http://www.w3.org/2000/svg" width="5.043" height="9.664" viewBox="0 0 5.043 9.664">
              <path id="Path_127" data-name="Path 127" d="M0,0,4,4.5,0,9" transform="translate(0.374 0.332)" fill="none" stroke="#fff" stroke-width="1"/>
            </svg>
          </nuxt-link>
        </div>
        <div class="col-6 buttons">
          <nuxt-link to="/" class="p-btn primary primary--style2 large">
            <svg class="left" xmlns="http://www.w3.org/2000/svg" width="12" height="36" viewBox="0 0 12 36">
              <path id="Path_128" data-name="Path 128" d="M12-24.045,0-6,0-42Z" transform="translate(0 42)" fill="#f29131"/>
            </svg>
            <span class="text">PRIMARY BUTTON LARGE</span>
            <svg class="right" xmlns="http://www.w3.org/2000/svg" width="5.043" height="9.664" viewBox="0 0 5.043 9.664">
              <path id="Path_127" data-name="Path 127" d="M0,0,4,4.5,0,9" transform="translate(0.374 0.332)" fill="none" stroke="#fff" stroke-width="1"/>
            </svg>
          </nuxt-link>
          <br>
          <nuxt-link to="/" class="p-btn primary primary--style2 regular">
            <svg class="left" xmlns="http://www.w3.org/2000/svg" width="12" height="36" viewBox="0 0 12 36">
              <path id="Path_128" data-name="Path 128" d="M12-24.045,0-6,0-42Z" transform="translate(0 42)" fill="#f29131"/>
            </svg>
            <span class="text">PRIMARY BUTTON REGULAR</span>
            <svg class="right" xmlns="http://www.w3.org/2000/svg" width="5.043" height="9.664" viewBox="0 0 5.043 9.664">
              <path id="Path_127" data-name="Path 127" d="M0,0,4,4.5,0,9" transform="translate(0.374 0.332)" fill="none" stroke="#fff" stroke-width="1"/>
            </svg>
          </nuxt-link>
          <br>
          <nuxt-link to="/" class="p-btn secondary secondary--style2 regular">
            <svg class="left" xmlns="http://www.w3.org/2000/svg" width="12" height="36" viewBox="0 0 12 36">
              <path id="Path_128" data-name="Path 128" d="M12-24.045,0-6,0-42Z" transform="translate(0 42)" fill="#f29131"/>
            </svg>
            <span class="text">SECONDARY BUTTON</span>
            <svg class="right" xmlns="http://www.w3.org/2000/svg" width="5.043" height="9.664" viewBox="0 0 5.043 9.664">
              <path id="Path_127" data-name="Path 127" d="M0,0,4,4.5,0,9" transform="translate(0.374 0.332)" fill="none" stroke="#fff" stroke-width="1"/>
            </svg>
          </nuxt-link>
          <br>
          <nuxt-link to="/" class="p-btn pale regular">
            <svg class="left" xmlns="http://www.w3.org/2000/svg" width="12" height="36" viewBox="0 0 12 36">
              <path id="Path_128" data-name="Path 128" d="M12-24.045,0-6,0-42Z" transform="translate(0 42)" fill="#f29131"/>
            </svg>
            <span class="text">PALE BUTTON</span>
            <svg class="right" xmlns="http://www.w3.org/2000/svg" width="5.043" height="9.664" viewBox="0 0 5.043 9.664">
              <path id="Path_127" data-name="Path 127" d="M0,0,4,4.5,0,9" transform="translate(0.374 0.332)" fill="none" stroke="#fff" stroke-width="1"/>
            </svg>
          </nuxt-link>
        </div>
      </div>
    </div> -->
    <report-block />
    <Footer />
  </div>
</template>

<script>
import Header from '@/components/header'
import Footer from '@/components/footer'
import PageBanner from '@/components/page-banner'
import ReportBlock from '@/components/report-block'
import Callout from '@/components/callout'
import ButtonLink from '@/components/buttons/button-link'
import FormButton from '@/components/buttons/form-button'
import TextLink from '@/components/text-link'

export default {
  components: {
    TextLink,
    ButtonLink,
    FormButton,
    Callout,
    Header,
    PageBanner,
    ReportBlock,
    Footer
  },

  data () {
    return {
      heading: { text: 'Article title', subline: 'Insights' },
      bulletspointsheading: 'Bullet point style',
      bulletspointstext: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor'
    }
  }
}
</script>

<style lang="scss">
.newbtns{
    .p-btn{
      display: inline-block;
      color: #000;
      background: #fff;
      position: relative;
      border-collapse: collapse;
      line-height: auto;
      overflow: hidden;
      padding: 8px 16px;
      padding-left: 0;
      transition: .2s ease-in;
      span.text{
      margin: auto 16px;
      text-transform: uppercase;
      font-family: 'Corporate S Pro Bold';
      font-size: 14px;
      letter-spacing: .5px;
      line-height: 17px;
      margin-left: 20px;
      position: relative;
      z-index: 5;
      transition: all .3s ease-in-out;
      }
      svg.left{
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        left: 0px;
        height: auto;
        width: 12px;
        max-width: 100%;
        z-index: 2;
        transition: all .3s ease-in-out;
      }
      svg.right{
        display: inline;
        position: relative;
        z-index: 4;
        top: -1px;
        transition: all .3s ease-in-out;
      }
      &::before{
        content: "";
        width: 100%;
        height: 100%;
        position: absolute;
        background: #000;
        top: 0;
        right: 100%;
        z-index: 2;
        transition: all .3s ease-in-out;
      }
      // primary btn
      &.primary{
        &--style1{
          background-color: #802437;
          color: #fff;
          &::before{
            background: #f29131;
          }
        }
        &--style2{
          background-color: #f29131;
          color: #fff;
          &::before{
            background: #802437;
          }
        }
      }

      &.secondary{
        &--style1{
          border: 1px solid #802537;
          background: transparent;
          color: #802437;
          svg.left{
            path{
              fill: #802437;
            }
          }
          svg.right{
            path{
              stroke: #802437;
            }
          }
          &::before{
            background: #f29131;
          }
        }
        &--style2{
          border: 1px solid #f29131;
          background:#f29131;
          color: #fff;
          &::before{
            background: #802437;
          }
        }
      }

      &.white{
        background: #fff;
      }

      &.regular{
        padding: 8px 16px;
        svg.left{
          width: 13px;
        }
        span.text{
          font-size: 12px;
          line-height: 20px;
          margin: auto 14px;
        }
      }

      &.large{
        padding: 14px 16px;
        svg.left{
          width: 17.50px;
        }
      }

      &:hover{
        svg.left{
          left: 100%;
        }
        &::before{
          right: 0;
        }
        &.primary{
          &--style2{
          svg.left{
              path{
                fill: #802437;
              }
            }
          }
        }
        &.secondary{
          color: #fff;
          svg.right{
            path{
              stroke: #fff;
            }
          }
          svg.left{
            path{
              fill: #F29131;
            }
          }
          &--style2{
          svg.left{
              path{
                fill: #802437;
              }
            }
          }
        }
      }
    }

    // callouts
    .p-callout{
      display: flex;
      width: 100%;
      align-items: center;
      justify-content: space-between;
      background: #fff;
      color: #000;
      overflow: hidden;
      min-height: 66px;
      position: relative;
      svg.calloutleft{
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        z-index: 2;
      }
      span.callouttext{
        margin-left: 40px;
        font-size: 16px;
        font-family: 'Corporate S Pro Regular';
        b{
          font-family: 'Corporate S Pro Bold';
        }
      }
      .p-callout-btn{
        margin-right: 15px;
      }
      &.primary{
        background-color:#802537;
        span.callouttext{
          color: #fff;
        }
        .p-callout-btn{
          background: #fff;
        }
      }
      &.secondary{
        color: #802437;
        background-color:#F0EDEE;
        color: #fff;
        svg.calloutleft{
          path{
            fill: #E1DBDD;
          }
        }
        span.callouttext{
          color: #802437;
        }
      }
    }
}
</style>
