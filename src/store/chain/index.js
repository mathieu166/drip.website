/* eslint-disable no-restricted-syntax */
import ethers from '../../chain/ethers'

const message = 'You signature is required to identify your registration plan.'

export default {
  namespaced: true,
  state: {
    provider: null,
    address: null,
    signatures: [],
    signature: null,
  },
  getters: {},
  mutations: {
    UPDATE_SIGNS(state, val) {
      state.signatures = val
    },
    UPDATE_LOADING(state, val) {
      state.loading = val
    },
    UPDATE_PROVIDER(state, val) {
      state.provider = val
      if (val) {
        const signer = val.getSigner(0)
        signer
          .getAddress()
          .then(result => {
            state.address = result
            localStorage.setItem('address', result)
          })
          .then(() => {
            state.signature = null
            for (const sign of state.signatures) {
              const address = ethers.utils.verifyMessage(message, sign)
              if (address === state.address) {
                state.signature = sign
              }
            }

            if (!state.signature) {
              return signer
                .signMessage(message)
                .then(sign => {
                  state.signature = sign
                  state.signatures.push(sign)
                  localStorage.setItem(
                    'signs',
                    JSON.stringify(state.signatures),
                  )
                })
                .catch(() => {
                  state.provider = null
                  state.address = null
                })
            }
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
      const signatures = localStorage.getItem('signs') || '[]'
      commit('UPDATE_SIGNS', JSON.parse(signatures))
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
