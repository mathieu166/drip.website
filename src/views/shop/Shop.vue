<template>
  <section id="pricing-plan">
    <!-- title text and switch button -->
    <div class="text-center">
      <h1 class="mt-5">
        Pricing Tiers
      </h1>
      <p class="mb-2 pb-75">
        All paid tiers are paid in the form of airdrop to the dev wallet. Once
        paid, reconnect your wallet and you should be good to go.
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
          <b-col md="3">
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
              >
                {{ tier == 0 ? 'Your current plan' : 'You have a higher tier' }}
              </b-button>
            </b-card>
          </b-col>
          <b-col md="3">
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
              <b-card-text>See everything! </b-card-text>

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
                  v-show="!monthlyPlanShow"
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
              </b-list-group>
              <!--/ plan benefit -->

              <!-- buttons -->
              <b-button
                v-ripple.400="'rgba(40, 199, 111, 0.15)'"
                block
                class="mt-2"
                variant="outline-success"
              >
                {{ tier == 0 ? 'Your current plan' : 'You have a higher tier' }}
              </b-button>
            </b-card>
          </b-col>

          <b-col md="3">
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
                  >3</span>
                  <sub
                    class="pricing-duration text-body font-medium-1 font-weight-bold"
                  >DRIP</sub>
                </div>
                <small
                  v-show="!monthlyPlanShow"
                  class="annual-pricing text-muted"
                >3.33 DRIP /w tax</small>
              </div>
              <!--/ annual plan -->

              <!-- plan benefit -->
              <b-list-group class="list-group-circle text-left">
                <b-list-group-item>
                  everything of Bronze tier
                </b-list-group-item>
                <b-list-group-item>
                  Next round robin wallet
                </b-list-group-item>
                <b-list-group-item>
                  Full wallet faucet
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
          </b-col>
          <b-col md="3">
            <b-card align="center">
              <!-- img -->
              <b-img
                v-if="pricing.enterprisePlan.img"
                :src="pricing.enterprisePlan.img"
                class="mb-2"
                alt="enterprise svg img"
              />
              <!--/ img -->
              <h3>{{ pricing.enterprisePlan.title }}</h3>
              <b-card-text>{{ pricing.enterprisePlan.subtitle }}</b-card-text>

              <!-- annual plan -->
              <div class="annual-plan">
                <div class="plan-price mt-2">
                  <sup
                    class="font-medium-1 font-weight-bold text-primary"
                  >$</sup>
                  <span
                    class="pricing-basic-value font-weight-bolder text-primary"
                  >{{
                    monthlyPlanShow
                      ? pricing.enterprisePlan.monthlyPrice
                      : pricing.enterprisePlan.yearlyPlan.perMonth
                  }}</span>
                  <sub
                    class="pricing-duration text-body font-medium-1 font-weight-bold"
                  >/month</sub>
                </div>
                <small
                  v-show="!monthlyPlanShow"
                  class="annual-pricing text-muted"
                >USD {{ pricing.enterprisePlan.yearlyPlan.totalAnual }} /
                  year</small>
              </div>
              <!--/ annual plan -->

              <!-- plan benefit -->
              <b-list-group
                v-for="(data, index) in pricing.enterprisePlan.planBenefits"
                :key="index"
                class="list-group-circle text-left"
              >
                <b-list-group-item>
                  {{ data }}
                </b-list-group-item>
              </b-list-group>
              <!--/ plan benefit -->

              <!-- buttons -->
              <b-button
                v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                block
                class="mt-2"
                variant="outline-primary"
              >
                Upgrade
              </b-button>
            </b-card>
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
} from 'bootstrap-vue'
import AppCollapse from '@core/components/app-collapse/AppCollapse.vue'
import AppCollapseItem from '@core/components/app-collapse/AppCollapseItem.vue'
import Ripple from 'vue-ripple-directive'
import { ref, computed, watch } from '@vue/composition-api'
import store from '@/store'
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
  },
  directives: {
    Ripple,
  },
  data() {
    return {
      pricing: {},
    }
  },
  setup() {
    const walletAddress = ref(store.state.chain.address)
    const tier = ref(store.state.chain.tier)

    store.watch(
      state => state.chain.address,
      addr => {
        walletAddress.value = addr
      },
    )

    store.watch(
      state => state.chain.tier,
      tierValue => {
        tier.value = tierValue
      },
    )

    return {
      walletAddress,
    }
  },
  created() {
    this.$http.get('/pricing/data').then(res => {
      this.pricing = res.data
    })
  },
  methods: {},
}
/* eslint-disable global-require */
</script>

<style lang="scss">
@import '@core/scss/vue/pages/page-pricing.scss';
</style>
