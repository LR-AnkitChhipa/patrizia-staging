export default {
  async getHeaderNavigation($prismic) {
    const api = await $prismic.api
    let navigation = {}
    const results = await api.query(
      // $prismic.predicates.at("document.type", "navigation")
      $prismic.predicates.at('document.tags', ['Main Navigation'])
      // ,{ lang: "en-us" } //This is a Prismic query option
    )
    navigation = results.results[0]
    // const header = PrismicDom.RichText.asText(blog_post.data.blog_post_title);
    // const content = PrismicDom.RichText.asText(blog_post.data.blog_content);
    // return {
    //   blog_post,
    //   header,
    //   content
    // };
    return navigation
  },

  /**
   * Get all global menu items in a single call
   * @param $prismic
   * @returns {Promise<{footerMenu: T, mainMenu: T, footerLegalMenu: T}>}
   */
  async getAllMenus($prismic) {
    const api = await $prismic.api
    let data = {}
    let menuTags = null
    menuTags = ['Footer Legal Menu', 'Footer Menu', 'Main Menu']
    const results = await api.query(
      // $prismic.predicates.at("document.type", "navigation")
      $prismic.predicates.any('document.tags', menuTags),
      {orderings: '[document.tags]'}
    )
    //
    data = results.results
    const mainMenu = data.filter((i) => {
      return i.tags[0] === `Main Menu`
    })[0]
    return {
      footerLegalMenu: data.filter((i) => {
        return i.tags[0] === 'Footer Legal Menu'
      })[0],
      footerMenu: data.filter((i) => {
        return i.tags[0] === 'Footer Menu'
      })[0],
      mainMenu
    }
  },
  /**
   * Get the next steps block data
   * @param $prismic
   * @returns {Promise<void>}
   */
  async getNextStepsBlock($prismic) {
    const api = await $prismic.api
    let nextStepsBlock = {}
    const response = await api.query(
      $prismic.predicates.at('document.type', 'next_steps_block')
    )

    if (response.results.length > 0) {
      nextStepsBlock = response.results[0].data
    }
    return nextStepsBlock
  },
  /**
   * Get insights articles
   * @param $prismic
   * @returns {Promise<{insights: SpeechRecognitionResultList | LintResult[]}>}
   */
  async getInsightsArticles($prismic) {
    const api = await $prismic.api
    let insights = {}
    const results = await api.query(
      $prismic.predicates.at('document.type', 'article'),
      {orderings: '[my.article.published_date desc]'}
    )
    //
    insights = results.results
    return insights
  },
  async getFeaturedInsightsArticles($prismic) {
    const api = await $prismic.api
    let insights = {}
    const results = await api.query(
      $prismic.predicates.at('document.tags', ['Featured Insight']),
      {orderings: '[my.article.published_date desc]'}
    )
    //
    insights = results.results
    return insights
  },
  /**
   * Get Investor Newsletter Block
   * @param $prismic
   * @returns {Promise<{investornewsletter: SpeechRecognitionResultList | LintResult[]}>}
   */
  async getInvestorNewsletter($prismic) {
    const document = await $prismic.api.getSingle('investor_newsletter')
    return document
  },
  /**
   * Get the footer download CTA document
   * @param $prismic
   * @returns {Promise<*>}
   */
  async getFooterDownloadCta($prismic) {
    const document = await $prismic.api.getSingle('footer_download_cta')
    return document
  },
  async getGlobalContent($prismic) {
    const globalContent = await $prismic.api.getSingle('global_content',
      {
        'fetchLinks': [
          'article.title',
          'article.thumbnail_image',
          'article.excerpt',
          'article.published_date',
          'article.article_category',
          'article.article_type',
          'article.is_private'
        ]
      })
    return globalContent
  },
  /**
   * Get prismic documents by type
   * @param $prismic
   * @param documentType
   * @returns {Promise<*|{}>}
   */
  async getPrismicDocsByTypes ($prismic, documentTypeArray) {
    const api = await $prismic.api
    let items = {}
    const results = await api.query(
      $prismic.predicates.any('document.type', documentTypeArray),
      {
        pageSize: 2000
      }
    )
    //
    items = results.results
    return items
  }
}
