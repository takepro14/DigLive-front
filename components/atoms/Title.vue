<template>
  <v-toolbar-title>
    <v-row>
      <v-col>
        <v-img
          src="favicon.ico"
          height="30px"
          width="30px"
        />
      </v-col>
      <v-col>
        <span
          class="purple--text text--lighten-5 font-weight-bold"
        >
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
      homePath: '/',
      appName
    }
  }
}
</script>
