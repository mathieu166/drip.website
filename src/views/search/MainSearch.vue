<template>
  <section id="search-header">
    <!-- Table Container Card -->
    <b-card no-body>
      <div>
        <b-overlay :show="!allowSearch" opacity="0.85" rounded="sm">
          <div v-if="!allowSearch" class="m-1">
            <b-row >
              &nbsp;
            </b-row>
            <b-row >
              &nbsp;
            </b-row>
          </div>
        <div v-if="allowSearch" class="m-2">

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
                  <b-input-group-append v-if="walletAddress && tier > 0">
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
                  <b-input-group-append v-if="walletAddress && tier > 0" >
                    
                      <b-button variant="outline-dark" :disabled="tier == 0"  @click="setBuddyToWallet()">
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
                        :selectable="type => type.active"
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
                      v-model="downlineLevel"
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
        <template #overlay>
          <div>
              <b-badge pill variant="danger" class="badge-glow">Connect Wallet</b-badge>
          </div>
        </template>
        </b-overlay>
      </div>

      <div class="mx-2 mb-2" v-if="allowSearch">
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
          downlineLevel = hist.level
          historicSearch.length = hist.index + 1
          refetchData()
        }" >{{hist.short_address}} {{ index === historicSearch.length - 1?'>':'|'}} </b-link>
      </div>
      
      <div v-if='!allowSearch' class="d-flex flex-column align-items-center p-2">
        <div>
          <h4>
            Don't want to connect?
          </h4>
        </div>
        <div>
          Here's a list of carefully verified team wallets:
        </div>
      </div>

      <b-table
        ref="refAccountList"
        :items="fetchAccounts"
        responsive
        :fields="fields"
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
            <b-link target="_blank" :href="'https://drip.community/faucet?buddy='+data.item.address">
              {{ shortenAddress(data.item.address) }}
            </b-link>
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

        <template #cell(name)="data">
          <div class="text-nowrap">
            {{ data.item.name }}
          </div>
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
          <div v-if="allowDrillDown">
             <b-button variant="link" @click="
                    () => {
                      filters.buddy_address = data.item.address;
                      
                      downlineLevel = 1

                      historicSearch.push({index: historicSearch.length, address: filters.buddy_address, short_address: shortenAddress(data.item.address), level: downlineLevel})
                                            
                      filters.address = null
                      filters.name = null
                      type = 'all';
                      manualRefresh = true;
                    }
                  ">
              {{ excludeZero(data.item.referrals) }}
            </b-button>
          </div>
          <div v-else>{{ excludeZero(data.item.referrals) }}</div>
        </template>

        <template #cell(total_structure)="data">
          <div v-if="allowDrillDown">
            <b-button variant="link" @click="
                    () => {
                      filters.buddy_address = data.item.address;
                      downlineLevel = 15
                      
                      historicSearch.push({index: historicSearch.length, address: filters.buddy_address, short_address: shortenAddress(data.item.address), level: downlineLevel})
                      filters.address = null
                      filters.name = null
                      type = 'all';
                      manualRefresh = true;
                    }
                  ">
              {{ excludeZero(data.item.total_structure) }}
            </b-button>
          </div>
          <div v-else>{{ excludeZero(data.item.total_structure) }}</div>
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
      <div class="mx-2 mb-2" v-if="allowSearch">
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
    <welcome ref='welcome'/>
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
  BOverlay,
  BBadge,
} from "bootstrap-vue";
import { ref, computed, watch } from "@vue/composition-api";
import vSelect from "vue-select";
import getAccounts from "@/http/getAccounts";
import store from "@/store";
import Welcome from '@/views/welcome/Welcome.vue'
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
    BLink,
    BOverlay,
    BBadge,
    Welcome
    // Tour,
  },
  mounted() {
    this.search = () => {
      this.refAccountList.refresh();
    };

    if (!store.state.app.intro){
      setTimeout(this.showWelcome, 1500)
    }
  },
  methods: {
    showWelcome(){
      this.$refs.welcome.show()
    },
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
    const downlineLevel = ref(1);
    const search = ref(() => {});

    // Table Handlers
    const tableColumns = ref([
      { key: "level", sortable: true, hide: true },
      { key: "address", sortable: false },
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

    const fields = computed(()=> tableColumns.value.filter(f=> !f.hide))

    const perPage = ref(10);
    const totalAccounts = ref(0);
    const currentPage = ref(1);
    const perPageOptions = [5, 10, 25, 50, 100];
    const sortBy = ref("net_deposits");
    const isSortDirDesc = ref(false);
    const allowDrillDown = ref(false)
    const tier = ref(0)

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

    const types = computed(()=>[
      { key: "all", label: "All Drippers" + (tier.value == 0? " <Paid only>":""), active: tier.value > 0},
      { key: "faucet", label: "Faucet Drippers" + (tier.value == 0? " <Paid only>":""), active: tier.value > 0},
      { key: "team", label: "Team Wallet ( >= 5 directs)", active: true },
    ]);
    const type = ref("team");
    const filters = ref({ type, address: null, buddy_address: null });
    
    let timeout;
    const manualRefresh = ref(false);

    watch([currentPage, perPage, type, manualRefresh, downlineLevel], () => {
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
        downlineLevel.value,
        store.state.chain.address,
        store.state.chain.signature,
      )
        .then(function(response) {
          const accounts = response.data.results;
          totalAccounts.value = response.data.total;

          const filteredColumns = response.data.filter
          for(let col of tableColumns.value){
            if(filteredColumns[col.key] === 1){
              col.hide = false
            }else{
              col.hide = true
            }
          }

          if(response.data.tier == 0){
            allowDrillDown.value = false
          }else{
            allowDrillDown.value = true
          }

          const levelField = tableColumns.value.find(f=>f.key==='level')
          if(downlineLevel.value > 1 && response.data.tier > 0 && totalAccounts.value>0 && accounts[0].level > 0){
            levelField.hide = false
          }else{
            levelField.hide = true
          }

          return callback(accounts);
        })
        .catch(function(e){
          // isLoading.value = false;
          callback([])
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
      sortBy.value = "net_deposits"
      perPage.value = 10
      currentPage.value = 1
      totalAccounts.value = 0
      type.value = tier.value == 0? "team" : "all";

      refetchData();
    };

    const walletAddress = ref(null);
    const allowSearch = ref(false)
    store.watch(
      (state) => state.chain.address,
      (addr) => {
        walletAddress.value = addr;
        
        if(addr){
          allowSearch.value = true;
        }else{
          allowSearch.value = false;
        }
      }
    );

    store.watch(
      (state) => state.app.tier,
      (tierValue) => {
        tier.value = tierValue
        if(tierValue == 0){
          type.value = 'team'

          // types.forEach(t=>{
          //   if(t.key !== 'team'){
          //     t.is_active
          //   }
          // })

        }else{
          type.value = 'all'
        }
        refetchData()
      }
    );

    store.watch(
      (state) => state.chain.address,
      (addr) => {
        clear()
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
      tier,
      allowSearch,
      allowDrillDown,
      fields,
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
      downlineLevel,
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

[dir] .dark-layout .bg-light{background-color:#161d31!important;}
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
