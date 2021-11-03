import getActiveAds from '../../http/getActiveAds'

export default {
  namespaced: true,
  state: {
    campaign: JSON.parse(localStorage.getItem('campaign')),
    version: 0,
  },
  getters: {
  },
  mutations: {
    UPDATE_CAMPAIGN(state, val) {
      state.campaign = val
      localStorage.setItem('campaign', JSON.stringify(val))
    },
  },
  actions: {
    refreshCampaign({ commit, state }) {
      getActiveAds().then(campaign => {
        if (
          state.campaign == null
          || state.campaign.version !== campaign.version
          || state.campaign.campaign_id !== campaign.campaign_id
        ) {
          commit('UPDATE_CAMPAIGN', campaign)
        }
      })
    },
  },
}
