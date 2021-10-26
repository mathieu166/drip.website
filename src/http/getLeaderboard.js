import get from './get'
import URLS from './hard-coded-urls'

export default function getLeaderboard(params) {
  return get(`${URLS.DRIP_API_URL}queryAccountsLeaderboard`, params)
}
