import Vue from 'vue'
import prismicDOM from 'prismic-dom'
import linkResolver from '@/plugins/link-resolver'
import AuthService from '@/services/auth-service'

if (!Vue.__helpers_mixin__) {
  Vue.__helpers_mixin__ = true
  Vue.mixin({
    methods: {
      /**
       * Get the CSS class for an insights card
       * @param articleObj
       * @returns {string}
       */
      getInsightCardClass(articleObj) {
        let cssClass = 'image-boxes-link'
        try {
          cssClass += ` image-boxes-link--${this.slugify(articleObj.data.article_type)}`
        } catch (e) {
          cssClass += null
        }
        return `col-sm-12 col-md-6 col-lg-4 mb-5 ${cssClass}`
      },
      /**
       * Get a URL with data from prismic "link" field type
       * @param prismicLink
       * @returns {*}
       */
      getPrismicLink(prismicLink) {
        return prismicDOM.Link.url(prismicLink, linkResolver)
      },
      /**
       * Get a prismic document from VueX using a prismic doc ID
       * @param prismicDocId
       * @returns {*}
       */
      getPrismicDocById (prismicDocId) {
        try {
          const items = this.$store.state.prismicDocs.filter((item) => {
            if (item.id === prismicDocId) {
              return true
            }
          })
          return items[0]
        } catch (e) {
        }
        return null
      },
      /**
       * Get a label from the prisimic Global Content document by label key
       * @param labelKey
       * @returns {string|null}
       */
      getLabel(labelKey) {
        try {
          let label = null
          this.$store.state.globalContent.labels.forEach((item) => {
            if (item.key === labelKey) {
              label = item.text
            }
          })
          return label ? label : `No label found with the key ${labelKey}`
        } catch (ex) {
          return `No label found with the key ${labelKey}`
        }
      },
      /**
       * Get a nicely formated date string in the site format
       * @param dateString
       * @returns {string}
       */
      getNiceDate(dateString) {
        try {
          const d = new Date(dateString)
          const year = new Intl.DateTimeFormat('en', {year: 'numeric'}).format(d)
          const month = new Intl.DateTimeFormat('en', {month: 'numeric'}).format(d)
          return `${month}/${year}`
        } catch (ex) {
          return dateString
        }
      },
      /**
       * Is the user on a mobile device?
       * @returns {boolean}
       */
      isMobile() {
        try {
          let isMobile = window.matchMedia("only screen and (max-width: 760px)").matches;
          return isMobile
        } catch (ex) {
          return false
        }
      },
      /**
       * Is the user on a tab device?
       * @returns {boolean}
       */
      isTab() {
        try {
          let isTab = window.matchMedia("only screen and (max-width: 1025px)").matches;
          return isTab
        } catch (ex) {
          return false
        }
      },
      /**
       * Get a tooltip using a tooltipKey
       * @param tooltipKey
       * @returns {string}
       */
      getTooltip(tooltipKey) {
        const tooltips = {
          'population': 'Describes the number of people resident within a geographical area and at the same time.',
          'share_of_country_population': 'Is the population of a city as a portion of the national population. ',
          'population_forecast_2020_2030': 'Indicates the percentage by which the current population is expected to grow (2018-2028). ',
          'old_age_ratio': 'Is calculated by dividing the proportion of senior dependents per 100 people of the working-age population. ',
          'number_of_private_households': 'Is the number of the households in a city. ',
          'working_population_weight_10': 'Is the proportion of the working age population that are employed. ',
          'working_population_weight_0': 'Indicates the absolute number of a city in employment.  ',
          'unemployment_rate': 'Shows the percentage of the workforce aged 16 and over that are unemployed.',
          'purchasing_power_per_household': 'Defines the ability of the household to buy products and services.',
          'average_household_income_eur': 'Measures the combined incomes of all people sharing a household or place of residence. ',
          'gdp_nuts3_million_euro': 'Gross domestic product indicates the economic size of the city.',
          'students_at_higher_education_institutions': 'The number of students at higher institutions.',
          'patent_applications_per_city_per_year': 'Indicates the average number of patent indications registered from a city over the last decade.',
          'youth_ratio': 'Is the ratio of those aged younger than 14 divided by the working population (defined as age 15 to 64).',
          'car_to_work_ratio': 'The more people that commute to work the less attractive a city is perceived to be in the long term.',
          'average_travel_time_to_work': 'The amount of time people spend in transit to work is a lifestyle factor that can impact on city’s attractiveness, as well as its productivity.',
          'airport_passenger_volume': 'Indicates how easy it is to get to leave a city.',
          'share_of_public_transportation': 'Indicates how many people use public transport to commute.'
        }
        try {
          return tooltips[tooltipKey]
        } catch (e) {
          return null
        }
      },
      /**
       * Slugify a string
       * @param string
       * @returns {string}
       */
      slugify(string) {
        try {
          const a = 'àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;'
          const b = 'aaaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------'
          const p = new RegExp(a.split('').join('|'), 'g')

          return string.toString().toLowerCase()
            .replace(/\s+/g, '-') // Replace spaces with -
            .replace(p, c => b.charAt(a.indexOf(c))) // Replace special characters
            .replace(/&/g, '-and-') // Replace & with 'and'
            .replace(/[^\w\-]+/g, '') // Remove all non-word characters
            .replace(/\-\-+/g, '-') // Replace multiple - with single -
            .replace(/^-+/, '') // Trim - from start of text
            .replace(/-+$/, '') // Trim - from end of text
        } catch (e) {
          return ''
        }
      },
      /**
       * Get a high quality vimeo URL
       */
      getVimeoEmbedUrl(videoObj) {
        try {
          return `${videoObj.embed_url}&quality=1080p`
        } catch (e) {
          return null
        }
      },
      /**
       * Get a high quality video for homapage URL
       */
      getEmbedUrl(videoObj) {
        try {
          if (videoObj.embed_url && videoObj.provider_name === 'Vimeo') {
            // vimeo URL
            return `${videoObj.embed_url}&quality=1080p`
          } else if (videoObj.embed_url && videoObj.provider_name === 'YouTube') {
            // youtube URL
            const ParsedUrl = videoObj.embed_url
            const getId = /[^/]*$/.exec(ParsedUrl)[0]
            return `https://www.youtube.com/embed/${getId}?autoplay=1&mute=1&loop=1&controls=0&vq=hd1080&playsinline=1&playlist=${getId}`
          }
          return null
        } catch (e) {
          return null
        }
      },
      /**
       * Set the bottom position of the usercentrics UI button. Use with $nextTick
       * @param bottomPosition integer for the bottom position
       */
      positionUserCentricsPreferenceButton(bottomPosition) {
        const ucButton = document.getElementById('uc-btn-open-main-corner-modal')
        if (ucButton) {
          if (this.isMobile()) {
            bottomPosition += 50
          }
          ucButton.setAttribute('style', `bottom: ${bottomPosition}px !important`);
        }
      },
      isBrowserSafari() {
        if(this.browserName === 'safari') {
          return true
        }
        return false
      },
      /**
       * Should this article be displayed?
       * @param article
       * @returns {boolean}
       */
      shouldShowArticle(article) {
        try {
          if (
            article.data.title === this.$store.state.globalContent.featured_insight.data.title &&
            this.hideFeaturedInsight
          ) {
            return false
          } else {
            return true
          }
        } catch (ex) {
          return true
        }
      },
      /**
       * Shuffle an array
       * @param array
       */
      shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
        }
      },
      /**
       * Get an image URL from Imgix by width or height
       * @param prismicImageObject
       * @param width
       * @param height
       * @returns {string|null}
       */
      getImageUrl (prismicImageObject, width, height) {
        if (prismicImageObject) {
          const imageUrl = prismicImageObject.url
          try {
            // Get the Imgix URL without the query string
            const rawImageUrl = imageUrl.substring(0, imageUrl.indexOf('?'))

            // Now create the queryParams
            const queryParams = `?q=90${width ? `&w=${width}` : ''}${height ? `&h=${height}` : ''}`
            const newImageUrl = rawImageUrl + queryParams
            return newImageUrl
          } catch (ex) {
            console.error('Error getting image URL', { prismicImageObject, ex })
          }
        }
        return null
      }
    },
    computed: {
      /**
       * Is the current user logged in?
       * @returns {boolean}
       */
      isUserLoggedIn() {
        return AuthService.isUserLoggedin(this)
      },
      browserName() {
        let is_chrome = navigator.userAgent.indexOf('Chrome') > -1;
        let is_explorer = navigator.userAgent.indexOf('MSIE') > -1;
        let is_firefox = navigator.userAgent.indexOf('Firefox') > -1;
        let is_safari = navigator.userAgent.indexOf("Safari") > -1;
        let is_opera = navigator.userAgent.toLowerCase().indexOf("op") > -1;

        if ((is_chrome) && (is_safari)) {
          is_safari = false;
        }
        if ((is_chrome) && (is_opera)) {
          is_chrome = false;
        }
        if (is_safari) {
          return 'safari'
        } else if (is_chrome) {
          return 'chrome'
        } else if (is_firefox) {
          return 'firefox'
        } else if (is_explorer) {
          return 'explorer'
        } else if (is_opera) {
          return 'opera'
        } else {
          return 'unknown'
        }

      }
    }
  })
}
