import getLeaderboard from '../../http/getLeaderboard'

export default {
  namespaced: true,
  state: {
    leaderboard: JSON.parse(localStorage.getItem('leaderboard')),
  },
  getters: {},
  mutations: {
    UPDATE_LEADERBOARD(state, val) {
      state.leaderboard = val
      localStorage.setItem('leaderboard', JSON.stringify(val))
    },
  },
  actions: {
    refreshLeaderboard({ commit }) {
      getLeaderboard().then(response => {
        if (response.data) {
          commit('UPDATE_LEADERBOARD', response.data)
        }
      })
    },
  },
}
