<template>
  <v-toolbar-title>
    <v-row>
      <v-col class="d-flex align-center">
        <v-img
          src="favicon.ico"
          class="mr-1"
          contain
          height="48px"
          width="48px"
        />
        <span class="text-h5 white--text font-weight-bold">
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
