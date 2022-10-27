<template>
  <v-app>
    <LoggedInHeader />
    <v-main class="overflow-hidden">
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
