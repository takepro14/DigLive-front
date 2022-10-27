<template>
  <v-icon
    x-large
    @click="historyBack"
  >
    mdi-keyboard-backspace
  </v-icon>
</template>

<script>
export default {
  methods: {
    historyBack () {
      this.$router.go(-1)
    }
  }
}
</script>
