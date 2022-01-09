import poster from './post'

export default function post(transactionHash, product, address, signature) {
  const postData = {
    transactionHash, product, address, signature,
  }
  return poster.post('transaction/productBuy', postData).then(response => {
    return response
  }).catch(e => Promise.reject(e.response.data))
}
