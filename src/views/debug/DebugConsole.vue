<template>
  <div>
    <b-button
      variant="link"
      @click="show"
    >
      Open Console
    </b-button>
    <b-modal
      id="modal-scrollable"
      ref="debugConsoleModal"
      scrollable
      title="Debug Console"
      ok-only
      ok-title="Close"
      cancel-variant="outline-secondary"
      centered
      size="lg"
    >
      <div class="">
        <textarea
          v-model="debugConsole"
          rows="20"
          cols="100"
          class="rounded-lg resize-none w-full h-full"
        />
      </div>
    </b-modal>
  </div>
</template>

<script>
/* eslint-disable no-restricted-syntax */
/* eslint-disable dot-notation */

import { BModal, BButton } from 'bootstrap-vue'
import { ref } from '@vue/composition-api'
import store from '@/store'
// import Tour from './Tour.vue'

export default {
  components: { BModal, BButton },
  setup() {
    const debugConsole = ref('')
    const debugConsoleModal = ref(null)
    const show = () => {
      debugConsole.value = store.state.app.debugConsole
      debugConsoleModal.value.show()
      // this.debugConsole = this.$store.app.debugConsole
      // this.$refs.mymodal.show()
    }

    return {
      debugConsole,
      show,
      debugConsoleModal,
    }
  },
}
</script>

<style lang="scss" scoped>
.form-control {
  height: inherit;
}
.per-page-selector {
  width: 90px;
}
.type-selector {
  width: 200px;
}
</style>
