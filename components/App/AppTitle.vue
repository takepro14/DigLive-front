<template>
  <v-toolbar-title>
    <nuxt-link
      :to="homePath"
      class="text-decoration-none"
    >
      <v-row>
        <v-col>
          <v-img
            src="favicon.ico"
            height="30px"
            width="30px"
          />
        </v-col>
        <v-col>
          <span>
            {{ appName }}
          </span>
        </v-col>
      </v-row>
    </nuxt-link>
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
