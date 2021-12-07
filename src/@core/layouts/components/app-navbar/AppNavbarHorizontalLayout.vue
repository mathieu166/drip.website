<template>
  <div class="navbar-container d-flex content align-items-center">

    <!-- Nav Menu Toggler -->
    <ul class="nav navbar-nav d-xl-none">
      <li class="nav-item">
        <b-link
          class="nav-link"
          @click="toggleVerticalMenuActive"
        >
          <feather-icon
            icon="MenuIcon"
            size="21"
          />
        </b-link>
      </li>
    </ul>

    <!-- Left Col -->
    <!-- <div class="bookmark-wrapper align-items-center flex-grow-1 d-none d-lg-flex">
      <bookmarks />
    </div> -->

    <!-- Right Col -->
    <b-navbar-nav class="nav align-items-center ml-auto">
      <!-- <locale /> -->
      <dark-Toggler class="d-none d-lg-block" />
      <!-- <search-bar />
      <!-- <cart-dropdown /> -->
      <!-- <notification-dropdown /> -->
      <!-- <user-dropdown /> -->
      <wallet-connect />
    </b-navbar-nav>
  </div>
</template>

<script>
import {
  BLink, BNavbarNav,
} from 'bootstrap-vue'
import DarkToggler from './components/DarkToggler.vue'
import WalletConnect from './components/WalletConnect.vue'

export default {
  components: {
    BLink,
    WalletConnect,
    BNavbarNav,
    DarkToggler,
  },
  props: {
    toggleVerticalMenuActive: {
      type: Function,
      default: () => {},
    },
  },

}
</script>
