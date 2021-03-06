<template>
  <div>
    <b-button
      v-if="address"
      variant="outline-primary mr-25 ml-1"
      pill
      @click="disconnect"
    >
      {{ address }}
    </b-button>

    <b-nav-item-dropdown
      v-if="!address"
      ref="dropdown"
      class="dropdown-notification mr-25"
      menu-class="dropdown-menu-media"
      right
    >
      <template #button-content>
        <b-button
          variant="outline-primary"
          pill
        >
          Connect Wallet
        </b-button>
      </template>

      <b-list-group id="walletSelect">
        <b-overlay
          :show="mmLoading"
          rounded="sm"
        >
          <b-list-group-item
            href="#"
            @click="connectMetamask"
          >
            <div class="d-flex align-items-center">
              <b-img
                left
                class="mb-1 mb-sm-0"
                height="50"
                :src="require('@/assets/images/wallets/mm.svg')"
                alt="Left image')"
              />
              <h4 class="ml-3 d-lg">
                METAMASK
              </h4>
            </div>
          </b-list-group-item>
        </b-overlay>
        <b-overlay
          :show="bcLoading"
          rounded="sm"
        >
          <b-list-group-item
            href="#"
            @click="connectBinanceChain"
          >
            <div class="d-flex align-items-center">
              <b-img
                left
                class="mb-1 mb-sm-0"
                height="50"
                :src="require('@/assets/images/wallets/bc.jpeg')"
                alt="Left image')"
              />
              <h4 class="ml-3 d-xs-none">
                BINANCE CHAIN
              </h4>
            </div>
          </b-list-group-item>
        </b-overlay>
      </b-list-group>
    </b-nav-item-dropdown>
  </div>
</template>

<script>
import {
  BNavItemDropdown,
  BListGroupItem,
  BListGroup,
  BButton,
  BImg,
  BOverlay,
} from 'bootstrap-vue'

import { computed, watch, ref } from '@vue/composition-api'
import useAppConfig from '@core/app-config/useAppConfig'
import store from '@/store'
import addressUtil from '@/chain/address'
// import getTier from '@/http/getTier'

export default {
  components: {
    BButton,
    BNavItemDropdown,
    BImg,
    BListGroup,
    BListGroupItem,
    BOverlay,
  },
  setup() {
    const address = ref(null)
    const loading = ref(store.state.chain.loading)
    const { skin } = useAppConfig()
    const mmLoading = ref(false)
    const bcLoading = ref(false)

    const dropdown = ref(null)

    const overlayMode = computed(() => {
      if (skin.value === 'dark') {
        return 'dark'
      }
      return 'light'
    })

    const setAddress = value => {
      address.value = addressUtil.shorten(value)
    }

    store.watch(
      state => state.chain.address,
      value => {
        setAddress(value)
        mmLoading.value = false
        bcLoading.value = false
      },
    )

    if (store.state.chain.address) {
      setAddress(store.state.chain.address)
    }

    store.watch(
      state => state.chain.loading,
      value => {
        loading.value = value
      },
    )

    return {
      address,
      loading,
      overlayMode,
      mmLoading,
      bcLoading,
      dropdown,
    }
  },
  methods: {
    connectBinanceChain() {
      this.bcLoading = true
      const vm = this
      store
        .dispatch('chain/connectBinanceChain')
        .then(() => {
          vm.$bvToast.toast('Connection Successful', {
            toaster: 'b-toaster-top-center',
            title: 'Success',
            variant: 'success',
            solid: true,
          })
        })
        .catch(e => {
          vm.$bvToast.toast(`${e.message}`, {
            toaster: 'b-toaster-top-center',
            title: 'Error',
            variant: 'danger',
            solid: true,
          })
        })
        .finally(() => {
          this.bcLoading = false
          this.$refs.dropdown.hide()
        })
    },
    connectMetamask() {
      this.mmLoading = true
      const vm = this
      store
        .dispatch('chain/connectMetamask')
        .then(() => {
          vm.$bvToast.toast('Connection Successful', {
            toaster: 'b-toaster-top-center',
            title: 'Success',
            variant: 'success',
            solid: true,
          })
        })
        .catch(e => {
          vm.$bvToast.toast(`${e.message}`, {
            toaster: 'b-toaster-top-center',
            title: 'Error',
            variant: 'danger',
            solid: true,
          })
        })
        .finally(() => {
          this.mmLoading = false
          this.$refs.dropdown.hide()
        })
    },
    disconnect() {
      store.dispatch('chain/disconnect')
    },
  },
}
</script>
<style lang="scss">
@media screen and (max-width: 767.98px) {
  [dir='ltr'] .header-navbar .navbar-container .show .dropdown-menu {
    left: inherit !important;
  }
}
</style>
