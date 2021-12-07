import ethers from '../../chain/ethers'

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export default {
  namespaced: true,
  state: {
    provider: null, // JSON.parse(localStorage.getItem('campaign')),
    address: null,
  },
  getters: {},
  mutations: {
    UPDATE_LOADING(state, val) {
      state.loading = val
    },
    UPDATE_PROVIDER(state, val) {
      state.provider = val
      if (val) {
        val
          .getSigner(0)
          .getAddress()
          .then(result => {
            state.address = result
            localStorage.setItem('address', result)
          })
      } else {
        console.log('remove address')
        console.trace()
        state.address = null
        localStorage.removeItem('address')
      }
    },
  },
  actions: {
    init({ commit }) {
      commit('UPDATE_LOADING', true)
      const lastConnectedAddress = localStorage.getItem('address')
      ethers
        .getInjectedProvider(lastConnectedAddress)
        .then(provider => {
          commit('UPDATE_PROVIDER', provider)
        })
        .finally(() => commit('UPDATE_LOADING', false))
    },
    connectMetamask({ commit }) {
      ethers.connectMetamask().then(provider => {
        commit('UPDATE_PROVIDER', provider)
      })
    },
    connectBinanceChain({ commit }) {
      ethers.connectBinanceChain().then(provider => {
        commit('UPDATE_PROVIDER', provider)
      })
    },
    disconnect({ commit }) {
      commit('UPDATE_PROVIDER', null)
    },
  },
}
