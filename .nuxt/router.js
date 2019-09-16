import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _4ab4aa37 = () => interopDefault(import('../app/pages/Privacy.vue' /* webpackChunkName: "pages/Privacy" */))
const _36e9d276 = () => interopDefault(import('../app/pages/Terms.vue' /* webpackChunkName: "pages/Terms" */))
const _459da38c = () => interopDefault(import('../app/pages/app/Roll.vue' /* webpackChunkName: "pages/app/Roll" */))
const _1579f461 = () => interopDefault(import('../app/pages/index.vue' /* webpackChunkName: "pages/index" */))
const _9ba85e24 = () => interopDefault(import('../app/pages/_.vue' /* webpackChunkName: "pages/_" */))

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
      path: "/Privacy",
      component: _4ab4aa37,
      name: "Privacy"
    }, {
      path: "/Terms",
      component: _36e9d276,
      name: "Terms"
    }, {
      path: "/app/Roll",
      component: _459da38c,
      name: "app-Roll"
    }, {
      path: "/",
      component: _1579f461,
      name: "index"
    }, {
      path: "/*",
      component: _9ba85e24,
      name: "all"
    }],

  fallback: false
}

export function createRouter() {
  return new Router(routerOptions)
}
