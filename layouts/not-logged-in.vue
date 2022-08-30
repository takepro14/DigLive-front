<template>
  <v-app>
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
  middleware: ['logged-in-redirect']
}
</script>
