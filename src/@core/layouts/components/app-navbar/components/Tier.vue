<template>
  <b-badge
    v-if="show"
    variant="primary"
  >
    <feather-icon
      icon="StarIcon"
      class="mr-25"
    />
    <span>{{ tierName }}</span>
  </b-badge>
</template>

<script>
import { BBadge } from 'bootstrap-vue'

import { ref, computed } from '@vue/composition-api'
import store from '@/store'

export default {
  components: { BBadge },
  setup() {
    const tierNames = ref([
      'Free Tier',
      'Bronze Tier',
      'Silver Tier',
      'Gold Tier',
      'Platine Tier',
      'Promo Tier',
    ])

    const tier = ref(0)
    const tierName = computed(() => tierNames.value[tier.value])

    store.watch(
      state => state.chain.tier,
      value => {
        tier.value = value
      },
    )

    const show = ref(false)
    store.watch(
      state => state.chain.address,
      value => {
        if (value) {
          show.value = true
        } else {
          show.value = false
        }
      },
    )

    return {
      tier,
      tierName,
      tierNames,
      show,
    }
  },
  methods: {},
}
</script>
<style lang="scss"></style>
