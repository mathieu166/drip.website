<template>
  <p class="clearfix mb-0">
    <debug-console ref="debug" />
    <span class="float-md-left d-block d-md-inline-block mt-25">
      COPYRIGHT  © {{ new Date().getFullYear() }}
      <span class="d-none d-sm-inline-block">MR Dev, All rights Reserved</span>
    </span>
  </p>
</template>

<script>
import DebugConsole from '@/views/debug/DebugConsole.vue'

export default {
  components: {
    DebugConsole,
  },
}
</script>
