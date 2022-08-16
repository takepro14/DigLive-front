<template>
  <div class="mb-16">
    <v-app-bar
      fixed
      fab
      top
    >
      <nuxt-link
        :to="redirectPath"
        class="text-decoration-none"
      >
        <app-logo />
      </nuxt-link>
      <app-title />
      <v-spacer />
      <after-login-header-account-menu />
    </v-app-bar>
  </div>
</template>

<script>
import AfterLoginHeaderAccountMenu from '~/components/AfterLogin/AfterLoginHeaderAccountMenu'
export default {
  components: {
    AfterLoginHeaderAccountMenu
  },
  data ({ $store, $config: { appName } }) {
    return {
      redirectPath: $store.state.AfterLogin.redirectPath,
      appName
    }
  }
}
</script>
