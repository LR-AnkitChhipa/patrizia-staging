import PrismicService from '../services/prismic-service'
import DataService from '@/services/data-service'

const cookieparser = process.server ? require('cookieparser') : undefined

export const state = () => ({
  menus: null,
  nextStepsBlock: null,
  prismicDoc: null,
  insightsArticles: null,
  featuredInsightsArticles: null,
  investorNewsletter: null,
  footerDownloadCta: null,
  globalContent: null,
  cityApiData: null,
  auth: null,
  userdata: null,
  trackingNotificationHidden: false,
  prismicDocs: null,
})

export const mutations = {
  SET_TRACKING_NOTIFICATION_STATE(state, data) {
    state.trackingNotificationHidden = data
  },
  SET_PRISMIC_DOC(state, data) {
    state.prismicDoc = data
  },
  SET_INSIGHTS_ARTICLES(state, data) {
    state.insightsArticles = data
  },
  SET_FEATURED_INSIGHTS_ARTICLES(state, data) {
    state.featuredInsightsArticles = data
  },
  SET_INVESTOR_NEWSLETTER(state, data) {
    state.investorNewsletter = data
  },
  SET_FOOTER_DOWNLOAD_CTA(state, data) {
    state.footerDownloadCta = data
  },
  SET_GLOBAL_CONTENT(state, data) {
    state.globalContent = data
  },
  SET_CITY_API_DATA(state, data) {
    state.cityApiData = data
  },
  SET_MENUS(state, data) {
    state.menus = data
  },
  SET_MENUS_ERROR(state, error) {
    state.menus = error
  },
  SET_NEXT_STEPS(state, data) {
    state.nextStepsBlock = data
  },
  SET_NEXT_STEPS_ERROR(state, error) {
    state.nextStepsBlock = error
  },
  setAuth(state, auth) {
    state.auth = auth
  },
  USER_DATA(state, userdata) {
    state.userdata = userdata
  },
  SET_DOCUMENTS (state, data) {
    state.prismicDocs = data
  },
  /**
   * Update a single user property
   * @param state
   * @param property
   * @constructor
   */
  SET_USER_PROPERTY(state, property) {
    // merge data with previous state
    state.userdata = Object.assign({}, state.userdata, property)
  }
}

export const actions = {
  nuxtServerInit({commit}, {req}) {
    let auth = null
    if (req.headers.cookie) {
      const parsed = cookieparser.parse(req.headers.cookie)
      try {
        auth = JSON.parse(parsed.auth)
      } catch (err) {
        // No valid cookie found
      }
    }
    commit('setAuth', auth)
  },
  async userData({commit}, {req}) {
    let userdata = null
    if (req.headers.cookie) {
      const parsed = cookieparser.parse(req.headers.cookie)
      try {
        userdata = await JSON.parse(parsed.userdata)
      } catch (err) {
        // No valid cookie found
      }
    }
    commit('USER_DATA', userdata)
  },
  async fetchAllMenus({commit}, $prismic) {
    try {
      const menus = await PrismicService.getAllMenus($prismic)
      commit('SET_MENUS', menus)
    } catch (e) {
      console.error('Error getting menus', e)
      const error = 'Please create a main navigation document tagged with "Main Menu"'
      commit('SET_MENUS_ERROR', error)
    }
  },
  /**
   *
   * @param commit
   * @param prismic
   * @param type The prismic doc type e.g. city or page
   * @param uid the prismic doc UID e.g. london or about
   * @returns {Promise<void>}
   */
  async fetchPrismicDocByUid({commit}, {prismic, type, uid}) {
    try {
      const response = await prismic.api.getByUID(type, uid,
        {
          'fetchLinks': [
            'data_factors.title',
            'data_factors.factor_title',
            'data_factors.description',
            'data_factors.colour',
            'expert.name',
            'expert.job_title',
            'expert.email_address',
            'expert.phone_number',
            'expert.image',
            'expert.location'
          ]
        })
      commit('SET_PRISMIC_DOC', response)
    } catch (e) {
    }
  },
  /**
   *
   * @param commit
   * @param prismic
   * @param type The prismic doc type e.g. city
   * @param uid the prismic doc UID e.g. london
   * @returns {Promise<void>}
   */
  async fetchPrismicCityDocByUid({commit}, {prismic, type, uid}) {
    try {
      // fetchLinks docs here https://prismic.io/docs/technologies/fetch-linked-document-fields-javascript
      const response = await prismic.api.getByUID(type, uid,
        {
          'fetchLinks': [
            'expert.name',
            'expert.job_title',
            'expert.email_address',
            'expert.phone_number',
            'expert.image',
            'article.title',
            'article.thumbnail_image',
            'article.excerpt',
            'article.published_date',
            'article.article_category',
            'article.article_type',
            'article.is_private'
          ]
        })
      commit('SET_PRISMIC_DOC', response)
    } catch (e) {
      console.log('error', e)
    }
  },
  /**
   * Get a single prismic doc by page type
   * @param commit
   * @param prismic
   * @param uid
   * @returns {Promise<void>}
   */
  async fetchPrismicSingle({commit}, {prismic, type}) {
    try {
      const response = await prismic.api.getSingle(type)
      commit('SET_PRISMIC_DOC', response)
    } catch (e) {
    }
  },
  /**
   * Get a list of insights articles and add them to the state
   * @param commit
   * @param prismic
   * @param uid
   * @returns {Promise<void>}
   */
  async fetchLatestInsights({commit}, {prismic, uid}) {
    try {
      const insightsArticles = await PrismicService.getInsightsArticles(prismic)
      commit('SET_INSIGHTS_ARTICLES', insightsArticles)
      const featuredInsights = await PrismicService.getFeaturedInsightsArticles(prismic)
      commit('SET_FEATURED_INSIGHTS_ARTICLES', featuredInsights)

    } catch (e) {
    }
  },
  async fetchInvestorNewsletter({commit}, {prismic, uid}) {
    try {
      const investornewsletter = await PrismicService.getInvestorNewsletter(prismic)
      commit('SET_INVESTOR_NEWSLETTER', investornewsletter)
    } catch (e) {
    }
  },
  /**
   * Get the footer download CTA content
   * @param commit
   * @param prismic
   * @returns {Promise<void>}
   */
  async fetchFooterDownloadCta({commit}, {prismic}) {
    try {
      const document = await PrismicService.getFooterDownloadCta(prismic)
      commit('SET_FOOTER_DOWNLOAD_CTA', document)
    } catch (e) {
    }
  },
  async fetchGlobalContent({commit}, {prismic, uid}) {
    try {
      const globalContent = await PrismicService.getGlobalContent(prismic)
      if (globalContent.data) {
        commit('SET_GLOBAL_CONTENT', globalContent.data)
      }
    } catch (e) {
    }
  },
  async fetchApiDataForCityById({commit}, cityId) {
    const apiResponse = await DataService.getCityData(cityId)
    const apiData = apiResponse.data
    commit('SET_CITY_API_DATA', apiData)
  },
  async fetchNextStepsBlock({commit}, $prismic) {
    try {
      const menus = await PrismicService.getNextStepsBlock($prismic)
      commit('SET_NEXT_STEPS', menus)
    } catch (e) {
      const error = 'No next steps data found'
      commit('SET_NEXT_STEPS_ERROR', error)
    }
  },
  /**
   * Get deep linked documents. Prismic limits how deep you can get a
   * linked document. So we load all deep docs into VueX and we will query
   * them from here
   * @param commit
   * @param prismic
   * @returns {Promise<void>}
   */
  async fetchDeepLinkedDocuments ({ commit }, { prismic }) {
    try {
      const items = await PrismicService.getPrismicDocsByTypes(prismic,
        [
          'footer_download_cta',
        ]
      )

      if (items) {
        commit('SET_DOCUMENTS', items)
      }
    } catch (e) {
    }
  }
}
