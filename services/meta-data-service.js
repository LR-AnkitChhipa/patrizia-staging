export default {
  /**
   * Get all meta tags for a page
   * @param prismicDocument
   * @returns {{meta: [{hid: string, name: string, content: *}, {hid: string, name: string, content: *}], title: (string|*)}}
   */
  getPageMetaTags(prismicDocument, app, route) {
    let metaTags = {}
    if (prismicDocument) {
      metaTags = {
        title: this.getPageTitle(prismicDocument),
        meta: [
          {
            hid: 'description',
            name: 'description',
            content: this.getMetaDescription(prismicDocument)
          },
          {
            hid: 'keywords',
            name: 'keywords',
            content: this.getMetaKeywords(prismicDocument)
          },
          {
            hid: 'og:title',
            property: 'og:title',
            content: this.getObjectProperty(prismicDocument.data, 'open_graph_title', 'seo_page_title', '')
          },
          {
            hid: 'og:description',
            property: 'og:description',
            content: this.getObjectProperty(prismicDocument.data, 'open_graph_description', 'seo_meta_description', '')
          },
          {
            hid: 'og:image',
            property: 'og:image',
            content: this.getOgImage(prismicDocument)
          },
          {
            hid: 'og:type',
            name: 'og:type',
            content: 'website'
          }
        ]

      }

      let canonicalUrl = this.getCanonicalUrl(prismicDocument)
      if (canonicalUrl) {
        metaTags.link = []
        metaTags.link.push({
          rel: 'canonical',
          href: canonicalUrl
        })
      }
    } else if (app && app.$store.state.cityApiData) {
      metaTags = {
        title: this.getPageTitleFromCityData(app),
      }
    }
    // Add the foundation feedback tracking script to certain pages
    const foundationTrackingPagePaths = [
      '/about',
      '/featured-cities',
      '/city-analysis'
    ]
    if(route && foundationTrackingPagePaths.includes(route.path) ) {
      metaTags.script = [
        {
          src: 'https://tk-static.fml-x.com/page.all.v1.2.js'
        }
        ]
    }
    return metaTags
  },
  /**
   * Construct the head title text
   * @param prismicDocument the prismic page
   * @returns {string|*}
   */
  getPageTitle(prismicDocument) {
    let pageTitle = ''
    if (prismicDocument.data && prismicDocument.data.seo_page_title) {
      pageTitle = prismicDocument.data.seo_page_title + ' | '
    } else if (prismicDocument.data.title) {
      if (
        prismicDocument.data && prismicDocument.data.title !== null &&
        typeof prismicDocument.data.title === 'object'
      ) {
        try {
          pageTitle = prismicDocument.data.title[0].text + ' | '
        } catch (e) {
          pageTitle = ''
        }
      } else {
        pageTitle = prismicDocument.data.title + ' | '
      }
    }
    pageTitle += 'PATRIZIA.ag'
    return pageTitle
  },
  /**
   * Get the page title from the city data from the API
   * @param app
   * @returns {string}
   */
  getPageTitleFromCityData(app) {
    let pageTitle
    if (app.$store.state.cityApiData) {
      pageTitle = `${app.$store.state.cityApiData.name} | `
    }
    pageTitle += 'PATRIZIA.ag'
    return pageTitle
  },
  getMetaKeywords(prismicDocument) {
    const keywords = this.getObjectProperty(prismicDocument.data, 'seo_meta_keywords')
    return keywords ? keywords : ''
  },
  getMetaDescription(prismicDocument) {
    return this.getObjectProperty(prismicDocument.data, 'seo_meta_description')
  },
  getCanonicalUrl(prismicDocument) {
    const desc = this.getObjectProperty(prismicDocument.data, 'canonical_url')
    return desc ? desc : ''
  },
  getOgImage(prismicDocument) {
    if (prismicDocument.data.open_graph_image) {
      return prismicDocument.data.open_graph_image.url
    } else {
      return null
    }
  },
  /**
   * Get a primary or secondary property from an object and return a fallback
   * string if not found
   * @param object
   * @param primaryProperty
   * @param secondaryProperty
   * @param fallbackString
   * @returns {null|*}
   */
  getObjectProperty(object, primaryProperty, secondaryProperty = null, fallbackString = '') {
    if (object[primaryProperty]) {
      return object[primaryProperty]
    } else if (secondaryProperty && object[secondaryProperty]) {
      return object[secondaryProperty]
    } else {
      return fallbackString
    }
  }
}
