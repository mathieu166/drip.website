<template>
  <b-overlay
    :show="loading"
    :variant="overlayMode"
    spinner-type="border"
    rounded="sm"
  >
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
      </b-list-group>
    </b-nav-item-dropdown>
  </b-overlay>
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

    const overlayMode = computed(() => {
      if (skin.value === 'dark') {
        return 'dark'
      }
      return 'light'
    })

    watch(
      computed(() => skin.value),
      () => {
        if (skin.value === 'dark') {
          overlayMode.value = 'dark'
        } else {
          overlayMode.value = 'light'
        }
      },
    )

    const setAddress = value => {
      address.value = addressUtil.shorten(value)
    }

    store.watch(
      state => state.chain.address,
      value => {
        setAddress(value)

        // if (value) {
        //   getTier(value, store.state.chain.signature).then(result => {
        //     if (result) {
        //       store.dispatch('app/setTier', { tier: result })
        //     }
        //   })
        // }else{
        //   store.dispatch('app/setTier', { tier: 0 })
        // }
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

    return { address, loading, overlayMode }
  },
  methods: {
    connectBinanceChain() {
      store.dispatch('chain/connectBinanceChain')
    },
    connectMetamask() {
      store.dispatch('chain/connectMetamask')
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
