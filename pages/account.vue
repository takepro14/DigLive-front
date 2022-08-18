<template>
  <v-container>
    <nuxt-child />
  </v-container>
</template>

<script>
export default {
  layout: 'logged-in',
  // /account => This page could not be found
  validate ({ route }) {
    return route.name !== 'account'
  }
}
</script>
