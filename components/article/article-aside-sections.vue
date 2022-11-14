<template>
  <div id="articlesections" v-if="$store.state.prismicDoc.data.display_article_section_links === true && articleSections && articleSections.length > 0">
    <h2>{{ getLabel('insights_sections_title') }}</h2>
        <ul>
          <li v-for="section in articleSections" :key="slugify(section)" v-if="section">
            <a :href="`#${slugify(section)}`" @click.prevent="scrollToSection(section)">{{ section }}</a>
          </li>
        </ul>
  </div>
</template>

<script>
const VueScrollTo = require('vue-scrollto')

export default {
  name: 'ArticleAsideSections',
  computed: {
    articleSections() {
      try {
        // Get all slices with a navigation_title field
        const sections = this.$store.state.prismicDoc.data.body.map((slice) => {
          try {
            if (slice.primary['navigation_title']) {
              const title = slice.primary['navigation_title']
              if(title) {
                return title
              }
            } else {
              return null
            }
          } catch (e) {
          }
        })
        const realSections = []
        sections.forEach((section) => {
          if(section) {
            realSections.push(section)
          }
        })
        return realSections
      } catch (e) {
      }
    }
  },
  methods: {
    scrollToSection(navigationTitle) {
      const sectionSlug = this.slugify(navigationTitle)
      VueScrollTo.scrollTo(`#${sectionSlug}`, 500, {
        duration: 300,
        easing: 'linear',
        offset: -150,
        force: true,
        cancelable: true,
        x: false,
        y: true
      })
    }
  }
}
</script>

<style lang="scss" scoped>
div#articlesections {
  margin-bottom: 3rem;

  h3 {
    margin-bottom: 1rem;
  }

  ul {
    li {
      border-bottom: 1px solid #F0EDEE;
      margin-bottom: 10px;

      a {
        color: #BEB6BA;
        line-height: 2.5;
      }

      &:last-child {
        margin: 0;
      }
    }
  }
}

</style>
