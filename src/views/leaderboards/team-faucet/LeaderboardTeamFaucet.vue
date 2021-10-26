<template>
  <b-card
    v-if="tableData"
    fixed
    responsive
    no-body
    class="card-leaderboard-team-faucet"
  >
    <b-table
      :items="tableData"
      striped
      outlined
      :busy="loading"
      :fields="fields"
      class="mb-0"
    >
      <template #table-busy>
        <div class="text-center text-danger my-2">
          <b-spinner class="align-middle" />
          <strong> Loading...</strong>
        </div>
      </template>

      <!-- company -->
      <template #cell(rank)="data">
        <div class="d-flex align-items-center">
          <div class="d-flex align-items-center">
            <h2>{{ data.index + 1 }}</h2>
          </div>
        </div>
      </template>

      <!-- views -->
      <template #cell(team)="data">
        <div class="d-flex flex-column">
          <span
            class="mb-25"
          ><h3>{{ data.item.name }}</h3></span>
          <span class="font-small text-muted text-nowrap">{{
            data.item.address
          }}</span>
        </div>
      </template>

      <template #cell(score)="data">
        <div class="d-flex align-items-center">
          <div class="d-flex align-items-center">
            <span>
              <h4 class="pt-2 pb-2">
                {{ data.item.score }}
              </h4>
            </span>
          </div>
        </div>
      </template>
    </b-table>
  </b-card>
</template>

<script>
import { BCard, BTable, BSpinner } from 'bootstrap-vue'

export default {
  components: {
    // Icon,
    BCard,
    BTable,
    BSpinner,
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
