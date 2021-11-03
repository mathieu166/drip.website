<template>
  <b-overlay
    :show="loading"
    :variant="overlayMode"
    spinner-type="border"
    rounded="sm"
  >
    <b-img
      v-if="!loading"
      :src="data.url"
      fluid-grow
      rounded
      alt="Responsive image"
    />
  </b-overlay>
</template>

<script>
import { BOverlay, BImg } from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import useAppConfig from '@core/app-config/useAppConfig'
import { computed, watch } from '@vue/composition-api'

export default {
  components: {
    BOverlay,
    BImg,
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
