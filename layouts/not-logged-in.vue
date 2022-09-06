<template>
  <v-app :style="{ background: $vuetify.theme.themes.light.background }">
    <NotLoggedInHeader />
    <Toaster />
    <nuxt
      color="cyan lighten-5"
    />
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
