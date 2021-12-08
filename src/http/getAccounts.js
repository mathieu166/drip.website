/* eslint-disable no-restricted-syntax */
import get from './get'

const formatParam = (param, params) => {
  if (params.length === 0) {
    return param
  }
  return `&${param}`
}

export default function getAccounts(
  filters,
  currentPage,
  perPage,
  sortBy,
  isSortDesc,
) {
  let params = ''

  for (const [key, value] of Object.entries(filters)) {
    if (value) {
      params += formatParam(`${key}=${value}`, params)
    }
  }

  params += formatParam(`page=${currentPage}`, params)
  params += formatParam(`perPage=${perPage}`, params)

  params += formatParam(`sortBy=${sortBy}`, params)
  params += formatParam(`sortByDesc=${isSortDesc ? '-1' : '1'}`, params)

  console.log(params)
  return get('queryAccounts', params)
}
