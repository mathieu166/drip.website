import get from './get'

export default function getLeaderboard(params) {
  return get('queryAccountsLeaderboard', params)
}
