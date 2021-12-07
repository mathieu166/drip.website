import axios from 'axios'

const API_URL = process.env.VUE_APP_API_URL

export default function get(url, params) {
  const encodedUrl = encodeURI(API_URL + url + (params && params.length > 0 ? `?${params}` : ''))
  return axios.get(encodedUrl)
}
