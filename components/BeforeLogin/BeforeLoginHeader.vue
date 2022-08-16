<template>
  <div class="mb-16">
    <v-app-bar
      fixed
      fab
      top
    >
      <!-- <v-navigation-drawer
        v-model="drawer"
        app
      >
      </v-navigation-drawer>
      <v-app-bar-nav-icon
        @click="drawer = !drawer"
        >
      </v-app-bar-nav-icon> -->
      <v-toolbar-title>
        {{ appName }}
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <app-home-about-button />
      <before-login-header-signup-button />
      <before-login-header-login-button />
    </v-app-bar>
  </div>
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
