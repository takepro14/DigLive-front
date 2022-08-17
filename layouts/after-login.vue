<template>
  <v-app>
    <after-login-header />
    <v-main>
      <nuxt />
    </v-main>
    <after-login-footer />
  </v-app>
</template>

<script>
import AfterLoginHeader from '~/components/AfterLogin/AfterLoginHeader'
import AfterLoginFooter from '~/components/AfterLogin/AfterLoginFooter'
export default {
  name: 'AfterLogin',
  components: {
    AfterLoginHeader,
    AfterLoginFooter
  },
  middleware: ['authentication']
}
</script>
