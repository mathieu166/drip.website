<template>
  <b-overlay
    :show="loading"
    :variant="overlayMode"
    spinner-type="grow"
    rounded="sm"
  >
    <b-card class="card-congratulation-medal">
      <h2>{{ data.category }}</h2>
      <h5>Congratulations 🎉</h5>
      <h4>{{ data.name }}</h4>
      <span class="font-small text-muted text-nowrap">{{ data.address }}</span>
      <h3 class="mb-75 mt-2 pt-50">
        <b-link>{{ data.amount }} DRIP</b-link>
      </h3>
      <b-img
        :src="require('@/assets/images/illustration/badge.svg')"
        class="congratulation-medal"
        alt="Medal Pic"
      />
    </b-card>
  </b-overlay>
</template>

<script>
import {
  BOverlay, BCard, BLink, BImg,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import useAppConfig from '@core/app-config/useAppConfig'
import { computed, watch } from '@vue/composition-api'

export default {
  components: {
    BCard,
    BLink,
    BImg,
    BOverlay,
  },
  directives: {
    Ripple,
  },
  props: {
    data: {
      type: Object,
      default: () => {},
    },
    loading: {
      type: Boolean,
      default: true,
    },
  },
  methods: {},
  setup() {
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
    return {
      overlayMode,
    }
  },
}
</script>
