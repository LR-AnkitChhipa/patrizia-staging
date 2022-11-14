export default {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  router: {
    middleware: ['auth', 'stagingauth']
  },
  env: {
    VUE_APP_GOOGLE_MAPS_API_KEY: process.env.VUE_APP_GOOGLE_MAPS_API_KEY
  },
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      {charset: 'utf-8'},
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico'
      }
    ],
    script: [
      {
        src: 'https://www.bugherd.com/sidebarv2.js?apikey=zfbrotlgsitsx4p6hqjsta',
        async: true,
      }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: {color: '#fff'},
  /*
  ** Global CSS
  */
  css: [
    'vue-keen-slider/dist/vue-keen-library.css',
    'vue-slick-carousel/dist/vue-slick-carousel.css',
    'viewerjs/dist/viewer.css',
    'animate.css/animate.css',
    // SCSS file in the project
    '@/assets/scss/style.scss'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    {src: '~/plugins/keen-slider.js'},
    {src: '~/plugins/vue-inline-svg.js'},
    {src: '~/plugins/vue-intersect.js', mode: 'client'},
    {src: '~/plugins/vue-ellipse-progress.js', mode: 'client'},
    {src: '~/plugins/vue-range-slider.js', mode: 'client'},
    {src: '~/plugins/vee-validate.js'},
    {src: '~/plugins/animated-number-vue.js'},
    {src: '@/plugins/google-maps', mode: 'client'},
    {src: '@/plugins/sorted-table', mode: 'client'},
    {src: '@/plugins/image-viewer', mode: 'client'},
    {src: '@/plugins/vue-slick-carousel', mode: 'client'},
    {src: '@/plugins/vue-youtube', mode: 'client'},
    {src: '@/plugins/helpers'},
    {src: '@/plugins/vivus'}
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    // '@nuxtjs/eslint-module'
    '@nuxtjs/style-resources'
  ],
  /*
  ** Nuxt.js modules
  */
  proxy: {
    // Proxies /sanctum/csrf-cookie to https://data.patrizialivingcities.chaos.staging.yourtemporary.net/sanctum/csrf-cookie
    // '/sanctum/csrf-cookie': 'https://data.patrizialivingcities.chaos.staging.yourtemporary.net',
    // '/register': 'https://data.patrizialivingcities.chaos.staging.yourtemporary.net',
    // '/api': 'https://data.patrizialivingcities.chaos.staging.yourtemporary.net'
    '/sanctum/csrf-cookie': 'http://data.livingcities.patrizia.local',
    '/register': 'http://data.livingcities.patrizia.local',
    '/api': 'http://data.livingcities.patrizia.local',
    '/forgot-password': 'http://data.livingcities.patrizia.local',
    '/reset-password': 'http://data.livingcities.patrizia.local'
  },
  modules: [
    ['@nuxtjs/proxy'],
    '@nuxtjs/gtm',
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    'cookie-universal-nuxt',
    '@nuxtjs/pwa',
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv',
    'bootstrap-vue/nuxt',
    'vue-scrollto/nuxt',
    'vue-social-sharing/nuxt',
    ['@nuxtjs/prismic', {preview: '/preview'}]
  ],
  styleResources: {
    scss: [
      './assets/scss/_mixins.scss'
    ]
  },
  prismic: {
    endpoint: 'https://patrizia-living-cities.cdn.prismic.io/api/v2',
    linkResolver: '@/plugins/link-resolver',
    htmlSerializer: '@/plugins/html-serializer',
    preview: '/preview'
  },
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
    baseURL: 'http://patrizialivingcities.localhost',
    credentials: true,
    withCredentials: true
  },
  gtm: {
    id: 'GTM-TTGMS9L'
  },
  pwa: {
    manifest: {
      name: 'City Pulse',
      lang: 'en',
      orientation: 'portrait',
      display: 'fullscreen',
      theme_color: '#ffffff',
      background_color: '#ffffff',
      start_url: ''
    },
    workbox: {
    //   runtimeCaching: [
    //     {
    //       urlPattern: 'https://data.patrizialivingcities.chaos.staging.yourtemporary.net/api/*',
    //       handler: 'networkFirst',
    //       method: 'GET',
    //       strategyOptions: { cacheableResponse: { statuses: [0, 200] } }
    //     },
    //     {
    //       urlPattern: 'https://fonts.gstatic.com/.*',
    //       handler: 'cacheFirst',
    //       method: 'GET',
    //       strategyOptions: { cacheableResponse: { statuses: [0, 200] } }
    //     }
    //   ],
    //   preCaching: [
    //     'https://data.patrizialivingcities.chaos.staging.yourtemporary.net/api/chart/cities',
    //     'https://data.patrizialivingcities.chaos.staging.yourtemporary.net/api/chart/goals',
    //     'https://data.patrizialivingcities.chaos.staging.yourtemporary.net/api/chart/table',
    //     'https://data.patrizialivingcities.chaos.staging.yourtemporary.net/api/chart/map',
    //     'https://data.patrizialivingcities.chaos.staging.yourtemporary.net/api/chart/compare'
    //   ]
    }
  },
  /*
  ** Build configuration
  */
  build: {
    transpile: [
      'vee-validate/dist/rules',
      'keen-slider',
      'vue2-google-maps',
      // 'animated-number-vue',
      // 'axios',
      // 'bootstrap-vue',
      // 'bootstrap',
      // 'cookie-universal-nuxt',
      // 'cookieparser',
      // 'd3',
      // 'hooper',
      // 'js-cookie',
      // // 'nuxt',
      // 'popper.js',
      // 'prismic-dom',
      // 'v-viewer',
      // 'vivus',
      // 'vue-ellipse-progress',
      // 'vue-inline-svg',
      // 'vue-intersect',
      // 'vue-scrollto',
      // 'vue-slick-carousel',
      // 'vue-social-sharing',

    ]
    /*
    ** You can extend webpack config here
    */
    // extend (config, ctx) {
    //   config.module.rules.push({
    //     enforce: "pre",
    //     test: /\.(js|vue)$/,
    //     loader: "eslint-loader",
    //     exclude: /(node_modules)/,
    //     options: {
    //       fix: true
    //     }
    //   })
    // }
  }
}
