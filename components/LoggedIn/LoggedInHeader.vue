<template>
  <div
    class="mb-16"
  >
    <v-app-bar
      fixed
      fab
      top
      color="blue-grey lighten-5"
    >
      <nuxt-link
        :to="homePath"
        class="text-decoration-none"
      >
      </nuxt-link>
      <AppTitle />
      <v-spacer />
      <LoggedInHeaderNavDrawer />
      <LoggedInHeaderAccountMenu />
    </v-app-bar>
  </div>
</template>

<script>
export default {
  data ({ $store, $config: { appName } }) {
    return {
      homePath: $store.state.LoggedIn.homePath,
      appName
    }
  }
}
</script>
