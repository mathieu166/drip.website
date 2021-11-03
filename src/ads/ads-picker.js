export default {
  pick: (campaign, location) => {
    const { ads } = campaign

    const locationAds = ads.filter(a => a.location === location)
    const bag = []
    if (locationAds && locationAds.length > 0) {
      locationAds.forEach(a => {
        for (let i = 0; i < a.weight; i += 1) {
          bag.push(a.team_wallet)
        }
      })

      const teamWalletDraw = bag[Math.floor(Math.random() * bag.length)]
      return ads.filter(a => a.team_wallet === teamWalletDraw)[0]
    }

    return undefined
  },
}
