import axios from 'axios'

const API_URL = process.env.VUE_APP_API_URL

export default async function get(url, params) {
  try {
    const encodedUrl = encodeURI(API_URL + url + (params ? `?${params}` : ''))
    const response = await axios.get(encodedUrl)
    return response
  } catch (e) {
    console.log(e.message)
  }
  return undefined
}
