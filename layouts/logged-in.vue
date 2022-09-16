<template>
  <v-app>
    <LoggedInHeader />
    <v-main>
      <nuxt />
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
