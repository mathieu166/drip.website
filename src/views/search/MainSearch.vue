<template>
  <section id="ecommerce-header">
    <!-- Table Container Card -->
    <b-card no-body>
      <div class="m-2">
        <b-row class="mb-1">
          <b-col cols="12" md="6" class="mb-1 mb-md-0">
            <form style="width: 100%" @submit.prevent="search">
              <b-input-group class="input-group-merge">
                <b-input-group-prepend is-text> Address </b-input-group-prepend>
                <b-form-input
                  v-model="filters.address"
                  autocomplete="off"
                  placeholder="0x000000000000000000000000000000000000"
                />
                <b-input-group-append v-if="walletAddress">
                  <b-button
                    variant="outline-dark"
                    @click="setAddressToWallet()"
                  >
                    Me
                  </b-button>
                </b-input-group-append>
              </b-input-group>
            </form>
          </b-col>
          <b-col cols="12" md="6">
            <form style="width: 100%" @submit.prevent="search">
              <b-input-group class="input-group-merge">
                <b-input-group-prepend is-text> Buddy </b-input-group-prepend>
                <b-form-input
                  v-model="filters.buddy_address"
                  autocomplete="off"
                  placeholder="0x000000000000000000000000000000000000"
                />
                <b-input-group-append v-if="walletAddress">
                  <b-button variant="outline-dark" @click="setBuddyToWallet()">
                    Me
                  </b-button>
                </b-input-group-append>
              </b-input-group>
            </form>
          </b-col>
        </b-row>

        <b-row class="mb-0 mb-md-1">
          <b-col
            cols="12"
            md="6"
            class="d-flex align-items-center justify-content-start mb-1 mb-md-0"
          >
            <form style="width: 100%" @submit.prevent="search">
              <b-input-group class="input-group-merge">
                <b-input-group-prepend is-text> Name </b-input-group-prepend>
                <b-form-input
                  v-model="filters.name"
                  autocomplete="off"
                  placeholder="Team XYZ"
                />
              </b-input-group>
            </form>
          </b-col>
          <!-- <b-col
            cols="12"
            md="6"
            class="d-flex align-items-center justify-content-start mb-1 mb-sm-0"
          >
          </b-col> -->
        </b-row>

        <b-row>
          <b-col cols="12">
            <div class="d-flex flex-lg-row flex-column-reverse">
              <div class="d-flex mt-1 mt-md-0">
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
              </div>
              <div class="d-flex flex-sm-row flex-column-reverse mb-1 mb-lg-0">
                <div
                  class="
                    nowrap
                    mb-0
                    d-flex
                    flex-col flex-lg-row
                    align-items-center
                  "
                >
                  <label class="mr-1">Entries</label>
                  <v-select
                    v-model="perPage"
                    :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                    :options="perPageOptions"
                    :clearable="false"
                    :searchable="false"
                    class="per-page-selector d-inline-block mr-1"
                  />
                </div>
                <div
                  class="
                    nowrap
                    mb-1 mb-sm-0
                    d-flex
                    flex-col flex-sm-row
                    align-items-center
                  "
                >
                  <div>
                    <label class="mr-1">Presets</label>
                  </div>
                  <div>
                    <v-select
                      id="type"
                      v-model="type"
                      :options="types"
                      :reduce="(type) => type.key"
                      :clearable="false"
                      label="label"
                      :searchable="false"
                      class="type-selector d-inline-block mr-1"
                    />
                  </div>
                </div>
              </div>
              <div class="d-flex flex-sm-row flex-column-reverse mb-0">
                <div
                  v-if="filters.buddy_address"
                  class="
                    nowrap
                    mb-1
                    mb-lg-0
                    d-flex
                    flex-col flex-lg-row
                    align-items-center
                  "
                >
                  <label class="mr-1">Downline Levels</label>
                  <v-select
                    v-model="downloadLevel"
                    :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                    :options="[
                      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
                    ]"
                    :clearable="false"
                    :searchable="false"
                    class="per-page-selector d-inline-block mr-1"
                  />
                </div>
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
            <span class="text-muted"
              >Showing {{ dataMeta.from }} to {{ dataMeta.to }} of
              {{ dataMeta.of }} entries</span
            >
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
                <feather-icon icon="ChevronLeftIcon" size="18" />
              </template>
              <template #next-text>
                <feather-icon icon="ChevronRightIcon" size="18" />
              </template>
            </b-pagination>
          </b-col>
        </b-row>
      </div>

      <div v-if="historicSearch.length > 0" class="mt-0">
        <b-link class="ml-1 mr-1" href="#" @click="clearHistory"><feather-icon
                icon="XIcon"
                size="16"
              /> </b-link>
        <b-link href="#" :disabled="index === historicSearch.length - 1" v-for="(hist, index) in historicSearch" :key="hist.address"
        @click="()=>{
          filters.buddy_address = hist.address
          downloadLevel = hist.level
          historicSearch.length = hist.index + 1
          refetchData()
        }" >{{hist.short_address}} {{ index === historicSearch.length - 1?'>':'|'}} </b-link>
      </div>
      <b-table
        ref="refAccountList"
        :items="fetchAccounts"
        responsive
        :fields="tableColumns"
        :sort-by.sync="sortBy"
        :sort-desc.sync="isSortDirDesc"
        :busy="isLoading"
        select-mode="single"
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
          <div>
            {{ shortenAddress(data.item.address) }}
          </div>
          <!-- <div class="d-flex">
            <div>
              <b-dropdown
                id="addressDD"
                class="m-0 p-0"
                :text="shortenAddress(data.item.address)"
                variant="link"
              >
                <b-dropdown-item
                  @click="
                    () => {
                      filters.buddy_address = data.item.address;
                      type = 'all';
                      manualRefresh = true;
                    }
                  "
                >
                  Search as Buddy
                </b-dropdown-item>
              </b-dropdown>
            </div>
          </div> -->
        </template>

        <template #cell(timestamp)="data">
          <div>
            {{ toDate(data.item.timestamp) }}
          </div>
        </template>
        <template #cell(net_deposits)="data">
          <div :id="`netdeposits-${data.item.address}`">
            {{ toFixed(data.item.net_deposits, 2) }}
          </div>
          <b-tooltip
            :target="`netdeposits-${data.item.address}`"
            style="white-space: nowrap"
            placement="topleft"
          >
            {{ toFixed(data.item.net_deposits, 2, "0") }} = ({{
              toFixed(data.item.deposits, 2, "0")
            }}
            + {{ toFixed(data.item.airdrops_total, 2, "0") }} +
            {{ toFixed(data.item.rolls, 2, "0") }}) -
            {{ toFixed(data.item.total_payouts, 2, "0") }}
          </b-tooltip>
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
             <b-button variant="link" @click="
                    () => {
                      filters.buddy_address = data.item.address;
                      downloadLevel = 1

                      historicSearch.push({index: historicSearch.length, address: filters.buddy_address, short_address: shortenAddress(data.item.address), level: downloadLevel})
                                            
                      type = 'all';
                      manualRefresh = true;
                    }
                  ">
              {{ excludeZero(data.item.referrals) }}
            </b-button>
          </div>
        </template>

        <template #cell(total_structure)="data">
          <div>
            <b-button variant="link" @click="
                    () => {
                      filters.buddy_address = data.item.address;
                      downloadLevel = 15
                      
                      historicSearch.push({index: historicSearch.length, address: filters.buddy_address, short_address: shortenAddress(data.item.address), level: downloadLevel})
                      type = 'all';
                      manualRefresh = true;
                    }
                  ">
              {{ excludeZero(data.item.total_structure) }}
            </b-button>
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
            <span class="text-muted"
              >Showing {{ dataMeta.from }} to {{ dataMeta.to }} of
              {{ dataMeta.of }} entries</span
            >
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
                <feather-icon icon="ChevronLeftIcon" size="18" />
              </template>
              <template #next-text>
                <feather-icon icon="ChevronRightIcon" size="18" />
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
  BInputGroupAppend,
  BButton,
  BSpinner,
  BTooltip,
  BDropdown,
  BDropdownItem,
  BLink,
} from "bootstrap-vue";
import { ref, computed, watch } from "@vue/composition-api";
import vSelect from "vue-select";
import getAccounts from "@/http/getAccounts";
import store from "@/store";
// import Tour from './Tour.vue'

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
    BInputGroupAppend,
    BDropdown,
    BDropdownItem,
    BLink
    // Tour,
  },
  mounted() {
    this.search = () => {
      this.refAccountList.refresh();
    };
  },
  methods: {
    clearHistory(){
      this.historicSearch = []
    },
    shortenAddress(value) {
      if (value) {
        return `0x..${value.substr(value.length - 7)}`;
      }
      return "";
    },
    toDate(value) {
      if (value === "0") {
        return "";
      }

      return new Date(value * 1000).toLocaleDateString();
    },
    toFixed(value, decimals, defaultValue) {
      if (!value) {
        if (defaultValue) {
          return defaultValue;
        }
        return "";
      }

      return value.toFixed(decimals);
    },
    excludeZero(value) {
      if (value === 0) {
        return "";
      }
      return value;
    },
  },
  setup() {
    const refAccountList = ref(null);
    const btnSearch = ref(null);
    const address = ref(null);
    const name = ref(null);
    const buddy = ref(null);
    const downloadLevel = ref(1);
    const search = ref(() => {});

    // Table Handlers
    const tableColumns = ref([
      { key: "level", sortable: true },
      { key: "address", sortable: true },
      { key: "name", sortable: true },
      { key: "net_deposits", label: "net deposits", sortable: true },
      { key: "deposits", sortable: true },
      { key: "airdrops_total", label: "airdrops sent", sortable: true },
      { key: "rolls", label: "Hydrated", sortable: true },
      { key: "total_payouts", label: "claimed", sortable: true },
      { key: "referrals", label: "team directs", sortable: true },
      { key: "total_structure", label: "team total", sortable: true },
      { key: "lastAirdrop", sortable: true },
      { key: "timestamp", label: "joined on", sortable: true },
      // { key: 'actions' },
    ]);

    const perPage = ref(10);
    const totalAccounts = ref(0);
    const currentPage = ref(1);
    const perPageOptions = [5, 10, 25, 50, 100];
    const sortBy = ref("net_deposits");
    const isSortDirDesc = ref(false);

    const dataMeta = computed(() => {
      const localItemsCount = refAccountList.value
        ? refAccountList.value.localItems.length
        : 0;
      return {
        from:
          perPage.value * (currentPage.value - 1) + (localItemsCount ? 1 : 0),
        to: perPage.value * (currentPage.value - 1) + localItemsCount,
        of: totalAccounts.value,
      };
    });

    const isLoading = ref(false);

    const refetchData = () => {
      refAccountList.value.refresh();
    };

    const types = ref([
      { key: "all", label: "All Drippers" },
      { key: "faucet", label: "Faucet Drippers" },
      { key: "team", label: "Team Wallet ( > 5 directs)" },
    ]);
    const type = ref("all");
    const filters = ref({ type, address: null, buddy_address: null });
    
    let timeout;
    const manualRefresh = ref(false);

    watch([currentPage, perPage, type, manualRefresh, downloadLevel], () => {
      manualRefresh.value = false;

      if (timeout) {
        clearTimeout(timeout);
      }

      timeout = setTimeout(() => {
        refetchData();
        timeout = null;
      }, 500);
    });

    const fetchAccounts = function(ctx, callback) {
      isLoading.value = true;
      getAccounts(
        filters.value,
        currentPage.value,
        perPage.value,
        sortBy.value,
        isSortDirDesc.value,
        downloadLevel.value
      )
        .then(function(response) {
          const accounts = response.data.results;
          totalAccounts.value = response.data.total;
         
         
        //  if(filters.value.buddy_address){
        //     tableColumns.value.unshift({ key: "level", sortable: true })
        //   }else{
        //     const removeIndex = tableColumns.value.findIndex( item => item.key === 'level' );
            
        //     if(removeIndex >= 0){
        //       tableColumns.value.splice( removeIndex, 1 );
        //     }
            
        //   }

          return callback(accounts);
        })
        .catch(function(e){
          console.error(e)
        })
        .finally(function() {
          isLoading.value = false;
        });
    };
    
    const historicSearch = ref([])

    const clear = () => {
      filters.value.buddy_address = null;
      filters.value.address = null;
      filters.value.name = null;
      historicSearch.value.length = 0
      type.value = "all";

      refetchData();
    };

    const walletAddress = ref(null);

    store.watch(
      (state) => state.chain.address,
      (addr) => {
        walletAddress.value = addr;
      }
    );

    const setAddressToWallet = () => {
      filters.value.address = walletAddress.value;
      refetchData();
    };

    const setBuddyToWallet = () => {
      filters.value.buddy_address = walletAddress.value;
      refetchData();
    };


    return {
      manualRefresh,
      filters,
      name,
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
      type,
      types,
      walletAddress,
      setAddressToWallet,
      setBuddyToWallet,
      refetchData,
      downloadLevel,
      historicSearch,
    };
  },
};
</script>

<style>
a.disabled {
  pointer-events: none;
}

#addressDD__BV_toggle_ {
  padding: 0px !important;
}
</style>

<style lang="scss" scoped>
.form-control {
  height: inherit;
}
.per-page-selector {
  width: 100px;
}
.type-selector {
  width: 250px;
}

</style>
