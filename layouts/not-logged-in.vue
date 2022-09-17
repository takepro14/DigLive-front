<template>
  <v-app>
    <NotLoggedInHeader />
    <Toaster />
    <v-main>
      <Nuxt />
    </v-main>
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
