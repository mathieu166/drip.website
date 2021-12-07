import Vue from 'vue'
import VueRouter from 'vue-router'

// Routes
// import apps from './routes/apps'
// import leaderboards from './routes/leaderboards'
import search from './routes/search'
import dashboard from './routes/dashboard'
// import uiElements from './routes/ui-elements/index'
// import pages from './routes/pages'
// import chartsMaps from './routes/charts-maps'
// import formsTable from './routes/forms-tables'
// import others from './routes/others'

const defaultMenu = 'search'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior() {
    return { x: 0, y: 0 }
  },
  routes: [
    { path: '/', redirect: { name: defaultMenu } },
    // ...leaderboards,
    ...search,
    // ...apps,
    ...dashboard,
    // ...pages,
    // ...chartsMaps,
    // ...formsTable,
    // ...uiElements,
    // ...others,
    {
      path: '*',
      redirect: 'error-404',
    },
  ],
})

// ? For splash screen
// Remove afterEach hook if you are not using splash screen
router.afterEach(() => {
  // Remove initial loading
  const appLoading = document.getElementById('loading-bg')
  if (appLoading) {
    appLoading.style.display = 'none'
  }
})

export default router
