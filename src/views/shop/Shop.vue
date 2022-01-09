<template>
  <section id="pricing-plan">
    <!-- title text and switch button -->
    <div class="text-center">
      <h1 class="mt-5">
        Available tiers
      </h1>
      <p class="mb-2 pb-75">
        All paid tiers are paid in the form of airdrop to the dev wallet. Once
        paid, reconnect your wallet and you should be good to go. In case of
        error, don't panic! Any issue can be resolved.
      </p>
    </div>
    <!--/ title text and switch button -->

    <!-- pricing plan cards -->
    <b-row class="pricing-card">
      <b-col
        offset-sm-2
        sm="10"
        md="12"
        offset-lg="2"
        lg="10"
        class="mx-auto"
      >
        <b-row>
          <b-col md="4">
            <b-card align="center">
              <!-- img -->
              <b-img
                v-if="false"
                :src="d"
                class="mb-2 mt-5"
                alt="basic svg img"
              />
              <!--/ img -->
              <h3>Free</h3>
              <b-card-text>
                For everyone
              </b-card-text>

              <!-- annual plan -->
              <div class="annual-plan">
                <div class="plan-price mt-2">
                  <span
                    class="pricing-basic-value font-weight-bolder text-primary"
                  >0</span>
                  <sub
                    class="pricing-duration text-body font-medium-1 font-weight-bold"
                  >
                    DRIP</sub>
                </div>
                <small class="annual-pricing text-muted" />
              </div>
              <!--/ annual plan -->

              <!-- plan benefit -->
              <b-list-group class="list-group-circle text-left">
                <b-list-group-item>
                  Search all accounts
                </b-list-group-item>
              </b-list-group>
              <!--/ plan benefit -->
              <!-- buttons -->
              <b-button
                v-ripple.400="'rgba(40, 199, 111, 0.15)'"
                block
                class="mt-2"
                variant="outline-success"
                disabled
              >
                {{
                  !tier || tier == 0
                    ? 'Your current plan'
                    : 'You have a higher tier'
                }}
              </b-button>
            </b-card>
          </b-col>
          <b-col md="4">
            <b-card
              align="center"
              class="popular"
            >
              <!-- img -->
              <b-img
                v-if="false"
                :src="d"
                class="mb-2 mt-5"
                alt="basic svg img"
              />
              <!--/ img -->
              <h3>Bronze</h3>
              <b-card-text>For the curious!</b-card-text>

              <!-- annual plan -->
              <div class="annual-plan">
                <div class="plan-price mt-2">
                  <span
                    class="pricing-basic-value font-weight-bolder text-primary"
                  >1</span>
                  <sub
                    class="pricing-duration text-body font-medium-1 font-weight-bold"
                  >DRIP</sub>
                </div>
                <small
                  class="annual-pricing text-muted"
                >1.11 DRIP /w tax</small>
              </div>
              <!--/ annual plan -->

              <!-- plan benefit -->
              <b-list-group class="list-group-circle text-left">
                <b-list-group-item>
                  Team directs/full drilldown
                </b-list-group-item>
                <b-list-group-item>
                  Downline level criteria
                </b-list-group-item>
                <b-list-group-item>
                  Quick self search
                </b-list-group-item>
                <b-list-group-item>
                  More to come...
                </b-list-group-item>
              </b-list-group>
              <!--/ plan benefit -->

              <!-- buttons -->
              <b-button
                v-ripple.400="'rgba(40, 199, 111, 0.15)'"
                block
                :disabled="
                  !walletAddress || tier > 0 || loadingButton === 'tier1'
                "
                class="mt-2"
                variant="outline-success"
                name="tier1"
                @click="upgrade"
              >
                <b-spinner
                  v-if="loadingButton === 'tier1'"
                  small
                />
                {{ tier1ButtonText }}
              </b-button>
            </b-card>
          </b-col>
          <b-col md="4">
            <b-overlay
              id="overlay-background"
              show
              variant="transparent"
              opacity="1"
              blur="5px"
              rounded="sm"
            >
              <b-card align="center">
                <!-- img -->
                <b-img
                  v-if="false"
                  :src="d"
                  class="mb-1"
                  alt="svg img"
                />
                <!--/ img -->
                <h3>Silver</h3>
                <b-card-text>See everything & more!</b-card-text>

                <!-- annual plan -->
                <div class="annual-plan">
                  <div class="plan-price mt-2">
                    <span
                      class="pricing-basic-value font-weight-bolder text-primary"
                    >2</span>
                    <sub
                      class="pricing-duration text-body font-medium-1 font-weight-bold"
                    >DRIP</sub>
                  </div>
                  <small
                    class="annual-pricing text-muted"
                  >2.22 DRIP /w tax</small>
                </div>
                <!--/ annual plan -->

                <!-- plan benefit -->
                <b-list-group class="list-group-circle text-left">
                  <b-list-group-item>
                    Some other feature
                  </b-list-group-item>
                  <b-list-group-item>
                    Not yet defined
                  </b-list-group-item>
                  <b-list-group-item>
                    Currently being worked on
                  </b-list-group-item>
                </b-list-group>
                <!--/ plan benefit -->

                <!-- buttons -->
                <b-button
                  v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                  block
                  class="mt-2"
                  variant="primary"
                >
                  Upgrade
                </b-button>
              </b-card>
              <template #overlay>
                <div class="text-center">
                  <h4>
                    Coming soon...
                  </h4>
                </div>
              </template>
            </b-overlay>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
    <!--/ pricing plan cards -->
  </section>
</template>

<script>
import {
  BFormCheckbox,
  BRow,
  BCol,
  BCard,
  BImg,
  BCardText,
  BListGroup,
  BListGroupItem,
  BButton,
  BBadge,
  BOverlay,
  BSpinner,
} from 'bootstrap-vue'
import AppCollapse from '@core/components/app-collapse/AppCollapse.vue'
import AppCollapseItem from '@core/components/app-collapse/AppCollapseItem.vue'
import Ripple from 'vue-ripple-directive'
import { ref, computed, watch } from '@vue/composition-api'
import store from '@/store'
import shopHandler from '@/chain/shop.js'

const loadingButton = ref(null)
/* eslint-disable global-require */
export default {
  components: {
    BFormCheckbox,
    BButton,
    BCardText,
    BListGroup,
    BListGroupItem,
    BRow,
    BCol,
    BCard,
    BBadge,
    BImg,
    AppCollapseItem,
    AppCollapse,
    BOverlay,
    BSpinner,
  },
  directives: {
    Ripple,
  },
  data() {
    return {
      pricing: {},
    }
  },
  created() {
    this.$http.get('/pricing/data').then(res => {
      this.pricing = res.data
    })
  },
  setup() {
    const walletAddress = ref(store.state.chain.address)
    const tier = ref(store.state.chain.tier)
    const tier1ButtonText = computed(() => {
      if (!walletAddress.value) {
        return 'Connect to proceed'
      }
      if (tier.value === 0) {
        return 'Upgrade'
      }
      if (tier.value === 1) {
        return 'Your current tier'
      }
      if (tier.value > 1) {
        return 'You have a higher tier'
      }
      return 'Upgrade'
    })

    store.watch(
      state => state.chain.address,
      value => {
        walletAddress.value = value
        tier.value = store.state.chain.tier
      },
    )

    store.watch(
      state => state.chain.tier,
      value => {
        tier.value = value
      },
    )

    return {
      tier1ButtonText,
      walletAddress,
      tier,
      loadingButton,
    }
  },
  methods: {
    upgrade(event) {
      const product = event.currentTarget.getAttribute('name')
      loadingButton.value = product
      const vm = this
      shopHandler
        .payFor(product, store)
        .then(() => {
          vm.$bvToast.toast('Purchase completed', {
            title: 'Success',
            variant: 'success',
            solid: true,
          })
        })
        .catch(e => {
          vm.$bvToast.toast(`${e.message}`, {
            title: 'Error',
            variant: 'danger',
            solid: true,
          })
        })
        .finally(() => {
          loadingButton.value = ''
        })
    },
  },
}
/* eslint-disable global-require */
</script>

<style lang="scss">
@import '@core/scss/vue/pages/page-pricing.scss';
</style>
