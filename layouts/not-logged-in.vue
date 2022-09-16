<template>
  <v-app>
    <!-- :style="{ background: $vuetify.theme.themes.light.background }" -->
    <NotLoggedInHeader />
    <Toaster />
    <nuxt />
    <NotLoggedInFooter />
  </v-app>
</template>

<script>
export default {
  name: 'NotLoggedIn',
  middleware: [
    'logged-in-redirect'
  ]
}
</script>
