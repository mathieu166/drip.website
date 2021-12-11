/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
import detectEthereumProvider from '@metamask/detect-provider'
import { ethers } from 'ethers'

const { utils } = ethers

const connectMetamask = () => new Promise(resolve => {
  detectEthereumProvider().then(provider => {
    provider.request({ method: 'eth_requestAccounts' }).then(() => {
      resolve(new ethers.providers.Web3Provider(provider))
    })
  })
})

const connectBinanceChain = () => new Promise(resolve => {
  const provider = window.BinanceChain
  if (provider) {
    provider.request({ method: 'eth_accounts' }).then(() => {
      resolve(new ethers.providers.Web3Provider(provider))
    })
  }
})

const getInjectedProvider = async addressCandidate => {
  try {
    // Metamask & Trust Wallet
    const provider = window.ethereum
    if (addressCandidate && provider) {
      try {
        const lastConnectedAddress = provider.selectedAddress
        if (
          lastConnectedAddress
          && addressCandidate.toLowerCase() === lastConnectedAddress.toLowerCase()
        ) {
          return new ethers.providers.Web3Provider(provider)
        }
      } catch (e) {
        // Do nothing
      }
    }
  } catch (e) {
    console.log(e)
  }
  return null
}

export default {
  connectMetamask,
  connectBinanceChain,
  getInjectedProvider,
  utils,
}
