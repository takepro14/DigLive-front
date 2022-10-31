<template>
  <div>
    <v-app-bar
      fixed
      flat
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
        small
        color="button"
        class="font-weight-bold"
        to="/signup"
      >
        {{ $my.pageTitle('signup') }}
      </v-btn>
      <v-btn
        text
        dark
        small
        class="font-weight-bold ml-2"
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
