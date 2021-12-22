import { $themeBreakpoints } from '@themeConfig'

export default {
  namespaced: true,
  state: {
    windowWidth: 0,
    shallShowOverlay: false,
    debugConsole: '',
    intro: 'd',
  },
  getters: {
    currentBreakPoint: state => {
      const { windowWidth } = state
      if (windowWidth >= $themeBreakpoints.xl) return 'xl'
      if (windowWidth >= $themeBreakpoints.lg) return 'lg'
      if (windowWidth >= $themeBreakpoints.md) return 'md'
      if (windowWidth >= $themeBreakpoints.sm) return 'sm'
      return 'xs'
    },
  },
  mutations: {
    INIT(state) {
      state.intro = localStorage.getItem('intro')
    },
    ADD_TO_DEBUG_CONSOLE(state, val) {
      state.debugConsole += val
    },
    UPDATE_WINDOW_WIDTH(state, val) {
      state.windowWidth = val
    },
    TOGGLE_OVERLAY(state, val) {
      state.shallShowOverlay = val !== undefined ? val : !state.shallShowOverlay
    },
    UPDATE_INTRO(state, val) {
      state.intro = val
      localStorage.setItem('intro', val)
    },
  },
  actions: {
    init({ commit }) {
      commit('INIT')
    },
    setIntro({ commit }, value) {
      commit('UPDATE_INTRO', value)
    },
  },
}
