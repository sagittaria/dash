<template>
  <div class="dashboard-container">
    {{ roles }}
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  data() {
    return {}
  },
  computed: {
    ...mapGetters([
      'roles'
    ])
  },
  created() {}
}
</script>
