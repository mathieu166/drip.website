<template>
  <b-button
    v-if="address"
    variant="outline-primary"
    pill
    @click="disconnect"
  >
    {{ address }}
  </b-button>

  <b-nav-item-dropdown
    v-else
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

    <b-list-group>
      <b-list-group-item
        href="#"
        @click="connectMetamask"
      >
        <div class="d-flex align-items-center">
          <b-img
            left
            class="mb-1 mb-sm-0"
            height="60"
            :src="require('@/assets/images/wallets/mm.svg')"
            alt="Left image')"
          />
          <h4 class="ml-3">
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
            height="60"
            :src="require('@/assets/images/wallets/bc.jpeg')"
            alt="Left image')"
          />
          <h4 class="ml-3">
            BINANCE CHAIN
          </h4>
        </div>
      </b-list-group-item>
    </b-list-group>
  </b-nav-item-dropdown>
</template>

<script>
import {
  BNavItemDropdown,
  BListGroupItem,
  BListGroup,
  BBadge,
  BMedia,
  BLink,
  BAvatar,
  BButton,
  BFormCheckbox,
  BImg,
} from 'bootstrap-vue'
import { ref } from '@vue/composition-api'
import store from '@/store'
import addressUtil from '@/chain/address'

export default {
  components: {
    BButton,
    BNavItemDropdown,
    BBadge,
    BImg,
    BListGroup,
    BListGroupItem,
  },
  setup() {
    const address = ref(null)

    const setAddress = value => {
      address.value = addressUtil.shorten(value)
    }

    store.watch(
      state => state.chain.address,
      value => {
        setAddress(value)
      },
    )

    if (store.state.chain.address) {
      setAddress(store.state.chain.address)
    }

    return { address }
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
