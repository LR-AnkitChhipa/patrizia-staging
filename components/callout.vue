<template>
  <!-- <div :class="'callout mb-5 ' + ctaStyle">
    <p v-html="text" />
    <button-link v-if="buttonUrl.slug" :prismic-link-object="buttonUrl" :label="buttonLabel" button-style="secondary secondary--style1" />
    <a v-else-if="buttonUrl" :href="buttonUrl" class="btn-lable">
      <svg class="left" xmlns="http://www.w3.org/2000/svg" width="12" height="36" viewBox="0 0 12 36">
        <path
          id="Path_128"
          data-name="Path 128"
          d="M12-24.045,0-6,0-42Z"
          transform="translate(0 42)"
          fill="#802537"
        />
      </svg>
      {{ buttonLabel }}
      <svg
        class="right"
        xmlns="http://www.w3.org/2000/svg"
        width="5.044"
        height="9.567"
        viewBox="0 0 5.044 9.567"
      >
        <path
          id="Path_2589"
          data-name="Path 2589"
          d="M0,0,4,4.449,0,8.9"
          transform="translate(0.372 0.334)"
          fill="none"
          stroke="#7f2336"
          stroke-width="1"
        />
      </svg>
    </a>
  </div> -->
  <div class="p-callout mb-5" :class="ctaStyle">
    <svg class="calloutleft" xmlns="http://www.w3.org/2000/svg" width="22" height="66" viewBox="0 0 22 66">
      <path id="Path_205" data-name="Path 205" d="M22-9.083,0,24,0-42Z" transform="translate(0 42)" fill="#f29131"/>
    </svg>
    <span class="callouttext" v-html="text" />
    <nuxt-link v-if="buttonUrl.slug" :to="buttonUrl.slug" class="p-btn p-callout-btn secondary secondary--style1 regular">
      <svg class="left" xmlns="http://www.w3.org/2000/svg" width="12" height="36" viewBox="0 0 12 36">
        <path id="Path_128" data-name="Path 128" d="M12-24.045,0-6,0-42Z" transform="translate(0 42)" fill="#f29131"/>
      </svg>
      <span class="text">{{ buttonLabel }}</span>
      <svg class="right" xmlns="http://www.w3.org/2000/svg" width="5.043" height="9.664" viewBox="0 0 5.043 9.664">
        <path id="Path_127" data-name="Path 127" d="M0,0,4,4.5,0,9" transform="translate(0.374 0.332)" fill="none" stroke="#fff" stroke-width="1"/>
      </svg>
    </nuxt-link>
    <a v-else-if="buttonUrl" :href="buttonUrl" class="p-btn p-callout-btn secondary secondary--style1 regular">
      <svg class="left" xmlns="http://www.w3.org/2000/svg" width="12" height="36" viewBox="0 0 12 36">
        <path id="Path_128" data-name="Path 128" d="M12-24.045,0-6,0-42Z" transform="translate(0 42)" fill="#f29131"/>
      </svg>
      <span class="text">{{ buttonLabel }}</span>
      <svg class="right" xmlns="http://www.w3.org/2000/svg" width="5.043" height="9.664" viewBox="0 0 5.043 9.664">
        <path id="Path_127" data-name="Path 127" d="M0,0,4,4.5,0,9" transform="translate(0.374 0.332)" fill="none" stroke="#fff" stroke-width="1"/>
      </svg>
    </a>
  </div>
</template>

<script>
import ButtonLink from "@/components/buttons/button-link";
export default {
  name: 'Callout',
  components: {ButtonLink},
  props: {
    ctaStyle: {
      type: String,
      default () {
        return 'secondary'
        // return 'secondary'
      }
    },
    text: {
      type: String,
      default () {
        return ''
      }
    },
    buttonLabel: {
      type: String,
      default () {
        return ''
      }
    },
    buttonUrl: {
      type: [String, Object],
      default () {
        return null
      }
    }
  }
}
</script>

<style lang="scss">
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
    max-width: 70%;
    margin-left: 40px;
    font-size: 16px;
    font-family: 'Corporate S Pro';
    b{
      font-family: 'Corporate S Pro Bold';
    }
  }
  .p-callout-btn{
    margin-right: 15px;
  }

  @include respond-below(md) {
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 20px 10px;

    svg.calloutleft{
      display: none;
    }
    span.callouttext{
      max-width: 100%;
      margin: auto;
      margin-bottom: 20px;
    }
    .p-callout-btn{
      margin-right: 0;
    }
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
</style>
