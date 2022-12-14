import Vue from 'vue'
import Vuex from 'vuex'
import Meta from 'vue-meta'
import ClientOnly from 'vue-client-only'
import NoSsr from 'vue-no-ssr'
import { createRouter } from './router.js'
import NuxtChild from './components/nuxt-child.js'
import NuxtError from '../layouts/error.vue'
import Nuxt from './components/nuxt.js'
import App from './App.js'
import { setContext, getLocation, getRouteData, normalizeError } from './utils'
import { createStore } from './store.js'

/* Plugins */

import nuxt_plugin_bootstrapvue_3fe8407f from 'nuxt_plugin_bootstrapvue_3fe8407f' // Source: ./bootstrap-vue.js (mode: 'all')
import nuxt_plugin_prismic_fdcb11e4 from 'nuxt_plugin_prismic_fdcb11e4' // Source: ./prismic/plugins/prismic.js (mode: 'all')
import nuxt_plugin_prismiccomponents_11d872c6 from 'nuxt_plugin_prismiccomponents_11d872c6' // Source: ./prismic/plugins/prismic-components.js (mode: 'all')
import nuxt_plugin_vuesocialsharingplugin_d678b56e from 'nuxt_plugin_vuesocialsharingplugin_d678b56e' // Source: ./vue-social-sharing-plugin.js (mode: 'all')
import nuxt_plugin_vuescrollto_5913cc8e from 'nuxt_plugin_vuescrollto_5913cc8e' // Source: ./vue-scrollto.js (mode: 'client')
import nuxt_plugin_workbox_58abd36c from 'nuxt_plugin_workbox_58abd36c' // Source: ./workbox.js (mode: 'client')
import nuxt_plugin_metaplugin_3360ee7f from 'nuxt_plugin_metaplugin_3360ee7f' // Source: ./pwa/meta.plugin.js (mode: 'all')
import nuxt_plugin_iconplugin_380893f3 from 'nuxt_plugin_iconplugin_380893f3' // Source: ./pwa/icon.plugin.js (mode: 'all')
import nuxt_plugin_cookieuniversalnuxt_5629b1f8 from 'nuxt_plugin_cookieuniversalnuxt_5629b1f8' // Source: ./cookie-universal-nuxt.js (mode: 'all')
import nuxt_plugin_axios_68829b60 from 'nuxt_plugin_axios_68829b60' // Source: ./axios.js (mode: 'all')
import nuxt_plugin_gtm_2567cd26 from 'nuxt_plugin_gtm_2567cd26' // Source: ./gtm.js (mode: 'all')
import nuxt_plugin_keenslider_87a9b6bc from 'nuxt_plugin_keenslider_87a9b6bc' // Source: ../plugins/keen-slider.js (mode: 'all')
import nuxt_plugin_vueinlinesvg_56f4a20a from 'nuxt_plugin_vueinlinesvg_56f4a20a' // Source: ../plugins/vue-inline-svg.js (mode: 'all')
import nuxt_plugin_vueintersect_58917e56 from 'nuxt_plugin_vueintersect_58917e56' // Source: ../plugins/vue-intersect.js (mode: 'client')
import nuxt_plugin_vueellipseprogress_6017563e from 'nuxt_plugin_vueellipseprogress_6017563e' // Source: ../plugins/vue-ellipse-progress.js (mode: 'client')
import nuxt_plugin_vuerangeslider_4017cf69 from 'nuxt_plugin_vuerangeslider_4017cf69' // Source: ../plugins/vue-range-slider.js (mode: 'client')
import nuxt_plugin_veevalidate_1a0c1998 from 'nuxt_plugin_veevalidate_1a0c1998' // Source: ../plugins/vee-validate.js (mode: 'all')
import nuxt_plugin_animatednumbervue_5f213601 from 'nuxt_plugin_animatednumbervue_5f213601' // Source: ../plugins/animated-number-vue.js (mode: 'all')
import nuxt_plugin_googlemaps_c54ce192 from 'nuxt_plugin_googlemaps_c54ce192' // Source: ../plugins/google-maps (mode: 'client')
import nuxt_plugin_sortedtable_7a53ee9c from 'nuxt_plugin_sortedtable_7a53ee9c' // Source: ../plugins/sorted-table (mode: 'client')
import nuxt_plugin_imageviewer_ab77a290 from 'nuxt_plugin_imageviewer_ab77a290' // Source: ../plugins/image-viewer (mode: 'client')
import nuxt_plugin_vueslickcarousel_756afa10 from 'nuxt_plugin_vueslickcarousel_756afa10' // Source: ../plugins/vue-slick-carousel (mode: 'client')
import nuxt_plugin_vueyoutube_fcf88930 from 'nuxt_plugin_vueyoutube_fcf88930' // Source: ../plugins/vue-youtube (mode: 'client')
import nuxt_plugin_helpers_e49953de from 'nuxt_plugin_helpers_e49953de' // Source: ../plugins/helpers (mode: 'all')
import nuxt_plugin_vivus_234a3c8d from 'nuxt_plugin_vivus_234a3c8d' // Source: ../plugins/vivus (mode: 'all')

// Component: <ClientOnly>
Vue.component(ClientOnly.name, ClientOnly)

// TODO: Remove in Nuxt 3: <NoSsr>
Vue.component(NoSsr.name, {
  ...NoSsr,
  render (h, ctx) {
    if (process.client && !NoSsr._warned) {
      NoSsr._warned = true

      console.warn('<no-ssr> has been deprecated and will be removed in Nuxt 3, please use <client-only> instead')
    }
    return NoSsr.render(h, ctx)
  }
})

// Component: <NuxtChild>
Vue.component(NuxtChild.name, NuxtChild)
Vue.component('NChild', NuxtChild)

// Component NuxtLink is imported in server.js or client.js

// Component: <Nuxt>
Vue.component(Nuxt.name, Nuxt)

Object.defineProperty(Vue.prototype, '$nuxt', {
  get() {
    const globalNuxt = this.$root.$options.$nuxt
    if (process.client && !globalNuxt && typeof window !== 'undefined') {
      return window.$nuxt
    }
    return globalNuxt
  },
  configurable: true
})

Vue.use(Meta, {"keyName":"head","attribute":"data-n-head","ssrAttribute":"data-n-head-ssr","tagIDKeyName":"hid"})

const defaultTransition = {"name":"page","mode":"out-in","appear":false,"appearClass":"appear","appearActiveClass":"appear-active","appearToClass":"appear-to"}

const originalRegisterModule = Vuex.Store.prototype.registerModule

function registerModule (path, rawModule, options = {}) {
  const preserveState = process.client && (
    Array.isArray(path)
      ? !!path.reduce((namespacedState, path) => namespacedState && namespacedState[path], this.state)
      : path in this.state
  )
  return originalRegisterModule.call(this, path, rawModule, { preserveState, ...options })
}

async function createApp(ssrContext, config = {}) {
  const router = await createRouter(ssrContext, config)

  const store = createStore(ssrContext)
  // Add this.$router into store actions/mutations
  store.$router = router

  // Fix SSR caveat https://github.com/nuxt/nuxt.js/issues/3757#issuecomment-414689141
  store.registerModule = registerModule

  // Create Root instance

  // here we inject the router and store to all child components,
  // making them available everywhere as `this.$router` and `this.$store`.
  const app = {
    head: {"title":"Patrizia-Living-Cities","meta":[{"charset":"utf-8"},{"name":"viewport","content":"width=device-width, initial-scale=1"},{"hid":"description","name":"description","content":"Patrizia Living Cities"}],"link":[{"rel":"icon","type":"image\u002Fx-icon","href":"\u002Ffavicon.ico"}],"script":[{"src":"https:\u002F\u002Fwww.bugherd.com\u002Fsidebarv2.js?apikey=zfbrotlgsitsx4p6hqjsta","async":true},{"hid":"gtm-script","innerHTML":"if(!window._gtm_init){window._gtm_init=1;(function(w,n,d,m,e,p){w[d]=(w[d]==1||n[d]=='yes'||n[d]==1||n[m]==1||(w[e]&&w[e][p]&&w[e][p]()))?1:0})(window,navigator,'doNotTrack','msDoNotTrack','external','msTrackingProtectionEnabled');(function(w,d,s,l,x,y){w[x]={};w._gtm_inject=function(i){if(w.doNotTrack||w[x][i])return;w[x][i]=1;w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s);j.async=true;j.src='https:\u002F\u002Fwww.googletagmanager.com\u002Fgtm.js?id='+i;f.parentNode.insertBefore(j,f);};w[y]('GTM-TTGMS9L')})(window,document,'script','dataLayer','_gtm_ids','_gtm_inject')}"}],"style":[],"noscript":[{"hid":"gtm-noscript","pbody":true,"innerHTML":"\u003Ciframe src=\"https:\u002F\u002Fwww.googletagmanager.com\u002Fns.html?id=GTM-TTGMS9L&\" height=\"0\" width=\"0\" style=\"display:none;visibility:hidden\" title=\"gtm\"\u003E\u003C\u002Fiframe\u003E"}],"__dangerouslyDisableSanitizersByTagID":{"gtm-script":["innerHTML"],"gtm-noscript":["innerHTML"]}},

    store,
    router,
    nuxt: {
      defaultTransition,
      transitions: [defaultTransition],
      setTransitions (transitions) {
        if (!Array.isArray(transitions)) {
          transitions = [transitions]
        }
        transitions = transitions.map((transition) => {
          if (!transition) {
            transition = defaultTransition
          } else if (typeof transition === 'string') {
            transition = Object.assign({}, defaultTransition, { name: transition })
          } else {
            transition = Object.assign({}, defaultTransition, transition)
          }
          return transition
        })
        this.$options.nuxt.transitions = transitions
        return transitions
      },

      err: null,
      dateErr: null,
      error (err) {
        err = err || null
        app.context._errored = Boolean(err)
        err = err ? normalizeError(err) : null
        let nuxt = app.nuxt // to work with @vue/composition-api, see https://github.com/nuxt/nuxt.js/issues/6517#issuecomment-573280207
        if (this) {
          nuxt = this.nuxt || this.$options.nuxt
        }
        nuxt.dateErr = Date.now()
        nuxt.err = err
        // Used in src/server.js
        if (ssrContext) {
          ssrContext.nuxt.error = err
        }
        return err
      }
    },
    ...App
  }

  // Make app available into store via this.app
  store.app = app

  const next = ssrContext ? ssrContext.next : location => app.router.push(location)
  // Resolve route
  let route
  if (ssrContext) {
    route = router.resolve(ssrContext.url).route
  } else {
    const path = getLocation(router.options.base, router.options.mode)
    route = router.resolve(path).route
  }

  // Set context to app.context
  await setContext(app, {
    store,
    route,
    next,
    error: app.nuxt.error.bind(app),
    payload: ssrContext ? ssrContext.payload : undefined,
    req: ssrContext ? ssrContext.req : undefined,
    res: ssrContext ? ssrContext.res : undefined,
    beforeRenderFns: ssrContext ? ssrContext.beforeRenderFns : undefined,
    ssrContext
  })

  function inject(key, value) {
    if (!key) {
      throw new Error('inject(key, value) has no key provided')
    }
    if (value === undefined) {
      throw new Error(`inject('${key}', value) has no value provided`)
    }

    key = '$' + key
    // Add into app
    app[key] = value
    // Add into context
    if (!app.context[key]) {
      app.context[key] = value
    }

    // Add into store
    store[key] = app[key]

    // Check if plugin not already installed
    const installKey = '__nuxt_' + key + '_installed__'
    if (Vue[installKey]) {
      return
    }
    Vue[installKey] = true
    // Call Vue.use() to install the plugin into vm
    Vue.use(() => {
      if (!Object.prototype.hasOwnProperty.call(Vue.prototype, key)) {
        Object.defineProperty(Vue.prototype, key, {
          get () {
            return this.$root.$options[key]
          }
        })
      }
    })
  }

  // Inject runtime config as $config
  inject('config', config)

  if (process.client) {
    // Replace store state before plugins execution
    if (window.__NUXT__ && window.__NUXT__.state) {
      store.replaceState(window.__NUXT__.state)
    }
  }

  // Add enablePreview(previewData = {}) in context for plugins
  if (process.static && process.client) {
    app.context.enablePreview = function (previewData = {}) {
      app.previewData = Object.assign({}, previewData)
      inject('preview', previewData)
    }
  }
  // Plugin execution

  if (typeof nuxt_plugin_bootstrapvue_3fe8407f === 'function') {
    await nuxt_plugin_bootstrapvue_3fe8407f(app.context, inject)
  }

  if (typeof nuxt_plugin_prismic_fdcb11e4 === 'function') {
    await nuxt_plugin_prismic_fdcb11e4(app.context, inject)
  }

  if (typeof nuxt_plugin_prismiccomponents_11d872c6 === 'function') {
    await nuxt_plugin_prismiccomponents_11d872c6(app.context, inject)
  }

  if (typeof nuxt_plugin_vuesocialsharingplugin_d678b56e === 'function') {
    await nuxt_plugin_vuesocialsharingplugin_d678b56e(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_vuescrollto_5913cc8e === 'function') {
    await nuxt_plugin_vuescrollto_5913cc8e(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_workbox_58abd36c === 'function') {
    await nuxt_plugin_workbox_58abd36c(app.context, inject)
  }

  if (typeof nuxt_plugin_metaplugin_3360ee7f === 'function') {
    await nuxt_plugin_metaplugin_3360ee7f(app.context, inject)
  }

  if (typeof nuxt_plugin_iconplugin_380893f3 === 'function') {
    await nuxt_plugin_iconplugin_380893f3(app.context, inject)
  }

  if (typeof nuxt_plugin_cookieuniversalnuxt_5629b1f8 === 'function') {
    await nuxt_plugin_cookieuniversalnuxt_5629b1f8(app.context, inject)
  }

  if (typeof nuxt_plugin_axios_68829b60 === 'function') {
    await nuxt_plugin_axios_68829b60(app.context, inject)
  }

  if (typeof nuxt_plugin_gtm_2567cd26 === 'function') {
    await nuxt_plugin_gtm_2567cd26(app.context, inject)
  }

  if (typeof nuxt_plugin_keenslider_87a9b6bc === 'function') {
    await nuxt_plugin_keenslider_87a9b6bc(app.context, inject)
  }

  if (typeof nuxt_plugin_vueinlinesvg_56f4a20a === 'function') {
    await nuxt_plugin_vueinlinesvg_56f4a20a(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_vueintersect_58917e56 === 'function') {
    await nuxt_plugin_vueintersect_58917e56(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_vueellipseprogress_6017563e === 'function') {
    await nuxt_plugin_vueellipseprogress_6017563e(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_vuerangeslider_4017cf69 === 'function') {
    await nuxt_plugin_vuerangeslider_4017cf69(app.context, inject)
  }

  if (typeof nuxt_plugin_veevalidate_1a0c1998 === 'function') {
    await nuxt_plugin_veevalidate_1a0c1998(app.context, inject)
  }

  if (typeof nuxt_plugin_animatednumbervue_5f213601 === 'function') {
    await nuxt_plugin_animatednumbervue_5f213601(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_googlemaps_c54ce192 === 'function') {
    await nuxt_plugin_googlemaps_c54ce192(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_sortedtable_7a53ee9c === 'function') {
    await nuxt_plugin_sortedtable_7a53ee9c(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_imageviewer_ab77a290 === 'function') {
    await nuxt_plugin_imageviewer_ab77a290(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_vueslickcarousel_756afa10 === 'function') {
    await nuxt_plugin_vueslickcarousel_756afa10(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_vueyoutube_fcf88930 === 'function') {
    await nuxt_plugin_vueyoutube_fcf88930(app.context, inject)
  }

  if (typeof nuxt_plugin_helpers_e49953de === 'function') {
    await nuxt_plugin_helpers_e49953de(app.context, inject)
  }

  if (typeof nuxt_plugin_vivus_234a3c8d === 'function') {
    await nuxt_plugin_vivus_234a3c8d(app.context, inject)
  }

  // Lock enablePreview in context
  if (process.static && process.client) {
    app.context.enablePreview = function () {
      console.warn('You cannot call enablePreview() outside a plugin.')
    }
  }

  // Wait for async component to be resolved first
  await new Promise((resolve, reject) => {
    router.replace(app.context.route.fullPath, resolve, (err) => {
      // https://github.com/vuejs/vue-router/blob/v3.4.3/src/util/errors.js
      if (!err._isRouter) return reject(err)
      if (err.type !== 2 /* NavigationFailureType.redirected */) return resolve()

      // navigated to a different route in router guard
      const unregister = router.afterEach(async (to, from) => {
        if (process.server && ssrContext && ssrContext.url) {
          ssrContext.url = to.fullPath
        }
        app.context.route = await getRouteData(to)
        app.context.params = to.params || {}
        app.context.query = to.query || {}
        unregister()
        resolve()
      })
    })
  })

  return {
    store,
    app,
    router
  }
}

export { createApp, NuxtError }
