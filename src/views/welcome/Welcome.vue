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
        DripNetwork.ca
      </h3>
      <div class="mb-1">
        DripNetwork.ca was made available to the Drip community to provide a
        variety of tools and analytics. Currently, there is only a Search engine
        available that allows users to look at the full Drip account database. A
        free version is available by default, no need to connect your wallet,
        but for the more curious, connect and go to the
        <b-link to="/shop">
          Shop
        </b-link>
        to upgrade to a higher tier.
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
          <b-link to="/shop">
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
