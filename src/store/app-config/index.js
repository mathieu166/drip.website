import { $themeConfig } from '@themeConfig'

export default {
  namespaced: true,
  state: {
    layout: {
      isRTL: localStorage.getItem('vuexy-rtl') || $themeConfig.layout.isRTL,
      skin: localStorage.getItem('vuexy-skin') || $themeConfig.layout.skin,
      routerTransition:
        localStorage.getItem('vuexy-router-transition')
        || $themeConfig.layout.routerTransition,
      type:
        localStorage.getItem('vuexy-layout-type') || $themeConfig.layout.type,
      contentWidth:
        localStorage.getItem('vuexy-content-width')
        || $themeConfig.layout.contentWidth,
      menu: {
        hidden: $themeConfig.layout.menu.hidden,
      },
      navbar: {
        type:
          localStorage.getItem('vuexy-layout-navbar')
          && localStorage.getItem('vuexy-layout-navbar').type
            ? localStorage.getItem('vuexy-layout-navbar').type
            : $themeConfig.layout.navbar.type,
        backgroundColor:
          localStorage.getItem('vuexy-layout-navbar')
          && localStorage.getItem('vuexy-layout-navbar').backgroundColor
            ? localStorage.getItem('vuexy-layout-navbar').backgroundColor
            : $themeConfig.layout.navbar.backgroundColor,
      },
      footer: {
        type: $themeConfig.layout.footer.type,
      },
    },
  },
  getters: {},
  mutations: {
    TOGGLE_RTL(state) {
      state.layout.isRTL = !state.layout.isRTL
      localStorage.setItem('vuexy-rtl', state.layout.isRTL)
      document.documentElement.setAttribute(
        'dir',
        state.layout.isRTL ? 'rtl' : 'ltr',
      )
    },
    UPDATE_SKIN(state, skin) {
      state.layout.skin = skin

      // Update value in localStorage
      localStorage.setItem('vuexy-skin', skin)

      // Update DOM for dark-layout
      if (skin === 'dark') document.body.classList.add('dark-layout')
      else if (document.body.className.match('dark-layout')) document.body.classList.remove('dark-layout')
    },
    UPDATE_ROUTER_TRANSITION(state, val) {
      state.layout.routerTransition = val
      localStorage.setItem('vuexy-router-transition', val)
    },
    UPDATE_LAYOUT_TYPE(state, val) {
      state.layout.type = val
      localStorage.setItem('vuexy-layout-type', val)
    },
    UPDATE_CONTENT_WIDTH(state, val) {
      state.layout.contentWidth = val
      localStorage.setItem('vuexy-content-width', val)
    },
    UPDATE_NAV_MENU_HIDDEN(state, val) {
      state.layout.menu.hidden = val
      localStorage.setItem('vuexy-menu-hidden', val)
    },
    UPDATE_NAVBAR_CONFIG(state, obj) {
      Object.assign(state.layout.navbar, obj)
      localStorage.setItem('vuexy-layout-navbar', state.layout.navbar)
    },
    UPDATE_FOOTER_CONFIG(state, obj) {
      Object.assign(state.layout.footer, obj)
    },
  },
  actions: {},
}
