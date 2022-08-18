<template>
  <v-app>
    <not-logged-in-header />
    <app-toaster />
    <nuxt
      color="cyan lighten-5"
    />
  </v-app>
</template>

<script>
export default {
  name: 'NotLoggedIn',
  middleware: ['logged-in-redirect']
}
</script>
