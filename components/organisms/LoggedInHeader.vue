<template>
  <div
    class="mb-16"
  >
    <v-app-bar
      fixed
      fab
      top
      color="header"
    >
      <nuxt-link
        :to="homePath"
        class="text-decoration-none"
      >
      </nuxt-link>
      <Title />
      <v-spacer />
      <LoggedInHeaderNavDrawer />
      <AccountMenu />
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
