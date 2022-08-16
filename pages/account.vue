<template>
  <v-container>
    <nuxt-child />
  </v-container>
</template>

<script>
export default {
  layout: 'after-login',
  // /account => This page could not be found
  validate ({ route }) {
    return route.name !== 'account'
  }
}
</script>
