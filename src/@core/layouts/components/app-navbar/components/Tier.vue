<template>
  <b-badge variant="primary">
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
      state => state.app.tier,
      value => {
        tier.value = value
      },
    )

    return { tier, tierName, tierNames }
  },
  methods: {},
}
</script>
<style lang="scss"></style>
