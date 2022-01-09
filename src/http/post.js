import axios from 'axios'

const API_URL = process.env.VUE_APP_API_URL
const config = {
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    crossDomain: true,
  },
}

export default {
  post: function post(url, data) {
    return axios.post(API_URL + url, data, config)
  },
}
