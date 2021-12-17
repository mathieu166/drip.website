import getter from './get'

export default function getAddressTier(address, signature) {
  let params = ''
  params += getter.formatParam(`wallet=${address}`, params)
  params += getter.formatParam(`signature=${signature}`, params)

  return getter.get('queryAddressTier', params).then(response => {
    const { data } = response
    return data.tier
  })
}
