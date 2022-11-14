<template>
  <div id="articleaccordion" :id="slugify(slice.primary.navigation_title)">
    <h3>{{ heading }}</h3>
    <div class="accordionbox">
      <h5>{{ accordion.subheading }}</h5>

      <div class="accordion" role="tablist">
        <div v-for="i in [0,1,2,3]" :key="i" class="item">
          <b-button v-b-toggle="'accordion-item-' + i">
            {{ accordion.accordiontext }}
          </b-button>
          <b-collapse
            :id="'accordion-item-' + i"
            :visible="i === 0"
            accordion="article-accordion"
            class="accordion-desc"
          >
            <p>{{ accordion.accordiondesc }}</p>
          </b-collapse>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ArticleAccordion',

  data () {
    return {
      heading: 'Accordion style',
      accordion: {
        subheading: 'Optional title',
        accordiontext: 'Lorem ipsum dolor sit',
        accordiondesc:
          'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
* {
  transition: 0.2s ease-in-out;
}

#articleaccordion {
  margin-bottom: 50px;
  h3 {
    margin-bottom: 35px;
  }
  .accordionbox {
    h5 {
      font-family: "Corporate S Pro bold";
    }
    // .accordion {
    //   .item {
    //     button {
    //       font-family: "Corporate S Pro";
    //       overflow-anchor: none;
    //       width: 100%;
    //       display: flex;
    //       justify-content: space-between;
    //       background: none;
    //       border: none;
    //       border-bottom: 1px solid #f0edee;
    //       color: #9c3f57;
    //       border-radius: 0;
    //       box-shadow: none !important;
    //       padding: 7px 1px;
    //       &.not-collapsed {
    //         color: #f29131;
    //         border-color: #f29131;
    //       }
    //     }
    //     .accordion-desc {
    //       padding-top: 30px;
    //       padding-right: 70px;
    //     }
    //   }
    // }
  }
}
</style>
