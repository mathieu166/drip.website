import ethers from '../../chain/ethers'

export default {
  namespaced: true,
  state: {
    provider: null, // JSON.parse(localStorage.getItem('campaign')),
    address: null,
  },
  getters: {},
  mutations: {
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
        state.address = null
        localStorage.removeItem('address')
      }
    },
  },
  actions: {
    init({ commit }) {
      const lastConnectedAddress = localStorage.getItem('address')
      ethers.getInjectedProvider(lastConnectedAddress).then(provider => {
        commit('UPDATE_PROVIDER', provider)
      })
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
