<template>
  <div class="mb-16">
    <v-app-bar
      fixed
      fab
      top
      color="header"
    >
      <nuxt-link
        :to="homePath"
        class="text-decoration-none"
      >
        <Title />
      </nuxt-link>
      <v-spacer />
      <v-btn
        outlined
        color="button"
        class="ml-2 font-weight-bold"
        to="/signup"
      >
        {{ $my.pageTitle('Signup') }}
      </v-btn>
      <v-btn
        text
        dark
        class="ml-2 font-weight-bold"
        to="/login"
      >
        {{ $my.pageTitle('login') }}
      </v-btn>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  data () {
    return {
      homePath: '/'
    }
  }
}
</script>
