// This is temporary, variables will be generated during deployment
const OVERRIDE_DRIP_API_URL = 'http://localhost:3000/'
export default {
  DRIP_API_URL: OVERRIDE_DRIP_API_URL || 'https://drip-call-api.herokuapp.com/',
}
