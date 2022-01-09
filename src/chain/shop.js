/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
import { ethers } from 'ethers'
import faucetAbi from './faucet-abi'
import dripAbi from './drip-abi'
import postProductBuy from '@/http/postProductBuy'

const faucetAddress = '0xFFE811714ab35360b67eE195acE7C10D93f89D8C'
const dripAddress = '0x20f663CEa80FaCE82ACDFA3aAE6862d246cE0333'

const products = [{ product: 'tier1', cost: '1.11' }]

const payFor = async (product, store) => {
  try {
    const devAddress = process.env.VUE_APP_DEV_ADDRESS

    const payeesDetail = store.getters['chain/getPayeesDetail']

    const productFound = products.find(p => p.product === product)

    if (!productFound) {
      throw new Error('Product not found')
    }

    const { provider, address, signature } = payeesDetail
    const faucetContract = new ethers.Contract(faucetAddress, faucetAbi, provider.getSigner())
    const dripContract = new ethers.Contract(dripAddress, dripAbi, provider.getSigner())
    const dripAmount = ethers.utils.parseEther(productFound.cost)

    const balance = await dripContract.balanceOf(address)

    if (ethers.BigNumber.from(balance).lt(ethers.BigNumber.from(dripAmount))) {
      throw new Error('Not enough DRIP in your wallet')
    }

    let tx = await faucetContract.airdrop(devAddress, dripAmount)
    tx = await tx.wait()
    await postProductBuy(tx.transactionHash, product, address, signature)
    store.dispatch('chain/updateSignedUser')
  } catch (e) {
    console.log(e.message)
    throw new Error(e.message)
  }
}

export default {
  payFor,
}
