<template>
  <v-toolbar-title>
    <v-row>
      <v-col
        class="d-flex"
      >
        <!-- <v-img
          src="Logo.png"
          class="mr-1"
          height="28px"
          width="40px"
          contain
        /> -->
        <span
          class="white--text font-weight-bold"
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
