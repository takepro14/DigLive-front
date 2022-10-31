<template>
  <v-toolbar-title>
    <v-row>
      <v-col class="d-flex align-center">
        <v-img
          src="favicon.ico"
          contain
          height="48px"
          width="48px"
        />
        <span class="text-h5 white--text title">
          {{ appName }}
        </span>
      </v-col>
    </v-row>
  </v-toolbar-title>
</template>

<script>
export default {
  data ({ $config: { appName } }) {
    return {
      appName
    }
  }
}
</script>

<style scoped>
.title {
  font-family: 'Audiowide', cursive !important;
}
</style>
