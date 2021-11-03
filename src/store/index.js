import Vue from 'vue'
import Vuex from 'vuex'

// Modules
import ecommerceStoreModule from '@/views/apps/e-commerce/eCommerceStoreModule'
import app from './app'
import appConfig from './app-config'
import verticalMenu from './vertical-menu'
import ads from './ads'
import leaderboard from './leaderboard'
import chain from './chain'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    appConfig,
    verticalMenu,
    ads,
    leaderboard,
    chain,
    'app-ecommerce': ecommerceStoreModule,
  },
  strict: process.env.DEV,
})

export default store
