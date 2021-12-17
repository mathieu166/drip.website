/* eslint-disable no-restricted-syntax */
import getter from './get'

export default function getAccounts(
  filters,
  currentPage,
  perPage,
  sortBy,
  isSortDesc,
  downlineLevel,
  wallet,
  signature,
) {
  let params = ''

  for (const [key, value] of Object.entries(filters)) {
    if (value) {
      params += getter.formatParam(`${key}=${value}`, params)
    }
  }

  params += getter.formatParam(`page=${currentPage}`, params)
  params += getter.formatParam(`perPage=${perPage}`, params)

  params += getter.formatParam(`sortBy=${sortBy}`, params)
  params += getter.formatParam(`sortByDesc=${isSortDesc ? '-1' : '1'}`, params)
  params += getter.formatParam(`downlineLevel=${downlineLevel}`, params)

  if (wallet && signature) {
    params += getter.formatParam(`wallet=${wallet}`, params)
    params += getter.formatParam(`signature=${signature}`, params)
  }

  return getter.get('queryAccounts', params)
}
