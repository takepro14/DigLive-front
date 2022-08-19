<template>
  <div
    class="mb-16"
  >
    <v-app-bar
      fixed
      fab
      top
    >
      <AppTitle />
      <v-spacer></v-spacer>
      <app-home-about-button />
      <NotLoggedInHeaderSignupButton />
      <NotLoggedInHeaderLoginButton />
    </v-app-bar>
  </div>
</template>

<script>
export default {
}
</script>
