<template>
  <section id="ecommerce-header">
    <!-- Table Container Card -->
    <b-card no-body>
      <div class="m-2">
        <b-row class="mb-1">
          <b-col
            cols="12"
            md="6"
            class="d-flex align-items-center justify-content-start mb-1 mb-md-0"
          >
            <form
              style="width: 100%;"
              @submit.prevent="search"
            >
              <b-input-group class="input-group-merge">
                <b-input-group-prepend is-text>
                  Address
                </b-input-group-prepend>
                <b-form-input
                  v-model="address"
                  autocomplete="off"
                  placeholder="0x000000000000000000000000000000000000"
                />
              </b-input-group>
            </form>
          </b-col>
          <b-col
            cols="12"
            md="6"
            class="d-flex align-items-center justify-content-start mb-1 mb-md-0"
          >
            <form
              style="width: 100%;"
              @submit.prevent="search"
            >
              <b-input-group class="input-group-merge">
                <b-input-group-prepend is-text>
                  Buddy
                </b-input-group-prepend>
                <b-form-input
                  v-model="buddy"
                  autocomplete="off"
                  placeholder="0x000000000000000000000000000000000000"
                />
              </b-input-group>
            </form>
          </b-col>
        </b-row>

        <b-row>
          <b-col cols="12">
            <div class="d-flex">
              <b-button
                ref="btnSearch"
                variant="primary"
                class="mr-2"
                @click="search"
              >
                Search
              </b-button>
              <b-button
                ref="btnSearch"
                variant="secondary"
                class="mr-2"
                @click="clear"
              >
                Clear
              </b-button>
              <div class="nowrap">
                <label>Entries</label>
                <v-select
                  v-model="perPage"
                  :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                  :options="perPageOptions"
                  :clearable="false"
                  class="per-page-selector d-inline-block ml-50 mr-1"
                />
              </div>
            </div>
          </b-col>
        </b-row>
      </div>
      <div class="mx-2 mb-2">
        <b-row>
          <b-col
            cols="12"
            sm="4"
            class="
            d-flex
            align-items-center
            justify-content-center justify-content-sm-start
          "
          >
            <span
              class="text-muted"
            >Showing {{ dataMeta.from }} to {{ dataMeta.to }} of
              {{ dataMeta.of }} entries</span>
          </b-col>
          <!-- Pagination -->
          <b-col
            cols="12"
            sm="8"
            class="
            d-flex
            align-items-center
            justify-content-center justify-content-sm-end
          "
          >
            <b-pagination
              v-model="currentPage"
              :total-rows="totalAccounts"
              :per-page="perPage"
              first-number
              last-number
              class="mb-0 mt-1 mt-sm-0"
              prev-class="prev-item"
              next-class="next-item"
            >
              <template #prev-text>
                <feather-icon
                  icon="ChevronLeftIcon"
                  size="18"
                />
              </template>
              <template #next-text>
                <feather-icon
                  icon="ChevronRightIcon"
                  size="18"
                />
              </template>
            </b-pagination>
          </b-col>
        </b-row>
      </div>
      <b-table
        ref="refAccountList"
        :items="fetchAccounts"
        responsive
        :fields="tableColumns"
        :sort-by.sync="sortBy"
        :sort-desc.sync="isSortDirDesc"
        :busy="isLoading"
        primary-key="address"
        show-empty
        empty-text="No matching records found"
        class="position-relative"
      >
        <template #table-busy>
          <div class="text-center text-danger my-2">
            <b-spinner class="align-middle" />
            <strong> Loading...</strong>
          </div>
        </template>

        <template #cell(address)="data">
          <div :id="`address-${data.item.address}`">
            {{ shortenAddress(data.item.address) }}
          </div>
          <b-tooltip
            :target="`address-${data.item.address}`"
            style="white-space: nowrap;"
            placement="topleft"
          >
            {{ data.item.address }}
          </b-tooltip>
        </template>

        <template #cell(timestamp)="data">
          <div>
            {{ toDate(data.item.timestamp) }}
          </div>
        </template>
        <template #cell(net_deposits)="data">
          <div>
            {{ toFixed(data.item.net_deposits, 2) }}
          </div>
        </template>
        <template #cell(deposits)="data">
          <div>
            {{ toFixed(data.item.deposits, 2) }}
          </div>
        </template>
        <template #cell(total_payouts)="data">
          <div>
            {{ toFixed(data.item.total_payouts, 2) }}
          </div>
        </template>
        <template #cell(rolls)="data">
          <div>
            {{ toFixed(data.item.rolls, 2) }}
          </div>
        </template>

        <template #cell(referrals)="data">
          <div>
            {{ excludeZero(data.item.referrals) }}
          </div>
        </template>

        <template #cell(total_structure)="data">
          <div>
            {{ excludeZero(data.item.total_structure) }}
          </div>
        </template>

        <template #cell(airdrops_total)="data">
          <div>
            {{ toFixed(data.item.airdrops_total, 2) }}
          </div>
        </template>
        <template #cell(lastAirdrop)="data">
          <div>
            {{ toDate(data.item.lastAirdrop) }}
          </div>
        </template>
      </b-table>
      <div class="mx-2 mb-2">
        <b-row>
          <b-col
            cols="12"
            sm="6"
            class="
            d-flex
            align-items-center
            justify-content-center justify-content-sm-start
          "
          >
            <span
              class="text-muted"
            >Showing {{ dataMeta.from }} to {{ dataMeta.to }} of
              {{ dataMeta.of }} entries</span>
          </b-col>
          <!-- Pagination -->
          <b-col
            cols="12"
            sm="6"
            class="
            d-flex
            align-items-center
            justify-content-center justify-content-sm-end
          "
          >
            <b-pagination
              v-model="currentPage"
              :total-rows="totalAccounts"
              :per-page="perPage"
              first-number
              last-number
              class="mb-0 mt-1 mt-sm-0"
              prev-class="prev-item"
              next-class="next-item"
            >
              <template #prev-text>
                <feather-icon
                  icon="ChevronLeftIcon"
                  size="18"
                />
              </template>
              <template #next-text>
                <feather-icon
                  icon="ChevronRightIcon"
                  size="18"
                />
              </template>
            </b-pagination>
          </b-col>
        </b-row>
      </div>
    </b-card>
  </section>
</template>

<script>
/* eslint-disable no-restricted-syntax */
/* eslint-disable dot-notation */

import {
  BCard,
  BRow,
  BCol,
  BFormInput,
  BTable,
  BPagination,
  BInputGroup,
  BInputGroupPrepend,
  BButton,
  BSpinner,
  BTooltip,
} from 'bootstrap-vue'
import { ref, computed, watch } from '@vue/composition-api'
// import { useResponsiveAppLeftSidebarVisibility } from '@core/comp-functions/ui/app'
import vSelect from 'vue-select'
import getAccounts from '@/http/getAccounts'

// import store from '@/store'

export default {
  components: {
    BCard,
    BRow,
    BCol,
    BFormInput,
    BTable,
    BPagination,
    vSelect,
    BButton,
    BInputGroup,
    BInputGroupPrepend,
    BSpinner,
    BTooltip,
  },
  mounted() {
    this.search = () => {
      this.refAccountList.refresh()
    }
  },
  methods: {
    shortenAddress(value) {
      if (value) {
        return `0x..${value.substr(value.length - 7)}`
      }
      return ''
    },
    toDate(value) {
      if (value === '0') {
        return ''
      }

      return new Date(value * 1000).toLocaleDateString()
    },
    toFixed(value, decimals) {
      if (!value) {
        return ''
      }

      return value.toFixed(decimals)
    },
    excludeZero(value) {
      if (value === 0) {
        return ''
      }
      return value
    },
  },
  setup() {
    const refAccountList = ref(null)
    const btnSearch = ref(null)
    const address = ref(null)
    const buddy = ref(null)
    const search = ref(() => {})

    // Table Handlers
    const tableColumns = [
      { key: 'address', sortable: true },
      { key: 'name', sortable: true },
      { key: 'net_deposits', label: 'net deposits', sortable: true },
      { key: 'deposits', sortable: true },
      { key: 'total_payouts', label: 'claimed', sortable: true },
      { key: 'rolls', label: 'Hydrated', sortable: true },
      { key: 'airdrops_total', label: 'airdrops sent', sortable: true },
      { key: 'referrals', label: 'team directs', sortable: true },
      { key: 'total_structure', label: 'team total', sortable: true },
      { key: 'lastAirdrop', sortable: true },
      { key: 'timestamp', label: 'joined on', sortable: true },
      // { key: 'actions' },
    ]

    const perPage = ref(10)
    const totalAccounts = ref(0)
    const currentPage = ref(1)
    const perPageOptions = [10, 25, 50, 100]
    const sortBy = ref('address')
    const isSortDirDesc = ref(true)

    const dataMeta = computed(() => {
      const localItemsCount = refAccountList.value
        ? refAccountList.value.localItems.length
        : 0
      return {
        from:
          perPage.value * (currentPage.value - 1) + (localItemsCount ? 1 : 0),
        to: perPage.value * (currentPage.value - 1) + localItemsCount,
        of: totalAccounts.value,
      }
    })

    const isLoading = ref(false)

    const refetchData = () => {
      refAccountList.value.refresh()
    }

    watch([currentPage, perPage], () => {
      refetchData()
    })

    const fetchAccounts = (ctx, callback) => {
      isLoading.value = true
      const filters = {
        address: address.value,
        buddy_address: buddy.value,
      }
      getAccounts(
        filters,
        currentPage.value,
        perPage.value,
        sortBy.value,
        isSortDirDesc.value,
      )
        .then(response => {
          const accounts = response.data.results
          totalAccounts.value = response.data.total
          return callback(accounts)
        })
        .finally(() => {
          isLoading.value = false
        })
    }

    const clear = () => {
      address.value = null
      buddy.value = null
      refetchData()
    }

    return {
      search,
      clear,
      sortBy,
      isSortDirDesc,
      btnSearch,
      refAccountList,
      isLoading,
      address,
      buddy,
      tableColumns,
      perPage,
      currentPage,
      totalAccounts,
      perPageOptions,
      dataMeta,
      fetchAccounts,
    }
  },
}
</script>

<style lang="scss" scoped>
.per-page-selector {
  width: 90px;
}
.item-view-radio-group ::v-deep {
  .btn {
    display: flex;
    align-items: center;
  }
}
</style>
<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
@import '~@core/scss/base/pages/app-ecommerce.scss';
</style>
