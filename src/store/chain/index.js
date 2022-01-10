/* eslint-disable no-restricted-syntax */
import ethers from '../../chain/ethers'
import getTier from '@/http/getTier'

const message = 'You signature is required to identify your registration plan.'

export default {
  namespaced: true,
  state: {
    provider: null,
    address: null,
    signatures: [],
    signature: null,
    tier: 0,
  },
  getters: {
    getPayeesDetail: state => {
      if (!state.provider || !state.address || !state.signature) {
        throw new Error('Wallet must be connected')
      }

      return {
        provider: state.provider,
        address: state.address,
        signature: state.signature,
        message: state.message,
      }
    },
  },
  mutations: {
    UPDATE_SIGNS(state, val) {
      state.signatures = val
    },
    UPDATE_LOADING(state, val) {
      state.loading = val
    },
    UPDATE_TIER(state) {
      return getTier(state.address, state.signature)
        .then(result => {
          state.tier = result
        })
        .catch(e => {
          console.log(e)
        })
    },
    UPDATE_PROVIDER(state, val) {
      state.provider = val
      if (val) {
        const signer = val.getSigner(0)
        let tempAddress
        return signer
          .getAddress()
          .then(result => {
            tempAddress = result
            // state.address = result
          })
          .then(() => {
            state.signature = null
            for (const sign of state.signatures) {
              const address = ethers.utils.verifyMessage(message, sign)
              if (address === tempAddress) {
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

                  return getTier(tempAddress, sign)
                    .then(result => {
                      state.tier = result
                      state.address = tempAddress
                    })
                    .catch(e => {
                      console.log(e)
                      state.tier = 0
                    })
                })
                .catch(() => {
                  state.provider = null
                  state.address = null
                })
            }

            return getTier(tempAddress, state.signature)
              .then(result => {
                state.tier = result
                state.address = tempAddress
              })
              .catch(e => {
                console.log(e)
                state.tier = 0
              })
          })
      }

      state.address = null
      state.signature = null
      state.tier = 0
      return Promise.resolve()
    },
  },
  actions: {
    init({ commit }) {
      const signatures = localStorage.getItem('signs') || '[]'
      commit('UPDATE_SIGNS', JSON.parse(signatures))
    },
    updateSignedUser({ commit }) {
      commit('UPDATE_TIER')
    },
    connectMetamask({ commit }) {
      return ethers.connectMetamask().then(provider => commit('UPDATE_PROVIDER', provider))
    },
    connectBinanceChain({ commit }) {
      return ethers.connectBinanceChain().then(provider => commit('UPDATE_PROVIDER', provider))
    },
    disconnect({ commit }) {
      commit('UPDATE_PROVIDER', null)
    },
  },
}
