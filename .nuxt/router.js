import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _845b221c = () => interopDefault(import('./prismic/pages/preview.vue' /* webpackChunkName: "" */))
const _1e457ac8 = () => interopDefault(import('../pages/auth.vue' /* webpackChunkName: "pages/auth" */))
const _63740f8c = () => interopDefault(import('../pages/charts/index.vue' /* webpackChunkName: "pages/charts/index" */))
const _d494b212 = () => interopDefault(import('../pages/data-cards/index.vue' /* webpackChunkName: "pages/data-cards/index" */))
const _4151e814 = () => interopDefault(import('../pages/dev/index.vue' /* webpackChunkName: "pages/dev/index" */))
const _3913f238 = () => interopDefault(import('../pages/download_old.vue' /* webpackChunkName: "pages/download_old" */))
const _28068562 = () => interopDefault(import('../pages/insights.vue' /* webpackChunkName: "pages/insights" */))
const _f09632fe = () => interopDefault(import('../pages/insights/_uid.vue' /* webpackChunkName: "pages/insights/_uid" */))
const _39829308 = () => interopDefault(import('../pages/Insightsold.vue' /* webpackChunkName: "pages/Insightsold" */))
const _d99682f8 = () => interopDefault(import('../pages/preview.vue' /* webpackChunkName: "pages/preview" */))
const _54374427 = () => interopDefault(import('../pages/secret/index.vue' /* webpackChunkName: "pages/secret/index" */))
const _137989a3 = () => interopDefault(import('../pages/typography.vue' /* webpackChunkName: "pages/typography" */))
const _28dfad9f = () => interopDefault(import('../pages/user-account.vue' /* webpackChunkName: "pages/user-account" */))
const _5b713488 = () => interopDefault(import('../pages/verified.vue' /* webpackChunkName: "pages/verified" */))
const _be2b4f02 = () => interopDefault(import('../pages/charts/cities.vue' /* webpackChunkName: "pages/charts/cities" */))
const _2cfb219f = () => interopDefault(import('../pages/charts/compare.vue' /* webpackChunkName: "pages/charts/compare" */))
const _0fc5237a = () => interopDefault(import('../pages/charts/goals.vue' /* webpackChunkName: "pages/charts/goals" */))
const _e19bd0d4 = () => interopDefault(import('../pages/charts/map.vue' /* webpackChunkName: "pages/charts/map" */))
const _4c44bfc0 = () => interopDefault(import('../pages/charts/radar.vue' /* webpackChunkName: "pages/charts/radar" */))
const _1d0f4488 = () => interopDefault(import('../pages/charts/table.vue' /* webpackChunkName: "pages/charts/table" */))
const _2dbe41e0 = () => interopDefault(import('../pages/dev/animated-pie.vue' /* webpackChunkName: "pages/dev/animated-pie" */))
const _63e3f625 = () => interopDefault(import('../pages/dev/cards.vue' /* webpackChunkName: "pages/dev/cards" */))
const _12ef60f2 = () => interopDefault(import('../pages/dev/city-summary.vue' /* webpackChunkName: "pages/dev/city-summary" */))
const _09102f4d = () => interopDefault(import('../pages/dev/drag-test.vue' /* webpackChunkName: "pages/dev/drag-test" */))
const _71d09347 = () => interopDefault(import('../pages/dev/forgot-password.vue' /* webpackChunkName: "pages/dev/forgot-password" */))
const _a79df13c = () => interopDefault(import('../pages/dev/homepage-slider.vue' /* webpackChunkName: "pages/dev/homepage-slider" */))
const _77676126 = () => interopDefault(import('../pages/dev/modal-radial.vue' /* webpackChunkName: "pages/dev/modal-radial" */))
const _44a6caff = () => interopDefault(import('../pages/dev/range.vue' /* webpackChunkName: "pages/dev/range" */))
const _7f510e1e = () => interopDefault(import('../pages/city/_uid.vue' /* webpackChunkName: "pages/city/_uid" */))
const _42cf424a = () => interopDefault(import('../pages/data-cards/_cityid.vue' /* webpackChunkName: "pages/data-cards/_cityid" */))
const _b393b0e4 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))
const _568beac8 = () => interopDefault(import('../pages/_uid/index.vue' /* webpackChunkName: "pages/_uid/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/preview",
    component: _845b221c,
    name: "prismic-preview"
  }, {
    path: "/auth",
    component: _1e457ac8,
    name: "auth"
  }, {
    path: "/charts",
    component: _63740f8c,
    name: "charts"
  }, {
    path: "/data-cards",
    component: _d494b212,
    name: "data-cards"
  }, {
    path: "/dev",
    component: _4151e814,
    name: "dev"
  }, {
    path: "/download_old",
    component: _3913f238,
    name: "download_old"
  }, {
    path: "/insights",
    component: _28068562,
    name: "insights",
    children: [{
      path: ":uid?",
      component: _f09632fe,
      name: "insights-uid"
    }]
  }, {
    path: "/Insightsold",
    component: _39829308,
    name: "Insightsold"
  }, {
    path: "/preview",
    component: _d99682f8,
    name: "preview"
  }, {
    path: "/secret",
    component: _54374427,
    name: "secret"
  }, {
    path: "/typography",
    component: _137989a3,
    name: "typography"
  }, {
    path: "/user-account",
    component: _28dfad9f,
    name: "user-account"
  }, {
    path: "/verified",
    component: _5b713488,
    name: "verified"
  }, {
    path: "/charts/cities",
    component: _be2b4f02,
    name: "charts-cities"
  }, {
    path: "/charts/compare",
    component: _2cfb219f,
    name: "charts-compare"
  }, {
    path: "/charts/goals",
    component: _0fc5237a,
    name: "charts-goals"
  }, {
    path: "/charts/map",
    component: _e19bd0d4,
    name: "charts-map"
  }, {
    path: "/charts/radar",
    component: _4c44bfc0,
    name: "charts-radar"
  }, {
    path: "/charts/table",
    component: _1d0f4488,
    name: "charts-table"
  }, {
    path: "/dev/animated-pie",
    component: _2dbe41e0,
    name: "dev-animated-pie"
  }, {
    path: "/dev/cards",
    component: _63e3f625,
    name: "dev-cards"
  }, {
    path: "/dev/city-summary",
    component: _12ef60f2,
    name: "dev-city-summary"
  }, {
    path: "/dev/drag-test",
    component: _09102f4d,
    name: "dev-drag-test"
  }, {
    path: "/dev/forgot-password",
    component: _71d09347,
    name: "dev-forgot-password"
  }, {
    path: "/dev/homepage-slider",
    component: _a79df13c,
    name: "dev-homepage-slider"
  }, {
    path: "/dev/modal-radial",
    component: _77676126,
    name: "dev-modal-radial"
  }, {
    path: "/dev/range",
    component: _44a6caff,
    name: "dev-range"
  }, {
    path: "/city/:uid?",
    component: _7f510e1e,
    name: "city-uid"
  }, {
    path: "/data-cards/:cityid?",
    component: _42cf424a,
    name: "data-cards-cityid"
  }, {
    path: "/",
    component: _b393b0e4,
    name: "index"
  }, {
    path: "/:uid",
    component: _568beac8,
    name: "uid"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
