<template>
  <div
    class="mb-16"
  >
    <v-app-bar
      fixed
      fab
      top
    >
      <app-title />
      <v-spacer></v-spacer>
      <app-home-about-button />
      <not-logged-in-header-signup-button />
      <not-logged-in-header-login-button />
    </v-app-bar>
  </div>
</template>

<script>
export default {
}
</script>
