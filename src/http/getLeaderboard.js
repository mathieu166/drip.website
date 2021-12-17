import getter from './get'

export default function getLeaderboard(params) {
  return getter.get('queryAccountsLeaderboard', params)
}
