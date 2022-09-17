<template>
  <v-app>
    <LoggedInHeader />
    <v-main>
      <Nuxt />
    </v-main>
    <LoggedInFooter />
  </v-app>
</template>

<script>
export default {
  name: 'LoggedIn',
  middleware: ['authentication']
}
</script>
