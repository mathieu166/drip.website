<template>
  <section id="leaderboards">
    <b-row>
      <b-col
        xl="8"
        cols="12"
      >
        <b-row class="match-height">
          <b-col>
            <leaderboard-banner-ad
              class="pl-2 pr-2 pb-2"
              :data="data.ads.banner"
              :loading="data.ads.banner.loading"
            />
          </b-col>
        </b-row>
        <b-row class="match-height ">
          <b-col>
            <div
              class="d-flex flex-row justify-content-between align-items-baseline"
            >
              <div>
                <h4 class="card-title mb-50">
                  <Icon
                    icon="iconoir:leaderboard-star"
                    width="50"
                  />
                  Team Wallet Leaderboard
                </h4>
              </div>
              <div>
                <!-- <b-badge
                  variant="primary"
                  class="badge-glow"
                >
                  Connect Wallet for advanced features
                </b-badge> -->
              </div>
              <div
                style="width: 525px"
                class="ml-1"
              >
                <b-input-group>
                  <b-form-input
                    v-model="search.input"
                    :state="search.isError ? false : null"
                    placeholder="0x0000000000000000000000000000000000000000"
                    @keyup.enter="searchTeam"
                  />
                  <b-input-group-append>
                    <b-button
                      variant="outline-primary"
                      @click="searchTeam"
                    >
                      SEARCH
                    </b-button>
                  </b-input-group-append>
                </b-input-group>
              </div>
            </div>
          </b-col>
        </b-row>
        <b-row class="match-height">
          <b-col>
            <leaderboard-team-faucet
              :loading="data.leaderboardLoading"
              :table-data="data.leaderboard"
              :has-ad="data.leaderboardAdActive"
            />
          </b-col>
        </b-row>
      </b-col>

      <b-col
        xl="4"
        cols="12"
      >
        <b-row class="match-height">
          <b-col>
            <h4 class="card-title mb-50">
              <Icon
                icon="fxemoji:trophy"
                width="50"
              />
              Awards
            </h4>
          </b-col>
        </b-row>
        <b-row class="match-height">
          <b-col>
            <leaderboard-winning-category
              :data="data.awardCategory"
              :loading="data.leaderboardWinningCategoryLoading"
            />
          </b-col>
        </b-row>
      </b-col>
    </b-row>

    <b-modal
      id="modal-search"
      ref="modal-search"
      centered
      title="Team Search Result"
      ok-only
      size="xl"
      ok-title="Close"
    >
      <leaderboard-team-faucet
        :loading="search.loading"
        :table-data="search.leaderboard"
        :show-empty="search.noResults"
        :has-ad="false"
        :show-rank="false"
      />
    </b-modal>
  </section>
</template>

<script>
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-restricted-syntax */
import {
  BRow,
  BCol,
  BInputGroup,
  BFormInput,
  BButton,
  BInputGroupAppend,
} from 'bootstrap-vue'
import { Icon } from '@iconify/vue2'
import LeaderboardTeamFaucet from './team-faucet/LeaderboardTeamFaucet.vue'
import LeaderboardWinningCategory from './team-faucet/LeaderboardWiningCategory.vue'
import LeaderboardBannerAd from './ads/LeaderboardBannerAd.vue'
import getLeaderboard from '../../http/getLeaderboard'
import ads from '../../ads/ads-picker'
import store from '../../store'

export default {
  components: {
    BRow,
    BCol,
    Icon,
    BFormInput,
    BInputGroup,
    BButton,
    BInputGroupAppend,
    LeaderboardWinningCategory,
    LeaderboardTeamFaucet,
    LeaderboardBannerAd,
  },
  data() {
    return {
      data: {
        leaderboard: [],
        leaderboardLoading: true,
        leaderboardAdActive: false,
        awardCategory: {},
        ads: { banner: {} },
        leaderboardWinningCategoryLoading: true,
        searchInput: '',
      },
      search: {
        input: '',
        leaderboard: [],
        noResults: false,
        loading: false,
        isError: false,
      },
    }
  },
  created() {
    let leaderboardAd = null

    // ADS
    const loadCampaign = campaign => {
      if (!campaign) {
        return
      }
      const banner = ads.pick(campaign, 1)
      this.data.ads.banner.url = banner.url
      this.data.ads.banner.loading = false

      const leaderboardAdPick = ads.pick(campaign, 2)
      if (leaderboardAdPick) {
        leaderboardAd = leaderboardAdPick
        if (this.data.leaderboard.length > 0) {
          if (this.data.leaderboard[0].ad) {
            this.data.leaderboard.splice(0, 1)
          }
          this.data.leaderboardAdActive = true
          this.data.leaderboard.unshift({
            ad: true,
            name: leaderboardAd.account.name,
            address: leaderboardAd.account.address,
            score: Math.trunc(leaderboardAd.account.score),
            account: leaderboardAd.account,
            rowVariant: 'danger',
          })
        }
      }
    }

    loadCampaign(store.state.ads.campaign)

    store.watch(
      state => state.ads.campaign,
      campaign => {
        loadCampaign(campaign)
      },
    )

    store.dispatch('ads/refreshCampaign')

    // LEADERBOARD
    const loadLeaderboard = leaderboard => {
      if (!leaderboard) {
        return
      }
      this.data.leaderboard.length = 0

      if (leaderboardAd) {
        this.data.leaderboardAdActive = true
        this.data.leaderboard.push({
          ad: true,
          name: leaderboardAd.account.name,
          address: leaderboardAd.account.address,
          score: Math.trunc(leaderboardAd.account.score),
          account: leaderboardAd.account,
          rowVariant: 'danger',
        })
      }

      for (const leader of leaderboard) {
        this.data.leaderboard.push({
          name: leader.name,
          address: leader._id,
          score: Math.trunc(leader.score),
          account: leader,
        })
      }

      this.data.leaderboardLoading = false
    }

    loadLeaderboard(store.state.leaderboard.leaderboard)

    store.watch(
      state => state.leaderboard.leaderboard,
      leaderboard => {
        loadLeaderboard(leaderboard)
      },
    )

    store.dispatch('leaderboard/refreshLeaderboard')

    getLeaderboard('limit=1&score=10000&score_oper=gte&sort=total_bonus,-1').then(response => {
      const values = response.data[0]
      this.data.awardCategory.name = values.name
      this.data.awardCategory.amount = Math.trunc(values.total_bonus)
      this.data.awardCategory.address = this.shortenAddress(values.address)
      this.data.awardCategory.score = values.score
      this.data.awardCategory.category = 'MOST REWARDED'

      this.data.leaderboardWinningCategoryLoading = false
    })
  },
  methods: {
    shortenAddress(value) {
      if (value) {
        return `0x..${value.substr(value.length - 7)}`
      }
      return ''
    },
    searchTeam() {
      const { input } = this.search
      if (!input) {
        this.search.isError = true
        return
      }
      this.search.isError = false
      this.search.input = ''

      this.search.leaderboard.length = 0
      this.search.loading = true
      this.$refs['modal-search'].show()

      getLeaderboard(`address=${input}`).then(response => {
        const value = response.data[0]
        console.log(value)
        if (!value) {
          this.search.noResults = true
          this.search.loading = false
          return
        }

        this.search.leaderboard.push({
          ad: true,
          name: value.name,
          address: value.address,
          score: Math.trunc(value.score),
          account: value,
        })

        this.search.loading = false
      })
    },
  },
}
</script>
