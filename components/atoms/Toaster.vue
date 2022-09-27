<template>
  <v-snackbar
    v-model="setSnackbar"
    app
    top
    text
    :timeout="toast.timeout"
    :color="toast.color"
  >
    {{ toast.msg }}
    <template #action="{ attrs }">
      <v-btn
        v-bind="attrs"
        text
        :color="toast.color"
        @click="resetToast"
      >
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
export default {
  computed: {
    toast () {
      return this.$store.state.toast
    },
    setSnackbar: {
      get () { return !!this.toast.msg },
      set (val) { return this.resetToast() && val }
    }
  },
  methods: {
    resetToast () {
      return this.$store.dispatch('getToast', { msg: null })
    }
  }
}
</script>
