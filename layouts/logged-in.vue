<template>
  <v-app>
    <logged-in-header />
    <v-main>
      <nuxt />
    </v-main>
    <logged-in-footer />
  </v-app>
</template>

<script>
export default {
  name: 'LoggedIn',
  middleware: ['authentication']
}
</script>
