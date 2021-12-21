<template>
  <section id="welcome">
    <b-modal
      id="modal-lg"
      ref="modal"
      ok-only
      ok-title="Close"
      centered
      no-close-on-backdrop
      no-close-on-esc
      size="lg"
      title="You're Welcome!"
      @ok="close"
      @close="close"
    >
      <h3>
        <feather-icon
          icon="SearchIcon"
          size="21"
          class="text-primary"
          badge-classes="badge-danger badge-glow"
        />
        DripNetwork.ca Search Engine
      </h3>
      <div class="mb-1">
        You're new to Drip Network and wonder what team you should be joining?
        DripNetwork.ca provides a free tier search engine that allows you to
        search for team wallets. Simply start by connecting your wallet to the
        site and click on Tour if you want some assistance.
      </div>
      <h4>
        <feather-icon
          icon="CornerDownRightIcon"
          size="21"
          class="text-secondary mr-1"
          badge-classes="badge-danger badge-glow"
        />Advanced Search
      </h4>
      <b-badge
        variant="dark"
        class="mr-1"
      >
        <feather-icon icon="StarIcon" />
        <span>Bronze</span>
      </b-badge>
      <b-badge
        variant="secondary"
        class="mr-1"
      >
        <feather-icon icon="StarIcon" />
        <span>Silver</span>
      </b-badge>
      <b-badge variant="success">
        <feather-icon icon="StarIcon" />
        <span>Gold</span>
      </b-badge>
      <div class="mb-1">
        <div class="mb-1">
          You want more than the free tier? You can upgrade to higher tier to
          unlocked advanced searching features starting at only 1 DRIP after
          tax.
        </div>
        <div>
          Visit the
          <b-link to="/search">
            Shop
          </b-link>
        </div>
      </div>
      <h4>
        <feather-icon
          icon="UsersIcon"
          size="21"
          class="text-secondary mr-1"
          badge-classes="badge-warning badge-glow"
        />Personalise your wallet
      </h4>
      <div class="mb-1">
        You can personalise your entry in the database with:
        <div>
          <ul>
            <li>your own name or team name to replace the generated one;</li>
            <li>a customized URL;</li>
            <li>a first page appearance;</li>
            <li>more to come...</li>
          </ul>
        </div>

        <div>
          Visit the
          <b-link to="/search">
            Shop
          </b-link>
        </div>
      </div>

      <div class="d-flex  flex-row-reverse">
        <div>
          <b-form-checkbox v-model="dontshow">
            Don't show again!
          </b-form-checkbox>
        </div>
      </div>
    </b-modal>
  </section>
</template>

<script>
/* eslint-disable no-restricted-syntax */
/* eslint-disable dot-notation */

import {
  BModal, BBadge, BLink, BFormCheckbox,
} from 'bootstrap-vue'
import { ref, computed, watch } from '@vue/composition-api'
// import vSelect from 'vue-select'
// import getAccounts from '@/http/getAccounts'
import store from '@/store'

export default {
  components: {
    BModal,
    BBadge,
    BLink,
    BFormCheckbox,
  },
  mounted() {},
  methods: {
    show() {
      this.$refs.modal.show()
    },
    close() {
      if (this.dontshow === true) {
        this.$store.dispatch('app/setIntro', 'dontshow')
      }
    },
  },
  setup() {
    const dontshow = ref(true)
    return { dontshow }
  },
}
</script>
