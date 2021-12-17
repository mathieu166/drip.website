import getter from './get'

export default function getActiveAds() {
  return getter.get('queryActiveAds').then(response => {
    const { data } = response
    return data[0]
  })
}
