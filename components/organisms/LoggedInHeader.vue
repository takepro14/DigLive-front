<template>
  <div class="mb-16">
    <v-app-bar
      fixed
      flat
      color="header"
    >
      <nuxt-link
        :to="homePath"
        class="text-decoration-none"
      >
        <Title />
      </nuxt-link>
      <v-spacer />
      <LoggedInHeaderSubMenu />
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
