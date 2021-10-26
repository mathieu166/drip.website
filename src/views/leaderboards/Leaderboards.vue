<template>
  <section id="leaderboards">
    <b-row>
      <b-col
        xl="8"
        sm="12"
      >
        <b-row class="match-height">
          <b-col>
            <h4 class="card-title mb-50">
              <Icon
                icon="iconoir:leaderboard-star"
                width="50"
              />
              Team Wallet Leaderboard
            </h4>
          </b-col>
          <b-col align-v="bottom">
            <b-badge
              variant="primary"
              class="badge-glow"
            >
              Connect Wallet for team personalization
            </b-badge></b-col>
        </b-row>
        <b-row class="match-height">
          <b-col>
            <leaderboard-team-faucet
              :loading="data.leaderboard.loading"
              :table-data="data.leaderboard"
            />
          </b-col>
        </b-row>
      </b-col>

      <b-col
        xl="4"
        md="12"
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
  </section>
</template>

<script>
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-restricted-syntax */
import { BRow, BCol, BBadge, BLInk } from 'bootstrap-vue'
import { Icon } from '@iconify/vue2'
import LeaderboardTeamFaucet from './team-faucet/LeaderboardTeamFaucet.vue'
import LeaderboardWinningCategory from './team-faucet/LeaderboardWiningCategory.vue'
import getLeaderboard from '../../http/getLeaderboard'

export default {
  components: {
    BRow,
    BCol,
    Icon,
    BBadge,
    BLInk,
    LeaderboardWinningCategory,
    LeaderboardTeamFaucet,
  },
  data() {
    return {
      data: {
        leaderboard: [],
        awardCategory: {},
        leaderboardWinningCategoryLoading: true,
      },
    }
  },
  created() {
    getLeaderboard().then(response => {
      for (const leader of response.data) {
        this.data.leaderboard.push({
          name: leader.name,
          address: leader._id,
          score: Math.trunc(leader.score),
        })
        this.data.leaderboard.loading = false
      }
    })

    getLeaderboard('limit=1&sort=total_bonus,-1').then(response => {
      const values = response.data[0]
      this.data.awardCategory.name = values.name
      this.data.awardCategory.amount = Math.trunc(values.total_bonus)
      this.data.awardCategory.address = values._id
      this.data.awardCategory.category = 'MOST BONUSES'

      this.data.leaderboardWinningCategoryLoading = false
    })
  },
}
</script>
