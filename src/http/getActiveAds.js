import get from './get'

export default function getActiveAds() {
  return get('queryActiveAds').then(response => {
    const { data } = response
    return data[0]
  })
}
