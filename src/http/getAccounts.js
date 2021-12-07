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
  if (filters.address) {
    params += formatParam(`address=${filters.address}`, params)
  }
  if (filters.buddy_address) {
    params += formatParam(`buddy_address=${filters.buddy_address}`, params)
  }

  params += formatParam(`page=${currentPage}`, params)
  params += formatParam(`perPage=${perPage}`, params)

  params += formatParam(`sortBy=${sortBy}`, params)
  params += formatParam(`sortByDesc=${isSortDesc ? '-1' : '1'}`, params)

  console.log(params)
  return get('queryAccounts', params)
}
