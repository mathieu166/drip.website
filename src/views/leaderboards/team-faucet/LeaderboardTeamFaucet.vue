<template>
  <b-card
    fixed
    no-body
    class="card-leaderboard-team-faucet"
  >
    <b-table
      :items="tableData"
      striped
      outlined
      :busy="loading"
      :fields="getFields()"
      :show-empty="showEmpty"
    >
      <template #table-busy>
        <div class="text-center text-danger my-2">
          <b-spinner class="align-middle" />
          <strong> Loading...</strong>
        </div>
      </template>

      <!-- rank -->
      <template
        v-if="showRank"
        #cell(rank)="data"
      >
        <div class="d-flex align-items-center">
          <div
            v-if="hasAd && data.index == 0"
            class="d-flex align-items-center"
          >
            <b-badge variant="warning">
              AD
            </b-badge>
          </div>
          <div v-else>
            <h2>
              {{ data.index + (hasAd ? 0 : 1) }}
            </h2>
          </div>
        </div>
      </template>

      <!-- views -->
      <template #cell(team)="data">
        <div
          class="d-flex flex-column justify-content-between flex-md-row align-items-bottom"
        >
          <div class="mr-2">
            <h3>{{ data.item.name }}</h3>
          </div>
          <div>
            <b-badge
              class="mr-2"
              style="font-size: 1rem"
            >
              <strong>Referrals: {{ data.item.account.referrals }} | Total:
                {{ data.item.account.total_structure }}
              </strong>
            </b-badge>
            <b-link>{{ shortenAddress(data.item.address) }}</b-link>
          </div>
        </div>
        <div class="row">
          <div class="col text-center">
            <div class="text-nowrap">
              <b>D</b>eposits | <b>N</b>et <b>D</b>eposits
            </div>
            <div>
              <!-- <b-badge> -->
              {{ sign(data.item.account.deposits)
              }}{{ decimal(data.item.account.deposits, 2) }} |
              {{ sign(data.item.account.net_deposits)
              }}{{ decimal(data.item.account.net_deposits, 2) }}
              <!-- </b-badge> -->
            </div>
          </div>
          <div class="col mr-1 text-center">
            <div class="text-nowrap">
              <b>C</b>laim | <b>A</b>irdrop
            </div>
            <div>
              <!-- <b-badge> -->
              {{ sign(data.item.account.total_payouts)
              }}{{ decimal(data.item.account.total_payouts, 2) }} |
              {{ sign(data.item.account.airdrops_total)
              }}{{ decimal(data.item.account.airdrops_total, 2) }}
              <!-- </b-badge> -->
            </div>
          </div>
          <div class="col mr-1 text-center">
            <div class="text-nowrap">
              <b>D</b>irect | <b>I</b>ndirect - Rewards
            </div>
            <div>
              <!-- <b-badge> -->
              {{ sign(data.item.account.direct_bonus)
              }}{{ decimal(data.item.account.direct_bonus, 2) }} |
              {{ sign(data.item.account.match_bonus)
              }}{{ decimal(data.item.account.match_bonus, 2) }}
              <!-- </b-badge> -->
            </div>
          </div>
        </div>
      </template>

      <template #cell(score)="data">
        <div class="d-flex align-items-center">
          <div class="d-flex align-items-center">
            <span>
              <h2 class="pt-2 pb-2">
                <b-badge
                  variant="success"
                  style="width: 100px"
                >
                  {{ data.item.score }}
                </b-badge>
              </h2>
            </span>
          </div>
        </div>
      </template>
    </b-table>
  </b-card>
</template>

<script>
import {
  BCard, BTable, BSpinner, BBadge, BLink,
} from 'bootstrap-vue'

export default {
  components: {
    BCard,
    BTable,
    BSpinner,
    BBadge,
    BLink,
  },
  props: {
    tableData: {
      type: Array,
      default: () => [],
    },
    loading: {
      type: Boolean,
      default: () => true,
    },
    hasAd: {
      type: Boolean,
      default: () => false,
    },
    showRank: {
      type: Boolean,
      default: () => true,
    },
    showEmpty: {
      type: Boolean,
      default: () => false,
    },
  },
  data() {
    return {
      fields: [
        { key: 'rank', label: 'RANK' },
        { key: 'team', label: 'TEAM' },
        { key: 'score', label: 'SCORE' },
      ],
    }
  },
  methods: {
    decimal(value, decimals) {
      return value.toFixed(decimals)
    },
    sign(value) {
      return value > 0 ? '+' : '-'
    },
    shortenAddress(value) {
      if (value) {
        return `0x..${value.substr(value.length - 7)}`
      }
      return ''
    },
    getFields() {
      if (this.showRank) {
        return this.fields
      }
      return this.fields.filter(f => f.key !== 'rank')
    },
  },
}
</script>

<style lang="scss" scoped>
@import '~@core/scss/base/bootstrap-extended/include';
@import '~@core/scss/base/components/variables-dark';

.card-leaderboard-team-faucet ::v-deep td .b-avatar.badge-light-company {
  .dark-layout & {
    background: $theme-dark-body-bg !important;
  }
}
</style>
