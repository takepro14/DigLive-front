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
      <nuxt-link
        to="Signup"
      >
        <v-btn
          outlined
          text
        >
          新規登録
        </v-btn>
      </nuxt-link>
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
